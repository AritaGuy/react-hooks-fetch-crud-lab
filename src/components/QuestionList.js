import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [prompt, setPrompt]=useState([])
  useEffect(()=>{fetch('http://localhost:4000/questions')
  .then((r)=>r.json())
  .then((questions)=>setPrompt(questions))}, [])
  
  function handleDelete(deletedItem){
    const updatedQuestions = prompt.filter((item)=> item.id !== deletedItem.id)
    setPrompt(updatedQuestions)
  }

  function handleUpdate(updatedQuestion){
    const updatedQuestions = prompt.map((item)=>{
      if (item.id === updatedQuestion.id){
        return updatedQuestion
      } else {
        return prompt
      }
    })
    setPrompt(updatedQuestions)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{prompt.map((quest)=><QuestionItem key={quest.id} question={quest} onDeleteQuestion={handleDelete} onUpdateCorrectAnswer={handleUpdate}/>)}</ul>
      
    </section>
  );
}

export default QuestionList;
