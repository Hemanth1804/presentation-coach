import React from "react";

function FeedbackReport({ feedback }) {
  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h2 className="text-xl font-semibold">Feedback Report</h2>
      <p><b>Total Score:</b> {feedback.total_score}</p>
      <ul className="list-disc ml-6">
        {feedback.feedback.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackReport;
