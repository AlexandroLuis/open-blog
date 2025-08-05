#pragma once
#include <string>

namespace PasswordUtils {
    std::string hash_password(const std::string& password);
    bool verify_password(const std::string& password, const std::string& hash);
}
