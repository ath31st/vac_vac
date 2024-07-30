package doma.sidim.repository

import doma.sidim.model.VacancyResponse
import doma.sidim.model.VacancyResponses
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update

class VacancyResponseRepository : CrudRepository<VacancyResponse> {
    override fun create(item: VacancyResponse): Long {
        var id: Long = 0
        transaction {
            id = VacancyResponses.insert {
                it[vacancyId] = item.vacancyId
                it[userId] = item.userId
            }[VacancyResponses.id]
        }
        return id
    }

    override fun read(id: Long): VacancyResponse? {
        return transaction {
            VacancyResponses.select { VacancyResponses.id eq id }
                .mapNotNull {
                    VacancyResponse(
                        id = it[VacancyResponses.id],
                        vacancyId = it[VacancyResponses.vacancyId],
                        userId = it[VacancyResponses.userId],
                    )
                }.singleOrNull()
        }
    }

    override fun delete(id: Long): Boolean {
        return transaction {
            VacancyResponses.deleteWhere { VacancyResponses.id eq id } > 0
        }
    }

    override fun update(id: Long, item: VacancyResponse): Boolean {
        return transaction {
            VacancyResponses.update({ VacancyResponses.id eq id }) {
                it[vacancyId] = item.vacancyId
                it[userId] = item.userId
            } > 0
        }
    }
}