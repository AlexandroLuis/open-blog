#include <regex>

namespace Validation {
    bool is_valid_email(const std::string& email) {
        const std::regex pattern(R"((\w+)(\.|_)?(\w*)@(\w+)(\.(\w+))+)");
        return std::regex_match(email, pattern);
    }

    bool is_strong_password(const std::string& password) {
        return password.length() >= 8;
    }
}