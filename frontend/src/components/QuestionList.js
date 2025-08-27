import React from "react";

function QuestionList({ questions }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Generated Questions</h2>
      <ul className="list-disc ml-6">
        {questions.map((q, i) => (
          <li key={i}>{q.question}</li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
