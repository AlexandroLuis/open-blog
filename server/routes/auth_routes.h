#pragma once
#include "crow.h"
#include "../controllers/auth_controller.h"

void init_auth_routes(crow::SimpleApp& app) {
    CROW_ROUTE(app, "/register").methods("POST"_method)(register_user);
    CROW_ROUTE(app, "/login").methods("POST"_method)(login_user);
}