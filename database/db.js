const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connection = null;
  }

  async connect(dbURI) {
    if (this.connection) {
      console.log('Already connected to the database.');
      return this.connection;
    }

    try {
      this.connection = await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
      return this.connection;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  disconnect() {
    if (!this.connection) {
      console.log('No active connection to disconnect.');
      return;
    }

    mongoose.connection.close(() => {
      console.log('Disconnected from MongoDB');
      this.connection = null;
    });
  }
}

module.exports = new Database();
