package doma.sidim.service

import doma.sidim.dto.TagDto
import doma.sidim.dto.VacancyCreationDto
import doma.sidim.dto.VacancyDto
import doma.sidim.model.Vacancy
import doma.sidim.repository.VacancyRepository
import doma.sidim.util.EducationLevels
import doma.sidim.util.EnglishLevels
import doma.sidim.util.Tags

class VacancyService(private val vacancyRepository: VacancyRepository) {
    fun createVacancy(dto: VacancyCreationDto, creatorId: Long): Long {
        val vacancy = Vacancy(
            title = dto.title,
            description = dto.description,
            englishLevel = EnglishLevels.entries[dto.englishLevel],
            grade = EducationLevels.entries[dto.grade],
            tags = Tags.fromSetIds(dto.tags),
            isVisible = true,
            creatorId = creatorId,
        )
        return vacancyRepository.create(vacancy)
    }

    fun getVacancy(id: Long): Vacancy? {
        return vacancyRepository.read(id)
    }

    fun updateVacancy(id: Long, vacancy: Vacancy): Boolean {
        return vacancyRepository.update(id, vacancy)
    }

    fun getAllActiveVacancies(): List<VacancyDto> {
        return vacancyRepository.getActiveVacancies().map {
            VacancyDto(
                it.id,
                it.title,
                it.description,
                it.grade.toString(),
                it.englishLevel.toString(),
                it.tags.map { tag -> TagDto(tag.ordinal, tag.toString()) },
                it.isVisible,
                it.creatorId,
            )
        }
    }
}