package doma.sidim.repository

interface CrudRepository<T> {
    fun create(item: T): Int
    fun read(id: Int): T?
    fun update(id: Int, item: T): Boolean
    fun delete(id: Int): Boolean
}
