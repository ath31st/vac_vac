package doma.sidim.dto

import kotlinx.serialization.Serializable

@Serializable
data class VacancyDto(
    val id: Long? = null,
    val title: String,
    val description: String,
    val englishLevel: String,
    val grade: String,
    val tags: List<TagDto>,
    val isVisible: Boolean,
    val creatorId: Long,
)