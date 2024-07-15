package doma.sidim.dto

import kotlinx.serialization.Serializable

@Serializable
data class UserRegisterDto(
    val firstname: String,
    val lastname: String,
    val age: Int,
    val email: String,
    val password: String,
    val role: Int
)
