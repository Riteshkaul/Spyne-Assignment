const Car = require("../model/Car");
const cloudinary = require("cloudinary").v2;
const createCarDetails = async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files.map((file) => file.path);

  try {
    const car = new Car({
      userId: req.user.userId,
      title,
      description,
      images,
      tags: tags.split(","),
    });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllCars = async (req, res) => {
  const keyword = req.query.keyword || "";
  const regex = new RegExp(keyword, "i");
  const cars = await Car.find({
    userId: req.user.userId,
  });
  res.json({ cars });
};

const getCarsById = async (req, res) => {
  const car = await Car.findOne({
    _id: req.params.id,
    userId: req.user.userId,
  });
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.json(car);
};

const updateCarDetails = async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files ? req.files.map((file) => file.path) : [];
  try {
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title, description, tags: tags.split(","), images },
      { new: true }
    );
    res.json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const car = await Car.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Delete images from Cloudinary
    const deletePromises = car.images.map((imageUrl) => {
      // Assuming the format of image URL is https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/your-folder/public_id.jpg
      const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
      console.log(publicId);
      return cloudinary.uploader.destroy(publicId);
    });

    // Await all deletion promises
    await Promise.all(deletePromises);

    // Delete the car document from the database
    await Car.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

    res.json({ message: "Car and images deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createCarDetails,
  getAllCars,
  getCarsById,
  updateCarDetails,
  deleteById,
};
