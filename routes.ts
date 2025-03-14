import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertUserSettingsSchema, 
  insertQuickAccessSiteSchema,
  insertAssistantMessageSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // In a real app, you would create a session
      res.json({
        id: user.id,
        username: user.username,
        name: user.name
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/auth/register", async (req, res) => {
    try {
      const parsed = insertUserSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid user data", errors: parsed.error.format() });
      }
      
      const existingUser = await storage.getUserByUsername(parsed.data.username);
      
      if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
      }
      
      const user = await storage.createUser(parsed.data);
      
      res.status(201).json({
        id: user.id,
        username: user.username,
        name: user.name
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // User Settings routes
  app.get("/api/settings/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const settings = await storage.getUserSettings(userId);
      
      if (!settings) {
        return res.status(404).json({ message: "Settings not found" });
      }
      
      res.json(settings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/settings", async (req, res) => {
    try {
      const parsed = insertUserSettingsSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid settings data", errors: parsed.error.format() });
      }
      
      const settings = await storage.createUserSettings(parsed.data);
      
      res.status(201).json(settings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.patch("/api/settings/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const parsed = z.object({
        proxyEnabled: z.boolean().optional(),
        audioEnabled: z.boolean().optional(),
        darkThemeEnabled: z.boolean().optional(),
        effectsEnabled: z.boolean().optional(),
      }).safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid settings data", errors: parsed.error.format() });
      }
      
      const settings = await storage.updateUserSettings(userId, parsed.data);
      
      if (!settings) {
        return res.status(404).json({ message: "Settings not found" });
      }
      
      res.json(settings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Quick Access Sites routes
  app.get("/api/sites/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const sites = await storage.getQuickAccessSites(userId);
      
      res.json(sites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/sites", async (req, res) => {
    try {
      const parsed = insertQuickAccessSiteSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid site data", errors: parsed.error.format() });
      }
      
      const site = await storage.createQuickAccessSite(parsed.data);
      
      res.status(201).json(site);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.patch("/api/sites/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid site ID" });
      }
      
      const parsed = z.object({
        name: z.string().optional(),
        url: z.string().optional(),
        icon: z.string().optional(),
        position: z.number().optional(),
      }).safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid site data", errors: parsed.error.format() });
      }
      
      const site = await storage.updateQuickAccessSite(id, parsed.data);
      
      if (!site) {
        return res.status(404).json({ message: "Site not found" });
      }
      
      res.json(site);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.delete("/api/sites/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid site ID" });
      }
      
      const success = await storage.deleteQuickAccessSite(id);
      
      if (!success) {
        return res.status(404).json({ message: "Site not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Assistant Message routes
  app.get("/api/assistant/messages/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const messages = await storage.getAssistantMessages(userId);
      
      res.json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/assistant/message", async (req, res) => {
    try {
      const { message, userId } = req.body;
      
      if (!message || !userId) {
        return res.status(400).json({ message: "Message and userId are required" });
      }
      
      // Save user message
      const userMessage = await storage.createAssistantMessage({
        userId,
        content: message,
        sender: 'user',
        timestamp: Date.now()
      });
      
      // Simulate AI response
      setTimeout(async () => {
        await storage.createAssistantMessage({
          userId,
          content: getSimulatedResponse(message),
          sender: 'ai',
          timestamp: Date.now()
        });
      }, 1000);
      
      res.status(201).json({ success: true, message: userMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}

// Helper function for AI response simulation
function getSimulatedResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return `Hello there! How can I assist you today?`;
  }
  
  if (lowerMessage.includes('game') || lowerMessage.includes('games')) {
    return `I can recommend some great games based on your interests! Popular options include Minecraft, Fortnite, Among Us, and Roblox. What type of games do you enjoy?`;
  }
  
  if (lowerMessage.includes('productivity') || lowerMessage.includes('tools')) {
    return `Here are some excellent productivity tools:\n• Notion - All-in-one workspace\n• Todoist - Task management\n• Focus@Will - Productivity music\n• Forest - Stay focused, be present\n\nWould you like me to explain any of these in more detail?`;
  }
  
  if (lowerMessage.includes('youtube') || lowerMessage.includes('video')) {
    return `YouTube has many great channels for learning and entertainment. Some popular educational channels include Kurzgesagt, Vsauce, and TED-Ed. Would you like recommendations for specific topics?`;
  }
  
  return `That's an interesting question! I'm still learning, but I'm here to help with browsing, finding information, and answering questions. What else would you like to know?`;
}
