package doma.sidim.model

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class VacancyResponse(
    val id: Long? = null,
    val vacancyId: Long,
    val userId: Long,
)

object VacancyResponses : Table("vacancy_responses") {
    val id = long("vacancy_response_id").autoIncrement()
    val vacancyId = long("vacancy_id").references(Vacancies.id)
    val userId = long("user_id").references(Users.id)

    override val primaryKey = PrimaryKey(id)
}