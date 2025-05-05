import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { readEntries, writeEntries } from "../utils/fileHandler";

const router = Router();

const entriesPath = path.join(__dirname, "../data/entries.json");
const logsPath = path.join(__dirname, "../data/logs.txt");

interface JournalEntry {
   
    title: string;
    content: string;
    [key: string]: any;
}

router.get("/", (_req: Request, res: Response) => {
    res.send("Welcome to the Personal Journal API");
});


router.get("/entries", (_req: Request, res: Response) => {
    try {
        const data = fs.readFileSync(entriesPath, "utf-8");
        const entries: JournalEntry[] = JSON.parse(data);
        res.json(entries);

        if (!entries) {
            res.send("No entries")
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to load journal entries" });
    }
});


router.post("/entries", (req: Request, res: Response) => {
    const newEntry: JournalEntry = req.body;
    console.log(req.body)


    try {
        const data = fs.readFileSync(entriesPath, "utf-8");
        const entries: JournalEntry[] = JSON.parse(data);

        newEntry.id = Date.now();
        entries.push(newEntry);

        fs.writeFileSync(entriesPath, JSON.stringify(entries, null, 2));

        const log = `[${new Date().toString()}] New Entry: ${JSON.stringify(newEntry)}\n`;
        fs.appendFileSync(logsPath, log);


        res.status(201).json(newEntry);
    } catch (error) {
        console.error("Add entry error:", error); // <-- log actual error
        res.status(500).json({ error: "Failed to add entry" });
    }
});


router.delete("/entries/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
    }

    try {
        const data = fs.readFileSync(entriesPath, "utf-8");
        let entries: JournalEntry[] = JSON.parse(data);

        const filtered = entries.filter(entry => entry.id !== id);

        if (entries.length === filtered.length) {
            res.status(404).json({ error: "Entry not found" });
            return;
        }

        fs.writeFileSync(entriesPath, JSON.stringify(filtered, null, 2));
        res.json({ message: `Entry ${id} deleted successfully` });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Failed to delete entry" });
    }
});


export default router;
