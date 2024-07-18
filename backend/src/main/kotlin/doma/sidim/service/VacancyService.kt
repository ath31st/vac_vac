package doma.sidim.service

import doma.sidim.dto.VacancyCreationDto
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
            englishLevel = EnglishLevels.entries[dto.englishLevelId],
            grade = EducationLevels.entries[dto.gradeId],
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

    fun getAllActiveVacancies(): List<Vacancy> {
        return vacancyRepository.getActiveVacancies()
    }
}