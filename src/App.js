import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/question/allQuestions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="welcome-text">Quiz App</h1>
        <div className="question-container">
          {questions.length > 0 ? (
            <div className="question">
              <h2>{questions[currentQuestion].questionTitle}</h2>
              <ul>
                <li>
                  <input
                    type="radio"
                    name="answer"
                    id="option1"
                    value={questions[currentQuestion].option1}
                  />
                  <label htmlFor="option1">
                    {questions[currentQuestion].option1}
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="answer"
                    id="option2"
                    value={questions[currentQuestion].option2}
                  />
                  <label htmlFor="option2">
                    {questions[currentQuestion].option2}
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="answer"
                    id="option3"
                    value={questions[currentQuestion].option3}
                  />
                  <label htmlFor="option3">
                    {questions[currentQuestion].option3}
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="answer"
                    id="option4"
                    value={questions[currentQuestion].option4}
                  />
                  <label htmlFor="option4">
                    {questions[currentQuestion].option4}
                  </label>
                </li>
              </ul>
            </div>
          ) : (
            <p>Loading questions...</p>
          )}

          <div className="button-container">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button onClick={SubmitEvent}>Submit</button>
            <button onClick={handleReset}>Reset</button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
