package doma.sidim.service

import doma.sidim.dto.UserRegisterDto
import doma.sidim.model.User
import doma.sidim.repository.UserRepository
import doma.sidim.util.Roles

class UserService(private val userRepository: UserRepository) {
    fun createUser(userDto: UserRegisterDto): Long {
        val user = User(
            firstname = userDto.firstname,
            lastname = userDto.lastname,
            age = userDto.age,
            email = userDto.email,
            password = userDto.password,
            role = Roles.entries[userDto.role]
        )
        return userRepository.create(user)
    }

    fun getUserById(id: Long): User? {
        return userRepository.read(id)
    }

    fun updateUser(userId: Long, user: User): Boolean {
        return userRepository.update(userId, user)
    }

    fun deleteUserById(id: Long): Boolean {
        return userRepository.delete(id)
    }
}