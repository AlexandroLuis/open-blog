#include "password_utils.h"
#include <bcrypt.h>  // Changed from <bcrypt/BCrypt.hpp>

namespace PasswordUtils {
    std::string hash_password(const std::string& password) {
        return bcrypt::generateHash(password);
    }

    bool verify_password(const std::string& password, const std::string& hash) {
        return bcrypt::validatePassword(password, hash);
    }
}