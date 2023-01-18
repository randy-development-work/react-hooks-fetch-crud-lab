import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // fetch data from json server using useEffect
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r)=>r.json())
    .then((data)=> setQuestions(()=>data))
  }, [])

  function handleDelete(deletedQn) {
    const updatedQns = questions.filter((question) => question.id !== deletedQn.id);
    setQuestions(updatedQns)
  }

  function handleUpdatedItem(updatedQn) {
    console.log("Updated:", updatedQn);
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQn.id) {
        return updatedQn;
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
  }

  const displayQuestions = questions.map((question) => {    
    return (
      <QuestionItem question={question} onDelete={handleDelete} onUpdate={handleUpdatedItem} />
    )
})

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
