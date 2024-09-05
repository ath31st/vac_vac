package doma.sidim.route

import doma.sidim.dto.*
import doma.sidim.service.VacancyService
import doma.sidim.util.EducationLevels
import doma.sidim.util.EnglishLevels
import doma.sidim.util.Roles
import doma.sidim.util.Tags
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.vacancyRoutes(vacancyService: VacancyService) {

    authenticate("auth-jwt") {

        post("/vacancies") {
            val principal = call.principal<JWTPrincipal>()!!
            if (!principal.hasRole(Roles.EMPLOYER)) {
                call.respond(HttpStatusCode.Forbidden)
                return@post
            }
            val authUserId = principal.userId()
            val vacancyDto = call.receive<VacancyCreationDto>()
            val id = vacancyService.createVacancy(vacancyDto, authUserId)
            call.respond(HttpStatusCode.Created, id)
        }

        get("/vacancies/{id}") {
            val id = call.extractId()
            val vacancy = vacancyService.getVacancy(id)
            if (vacancy == null) {
                call.respond(HttpStatusCode.NotFound)
            } else {
                call.respond(HttpStatusCode.OK, vacancy)
            }
        }

        get("/vacancies") {
            val vacancies = vacancyService.getAllActiveVacancies()
            if (vacancies.isEmpty()) {
                call.respond(HttpStatusCode.NotFound)
            } else {
                call.respond(HttpStatusCode.OK, vacancies)
            }
        }

        get("/vacancies/employer") {
            val principal = call.principal<JWTPrincipal>()!!
            if (!principal.hasRole(Roles.EMPLOYER)) {
                call.respond(HttpStatusCode.Forbidden)
                return@get
            }
            val authUserId = principal.userId()
            val vacancyDtos = vacancyService.getAllVacanciesByCreator(authUserId)
            call.respond(HttpStatusCode.OK, vacancyDtos)
        }

        get("/vacancies/employee") {
            val principal = call.principal<JWTPrincipal>()!!
            if (!principal.hasRole(Roles.EMPLOYEE)) {
                call.respond(HttpStatusCode.Forbidden)
                return@get
            }
            val authUserId = principal.userId()
            val vacancyDtos = vacancyService.getVacanciesByUserResponses(authUserId)
            call.respond(HttpStatusCode.OK, vacancyDtos)
        }

        put("/vacancies/{id}/change-visible") {
            val id = call.extractId()
            val dto = call.receive<VisibilityUpdateDto>()
            val resultUpdate = vacancyService.updateVisibleVacancy(id, dto.isVisible)
            if (resultUpdate) {
                call.respond(HttpStatusCode.OK)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }

        get("/vacancies/tags") {
            call.respond(
                HttpStatusCode.OK,
                Tags.entries.map { tag -> TagDto(tag.ordinal, tag.toString()) })
        }

        get("/vacancies/education-levels") {
            call.respond(
                HttpStatusCode.OK,
                EducationLevels.entries.map { education ->
                    EducationLevelDto(education.ordinal, education.toString())
                }
            )
        }

        get("/vacancies/english-levels") {
            call.respond(
                HttpStatusCode.OK,
                EnglishLevels.entries.map { english ->
                    EnglishLevelDto(english.ordinal, english.toString())
                }
            )
        }

        post("/vacancies/{id}/response") {
            val id = call.extractId()
            val principal = call.principal<JWTPrincipal>()!!
            if (!principal.hasRole(Roles.EMPLOYEE)) {
                call.respond(HttpStatusCode.Forbidden)
                return@post
            }
            val authUserId = principal.userId()
            val isExists = vacancyService.checkResponseExists(id, authUserId)
            if (!isExists) {
                vacancyService.responseToVacancy(id, authUserId)
                call.respond(HttpStatusCode.Created)
            } else {
                call.respond(HttpStatusCode.Conflict)
            }
        }

        delete("/vacancies/{id}/cancel-response") {
            val id = call.extractId()
            val principal = call.principal<JWTPrincipal>()!!
            if (!principal.hasRole(Roles.EMPLOYEE)) {
                call.respond(HttpStatusCode.Forbidden)
                return@delete
            }
            val authUserId = principal.userId()
            val isExists = vacancyService.checkResponseExists(id, authUserId)
            if (isExists) {
                val isDelete = vacancyService.cancelResponseToVacancy(id, authUserId)
                if (isDelete) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    call.respond(
                        HttpStatusCode.InternalServerError,
                        "Failed to delete response"
                    )
                }
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }

        post("/vacancies/response-statuses") {
            val principal = call.principal<JWTPrincipal>()!!
            if (!principal.hasRole(Roles.EMPLOYEE)) {
                call.respond(HttpStatusCode.Forbidden)
                return@post
            }
            val vacancyIds = call.receive<List<Long>>()
            val authUserId = principal.userId()

            val responseStatuses = vacancyService.getResponseStatuses(vacancyIds, authUserId)
            call.respond(HttpStatusCode.OK, responseStatuses)
        }

        post("/vacancies/response-counts") {
            val principal = call.principal<JWTPrincipal>()!!
            if (!principal.hasRole(Roles.EMPLOYER)) {
                call.respond(HttpStatusCode.Forbidden)
                return@post
            }
            val vacancyIds = call.receive<List<Long>>()
            val responseCounts = vacancyService.getResponseCounts(vacancyIds)
            call.respond(HttpStatusCode.OK, responseCounts)
        }
    }
}

private fun JWTPrincipal.userId(): Long {
    return this.payload.getClaim("user_id").asLong()
}

private fun JWTPrincipal.hasRole(role: Roles): Boolean {
    return this.payload.getClaim("role").asInt() == role.ordinal
}

private fun ApplicationCall.extractId(): Long {
    return this.parameters["id"]?.toLong() ?: throw IllegalArgumentException("Invalid ID")
}
