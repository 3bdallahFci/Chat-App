import User from "../models/users.js";
import Message from "../models/message.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId,io } from "../lib/socket.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedUserId } }).select("-password"
    );
    res.status(200).json(filteredUsers);
    } catch (error) {
    console.error("Error fetching user for sidebar:", error);
    res.status(500).json({ message: "Server error" });
    }
};


export const getMessages = async (req, res) => {
  try {
    const { id:userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId }
        ]
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  }
    catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id:receiverId } = req.params;
    const senderId = req.user._id;
    console.log("Receiver ID:", receiverId);
    console.log("Sender ID:", senderId);
    const { text,image } = req.body;
    let imageUrl;
    if(image){
        const uploadResult = await cloudinary.uploader.upload(image);
        imageUrl = uploadResult.secure_url;
    }
    const newMessage = new Message({
        senderId: senderId,
        receiverId: receiverId,
        text: text,
        image: imageUrl
    });
    await newMessage.save();

    //TODO Emit socket event for real-time update (if using sockets)
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }  

    res.status(201).json(newMessage);
  }
catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
};