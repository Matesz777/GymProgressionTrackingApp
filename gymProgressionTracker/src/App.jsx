import { useState } from 'react'
import './App.css'

function App() {
  const [exercise, setExercise] = useState("");
  const [listOfExercises, setListOfExercises] = useState([]);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState(""); 
  const [calculatedReps, setCalculatedReps] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addExercise = (e) => {
    e.preventDefault();
    if(!exercise.trim() || !sets || !reps) {
      alert("Wypełnij wszystkie pola!");
      return;
    }
    const exerciseId = Date.now();
    const newSet = [];
    for (let i = 1; i <= Number(sets); i++){
      newSet.push({
        id: `${exerciseId}-${i}`,
        groupId: exerciseId,
        name: exercise,
        setNumber: i,
        reps: Number(reps)
      })
    }
    setListOfExercises([...listOfExercises, ...newSet]);
    setExercise("");
    setSets("");
    setReps("");
  }

  const totalSumOfReps = () => {
    const totalRps = listOfExercises.reduce((sum, ex) => sum + ex.reps, 0);
    setCalculatedReps(totalRps);
  }
  const updateReps = (id, newReps) => {
    setListOfExercises(listOfExercises.map(set => 
      set.id === id ? { ...set, reps: Number(newReps) } : set
    ));
  };

  return (
    <div className={isDarkMode ? "app-container dark-mode" : "app-container"}>
      <header>
        <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "☀️Jasny" : "🌙Ciemny"}
        </button>
      </header>

      <form onSubmit={addExercise}>
        <input type="text" placeholder='Dodaj swoje ćwiczenie' value={exercise} onChange={(e) => setExercise(e.target.value)}/>
        <input type="number" placeholder='ilość serii' value={sets} onChange={(e) => setSets(e.target.value)}/>
        <input type="number" placeholder='ilość powtórzeń' value={reps} onChange={(e) => setReps(e.target.value)}/>
        <button type="submit">Dodaj</button>
      </form>

      <div className="exerciseTable"> 
        {listOfExercises.map((ex) => (
          <div key={ex.id} className="exercisecard">
            {ex.setNumber === 1 && <h3>{ex.name}</h3>}
            <ul>
              <li>Seria: {ex.setNumber}</li>
              <li>Powtórzenia: <input type="number" value={ex.reps} onChange={(e) => updateReps(ex.id, e.target.value)}/></li>
            </ul>
          </div>
        ))}
        <div className="summary-bar">
          <span>Suma wszystkich powtórzeń: {calculatedReps}</span>
          <button onClick={totalSumOfReps}>Przelicz</button>
        </div>
      </div>
    </div>
  )
}

export default App;