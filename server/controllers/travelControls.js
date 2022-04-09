const Travel = require("../models/Travel-model");

// Method: Get
// Desc:   Get all travels books
const getAllTravels = async (req,res) => {
  try {
    const travels = await Travel.find();

    res.status(200).json({
      msg: "success",
      travels,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: Get
// Desc:   Get one travel book from id
const getTravelById = async (req,res) => {
  try {
    const travel = await Travel.findById(req.params.id);

    if (!travel) {
      return res.status(404).json({
        msg: "Not Found",
      });
    }

    return res.status(200).json({
      msg: "Success",
      travel,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: Post
// Desc:   Add new travel book
const addTravelBook = async (req,res) => {
  try {
    const { title, image, description } = req.body;

    const newTravel = await Travel.create({
      title,
      image,
      description,
    });

    res.status(201).json({
      msg: "Success",
      newTravel,
    });
  } catch (err) {
    res.send(err);
  }
};


// Method: Put
// Desc:   edit travel book by id
const updateTravelBook = async (req,res) => {
    try {
      const { title, image, description } = req.body;
  
      const updatedTravel = await Travel.findByIdAndUpdate(req.params.id,{
          title,
          image,
          description
      })
  
      res.status(200).json({
        msg: "Successfully updated!",
        updatedTravel,
      });
    } catch (err) {
      res.send(err);
    }
  };




// Method: DELETE
// Desc:   Removing travel book by id
const removeTravelBook = async (req,res) => {
    try {
      await Travel.findByIdAndRemove(req.params.id)
  
      res.status(200).json({
        msg: "Deleted"
      });
    } catch (err) {
      res.send(err);
    }
  };

module.exports = { 
    getAllTravels, 
    getTravelById, 
    addTravelBook,
    updateTravelBook,
    removeTravelBook
};
