const mongoose = require("mongoose");
const config = require("config");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || config.get("connectionString"),
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Database launched");
  } catch (error) {
    console.log(`dbConnect - ${error.message}`);
  }
};

module.exports = dbConnect;
