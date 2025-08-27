import React, { useEffect, useRef, useState } from "react";

export default function LiveSession({ onEnd }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [audioCtx, setAudioCtx] = useState(null);

  useEffect(() => {
    async function startSession() {
      // ✅ Start camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;

      // ✅ Audio Waveform
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      setAudioCtx(audioContext);
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#f9fafb";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] / 2;
          ctx.fillStyle = "#3b82f6";
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      }
      draw();

      // ✅ Send audio chunks to backend every 10s
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          const formData = new FormData();
          formData.append("audio", event.data, "chunk.wav");
          const res = await fetch("http://localhost:5000/process_audio", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (data.question) {
            setActiveQuestion(data.question);
          }
        }
      };
      mediaRecorder.start(10000); // collect every 10s

      videoRef.current._recorder = mediaRecorder;
    }
    startSession();
  }, []);

  const endSession = async () => {
    // ✅ Stop camera + recorder
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current._recorder) {
      videoRef.current._recorder.stop();
    }
    if (audioCtx) {
      audioCtx.close();
    }

    // ✅ Fetch feedback
    const res = await fetch("http://localhost:5000/get_feedback");
    const data = await res.json();
    onEnd(data);
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl w-full max-w-2xl flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Live Session</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full rounded-lg shadow mb-4"
      />

      {/* ✅ Voice Waveform */}
      <canvas ref={canvasRef} width="400" height="80" className="mb-4 border rounded"></canvas>

      {/* ✅ Active Question */}
      {activeQuestion && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative mb-4 w-full">
          <strong className="font-bold">Question: </strong>
          <span>{activeQuestion}</span>
        </div>
      )}

      <button
        onClick={endSession}
        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
      >
        End Session
      </button>
    </div>
  );
}
