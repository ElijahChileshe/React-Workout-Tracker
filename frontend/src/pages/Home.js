import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

// Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {

    // const [workouts, setWorkouts] = useState(null)
    const {workouts, dispatch} = useWorkoutsContext()

    // Fetch workouts with UE Hook
    useEffect(() => {

        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')

            // Parse JSON from response
            const json = await response.json()

            // Check if response is ok
            if(response.ok) {
                // setWorkouts(json)
                dispatch({type: "SET_WORKOUTS", payload: json})
            }
        }

        fetchWorkouts()

    }, [dispatch])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workouts) => (
                    <WorkoutDetails key={workouts._id} workout={workouts} />
                    // <p key={workout._id}> {workout.title}</p>
                    
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;