#pragma once
#include <string>
#include <vector>
#include <optional>

struct Post {
    int id;
    int author_id;
    std::string title;
    std::string slug;
    std::string content;
    std::string cover_image;
    std::vector<std::string> tags;
    bool is_published;
    int views;
};
