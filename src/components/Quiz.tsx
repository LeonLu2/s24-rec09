import React, { useState, useEffect } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  const [quizCore] = useState(new QuizCore());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(quizCore.getCurrentQuestion());
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    setCurrentQuestion(quizCore.getCurrentQuestion());
  }, [quizCore, quizCore.getCurrentQuestion()]);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  }

  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      setSelectedAnswer(null);
    }
    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setCurrentQuestion(quizCore.getCurrentQuestion());
    } else {
      setIsQuizCompleted(true);
    }
  }

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {questions.length}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      {isQuizCompleted ? (
        <button onClick={() => alert(`Quiz completed! Your score is ${quizCore.getScore()}/${quizCore.getTotalQuestions()}`)}>Submit</button>
      ) : (
        <button onClick={handleButtonClick}>Next Question</button>
      )}
    </div>
  );
};

export default Quiz;