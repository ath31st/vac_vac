package doma.sidim.plugins

import doma.sidim.model.Users
import doma.sidim.model.Vacancies
import doma.sidim.model.VacancyResponses
import doma.sidim.util.PreparedData
import io.ktor.server.application.*
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.configureDatabases() {
    val database = Database.connect(
        url = "jdbc:h2:mem:vac_db;DB_CLOSE_DELAY=-1",
        user = "root",
        driver = "org.h2.Driver",
        password = ""
    )

    transaction(database) {
        SchemaUtils.create(Users, Vacancies, VacancyResponses)
        PreparedData.insertInitialData()
    }
}
