package doma.sidim.plugins

import doma.sidim.service.UserService
import io.ktor.server.application.*
import io.ktor.server.auth.*

fun Application.configureSecurity(userService: UserService) {
    authentication {
        basic(name = "auth") {
            realm = "Ktor Server"
            validate { credentials ->
                val user = userService.authenticate(credentials.name, credentials.password)
                if (user != null) {
                    UserIdPrincipal(user.email)
                } else {
                    null
                }
            }
        }
    }
}
