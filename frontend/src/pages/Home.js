import { useEffect, useState } from "react";

// Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {

    const [workouts, setWorkouts] = useState(null)

    // Fetch workouts with UE Hook
    useEffect(() => {

        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')

            // Parse JSON from response
            const json = await response.json()

            // Check if response is ok
            if(response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()

    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                    // <p key={workout._id}> {workout.title}</p>
                    
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;