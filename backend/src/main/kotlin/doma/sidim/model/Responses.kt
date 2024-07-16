package doma.sidim.model

import org.jetbrains.exposed.sql.Table

object Responses : Table("responses") {
    val id = long("response_id").autoIncrement()
    val vacancyId = long("vacancy_id").references(Vacancies.id)
    val userId = long("user_id").references(Users.id)

    override val primaryKey = PrimaryKey(id)
}