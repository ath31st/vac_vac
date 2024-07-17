package doma.sidim.model

import org.jetbrains.exposed.sql.Table

object VacancyResponses : Table("vacancy_responses") {
    val id = long("vacancy_response_id").autoIncrement()
    val vacancyId = long("vacancy_id").references(Vacancies.id)
    val userId = long("user_id").references(Users.id)

    override val primaryKey = PrimaryKey(id)
}