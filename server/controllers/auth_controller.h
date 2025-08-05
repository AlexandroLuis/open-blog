#pragma once
#include <crow.h>
#include <pqxx/pqxx>
#include "utils/password_utils.h"
#include "utils/jwt_utils.h"
#include "models/db.h"
#include <nlohmann/json.hpp>

using json = nlohmann::json;

inline void register_user(const crow::request& req, crow::response& res) {
    try {
        auto body = json::parse(req.body);
        std::string username = body.at("username");
        std::string email = body.at("email");
        std::string password = body.at("password");

        if (username.empty() || email.empty() || password.empty()) {
            res.code = 400;
            res.write(R"({"error":"Missing required fields"})");
            res.end();
            return;
        }

        std::string password_hash = PasswordUtils::hash_password(password);

        pqxx::work txn(DB::get_connection());

        auto check = txn.exec_params("SELECT COUNT(*) FROM users WHERE email = $1 OR username = $2", email, username);
        if (check[0][0].as<int>() > 0) {
            res.code = 409;
            res.write(R"({"error":"Email or username already exists"})");
            res.end();
            return;
        }

        txn.exec_params(
            "INSERT INTO users (username, email, password_hash, is_admin, created_at, updated_at) VALUES ($1, $2, $3, false, NOW(), NOW())",
            username, email, password_hash);
        txn.commit();

        res.code = 201;
        res.write(R"({"message":"User registered successfully"})");
        res.end();

    } catch (const std::exception& e) {
        res.code = 400;
        res.write(R"({"error":"Invalid request or ")"+std::string(e.what())+R"("})");
        res.end();
    }
}

inline void login_user(const crow::request& req, crow::response& res) {
    try {
        auto body = json::parse(req.body);
        std::string email = body.at("email");
        std::string password = body.at("password");

        if (email.empty() || password.empty()) {
            res.code = 400;
            res.write(R"({"error":"Missing email or password"})");
            res.end();
            return;
        }

        pqxx::work txn(DB::get_connection());
        auto result = txn.exec_params("SELECT id, password_hash, is_admin FROM users WHERE email = $1", email);
        if (result.size() != 1) {
            res.code = 401;
            res.write(R"({"error":"Invalid email or password"})");
            res.end();
            return;
        }

        int id = result[0]["id"].as<int>();
        std::string hash = result[0]["password_hash"].as<std::string>();
        bool is_admin = result[0]["is_admin"].as<bool>();

        if (!PasswordUtils::verify_password(password, hash)) {
            res.code = 401;
            res.write(R"({"error":"Invalid email or password"})");
            res.end();
            return;
        }

        std::string token = JwtUtils::generate_token(id, is_admin);

        json response = { {"token", token} };
        res.code = 200;
        res.write(response.dump());
        res.end();

    } catch (const std::exception& e) {
        res.code = 400;
        res.write(R"({"error":"Invalid request or ")"+std::string(e.what())+R"("})");
        res.end();
    }
}
