package doma.sidim.util

import at.favre.lib.crypto.bcrypt.BCrypt
import doma.sidim.model.Users
import doma.sidim.model.Vacancies
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

object PreparedData {
    fun insertInitialData() {
        transaction {
            if (Users.select { Users.email eq "petr@petrov.com" }.empty()) {
                Users.insert {
                    it[firstname] = "Petr"
                    it[lastname] = "Petrov"
                    it[age] = 55
                    it[email] = "petr@petrov.com"
                    it[password] = BCrypt.withDefaults().hashToString(12, "123".toCharArray())
                    it[role] = 1
                }
            }

            if (Users.select { Users.email eq "oleg@olegov.com" }.empty()) {
                Users.insert {
                    it[firstname] = "Oleg"
                    it[lastname] = "Olegov"
                    it[age] = 23
                    it[email] = "oleg@olegov.com"
                    it[password] = BCrypt.withDefaults().hashToString(12, "123".toCharArray())
                    it[role] = 0
                }
            }

            if (Vacancies.select { Vacancies.title eq "System Administrator" }.empty()) {
                Vacancies.insert {
                    it[title] = "System Administrator"
                    it[description] =
                        "Experienced System Administrator to manage and support IT infrastructure."
                    it[englishLevel] = 1
                    it[grade] = 2
                    it[tags] = "2,5,8,11"
                    it[isVisible] = true
                    it[creatorId] = 1
                }
            }

            if (Vacancies.select { Vacancies.title eq "Junior Developer" }.empty()) {
                Vacancies.insert {
                    it[title] = "Junior Developer"
                    it[description] =
                        "Looking for a Junior Developer with 1 year experience in Java."
                    it[englishLevel] = 1
                    it[grade] = 1
                    it[tags] = "1,2,5,7"
                    it[isVisible] = true
                    it[creatorId] = 1
                }
            }

            if (Vacancies.select { Vacancies.title eq "Senior Data Scientist" }.empty()) {
                Vacancies.insert {
                    it[title] = "Senior Data Scientist"
                    it[description] =
                        "Experienced Data Scientist needed for a leading tech company."
                    it[englishLevel] = 3
                    it[grade] = 5
                    it[tags] = "4,9,11,15"
                    it[isVisible] = true
                    it[creatorId] = 1
                }
            }

            if (Vacancies.select { Vacancies.title eq "Marketing Specialist" }.empty()) {
                Vacancies.insert {
                    it[title] = "Marketing Specialist"
                    it[description] =
                        "Seeking a Marketing Specialist with expertise in digital marketing."
                    it[englishLevel] = 2
                    it[grade] = 3
                    it[tags] = "10,14,16,18"
                    it[isVisible] = true
                    it[creatorId] = 1
                }
            }

            if (Vacancies.select { Vacancies.title eq "Project Manager" }.empty()) {
                Vacancies.insert {
                    it[title] = "Project Manager"
                    it[description] =
                        "Project Manager needed for overseeing software development projects."
                    it[englishLevel] = 2
                    it[grade] = 4
                    it[tags] = "3,6,9,12"
                    it[isVisible] = true
                    it[creatorId] = 1
                }
            }

            if (Vacancies.select { Vacancies.title eq "Graphic Designer" }.empty()) {
                Vacancies.insert {
                    it[title] = "Graphic Designer"
                    it[description] =
                        "Creative Graphic Designer with a strong portfolio in branding."
                    it[englishLevel] = 2
                    it[grade] = 3
                    it[tags] = "13,17,19,21"
                    it[isVisible] = true
                    it[creatorId] = 1
                }
            }
        }
    }
}
