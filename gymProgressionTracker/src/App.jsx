import { useState } from 'react'
import './App.css'

function App() {
  const [exercise, setExercise] = useState("");
  const [listOfExercises, setListOfExercises] = useState([]);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState(""); 
  const [calculatedReps, setCalculatedReps] = useState(0);

  const addExercise = (e) => {
    e.preventDefault();
    if(!exercise.trim() || !sets || !reps) {
      alert("Wypełnij wszystkie pola!");
      return;
    }
    const newExercise = {
      id: Date.now(),
      name: exercise,
      sets: sets,
      reps: reps
    };
    setListOfExercises([...listOfExercises, newExercise]);
    setExercise("");
    setSets("");
    setReps("");
    console.log("Wysłano formularz");
    console.log("Dodane ćwiczenie: ", newExercise.name);
    console.log("Dodane serie: ", newExercise.sets);
    console.log("Dodane powtórzenia: ", newExercise.reps);
    console.log("Dodane ćwiczenie: ", newExercise);
    console.log("Utworzona lista: ", listOfExercises);
  }
  const handleCalculateReps = () => {
    const totalReps = listOfExercises.reduce((total, exercise) => {
      return total + (exercise.sets * exercise.reps);
    }, 0);
    setCalculatedReps(totalReps);
  }
  return (
    <>
      <form onSubmit={addExercise}>
        <input type="text" placeholder='Dodaj swoje ćwiczenie' value={exercise} onChange={(e) => setExercise(e.target.value)}/>
        <input type="number" placeholder='ilość serii' value={sets} onChange={(e) => setSets(e.target.value)}/>
        <input type="number" placeholder='ilość powtórzeń' value={reps} onChange={(e) => setReps(e.target.value)}/>
        <button type="submit">Dodaj</button>
      </form>
      <div className="exerciseTable">
        <ul>
          {listOfExercises.map((exercise) => (
            <li key={exercise.id}>
              <span>{exercise.name} </span>
              <span>{exercise.sets}/</span><span>{exercise.reps}</span>
              <span>Ogólną ilość powtórzeń: </span><button onClick={handleCalculateReps}>Przelicz</button>
              <span>{calculatedReps}</span>

            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
