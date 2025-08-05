#pragma once
#include "crow.h"
#include "../controllers/post_controller.h"
#include "../middleware/auth_middleware.h"

void init_post_routes(crow::SimpleApp& app);