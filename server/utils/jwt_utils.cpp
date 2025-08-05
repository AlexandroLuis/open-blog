#include "jwt_utils.h"
#include <jwt-cpp/jwt.h>
#include "../config/config.h"
#include <chrono>
#include <string>

namespace JwtUtils {
    std::string generate_token(int user_id, bool is_admin) {
        auto token = jwt::create()
            .set_issuer("my_blog_backend")
            .set_type("JWS")
            .set_issued_at(std::chrono::system_clock::now())
            .set_expires_at(std::chrono::system_clock::now() + std::chrono::hours(config::JWT_EXPIRATION_HOURS))
            .set_payload_claim("user_id", jwt::claim(std::to_string(user_id)))
            .set_payload_claim("is_admin", jwt::claim(std::string(is_admin ? "true" : "false")))
            .sign(jwt::algorithm::hs256{config::JWT_SECRET});
        
        return token;
    }

    bool verify_token(const std::string& token, int& user_id, bool& is_admin) {
        try {
            auto decoded = jwt::decode(token);
            auto verifier = jwt::verify()
                .allow_algorithm(jwt::algorithm::hs256{config::JWT_SECRET})
                .with_issuer("my_blog_backend");
            
            verifier.verify(decoded);
            
            user_id = std::stoi(decoded.get_payload_claim("user_id").as_string());
            is_admin = (decoded.get_payload_claim("is_admin").as_string() == "true");
            
            return true;
        } catch (...) {
            return false;
        }
    }
}