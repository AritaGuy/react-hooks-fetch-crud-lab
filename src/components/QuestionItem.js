import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;
  console.log(answers)
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`, {
      method:'DELETE',
    })
    .then((r)=>r.json())
    .then(()=>onDeleteQuestion(question))
  }

  function handleChange(){
    fetch(`http://localhost:4000/questions/${id}`, {
    method:'PATCH',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      "correctIndex": {correctIndex}
    }),
   })
    .then((response)=>response.json())
    .then((updatedQuestion)=>onUpdateCorrectAnswer(updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
