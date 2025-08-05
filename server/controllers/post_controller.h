#pragma once
#include <crow.h>
#include <pqxx/pqxx>
#include "models/db.h"
#include <nlohmann/json.hpp>

using json = nlohmann::json;

inline void create_post(const crow::request& req, crow::response& res, int user_id) {
    try {
        auto body = json::parse(req.body);

        std::string title = body.at("title");
        std::string content = body.at("content");
        bool is_public = body.value("is_public", true);

        if (title.empty() || content.empty()) {
            res.code = 400;
            res.write(R"({"error":"Title and content are required"})");
            res.end();
            return;
        }

        pqxx::work txn(DB::get_connection());

        txn.exec_params(
            "INSERT INTO posts (user_id, title, content, is_public, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW())",
            user_id, title, content, is_public);

        txn.commit();

        res.code = 201;
        res.write(R"({"message":"Post created successfully"})");
        res.end();

    } catch (const std::exception& e) {
        res.code = 400;
        res.write(R"({"error":"Invalid request or ")"+std::string(e.what())+R"("})");
        res.end();
    }
}

inline void get_post(const crow::request& req, crow::response& res, int post_id, int user_id, bool is_admin) {
    try {
        pqxx::work txn(DB::get_connection());
        auto result = txn.exec_params("SELECT * FROM posts WHERE id = $1", post_id);

        if (result.size() != 1) {
            res.code = 404;
            res.write(R"({"error":"Post not found"})");
            res.end();
            return;
        }

        auto row = result[0];

        // Check visibility
        bool is_public = row["is_public"].as<bool>();
        int post_user_id = row["user_id"].as<int>();

        if (!is_public && post_user_id != user_id && !is_admin) {
            res.code = 403;
            res.write(R"({"error":"Access denied"})");
            res.end();
            return;
        }

        json response = {
            {"id", row["id"].as<int>()},
            {"user_id", post_user_id},
            {"title", row["title"].c_str()},
            {"content", row["content"].c_str()},
            {"is_public", is_public},
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

inline void update_post(const crow::request& req, crow::response& res, int post_id, int user_id, bool is_admin) {
    try {
        auto body = json::parse(req.body);

        std::string title = body.value("title", "");
        std::string content = body.value("content", "");
        bool is_public = body.value("is_public", true);

        pqxx::work txn(DB::get_connection());

        auto result = txn.exec_params("SELECT user_id FROM posts WHERE id = $1", post_id);
        if (result.size() != 1) {
            res.code = 404;
            res.write(R"({"error":"Post not found"})");
            res.end();
            return;
        }

        int owner_id = result[0]["user_id"].as<int>();
        if (owner_id != user_id && !is_admin) {
            res.code = 403;
            res.write(R"({"error":"Access denied"})");
            res.end();
            return;
        }

        txn.exec_params(
            "UPDATE posts SET title = $1, content = $2, is_public = $3, updated_at = NOW() WHERE id = $4",
            title, content, is_public, post_id);

        txn.commit();

        res.code = 200;
        res.write(R"({"message":"Post updated successfully"})");
        res.end();

    } catch (const std::exception& e) {
        res.code = 400;
        res.write(R"({"error":"Invalid request or ")"+std::string(e.what())+R"("})");
        res.end();
    }
}

inline void delete_post(const crow::request& req, crow::response& res, int post_id, int user_id, bool is_admin) {
    try {
        pqxx::work txn(DB::get_connection());

        auto result = txn.exec_params("SELECT user_id FROM posts WHERE id = $1", post_id);
        if (result.size() != 1) {
            res.code = 404;
            res.write(R"({"error":"Post not found"})");
            res.end();
            return;
        }

        int owner_id = result[0]["user_id"].as<int>();
        if (owner_id != user_id && !is_admin) {
            res.code = 403;
            res.write(R"({"error":"Access denied"})");
            res.end();
            return;
        }

        txn.exec_params("DELETE FROM posts WHERE id = $1", post_id);
        txn.commit();

        res.code = 200;
        res.write(R"({"message":"Post deleted successfully"})");
        res.end();

    } catch (const std::exception& e) {
        res.code = 500;
        res.write(R"({"error":"Internal server error"})");
        res.end();
    }
}
