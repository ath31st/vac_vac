package doma.sidim.dto

import kotlinx.serialization.Serializable

@Serializable
data class VacancyCreationDto(
    val title: String,
    val description: String,
    val englishLevelId: Int,
    val gradeId: Int,
    val tags: Set<Int>,
)