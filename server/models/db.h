#pragma once
#include <pqxx/pqxx>
#include <mutex>
#include "../config/config.h" // Add this!

namespace DB {
    inline std::mutex mtx;

    inline pqxx::connection& get_connection() {
        static pqxx::connection conn(config::DB_CONN);
        return conn;
    }

    // Thread-safe transaction getter
    inline pqxx::work get_transaction() {
        std::lock_guard<std::mutex> lock(mtx);
        return pqxx::work(get_connection());
    }
}
