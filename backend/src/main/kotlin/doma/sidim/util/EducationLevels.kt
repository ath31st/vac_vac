package doma.sidim.util

enum class EducationLevels(private val level: String) {
    PRIMARY("Primary"),
    SECONDARY("Secondary"),
    HIGH_SCHOOL("High School"),
    ASSOCIATE_DEGREE("Associate Degree"),
    BACHELORS_DEGREE("Bachelor's Degree"),
    MASTERS_DEGREE("Master's Degree"),
    DOCTORATE("Doctorate"),
    OTHER("Other");

    override fun toString(): String {
        return level
    }

    fun fromString(level: String): EducationLevels? {
        return entries.find { it.level.equals(level, ignoreCase = true) }
    }
}
