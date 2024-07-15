package doma.sidim.model

import doma.sidim.util.Roles
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class User(
    val id: Long? = null,
    val firstname: String,
    val lastname: String,
    val age: Int,
    val email: String,
    val password: String,
    val role: Roles
)

object Users : Table("users") {
    val id = long("user_id").autoIncrement()
    val email = varchar("email", 500)
    val firstname = varchar("first_name", 500)
    val lastname = varchar("last_name", 500)
    val age = integer("age")
    val password = varchar("password", 500)
    val role = integer("role")

    override val primaryKey = PrimaryKey(id)
}