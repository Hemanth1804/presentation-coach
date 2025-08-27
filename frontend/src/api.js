const BASE_URL = "http://127.0.0.1:5000";

export async function uploadPPT(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE_URL}/process_ppt`, {
    method: "POST",
    body: formData
  });
  return res.json();
}

export async function startPresentation() {
  const res = await fetch(`${BASE_URL}/start_presentation`, { method: "POST" });
  return res.json();
}
