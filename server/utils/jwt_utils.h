#pragma once
#include <string>

namespace JwtUtils {
    std::string generate_token(int user_id, bool is_admin);
    bool verify_token(const std::string& token, int& user_id, bool& is_admin);
}
