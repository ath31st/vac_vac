package doma.sidim.service

import at.favre.lib.crypto.bcrypt.BCrypt
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
            password = BCrypt.withDefaults().hashToString(12, userDto.password.toCharArray()),
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

    fun authenticate(email: String, password: String): User? {
        val user = userRepository.findByEmail(email) ?: return null
        val result = BCrypt.verifyer().verify(password.toCharArray(), user.password)
        return if (result.verified) user else null
    }
}