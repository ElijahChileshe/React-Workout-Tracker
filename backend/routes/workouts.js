const express = require("express");
const {createWorkout, getWorkouts, getSingleWorkout, deleteWorkout, updateWorkout} = require("../controllers/workoutControllers")

const router = express.Router()


// GET all workouts
router.get("/data", getWorkouts)

// GET a single workout
router.get("/:id", getSingleWorkout)

// POST a new workout
router.post("/", createWorkout)

// DELETE a workout
router.delete("/:id", deleteWorkout)

// UPDATE a workout
router.patch("/:id", updateWorkout)



module.exports = router