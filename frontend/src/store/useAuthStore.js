import { create } from "zustand";
import instance from "../../lib/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  AuthUser: null,
  isSigningUp:false,
  isLoggingIn:false,
  isCheckingAuth: true,
  isUpdatingProfile:false,
  checkAuth: async () => {
    try {
      const res = await instance.get("/auth/check-auth");

      set({ AuthUser: res.data });
      // get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ AuthUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (userData) => {
    try {
      set({ isSigningUp: true });
      console.log("Signing up user with data:", userData);
      const res = await instance.post("/auth/register", userData);
      set({ AuthUser: res.data });
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
      set({ AuthUser: res.data });
      toast.success("Login successful!");
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
      set({ AuthUser: null });
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Error logging out:", error.message.toString());
      toast.error("Logout failed. Please try again.");
    }
  }
},
  updateProfile: async (updatedData) => {
    try {
      const res = await instance.put("/auth/update-profile", updatedData);
      set({ AuthUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message.toString());
      toast.error("Profile update failed. Please try again.");
    }
    finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
