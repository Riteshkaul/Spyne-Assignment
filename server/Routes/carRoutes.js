const express = require("express");
const authMiddleWare = require("../middleware/authMiddleWare");

const {
  createCarDetails,
  getAllCars,
  getCarsById,
  updateCarDetails,
  deleteById,
} = require("../controllers/carController");
const upload = require("../config/multer");

const router = express.Router();

router.post("/", authMiddleWare, upload.array("images", 10), createCarDetails);
router.get("/", authMiddleWare, getAllCars);
router.get("/:id", authMiddleWare, getCarsById);
router.put(
  "/:id",
  upload.array("images", 10),
  authMiddleWare,
  updateCarDetails
);
router.delete("/:id", authMiddleWare, deleteById);
module.exports = router;
