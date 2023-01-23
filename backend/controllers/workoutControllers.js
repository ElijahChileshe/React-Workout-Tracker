const Workout = require("../models/workoutSchema");
const mongoose = require("mongoose");
const { findOneAndUpdate } = require("../models/workoutSchema");

// GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// GET a single WO
const getSingleWorkout = async(req, res) =>{
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No Such Workout"})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        res.status(404).json({error: "No Workout Found"})
    }
    
    res.status(200).json(workout)
}



// CREATE a WO
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body 

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please Fill in all fields', emptyFields})
    }


    // ADD Doc to DB
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a wo
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No Such Workout"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout) {
        res.status(404).json({error: "No Workout Found"})
    }
    
    res.status(200).json(workout)
}

// UPDATE a wo
const updateWorkout = async (req, res) =>{
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No Such Workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })


    if(!workout) {
        res.status(404).json({error: "No Workout Found"})
    }
    
    res.status(200).json(workout)

}


module.exports = {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}