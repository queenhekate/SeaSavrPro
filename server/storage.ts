import { users, type User, type InsertUser, 
         type PollutionReport, pollutionReports } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Pollution report methods
  getAllPollutionReports(): Promise<PollutionReport[]>;
  getPollutionReport(id: number): Promise<PollutionReport | undefined>;
  createPollutionReport(report: Omit<PollutionReport, 'id' | 'createdAt'>): Promise<PollutionReport>;
  updatePollutionReport(id: number, data: Partial<PollutionReport>): Promise<PollutionReport | undefined>;
  deletePollutionReport(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private pollutionReports: Map<number, PollutionReport>;
  currentUserId: number;
  currentReportId: number;

  constructor() {
    this.users = new Map();
    this.pollutionReports = new Map();
    this.currentUserId = 1;
    this.currentReportId = 1;
  }

  // User methods
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
    return user;
  }

  // Pollution report methods
  async getAllPollutionReports(): Promise<PollutionReport[]> {
    return Array.from(this.pollutionReports.values());
  }

  async getPollutionReport(id: number): Promise<PollutionReport | undefined> {
    return this.pollutionReports.get(id);
  }

  async createPollutionReport(reportData: Omit<PollutionReport, 'id' | 'createdAt'>): Promise<PollutionReport> {
    const id = this.currentReportId++;
    const createdAt = new Date();
    
    const report: PollutionReport = {
      id,
      createdAt,
      ...reportData
    };
    
    this.pollutionReports.set(id, report);
    return report;
  }

  async updatePollutionReport(id: number, data: Partial<PollutionReport>): Promise<PollutionReport | undefined> {
    const existingReport = this.pollutionReports.get(id);
    
    if (!existingReport) {
      return undefined;
    }
    
    const updatedReport = {
      ...existingReport,
      ...data,
      id // Ensure ID doesn't change
    };
    
    this.pollutionReports.set(id, updatedReport);
    return updatedReport;
  }

  async deletePollutionReport(id: number): Promise<boolean> {
    return this.pollutionReports.delete(id);
  }
}

export const storage = new MemStorage();
