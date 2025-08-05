#pragma once
#include <crow.h>
#include "../middleware/auth_middleware.h"
#include "../controllers/auth_controller.h"
#include "../controllers/user_controller.h"
#include "../controllers/post_controller.h"

inline void setup_routes(crow::App<AuthMiddleware>& app) {
    CROW_ROUTE(app, "/register").methods(crow::HTTPMethod::POST)(register_user);
    CROW_ROUTE(app, "/login").methods(crow::HTTPMethod::POST)(login_user);
    
    CROW_ROUTE(app, "/profile").methods(crow::HTTPMethod::GET, crow::HTTPMethod::PUT)
    ([&app](const crow::request& req, crow::response& res) {
        auto& ctx = app.get_context<AuthMiddleware>(req);  // FIXED: Changed from AuthMiddleware::context
        if (req.method == crow::HTTPMethod::GET) {
            get_profile(req, res, ctx.user_id);
        } else if (req.method == crow::HTTPMethod::PUT) {
            update_profile(req, res, ctx.user_id);
        }
    });
    
    CROW_ROUTE(app, "/posts").methods(crow::HTTPMethod::POST)
    ([&app](const crow::request& req, crow::response& res) {
        auto& ctx = app.get_context<AuthMiddleware>(req);  // This one was already correct
        create_post(req, res, ctx.user_id);
    });
    
    CROW_ROUTE(app, "/posts/<int>").methods(crow::HTTPMethod::GET, crow::HTTPMethod::PUT, crow::HTTPMethod::DELETE)
    ([&app](const crow::request& req, crow::response& res, int post_id) {
        auto& ctx = app.get_context<AuthMiddleware>(req);  // FIXED: Changed from AuthMiddleware::context
        if (req.method == crow::HTTPMethod::GET) {
            get_post(req, res, post_id, ctx.user_id, ctx.is_admin);
        } else if (req.method == crow::HTTPMethod::PUT) {
            update_post(req, res, post_id, ctx.user_id, ctx.is_admin);
        } else if (req.method == crow::HTTPMethod::DELETE) {
            delete_post(req, res, post_id, ctx.user_id, ctx.is_admin);
        }
    });
}