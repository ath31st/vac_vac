package doma.sidim.repository

import doma.sidim.model.User
import doma.sidim.model.Users
import doma.sidim.util.Roles
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

class UserRepository {
    fun create(user: User): Long {
        var id: Long = 0
        transaction {
            id = Users.insert {
                it[firstname] = user.firstname
                it[lastname] = user.lastname
                it[age] = user.age
                it[email] = user.email
                it[password] = user.password
                it[role] = user.role.ordinal
            }[Users.id]
        }
        return id
    }

    fun read(id: Long): User? {
        return transaction {
            Users.select { Users.id eq id }
                .mapNotNull {
                    User(
                        id = it[Users.id],
                        firstname = it[Users.firstname],
                        lastname = it[Users.lastname],
                        age = it[Users.age],
                        email = it[Users.email],
                        password = it[Users.password],
                        role = Roles.entries[it[Users.role]]
                    )
                }.singleOrNull()
        }
    }

    fun update(id: Long, user: User): Boolean {
        return transaction {
            Users.update({ Users.id eq id }) {
                it[firstname] = user.firstname
                it[lastname] = user.lastname
                it[age] = user.age
                it[email] = user.email
                it[password] = user.password
                it[role] = user.role.ordinal
            } > 0
        }
    }

    fun delete(id: Long): Boolean {
        return transaction {
            Users.deleteWhere { Users.id eq id } > 0
        }
    }
}
