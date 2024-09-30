import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { UserContext } from '../Context/Context';
import { Header } from './Header';

export const Plan = () => {

  const workoutData = {
    "workouts": {
      "chest": [
        "Bench Press",
        "Incline Bench Press",
        "Decline Bench Press",
        "Chest Fly",
        "Push-Ups",
        "Chest Dips",
        "Cable Crossovers"
      ],
      "back": [
        "Pull-Ups",
        "Lat Pulldowns",
        "Deadlift",
        "Bent-Over Row",
        "T-Bar Row",
        "Single-Arm Dumbbell Row",
        "Seated Cable Row"
      ],
      "shoulders": [
        "Overhead Press",
        "Arnold Press",
        "Lateral Raise",
        "Front Raise",
        "Face Pull",
        "Reverse Pec Deck Fly",
        "Shrugs"
      ],
      "biceps": [
        "Barbell Curl",
        "Dumbbell Curl",
        "Hammer Curl",
        "Preacher Curl",
        "Concentration Curl",
        "Cable Curl",
        "Chin-Ups"
      ],
      "triceps": [
        "Tricep Dips",
        "Tricep Pushdown",
        "Skull Crushers",
        "Overhead Tricep Extension",
        "Close-Grip Bench Press",
        "Diamond Push-Ups",
        "Kickbacks"
      ],
      "legs": [
        "Squats",
        "Leg Press",
        "Lunges",
        "Leg Extensions",
        "Hamstring Curls",
        "Romanian Deadlift",
        "Calf Raises"
      ],
      "abs": [
        "Crunches",
        "Leg Raises",
        "Plank",
        "Bicycle Crunches",
        "Russian Twists",
        "Mountain Climbers",
        "Hanging Leg Raise"
      ],
      "glutes": [
        "Hip Thrust",
        "Glute Bridge",
        "Sumo Deadlift",
        "Bulgarian Split Squat",
        "Step-Ups",
        "Cable Kickbacks",
        "Donkey Kicks"
      ]
    }
  }

  const userState = useContext(UserContext);
  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY MM DD"));
  const [exerciseData, setExerciseData] = useState({});
  const [selectedOption, setSelectedOption] = useState([]);
  const [note, setNote] = useState('');

  // Function to format the date
  const formatDate = (date) => {
    return dayjs(date).format('D MMMM YYYY');
  };

  // Function to select the exercise
  const handleSelect = (e) => {
    const newSelection = e.target.value;
    if (newSelection && !selectedOption.includes(newSelection)) {
      setSelectedOption((prevOption) => [...prevOption, newSelection]);
    }
  };

  // Function to save date in local storage
  const handleDateChange = async (e) => {
    const newDate = e.target.value;
    setCurrentDate(newDate);
    localStorage.setItem('date', newDate);

    try {
      const response = await fetch('https://track-it-backend-crimsonravens-projects.vercel.app/get', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: userState.email,
          date: newDate,
          token: userState.token,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result.data.data.exercise);

        setExerciseData(result.data.data.exercise || {});
        setNote(result.data.data.note || '');

        // Update selectedOption based on fetched exerciseData
        setSelectedOption(Object.keys(result.data.data.exercise || {}));
      } else {
        console.log('Error:', response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to save notes in local storage
  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
    localStorage.setItem('note', newNote);
  };

  // Function to handle the removal of an exercise
  const handleRemove = (exercise) => {
    const updatedOption = selectedOption.filter(item => item !== exercise);
    setSelectedOption(updatedOption);

    const updatedExerciseData = { ...exerciseData };
    delete updatedExerciseData[exercise];
    setExerciseData(updatedExerciseData);
  };

  const handleInputChange = (exercise, setIndex, field, value) => {
    const updatedExerciseData = { ...exerciseData };
    if (!updatedExerciseData[exercise]) {
      updatedExerciseData[exercise] = {};
    }
    if (!updatedExerciseData[exercise][setIndex]) {
      updatedExerciseData[exercise][setIndex] = {};
    }
    updatedExerciseData[exercise][setIndex][field] = value;
    setExerciseData(updatedExerciseData);
  };

  const handleAddSet = (exercise) => {
    const setCount = Object.keys(exerciseData[exercise] || {}).length;
    handleInputChange(exercise, setCount, 'weight', '');
    handleInputChange(exercise, setCount, 'reps', '');
  };

  // Function to remove a specific set
  const handleRemoveSet = (exercise, setIndex) => {
    const updatedExerciseData = { ...exerciseData };
    delete updatedExerciseData[exercise][setIndex];
    // Re-index the sets
    updatedExerciseData[exercise] = Object.values(updatedExerciseData[exercise]);
    setExerciseData(updatedExerciseData);
  };

  // Function to save data at backend
  const saveData = async () => {
    try {
      if (!userState.token || !userState.email) {
        alert("User is not logged in")
        return
      }

      console.log("Saving is started");
      const sendingData = {
        "token": userState.token,
        "email": userState.email,
        "date": currentDate,
        "data": {
          "workout": selectedOption,
          "note": note,
          "exercise": exerciseData,
        }
      };
      const response = await fetch("https://track-it-backend-crimsonravens-projects.vercel.app/save", {
        method: "POST",
        headers: {
          'Content-type': "application/json"
        },
        body: JSON.stringify(sendingData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Load the saved note from localStorage when the component mounts
  useEffect(() => {
    setCurrentDate(currentDate)
    const savedNote = localStorage.getItem('note');
    const savedDate = localStorage.getItem('date');
    if (savedNote) {
      setNote(savedNote);
    }
    if (savedDate) {
      setCurrentDate(savedDate);
    }
  }, []);

  return (
    <div>
      <Header />

      <div>
        <div>
          <div className='flex justify-between'>
            {/* Date input */}
            <div className='p-4'>
              <input
                className='border border-slate-300 p-4 w-full rounded-xl'
                type="date"
                value={currentDate}
                onChange={handleDateChange}
              />
            </div>
            {/* Save button */}
            <div className='p-4'>
              <button className='p-4 w-full rounded-xl transition-colors text-slate-200 bg-slate-950 hover:text-slate-950 hover:bg-slate-200' onClick={saveData}>Save</button>
            </div>
            {/* Date Show */}
            <div className='p-4 text-left text-xl'>
              <div className='p-1'>
                {currentDate ? formatDate(currentDate) : 'No date selected'}
              </div>
              <div className='p-1'>
                {userState.userName ? userState.userName : "Your are not logged in"}
              </div>
            </div>
          </div>

          {/* Note  */}
          <div className='p-4'>
            <div className='border border-slate-300'>
              <textarea
                className="w-full h-96 box-border border-slate-300 p-2 resize-none"
                placeholder="Write your notes here..."
                value={note}
                onChange={handleNoteChange}
              ></textarea>
            </div>
          </div>

          <div>

          </div>
        </div>

        <div className='flex justify-between'>
          {/* Exercise list  */}
          <div className='p-4'>
            <div>
              <select className='p-4 border border-slate-300 rounded-xl transition-colors text-slate-200 bg-slate-950 hover:text-slate-950 hover:bg-slate-200' onChange={handleSelect}>
                <option value="">Select an exercise</option>
                {Object.keys(workoutData.workouts).map((bodyPart, index) => (
                  <optgroup label={bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)} key={index}>
                    {workoutData.workouts[bodyPart].map((exercise, idx) => (
                      <option value={exercise} key={idx}>
                        {exercise}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Selected Exercise */}
        <div className='p-4 grid grid-cols-3 gap-4"'>
          {selectedOption.map((option, index) => (
            <div key={index} className='rounded-xl border-2 border-slate-300 p-2 flex flex-col justify-between'>
              <div className='flex justify-between p-1 border-b-2 border-slate-300'>
                <div className='underline-offset-1'>
                  {option}
                </div>
                <div>
                  <button onClick={() => handleRemove(option)}>X</button>
                </div>
              </div>

              <div>
                {Object.keys(exerciseData[option] || {}).map((setIndex) => (
                  <div key={setIndex} className='p-1'>
                    <div className='flex justify-between'>
                      <div>Set {Number(setIndex) + 1}</div>
                      <button onClick={() => handleRemoveSet(option, setIndex)}>Cancel Set</button>
                    </div>
                    <input
                      type='text'
                      placeholder='Weight'
                      value={exerciseData[option]?.[setIndex]?.weight || ''}
                      onChange={(e) => handleInputChange(option, setIndex, 'weight', e.target.value)}
                      className='p-2 border border-slate-300 rounded-xl w-full'
                    />
                    <input
                      type='text'
                      placeholder='Reps'
                      value={exerciseData[option]?.[setIndex]?.reps || ''}
                      onChange={(e) => handleInputChange(option, setIndex, 'reps', e.target.value)}
                      className='p-2 border border-slate-300 rounded-xl w-full'
                    />
                  </div>
                ))}
              </div>
              <div className='p-2'>
                <button className='p-4 w-full rounded-xl transition-colors text-slate-200 bg-slate-950 hover:text-slate-950 hover:bg-slate-200' onClick={() => handleAddSet(option)}>
                  Add Set
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
