package doma.sidim.model

import doma.sidim.util.EducationLevels
import doma.sidim.util.EnglishLevels
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class Vacancy(
    val id: Long? = null,
    val title: String,
    val description: String,
    val englishLevel: EnglishLevels,
    val grade: EducationLevels,
    val tags: List<String>
)

object Vacancies : Table("vacancies") {
    val id = long("vacancy_id").autoIncrement()
    val title = varchar("title", 255)
    val description = text("description")
    val englishLevel = integer("english_level")
    val grade = integer("grade")
    val tags = text("tags")

    override val primaryKey = PrimaryKey(id)
}