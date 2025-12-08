import { create } from "zustand";
import instance from "../lib/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp:false,
  isLoggingIn:false,
  isCheckingAuth: true,
  isUpdatingProfile:false,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await instance.get("/auth/check-auth");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (userData) => {
    try {
      set({ isSigningUp: true });
      const res = await instance.post("/auth/register", userData);
      set({ authUser: res.data });
      toast.success("Signup successful!");

    } catch (error) {
      console.error("Error signing up:", error.message.toString());
    }finally {
      set({ isSigningUp: false });
    }
  },
  login: async (credentials) => {
    try {
      const res = await instance.post("/auth/login", credentials);
      set({ authUser: res.data });
      toast.success("Login successful!");
      get().connectSocket();
    } catch (error) {
      console.error("Error logging in:", error.message.toString());
      toast.error("Login failed. Please try again.");
    }
    finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => { {
    try {
      await instance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successful!");
      get().disconnectSocket();
    } catch (error) {
      console.error("Error logging out:", error.message.toString());
      toast.error("Logout failed. Please try again.");
    }
  }
},
  updateProfile: async (updatedData) => {
    try {
      const res = await instance.put("/auth/update-profile", updatedData);
      set({ authUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message.toString());
      toast.error("Profile update failed. Please try again.");
    }
    finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io("http://localhost:5000", {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  }
}));
