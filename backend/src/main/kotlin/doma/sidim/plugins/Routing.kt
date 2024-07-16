package doma.sidim.plugins

import doma.sidim.dto.UserLoginDto
import doma.sidim.dto.UserRegisterDto
import doma.sidim.model.User
import doma.sidim.service.UserService
import doma.sidim.util.JwtConfig
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.plugins.autohead.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.request.*
import io.ktor.server.resources.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting(userService: UserService) {
    install(AutoHeadResponse)
    install(Resources)
    install(StatusPages) {
        exception<Throwable> { call, cause ->
            call.respondText(text = "500: $cause", status = HttpStatusCode.InternalServerError)
        }
    }

    routing {
        post("/users") {
            val userDto = call.receive<UserRegisterDto>()
            val id = userService.createUser(userDto)
            call.respond(HttpStatusCode.Created, id)
        }

        post("/auth") {
            val loginDto = call.receive<UserLoginDto>()
            val user = userService.authenticate(loginDto.email, loginDto.password)
            if (user != null) {
                val token = JwtConfig.generateToken(user)
                call.respond(mapOf("token" to token))
            } else {
                call.respond(HttpStatusCode.Unauthorized, mapOf("message" to "Invalid credentials"))
            }
        }

        authenticate("auth-jwt") {
            get("/users/{id}") {
                val id =
                    call.parameters["id"]?.toLong() ?: throw IllegalArgumentException("Invalid ID")
                val user = userService.getUserById(id)
                if (user != null) {
                    call.respond(HttpStatusCode.OK, user)
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }

            put("/users/{id}") {
                val id =
                    call.parameters["id"]?.toLong() ?: throw IllegalArgumentException("Invalid ID")
                val user = call.receive<User>()
                userService.updateUser(id, user)
                call.respond(HttpStatusCode.OK)
            }

            delete("/users/{id}") {
                val id =
                    call.parameters["id"]?.toLong() ?: throw IllegalArgumentException("Invalid ID")
                userService.deleteUserById(id)
                call.respond(HttpStatusCode.OK)
            }

            get("/protected") {
                val principal = call.principal<JWTPrincipal>()!!
                val email = principal.payload.getClaim("email").asString()
                call.respondText("Hello $email")
            }
        }
    }
}
