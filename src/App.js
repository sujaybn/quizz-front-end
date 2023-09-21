import React, { useEffect, useState } from 'react';
import './App.css'; 

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(
      'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple&encode=url3986'
    )
      .then((response) => response.json())
      .then((data) => {
        // Extract the questions from the API response
        setQuestions(data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAnswerClick = (selectedOption) => {
    if (decodeURIComponent(selectedOption) === questions[currentQuestion].correct_answer) {
      // Increase the score if the answer is correct
      setScore(score + 1);
    }

    // Move to the next question
    setCurrentQuestion(currentQuestion + 1);
  };

  const renderQuiz = () => {
    if (currentQuestion >= questions.length) {
      // Display quiz results when all questions are answered
      return (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>
        </div>
      );
    } else {
      const currentQues = questions[currentQuestion];
      return (
        <div>
          <h2>Question {currentQuestion + 1}</h2>
          <p>{decodeURIComponent(currentQues.question)}</p>
          <ul>
            {currentQues.incorrect_answers.map((option, index) => (
              <li key={index} onClick={() => handleAnswerClick(option)}>
                {decodeURIComponent(option)}
              </li>
            ))}
            <li key="correct" onClick={() => handleAnswerClick(currentQues.correct_answer)}>
              {decodeURIComponent(currentQues.correct_answer)}
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="app">
      <h1>Quiz App</h1>
      {questions.length === 0 ? <p>Loading...</p> : renderQuiz()}
    </div>
  );
};

export default App;
