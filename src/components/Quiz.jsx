import React, { useEffect, useRef } from "react";
import "./Quiz.css";
import { data } from "../assets/data.js";
import { useState } from "react";
import Modal from "./Modal";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal
  const [modalMessage, setModalMessage] = useState(""); // Modal message

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let options_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    !lock &&
      (question.ans === ans
        ? (e.target.classList.add("correct"),
          setLock(true),
          setScore((prev) => prev + 1))
        : (() => {
            e.target.classList.add("wrong");
            options_array[question.ans - 1].current.classList.add("correct"); // Highlight correct answer
            setLock(true);
          })());
  };
  const next = () => {
    if (lock) {
      if (index + 1 < data.length) {
        setIndex((prevIndex) => prevIndex + 1);
        setQuestion(data[index + 1]);
        setLock(false);
        options_array.forEach((option) => {
          option.current.classList.remove("wrong", "correct");
        });
      } else {
        setModalMessage("Quiz completed! Your score: " + score);
        setShowModal(true);
      }
    } else {
      setModalMessage("Please answer the question before proceeding!");
      setShowModal(true); // Show modal with error message
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    options_array.forEach((option) => {
      option.current.classList.remove("wrong", "correct");
    });
    setShowModal(false); // Close the modal, if open
  };
  const closeModal = () => {
    setIndex(0); // Reset to the first question
    setQuestion(data[0]); // Reset to the first question data
    setScore(0); // Reset the score
    setLock(false); // Unlock the question
    options_array.forEach((option) => {
      option.current.classList.remove("wrong", "correct"); // Remove styles
    });
    setShowModal(false); // Close the modal
  };

  return (
    <div className="container">
      <h1>Kuis Matematika</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1 }.{" "}{question.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>

          <button onClick={next}>Selanjutnya</button>
          {/* <button onClick={resetQuiz} className="reset-button">
            Reset
          </button> */}
          <div className="index">
            {index + 1} dari {data.length} Pertanyaan
            {/* Modal for validation error message */}
            <Modal
              show={showModal}
              message={modalMessage}
              onClose={closeModal}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
