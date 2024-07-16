package doma.sidim.repository

import doma.sidim.model.User
import doma.sidim.model.Users
import doma.sidim.util.Roles
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update

class UserRepository : CrudRepository<User> {
    override fun create(item: User): Long {
        var id: Long = 0
        transaction {
            id = Users.insert {
                it[firstname] = item.firstname
                it[lastname] = item.lastname
                it[age] = item.age
                it[email] = item.email
                it[password] = item.password
                it[role] = item.role.ordinal
            }[Users.id]
        }
        return id
    }

    override fun read(id: Long): User? {
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

    override fun update(id: Long, item: User): Boolean {
        return transaction {
            Users.update({ Users.id eq id }) {
                it[firstname] = item.firstname
                it[lastname] = item.lastname
                it[age] = item.age
                it[email] = item.email
                it[password] = item.password
                it[role] = item.role.ordinal
            } > 0
        }
    }

    override fun delete(id: Long): Boolean {
        return transaction {
            Users.deleteWhere { Users.id eq id } > 0
        }
    }

    fun findByEmail(email: String): User? {
        return transaction {
            Users.select { Users.email.eq(email) }
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
}
