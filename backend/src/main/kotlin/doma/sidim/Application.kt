package doma.sidim

import doma.sidim.plugins.*
import doma.sidim.repository.UserRepository
import doma.sidim.repository.VacancyRepository
import doma.sidim.repository.VacancyResponseRepository
import doma.sidim.service.UserService
import doma.sidim.service.VacancyService
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(Netty, port = 8018, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    val userService = UserService(UserRepository())
    val vacancyService = VacancyService(VacancyRepository(), VacancyResponseRepository())

    configureDatabases()
    configureSecurity(userService)
    configureHTTP()
    configureMonitoring()
    configureSerialization()
    configureRouting(userService, vacancyService)
}
