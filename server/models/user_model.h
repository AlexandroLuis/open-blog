#pragma once
#include <string>
#include <optional>
#include <pqxx/pqxx>

struct User {
    int id;
    std::string username;
    std::string email;
    std::string password_hash;
    bool is_admin;
};

std::optional<User> find_user_by_email(const std::string& email);
std::optional<User> find_user_by_id(int id);