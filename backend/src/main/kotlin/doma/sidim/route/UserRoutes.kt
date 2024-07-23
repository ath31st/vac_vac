package doma.sidim.route

import doma.sidim.dto.RoleDto
import doma.sidim.dto.UserLoginDto
import doma.sidim.dto.UserRegisterDto
import doma.sidim.model.User
import doma.sidim.service.UserService
import doma.sidim.util.JwtConfig
import doma.sidim.util.Roles
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.userRoutes(userService: UserService) {
    post("/users") {
        val userDto = call.receive<UserRegisterDto>()
        userService.getUserByEmail(userDto.email)?.let {
            call.respond(HttpStatusCode.BadRequest, "Email is already in use")
        } ?: run {
            val id = userService.createUser(userDto)
            call.respond(HttpStatusCode.Created, id)
        }
    }

    post("/auth") {
        val loginDto = call.receive<UserLoginDto>()
        userService.authenticate(loginDto.email, loginDto.password)?.let { user ->
            val token = JwtConfig.generateToken(user)
            call.respond(mapOf("token" to token))
        } ?: run {
            call.respond(HttpStatusCode.Unauthorized, mapOf("message" to "Invalid credentials"))
        }
    }

    get("/roles") {
        call.respond(
            HttpStatusCode.OK,
            Roles.entries.map { role ->
                RoleDto(
                    id = role.ordinal,
                    name = role.displayName()
                )
            })
    }

    authenticate("auth-jwt") {
        get("/users/{id}") {
            val id = call.parameters["id"]?.toLong() ?: throw IllegalArgumentException("Invalid ID")
            val user = userService.getUserById(id)
            if (user != null) {
                call.respond(HttpStatusCode.OK, user)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }

        put("/users/{id}") {
            val id = call.parameters["id"]?.toLong() ?: throw IllegalArgumentException("Invalid ID")
            val user = call.receive<User>()
            userService.updateUser(id, user)
            call.respond(HttpStatusCode.OK)
        }

        delete("/users/{id}") {
            val id = call.parameters["id"]?.toLong() ?: throw IllegalArgumentException("Invalid ID")
            userService.deleteUserById(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}
