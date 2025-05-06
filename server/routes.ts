import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { pollutionReportSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Endpoint to get all reports
  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await storage.getAllPollutionReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reports" });
    }
  });

  // Endpoint to get a specific report
  app.get("/api/reports/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid report ID" });
      }
      
      const report = await storage.getPollutionReport(id);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch report" });
    }
  });

  // Endpoint to create a new pollution report
  app.post("/api/reports", async (req, res) => {
    try {
      // Validate the request body against the schema
      const validatedData = pollutionReportSchema.parse(req.body);
      
      // Create the report in storage
      const newReport = await storage.createPollutionReport(validatedData);
      
      res.status(201).json(newReport);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid report data", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Failed to create report" });
    }
  });

  // Endpoint to update a report
  app.patch("/api/reports/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid report ID" });
      }
      
      // Partial validation for the update data
      const partialSchema = pollutionReportSchema.partial();
      const validatedData = partialSchema.parse(req.body);
      
      const updatedReport = await storage.updatePollutionReport(id, validatedData);
      if (!updatedReport) {
        return res.status(404).json({ message: "Report not found" });
      }
      
      res.json(updatedReport);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid report data", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Failed to update report" });
    }
  });

  // Endpoint to delete a report
  app.delete("/api/reports/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid report ID" });
      }
      
      const success = await storage.deletePollutionReport(id);
      if (!success) {
        return res.status(404).json({ message: "Report not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete report" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
