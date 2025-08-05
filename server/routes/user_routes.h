#pragma once
#include "crow.h"
#include "../controllers/user_controller.h"
#include "../middleware/auth_middleware.h"

void init_user_routes(crow::SimpleApp& app);