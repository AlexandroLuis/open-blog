#pragma once
#include <crow.h>
#include <pqxx/pqxx>
#include "models/db.h"
#include <nlohmann/json.hpp>

using json = nlohmann::json;

inline void get_profile(const crow::request& req, crow::response& res, int user_id) {
    try {
        pqxx::work txn(DB::get_connection());
        auto result = txn.exec_params(
            "SELECT id, username, email, bio, avatar_url, is_admin, created_at, updated_at FROM users WHERE id = $1",
            user_id);

        if (result.size() != 1) {
            res.code = 404;
            res.write(R"({"error":"User not found"})");
            res.end();
            return;
        }

        auto row = result[0];
        json response = {
            {"id", row["id"].as<int>()},
            {"username", row["username"].c_str()},
            {"email", row["email"].c_str()},
            {"bio", row["bio"].is_null() ? "" : row["bio"].c_str()},
            {"avatar_url", row["avatar_url"].is_null() ? "" : row["avatar_url"].c_str()},
            {"is_admin", row["is_admin"].as<bool>()},
            {"created_at", row["created_at"].c_str()},
            {"updated_at", row["updated_at"].c_str()}
        };

        res.code = 200;
        res.write(response.dump());
        res.end();

    } catch (const std::exception& e) {
        res.code = 500;
        res.write(R"({"error":"Internal server error"})");
        res.end();
    }
}

inline void update_profile(const crow::request& req, crow::response& res, int user_id) {
    try {
        auto body = json::parse(req.body);

        std::string bio = body.value("bio", "");
        std::string avatar_url = body.value("avatar_url", "");

        pqxx::work txn(DB::get_connection());

        txn.exec_params(
            "UPDATE users SET bio = $1, avatar_url = $2, updated_at = NOW() WHERE id = $3",
            bio, avatar_url, user_id);

        txn.commit();

        res.code = 200;
        res.write(R"({"message":"Profile updated successfully"})");
        res.end();

    } catch (const std::exception& e) {
        res.code = 400;
        res.write(R"({"error":"Invalid request or ")"+std::string(e.what())+R"("})");
        res.end();
    }
}
