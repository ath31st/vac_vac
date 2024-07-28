package doma.sidim.dto

import kotlinx.serialization.Serializable

@Serializable
data class VacancyCreationDto(
    val title: String,
    val description: String,
    val englishLevel: Int,
    val grade: Int,
    val tags: Set<Int>,
)