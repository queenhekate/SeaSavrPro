import { users, type User, type InsertUser, 
         type PollutionReport, pollutionReports, type InsertPollutionReport } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
  currentUserId: number;

  constructor() {
    this.users = new Map();
    this.currentUserId = 1;
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

  // Pollution report methods - using PostgreSQL database
  async getAllPollutionReports(): Promise<PollutionReport[]> {
    const reports = await db.select().from(pollutionReports);
    return reports;
  }

  async getPollutionReport(id: number): Promise<PollutionReport | undefined> {
    const [report] = await db.select().from(pollutionReports).where(eq(pollutionReports.id, id));
    return report || undefined;
  }

  async createPollutionReport(reportData: Omit<PollutionReport, 'id' | 'createdAt'>): Promise<PollutionReport> {
    const insertData: InsertPollutionReport = {
      ...reportData,
    };
    
    const [report] = await db.insert(pollutionReports)
      .values(insertData)
      .returning();
    
    return report;
  }

  async updatePollutionReport(id: number, data: Partial<PollutionReport>): Promise<PollutionReport | undefined> {
    const [updatedReport] = await db.update(pollutionReports)
      .set(data)
      .where(eq(pollutionReports.id, id))
      .returning();
    
    return updatedReport || undefined;
  }

  async deletePollutionReport(id: number): Promise<boolean> {
    const [deletedReport] = await db.delete(pollutionReports)
      .where(eq(pollutionReports.id, id))
      .returning();
    
    return !!deletedReport;
  }
}

export const storage = new MemStorage();
