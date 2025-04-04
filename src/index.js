import { config as loadEnv } from "dotenv"
import  connectToDb from "./config/db.js"
import { app } from "./app.js"


// Load environment variables from .env file
loadEnv();

const PORT = process.env.PORT || 8000;


// Connect to the database
connectToDb()
.then(()=> {
  app.on("error", (err) => {
    console.error("Server error:", err);
    throw err;
  })

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("Database connection error:", err);
});
