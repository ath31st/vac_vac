package doma.sidim.route

import doma.sidim.dto.EducationLevelDto
import doma.sidim.dto.EnglishLevelDto
import doma.sidim.dto.TagDto
import doma.sidim.dto.VacancyCreationDto
import doma.sidim.model.Vacancy
import doma.sidim.service.VacancyService
import doma.sidim.util.EducationLevels
import doma.sidim.util.EnglishLevels
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
            val principal = call.authentication.principal<JWTPrincipal>()
            principal?.let {
                val authUserId = principal.payload.getClaim("user_id").asLong()
                val vacancyDto = call.receive<VacancyCreationDto>()
                val id = vacancyService.createVacancy(vacancyDto, authUserId)
                call.respond(HttpStatusCode.Created, id)
            } ?: run {
                call.respond(HttpStatusCode.Unauthorized, "Unauthorized")
            }
        }

        get("/vacancies/{id}") {
            val id = call.parameters["id"]?.toLong() ?: throw IllegalArgumentException("Invalid ID")
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

        put("/vacancies/{id}") {
            val id = call.parameters["id"]?.toLong() ?: throw IllegalArgumentException("Invalid ID")
            val vacancy = call.receive<Vacancy>()
            val resultUpdate = vacancyService.updateVacancy(id, vacancy)
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
    }
}