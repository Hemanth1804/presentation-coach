import React, { useState } from "react";

export default function UploadPPT() {
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/process_ppt", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setMessage(data.message || "Uploaded successfully");
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl w-full max-w-md text-center">
      <input
        type="file"
        onChange={handleUpload}
        className="block w-full text-sm text-gray-600 mb-3"
      />
      {message && <p className="text-green-600 font-medium">{message}</p>}
    </div>
  );
}
