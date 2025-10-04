import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/* ===================== NEWS ROUTES ===================== */

// GET all news
router.get("/news", async (req, res) => {
  try {
    const newsList = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST news
router.post("/news", async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const news = await prisma.news.create({
      data: { title, description, date: date ? new Date(date) : undefined }
    });
    res.status(201).json(news);
  } catch (err) {
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

/* ===================== CREATE a project ===================== */

// ====================== CREATE PROJECT ======================
router.post("/projects", async (req, res) => {
  const { title, status, description, location, progress, budget, raised, expected, pm } = req.body;

  try {
    // Agar expected missing ho, default today set karein
    let expectedDate = expected ? new Date(expected) : new Date();

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
        progress,
        budget,
        raised,
        expected: expectedDate, // always valid date
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

export default router;