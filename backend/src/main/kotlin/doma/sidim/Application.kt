package doma.sidim

import doma.sidim.plugins.*
import doma.sidim.repository.UserRepository
import doma.sidim.service.UserService
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(Netty, port = 8018, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    val userService = UserService(UserRepository())

    configureDatabases()
    configureSecurity(userService)
    configureHTTP()
    configureMonitoring()
    configureSerialization()
    configureRouting(userService)
}
