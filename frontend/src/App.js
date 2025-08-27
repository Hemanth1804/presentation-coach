import React, { useState } from "react";
import UploadPPT from "./components/UploadPPT";
import LiveSession from "./components/LiveSession";
import FeedbackPanel from "./components/FeedbackPanel";

function App() {
  const [stage, setStage] = useState("upload"); // upload | live | feedback
  const [feedback, setFeedback] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Signum Verbum</h1>

      {stage === "upload" && (
        <>
          <UploadPPT />
          <button
            onClick={() => setStage("live")}
            className="px-6 py-3 mt-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Start Live Session
          </button>
        </>
      )}

      {stage === "live" && (
        <LiveSession
          onEnd={(data) => {
            setFeedback(data);
            setStage("feedback");
          }}
        />
      )}

      {stage === "feedback" && feedback && <FeedbackPanel feedback={feedback} />}
    </div>
  );
}

export default App;
