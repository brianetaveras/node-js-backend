const db = require("../data/config");

class Messages {
  async getAll() {
   
    const messages = await db("messages")
      .join("users", "messages.uid", "=", "users.uid")
      .select("users.uid", "messages.uid", "users.name", "messages.message");
    return messages;
  }

  async addMessage(data) {
    const newMessage = await db("messages").insert({
      uid: data.uid,
      message: data.message
    });
    return newMessage;
  }
}

module.exports = new Messages();
