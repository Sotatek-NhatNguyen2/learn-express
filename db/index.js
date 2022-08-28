const mongoose = require("mongoose");

class db {
    async connect() {
        try {
            await mongoose.connect("mongodb://localhost:27017/courses");
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new db();
