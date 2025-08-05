#pragma once
#include <crow.h>
#include "../utils/jwt_utils.h" // Use correct relative path if needed

struct AuthMiddleware {
    struct context {
        int user_id = -1;
        bool is_admin = false;
        bool authenticated = false;
    };

    // This method runs before each route
    void before_handle(crow::request& req, crow::response& res, context& ctx) {
        // Allow public endpoints
        if (req.url == "/login" || req.url == "/register") {
            return;
        }

        auto auth_header = req.get_header_value("Authorization");
        if (auth_header.empty() || auth_header.find("Bearer ") != 0) {
            res.code = 401;
            res.write(R"({"error":"Missing or invalid Authorization header"})");
            res.end();
            return;
        }

        std::string token = auth_header.substr(7);
        if (!JwtUtils::verify_token(token, ctx.user_id, ctx.is_admin)) {
            res.code = 401;
            res.write(R"({"error":"Invalid or expired token"})");
            res.end();
            return;
        }

        ctx.authenticated = true;
    }

    // This method runs after the route
    void after_handle(crow::request&, crow::response&, context&) {
        // No-op
    }
};
