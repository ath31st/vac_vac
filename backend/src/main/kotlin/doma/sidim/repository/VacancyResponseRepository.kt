package doma.sidim.repository

import doma.sidim.model.VacancyResponse
import doma.sidim.model.VacancyResponses
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

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
            VacancyResponses.selectAll().where { VacancyResponses.id eq id }
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

    fun vacancyResponseExists(vacancyId: Long, userId: Long): Boolean {
        return transaction {
            VacancyResponses.selectAll().where {
                VacancyResponses.vacancyId eq vacancyId and
                        VacancyResponses.userId.eq(userId)
            }.any()
        }
    }

    fun deleteByVacancyAndUserId(vacancyId: Long, userId: Long): Boolean {
        return transaction {
            VacancyResponses.deleteWhere {
                VacancyResponses.vacancyId.eq(vacancyId) and VacancyResponses.userId.eq(userId)
            } > 0
        }
    }

    fun getResponseStatuses(vacancyIds: List<Long>, userId: Long): Map<Long, Boolean> {
        return transaction {
            VacancyResponses.selectAll().where {
                (VacancyResponses.vacancyId inList vacancyIds) and
                        (VacancyResponses.userId eq userId)
            }.associate { it[VacancyResponses.vacancyId] to true }
        }
    }

    fun getResponseCounts(vacancyIds: List<Long>): Map<Long, Long> {
        return transaction {
            VacancyResponses.slice(VacancyResponses.vacancyId, VacancyResponses.vacancyId.count())
                .selectAll().where { VacancyResponses.vacancyId inList vacancyIds }
                .groupBy(VacancyResponses.vacancyId)
                .associate { it[VacancyResponses.vacancyId] to it[VacancyResponses.vacancyId.count()] }
        }
    }
}