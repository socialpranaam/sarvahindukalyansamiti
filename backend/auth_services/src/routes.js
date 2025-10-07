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


// #########################  Add a new member ###############################


router.post("/members", async (req, res) => {
  try {
    const { name, email, phone, address, membership, status, role } = req.body;

    const newMember = await prisma.member.create({
      data: { name, email, phone, address, membership, status, role },
    });

    res.status(201).json({ message: "Member added successfully", newMember });
  } catch (error) {
    console.error("Error creating member:", error);
    res.status(500).json({ error: "Failed to create member" });
  }
});

// 📋 Get all members
router.get("/members", async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

//  Get a single member by ID
router.get("/members:id", async (req, res) => {
  try {
    const { id } = req.params;
    const member = await prisma.member.findUnique({
      where: { id: Number(id) },
    });

    if (!member) return res.status(404).json({ error: "Member not found" });

    res.json(member);
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ error: "Failed to fetch member" });
  }
});

//  Update member by ID
router.put("/members/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, membership, status, role } = req.body;

    const updatedMember = await prisma.member.update({
      where: { id: Number(id) },
      data: { name, email, phone, address, membership, status, role },
    });

    res.json({ message: "Member updated successfully", updatedMember });
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ error: "Failed to update member" });
  }
});

//  Delete member by ID
router.delete("/members/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.member.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ error: "Failed to delete member" });
  }
});

  // ################  CREATE: New Puja Booking   #########################

router.post("/pujabookings", async (req, res) => {
  try {
    const { puja, client, date, time, location, phone, amount, status } = req.body;
    const newBooking = await prisma.pujaBooking.create({
      data: {
        puja,
        client,
        date: new Date(date),
        time,
        location,
        phone,
        amount: parseFloat(amount),
        status: status || "pending",
      },
    });
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Puja Booking" });
  }
});

// READ: Get all bookings
router.get("/pujabookings", async (req, res) => {
  try {
    const bookings = await prisma.pujaBooking.findMany();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching Puja Bookings" });
  }
});

// READ: Get a booking by ID
router.get("/pujabookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await prisma.pujaBooking.findUnique({
      where: { id: parseInt(id) },
    });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching Puja Booking" });
  }
});


// DELETE: Delete a booking
router.delete("/pujabookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.pujaBooking.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting Puja Booking" });
  }
});





export default router;