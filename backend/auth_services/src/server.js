import 'dotenv/config'
import express from "express";
import cors from "cors"
import db from "./db.js"; 
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.js'
import routes from './routes.js'



const app = express();
const PORT = process.env.AUTH_PORT || 5000;

app.use(express.json());

db.getConnection()
  .then(conn => {
    console.log("✅ MySQL Connected!");
    conn.release(); 
  })
  .catch(err => {
    console.error("❌ MySQL Connection Failed:", err);
  });

;
// app.get("/", (req, res) => {
//   res.send("🚀 Server is running successfully!");
// });

app.use(cors())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/', routes)
app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
