import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function FeedbackPanel({ feedback }) {
  const data = [
    { name: "Score", value: feedback.total_score || 0 },
    { name: "Confidence", value: feedback.confidence || 0 },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-xl w-full max-w-xl">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Session Feedback</h2>

      <div className="mb-3">
        <h3 className="text-lg font-semibold">AI Feedback:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
          {feedback.feedback?.map((f, idx) => (
            <li key={idx}>{f}</li>
          ))}
        </ul>
      </div>

      <p className="font-semibold text-gray-800 mb-4">
        Total Score: <span className="text-blue-600">{feedback.total_score}</span>
        <br />
        Confidence Level: <span className="text-purple-600">{feedback.confidence}%</span>
      </p>

      {/* Graph */}
      <BarChart
        width={350}
        height={250}
        data={data}
        className="mx-auto mt-4"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
