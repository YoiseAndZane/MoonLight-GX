import { 
  users, type User, type InsertUser,
  quickAccessSites, type QuickAccessSite, type InsertQuickAccessSite,
  userSettings, type UserSettings, type InsertUserSettings,
  assistantMessages, type AssistantMessage, type InsertAssistantMessage
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // QuickAccessSite operations
  getQuickAccessSites(userId: number): Promise<QuickAccessSite[]>;
  createQuickAccessSite(site: InsertQuickAccessSite): Promise<QuickAccessSite>;
  updateQuickAccessSite(id: number, site: Partial<InsertQuickAccessSite>): Promise<QuickAccessSite | undefined>;
  deleteQuickAccessSite(id: number): Promise<boolean>;
  
  // UserSettings operations
  getUserSettings(userId: number): Promise<UserSettings | undefined>;
  createUserSettings(settings: InsertUserSettings): Promise<UserSettings>;
  updateUserSettings(userId: number, settings: Partial<InsertUserSettings>): Promise<UserSettings | undefined>;
  
  // AssistantMessage operations
  getAssistantMessages(userId: number): Promise<AssistantMessage[]>;
  createAssistantMessage(message: InsertAssistantMessage): Promise<AssistantMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quickAccessSites: Map<number, QuickAccessSite>;
  private userSettings: Map<number, UserSettings>;
  private assistantMessages: Map<number, AssistantMessage>;
  
  private currentUserId: number;
  private currentSiteId: number;
  private currentSettingsId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.quickAccessSites = new Map();
    this.userSettings = new Map();
    this.assistantMessages = new Map();
    
    this.currentUserId = 1;
    this.currentSiteId = 1;
    this.currentSettingsId = 1;
    this.currentMessageId = 1;
    
    // Add a demo user
    this.createUser({
      username: "demo",
      password: "password",
      name: "Demo User"
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    
    // Create default settings for new user
    this.createUserSettings({
      userId: id,
      proxyEnabled: false,
      audioEnabled: true,
      darkThemeEnabled: true,
      effectsEnabled: true
    });
    
    return user;
  }
  
  // QuickAccessSite operations
  async getQuickAccessSites(userId: number): Promise<QuickAccessSite[]> {
    return Array.from(this.quickAccessSites.values())
      .filter(site => site.userId === userId)
      .sort((a, b) => a.position - b.position);
  }
  
  async createQuickAccessSite(insertSite: InsertQuickAccessSite): Promise<QuickAccessSite> {
    const id = this.currentSiteId++;
    const site: QuickAccessSite = { ...insertSite, id };
    this.quickAccessSites.set(id, site);
    return site;
  }
  
  async updateQuickAccessSite(id: number, updates: Partial<InsertQuickAccessSite>): Promise<QuickAccessSite | undefined> {
    const site = this.quickAccessSites.get(id);
    if (!site) return undefined;
    
    const updatedSite = { ...site, ...updates };
    this.quickAccessSites.set(id, updatedSite);
    return updatedSite;
  }
  
  async deleteQuickAccessSite(id: number): Promise<boolean> {
    return this.quickAccessSites.delete(id);
  }
  
  // UserSettings operations
  async getUserSettings(userId: number): Promise<UserSettings | undefined> {
    return Array.from(this.userSettings.values()).find(
      settings => settings.userId === userId
    );
  }
  
  async createUserSettings(insertSettings: InsertUserSettings): Promise<UserSettings> {
    // Check if settings already exist for this user
    const existingSettings = await this.getUserSettings(insertSettings.userId);
    if (existingSettings) {
      return existingSettings;
    }
    
    const id = this.currentSettingsId++;
    const settings: UserSettings = { ...insertSettings, id };
    this.userSettings.set(id, settings);
    return settings;
  }
  
  async updateUserSettings(userId: number, updates: Partial<InsertUserSettings>): Promise<UserSettings | undefined> {
    const settings = Array.from(this.userSettings.values()).find(
      s => s.userId === userId
    );
    
    if (!settings) return undefined;
    
    const updatedSettings = { ...settings, ...updates };
    this.userSettings.set(settings.id, updatedSettings);
    return updatedSettings;
  }
  
  // AssistantMessage operations
  async getAssistantMessages(userId: number): Promise<AssistantMessage[]> {
    return Array.from(this.assistantMessages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }
  
  async createAssistantMessage(insertMessage: InsertAssistantMessage): Promise<AssistantMessage> {
    const id = this.currentMessageId++;
    const message: AssistantMessage = { ...insertMessage, id };
    this.assistantMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
