package doma.sidim.repository

import doma.sidim.model.Vacancies
import doma.sidim.model.Vacancy
import doma.sidim.util.EducationLevels
import doma.sidim.util.EnglishLevels
import doma.sidim.util.Tags
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.statements.UpdateBuilder
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update

class VacancyRepository : CrudRepository<Vacancy> {
    override fun create(item: Vacancy): Long {
        var id: Long = 0
        transaction {
            id = Vacancies.insert {
                fillVacancyFields(it, item)
            }[Vacancies.id]
        }
        return id
    }

    override fun read(id: Long): Vacancy? {
        return transaction {
            Vacancies.select { Vacancies.id eq id }
                .mapNotNull {
                    Vacancy(
                        id = it[Vacancies.id],
                        title = it[Vacancies.title],
                        description = it[Vacancies.description],
                        englishLevel = EnglishLevels.entries[it[Vacancies.englishLevel]],
                        grade = EducationLevels.entries[it[Vacancies.grade]],
                        tags = Tags.fromListIds(it[Vacancies.tags]),
                        isVisible = it[Vacancies.isVisible],
                        creatorId = it[Vacancies.creatorId],
                    )
                }.singleOrNull()
        }
    }

    override fun delete(id: Long): Boolean {
        return transaction {
            Vacancies.deleteWhere { Vacancies.id eq id } > 0
        }
    }

    override fun update(id: Long, item: Vacancy): Boolean {
        return transaction {
            Vacancies.update({ Vacancies.id eq id }) {
                fillVacancyFields(it, item)
            } > 0
        }
    }

    private fun fillVacancyFields(statement: UpdateBuilder<*>, item: Vacancy) {
        statement[Vacancies.title] = item.title
        statement[Vacancies.description] = item.description
        statement[Vacancies.englishLevel] = item.englishLevel.ordinal
        statement[Vacancies.grade] = item.grade.ordinal
        statement[Vacancies.tags] = item.tags.map { tag -> tag.ordinal }.joinToString(",")
        statement[Vacancies.isVisible] = item.isVisible
        statement[Vacancies.creatorId] = item.creatorId
    }
}