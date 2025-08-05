#include <crow.h>
#include "middleware/auth_middleware.h"
#include "routes/api.h"

int main() {
    crow::App<AuthMiddleware> app;

    setup_routes(app);

    app.port(8080).multithreaded().run();
}
