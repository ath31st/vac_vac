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
        url = "jdbc:sqlite:./vac_db.db",
        user = "root",
        driver = "org.sqlite.JDBC",
        password = ""
    )

    transaction(database) {
        SchemaUtils.create(Users, Vacancies, VacancyResponses)
        PreparedData.insertInitialData()
    }
}
