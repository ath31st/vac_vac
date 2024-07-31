package doma.sidim.repository

import doma.sidim.model.Vacancies
import doma.sidim.model.Vacancy
import doma.sidim.model.VacancyResponses
import doma.sidim.util.EducationLevels
import doma.sidim.util.EnglishLevels
import doma.sidim.util.Tags
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.statements.UpdateBuilder
import org.jetbrains.exposed.sql.transactions.transaction

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
                .mapNotNull { it.toVacancy() }
                .singleOrNull()
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

    fun getActiveVacancies(): List<Vacancy> {
        return transaction {
            Vacancies.select { Vacancies.isVisible eq true }
                .map { it.toVacancy() }
        }
    }

    fun getVacanciesByCreator(creatorId: Long): List<Vacancy> {
        return transaction {
            Vacancies.select { Vacancies.creatorId eq creatorId }
                .mapNotNull { it.toVacancy() }
        }
    }

    fun getVacanciesByUserResponses(userId: Long): List<Vacancy> {
        return transaction {
            (Vacancies innerJoin VacancyResponses)
                .select { VacancyResponses.userId eq userId }
                .map { it.toVacancy() }
        }
    }

    fun updateVisibleVacancy(vacancyId: Long, isVisible: Boolean): Boolean {
        return transaction {
            Vacancies.update({ Vacancies.id eq vacancyId }) {
                it[Vacancies.isVisible] = isVisible
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

    private fun ResultRow.toVacancy(): Vacancy {
        return Vacancy(
            id = this[Vacancies.id],
            title = this[Vacancies.title],
            description = this[Vacancies.description],
            englishLevel = EnglishLevels.entries[this[Vacancies.englishLevel]],
            grade = EducationLevels.entries[this[Vacancies.grade]],
            tags = Tags.fromListIds(this[Vacancies.tags]),
            isVisible = this[Vacancies.isVisible],
            creatorId = this[Vacancies.creatorId],
        )
    }
}
