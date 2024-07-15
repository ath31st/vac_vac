package doma.sidim.repository

interface CrudRepository<T> {
    fun create(item: T): Long
    fun read(id: Long): T?
    fun update(id: Long, item: T): Boolean
    fun delete(id: Long): Boolean
}
