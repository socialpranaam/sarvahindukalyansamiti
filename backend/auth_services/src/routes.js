import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from "multer";
import express from "express"
import path from 'path';
import fs from "fs";

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


router.put("/news/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;

    // Fetch existing news
    const existingNews = await prisma.news.findUnique({ where: { id: parseInt(id) } });
    if (!existingNews) return res.status(404).json({ error: "News not found" });

    // Handle image update
    let imageUrl = existingNews.image;
    if (req.file) {
      // Delete old image if exists
      if (existingNews.image) {
        const oldImagePath = path.join(__dirname, "..", existingNews.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      imageUrl = `/uploads/${req.file.filename}`;
    }

    let newsDate = existingNews.date;
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) newsDate = parsedDate;
    }

    const updatedNews = await prisma.news.update({
      where: { id: parseInt(id) },
      data: { title, description, date: newsDate, image: imageUrl },
    });

    res.status(200).json(updatedNews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- DELETE NEWS --------------------
router.delete("/news/:id", async (req, res) => {
  try {
    const newsId = parseInt(req.params.id);
    if (isNaN(newsId)) return res.status(400).json({ error: "Invalid news ID" });

    const existingNews = await prisma.news.findUnique({ where: { id: newsId } });
    if (!existingNews) return res.status(404).json({ error: "News not found" });

    // Delete image if exists
    if (existingNews.image) {
      const imagePath = path.join(process.cwd(), "uploads", path.basename(existingNews.image));
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await prisma.news.delete({ where: { id: newsId } });

    res.status(200).json({ message: "News deleted successfully" });
  } catch (err) {
    console.error("DELETE news error:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
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

//  Get all members
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

router.put("/pujabookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, payment } = req.body;

    const existingBooking = await prisma.pujaBooking.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingBooking) return res.status(404).json({ error: "Booking not found" });

    const updatedBooking = await prisma.pujaBooking.update({
      where: { id: parseInt(id) },
      data: {
        status: status || existingBooking.status,
        payment: payment || existingBooking.payment,
      },
    });

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Failed to update Puja Booking" });
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


//  Create Contact 
router.post("/contacts", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = await prisma.contact.create({
      data: { name, email, phone, subject, message },
    });

    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Get All Contacts 
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Get Single Contact by ID 
router.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// ================== Routes ================== //

// 1️⃣ Get all feedbacks
router.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await prisma.feedBack.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Add full image URL
    const formattedFeedbacks = feedbacks.map((f) => ({
      ...f,
      image: f.image ? `${req.protocol}://${req.get("host")}${f.image}` : null,
    }));

    res.json(formattedFeedbacks);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ error: err.message });
  }
});

// 2️⃣ Get single feedback by ID
router.get("/feedbacks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await prisma.feedBack.findUnique({
      where: { id: parseInt(id) },
    });
    if (!feedback)
      return res.status(404).json({ error: "Feedback not found" });

    const formattedFeedback = {
      ...feedback,
      image: feedback.image
        ? `${req.protocol}://${req.get("host")}${feedback.image}`
        : null,
    };

    res.json(formattedFeedback);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ error: err.message });
  }
});

// 3️⃣ Create new feedback
router.post("/feedbacks", upload.single("image"), async (req, res) => {
  const { name, message } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newFeedback = await prisma.feedBack.create({
      data: { name, message, image },
    });

    res.status(201).json({
      ...newFeedback,
      image: image ? `${req.protocol}://${req.get("host")}${image}` : null,
    });
  } catch (err) {
    console.error("Error creating feedback:", err);
    res.status(500).json({ error: err.message });
  }
});

// 4️⃣ Update feedback
router.put("/feedbacks/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, message } = req.body;

  try {
    const existingFeedback = await prisma.feedBack.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingFeedback)
      return res.status(404).json({ error: "Feedback not found" });

    let image = existingFeedback.image;

    // If new image uploaded
    if (req.file) {
      // delete old image
      if (existingFeedback.image) {
        const oldPath = path.join(
          process.cwd(),
          existingFeedback.image.replace("/uploads/", "uploads/")
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image = `/uploads/${req.file.filename}`;
    }

    const updatedFeedback = await prisma.feedBack.update({
      where: { id: parseInt(id) },
      data: { name, message, image },
    });

    res.json({
      ...updatedFeedback,
      image: image ? `${req.protocol}://${req.get("host")}${image}` : null,
    });
  } catch (err) {
    console.error("Error updating feedback:", err);
    res.status(500).json({ error: err.message });
  }
});

// 5️⃣ Delete feedback
router.delete("/feedbacks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const existingFeedback = await prisma.feedBack.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingFeedback)
      return res.status(404).json({ error: "Feedback not found" });

    // Delete image file if exists
    if (existingFeedback.image) {
      const imagePath = path.join(
        process.cwd(),
        existingFeedback.image.replace("/uploads/", "uploads/")
      );
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await prisma.feedBack.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Feedback deleted successfully" });
  } catch (err) {
    console.error("Error deleting feedback:", err);
    res.status(500).json({ error: err.message });
  }
});







export default router;