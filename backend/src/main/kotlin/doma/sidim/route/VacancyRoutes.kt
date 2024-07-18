package doma.sidim.route

import doma.sidim.dto.VacancyCreationDto
import doma.sidim.model.Vacancy
import doma.sidim.service.VacancyService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.vacancyRoutes(vacancyService: VacancyService) {
    authenticate("auth-jwt") {
        post("/vacancies/") {
            val principal = call.authentication.principal<JWTPrincipal>()
            principal?.let {
                val authUserId = principal.payload.getClaim("id").asLong()
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
    }
}