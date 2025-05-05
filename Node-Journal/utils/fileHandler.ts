import fs from "fs/promises";
import path from "path";
const logs = require("../data")
const entries = require("../data")

export interface JournalEntry {
    id: number;
    title: string;
    content: string;
    date: string;
}

const entriesPath = path.join(entries, "../data/entries.json");
const logsPath = path.join(logs, "../data/logs.txt");

export const readEntries = async (): Promise<JournalEntry[]> => {
    try {
        const data = await fs.readFile(entriesPath, "utf-8");
        return JSON.parse(data) as JournalEntry[];
    } catch (error) {
      
        throw error;
    }
};


export const writeEntries = async (entries: JournalEntry[]): Promise<void> => {
    try {
        await fs.writeFile(entriesPath, JSON.stringify(entries, null, 2), "utf-8");
    } catch (error) {
        throw error;
    }
};


export const appendLog = async (title: string, content: string): Promise<void> => {
    const log = `[${new Date().toString()}] ${title}: ${content}\n`;
    await fs.appendFile(logsPath, log, "utf-8");
};

// Read full logs.txt
export const readLogs = async (): Promise<string> => {
    try {
        return await fs.readFile(logsPath, "utf-8");
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") return "No logs found.";
        throw error;
    }
}