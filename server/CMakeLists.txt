cmake_minimum_required(VERSION 3.12)
project(my_blog_backend)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Threads REQUIRED)
find_package(PkgConfig REQUIRED)
pkg_check_modules(PQXX REQUIRED libpqxx)

include(FetchContent)

FetchContent_Declare(
    crow
    GIT_REPOSITORY https://github.com/CrowCpp/Crow.git
    GIT_TAG v1.0+5  # Updated to newer version
)
FetchContent_MakeAvailable(crow)

FetchContent_Declare(
    jwt-cpp
    GIT_REPOSITORY https://github.com/Thalhammer/jwt-cpp.git
    GIT_TAG v0.7.0
)
FetchContent_MakeAvailable(jwt-cpp)

FetchContent_Declare(
    nlohmann_json
    GIT_REPOSITORY https://github.com/nlohmann/json.git
    GIT_TAG v3.11.3
)
FetchContent_MakeAvailable(nlohmann_json)

FetchContent_Declare(
    bcrypt
    GIT_REPOSITORY https://github.com/hilch/Bcrypt.cpp.git
    GIT_TAG master
)
FetchContent_MakeAvailable(bcrypt)

# Add your source files
add_executable(my_blog_backend
    main.cpp
    utils/jwt_utils.cpp
    utils/password_utils.cpp
    # Add other .cpp files here if you have them
)

target_include_directories(my_blog_backend PRIVATE
    ${PQXX_INCLUDE_DIRS}
    ${CMAKE_SOURCE_DIR}  # For your project headers
)

target_link_libraries(my_blog_backend PRIVATE
    ${PQXX_LIBRARIES}
    Crow::Crow          # FIXED: Changed from 'crow' to 'Crow::Crow'
    jwt-cpp::jwt-cpp    # FIXED: Added proper jwt-cpp target
    nlohmann_json::nlohmann_json  # Added nlohmann/json
    bcrypt              # Added bcrypt library
    Threads::Threads
)