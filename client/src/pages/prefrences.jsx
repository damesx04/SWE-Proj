import React, { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [ratings, setRatings] = useState(Array(10).fill(false)); // Array with 10 false values
// take use state and push it into array
  const questions = [
    {
      cuisine: "Indian",
      text: "Indian",
    },
    {
      cuisine: "Italian",
      text: "Italian",
    },
    {
      cuisine: "Japanese",
      text: "Japanese",
    },
    {
      cuisine: "Mexican",
      text: "Mexican",
    },
    {
      cuisine: "Thai",
      text: "Thai",
    },
    {
      cuisine: "Chinese",
      text: "Chinese",
    },
    {
      cuisine: "Greek",
      text: "Greek",
    },
    {
      cuisine: "French",
      text: "French",
    },
    {
      cuisine: "Korean",
      text: "Korean",
    },
    {
      cuisine: "Brazilian",
      text: "Brazilian",
    },
  ];

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
          const response = await axios.get(
              'http://localhost:5000/users/profile',
              { withCredentials: true }
          );
          setEmail(response.data.email);
          console.log(email);
      } catch (error) {
          throw new Error('Error fetching email:', error);
      }
    };
    fetchUserEmail();
  }, []);

  const handleCheckboxChange = (event, index) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = event.target.checked;
    setRatings(updatedRatings);
  };

  //Change here so if user already has stuff in their preferences 
  //We can update it 
  const handleAnswerSubmit = async () => {
    try {
      console.log(ratings);
      window.location.href = '/swiping';
      const response = await axios.post("http://localhost:5000/pushPreferences", {
        preferences: ratings,
        email: email
      }, {
        withCredentials: true
      });
      console.log("anything");
      setShowResults(true);
    } catch (error) {
      console.log("anything!");
      console.error("Error submitting preferences:", error);
    }
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
          const response = await axios.get(
              'http://localhost:5000/getPreferences',
              { withCredentials: true }
          );
          let storedRatings = Array(10).fill(false);
          for(let i = 0; i < questions.length; i++) {
            for(let j = 0; j < response.data.preferences.length; j++) {
              if(response.data.preferences[j] == questions[i].cuisine) {
                storedRatings[i] = true;
                break;
              }
            }
          }
          setRatings(storedRatings);
      } catch (error) {
          throw new Error('Error fetching email:', error);
      }
    };
      try {
        fetchPreferences();
      } catch (error) {
        const storedRatings = Array(10).fill(false);
        setRatings(storedRatings);
      }
    }, []);
    
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {showResults ? (
          <div className="results-container">
            <h2 className="text-2xl font-semibold mb-4">Preferences</h2>
            {questions.map((question, index) => (
              <p key={index} className="mb-2">
                {question.cuisine}: {ratings[index] ? "Yes" : "No"}
              </p>
            ))}
          </div>
        ) : (
          <div className="form-container">
            <h2 className="text-2xl font-semibold mb-4">Pick Cuisine Preferences</h2>
            {questions.map((question, index) => (
              <div className="checkbox-item mb-2" key={index}>
                <p className="flex items-center">
                  {question.text}&nbsp;
                  <label className="ml-2">
                    <input
                      type="checkbox"
                      checked={ratings[index]}
                      onChange={(event) => handleCheckboxChange(event, index)}
                    />
                  </label>
                </p>
              </div>
            ))}
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={handleAnswerSubmit}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

