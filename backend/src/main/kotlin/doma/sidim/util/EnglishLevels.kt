package doma.sidim.util

enum class EnglishLevels(private val level: String) {
    BEGINNER("Beginner"),
    ELEMENTARY("Elementary"),
    PRE_INTERMEDIATE("Pre-Intermediate"),
    INTERMEDIATE("Intermediate"),
    UPPER_INTERMEDIATE("Upper-Intermediate"),
    ADVANCED("Advanced"),
    PROFICIENT("Proficient");

    override fun toString(): String {
        return level
    }
}
