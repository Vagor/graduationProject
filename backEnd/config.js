var config = {
    "db_host": "127.0.0.1",
    "db_port": "27017",
    "db_user": "",
    "db_pass": "",
    "db_name": "GraduationProjectDB",
}

module.exports = config;

// 删除原数据库，并从指定地址恢复数据库
// ./mongorestore -h 127.0.0.1:27017 -d GraduationProjectDB /Users/Vagor/GitHub/graduationProject/GraduationProjectDB