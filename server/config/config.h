#pragma once
#include <string>

namespace config {
    constexpr const char* DB_CONN = "host=localhost port=5432 dbname=my_blog user=postgres password=postgres";
    constexpr const char* JWT_SECRET = "your_jwt_secret_key_here";
    constexpr int JWT_EXPIRATION_HOURS = 24;
    constexpr const char* S3_ENDPOINT = "https://s3.example.com";
    constexpr const char* S3_ACCESS_KEY = "your_access_key";
    constexpr const char* S3_SECRET_KEY = "your_secret_key";
    constexpr const char* S3_BUCKET_NAME = "your_bucket_name";
}
