package doma.sidim.util

enum class Roles(private val displayName: String) {
    EMPLOYEE("Employee"),
    EMPLOYER("Employer");

    fun displayName(): String {
        return this.displayName
    }
}