package doma.sidim.util

enum class Tags(private val displayName: String) {
    FULL_TIME("Full-Time"),
    PART_TIME("Part-Time"),
    REMOTE("Remote"),
    INTERNSHIP("Internship"),
    FREELANCE("Freelance"),
    CONTRACT("Contract"),
    TEMPORARY("Temporary"),
    ENTRY_LEVEL("Entry Level"),
    MID_LEVEL("Mid Level"),
    SENIOR_LEVEL("Senior Level"),
    TECH("Tech"),
    MARKETING("Marketing"),
    SALES("Sales"),
    DESIGN("Design"),
    MANAGEMENT("Management"),
    FINANCE("Finance"),
    HUMAN_RESOURCES("Human Resources"),
    CUSTOMER_SERVICE("Customer Service"),
    EDUCATION("Education"),
    HEALTHCARE("Healthcare"),
    ENGINEERING("Engineering"),
    MANUFACTURING("Manufacturing"),
    LOGISTICS("Logistics");

    override fun toString(): String {
        return displayName
    }

    companion object {
        fun fromDisplayName(displayName: String): Tags? {
            return entries.find { it.displayName == displayName }
        }

        fun fromSetIds(setIds: Set<Int>): List<Tags> {
            return setIds.mapNotNull {
                try {
                    entries.getOrNull(it)
                } catch (e: NumberFormatException) {
                    null
                }
            }
        }

        fun fromListIds(stringIds: String): List<Tags> {
            return stringIds.split(",")
                .mapNotNull {
                    try {
                        val index = it.trim().toInt()
                        entries.getOrNull(index)
                    } catch (e: NumberFormatException) {
                        null
                    }
                }
        }
    }
}
