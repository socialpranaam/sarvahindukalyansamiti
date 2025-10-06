import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from "multer";
import express from "express"
import path from 'path';

const router = Router();
const prisma = new PrismaClient();

/* ===================== NEWS ROUTES ===================== */

// GET all news
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // uploads folder project root me
    const uploadPath = path.join(process.cwd(), "uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve static files from uploads
router.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ================= GET NEWS =================

router.get("/news", async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { date: "desc" },
    });

    const formattedNews = news.map(item => ({
      ...item,
      img: item.image ? `${req.protocol}://${req.get('host')}${item.image}` : null
    }));

    res.json(formattedNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching news" });
  }
});

router.get("/news/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const newsItem = await prisma.news.findUnique({
      where: { id: parseInt(id) },
    });
    if (!newsItem) return res.status(404).json({ message: "News not found" });

    const formattedItem = {
      ...newsItem,
      img: newsItem.image ? `${req.protocol}://${req.get('host')}${newsItem.image}` : null
    };

    res.json(formattedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching news" });
  }
});

router.post("/news", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and Description are required" });
    }

    // Date ko optional rakhte hain
    let newsDate = null;
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        newsDate = parsedDate;
      }
    }

    const news = await prisma.news.create({
      data: {
        title,
        description,
        date: newsDate,
        image: imageUrl,
      },
    });

    console.log("✅ News saved:", news);
    res.status(201).json(news);
  } catch (err) {
    console.error("❌ Error creating news:", err);
    res.status(500).json({ error: err.message });
  }
});







/* ===================== DONATIONS ROUTES ===================== */

// POST donation
router.post("/donations", async (req, res) => {
  const { name, email, phone, amount, type, payment, status } = req.body;

  try {
    const donation = await prisma.donation.create({
      data: { name, email, phone, amount, type, payment, status: status || 'completed' }
    });
    res.status(201).json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET all donations
router.get("/donations", async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// ====================== CREATE PROJECT ======================
router.post("/projects", async (req, res) => {
  const { title, status, description, location, progress, budget, raised, expected, pm } = req.body;

  try {
    // Agar expected missing ho, default today set karein
    const expectedDate = new Date(req.body.expected);


    // Validate date
    if (isNaN(expectedDate.getTime())) {
      return res.status(400).json({ error: "Invalid expected date" });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        status,
        description,
        location,
        progress: progress ? parseInt(progress) : 0,
        budget: budget ? parseInt(budget) : 0,
        raised: raised ? parseInt(raised) : 0,  
        expected: expectedDate, 
        pm,
      },
    });

    res.status(201).json(newProject);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// ====================== GET ALL PROJECTS ======================
router.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});


// Events 



router.post("/events", async (req, res) => {
  const { tag, title, description, location, date, time, progress, attendees, pm } = req.body;

  // Required fields validation
  if (!tag || tag.trim() === "") return res.status(400).json({ error: "Tag is required" });
  if (!title || title.trim() === "") return res.status(400).json({ error: "Title is required" });
  if (!pm || pm.trim() === "") return res.status(400).json({ error: "Project Manager (pm) is required" });
  if (!time || time.trim() === "") return res.status(400).json({ error: "Time is required" });

  try {
    // Validate and parse date
    const eventDate = date ? new Date(date) : new Date();
    if (isNaN(eventDate.getTime())) return res.status(400).json({ error: "Invalid date" });

    // Convert time string to desired format (keeping it as string)
    const eventTime = time; // Example: "10:00 AM"

    // Create event in database
    const newEvent = await prisma.event.create({
      data: {
        tag,
        title,
        description: description || "",
        location: location || "",
        date: eventDate,
        time: eventTime,
        progress: parseInt(progress) || 0,
        attendees: parseInt(attendees) || 0,
        pm,
      },
    });

    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
});


router.get("/events", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc", // earliest first
      },
    });

    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});








export default router;