from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"ok": True, "service": "question-generation"}), 200

def make_basic_questions(slide_text: str, slide_no: int):
    questions = []
    text = (slide_text or "").strip()
    if not text:
        return questions
    # naive topic guess: first meaningful word(s)
    words = [w.strip(".,:;()[]{}").lower() for w in text.split() if w.isalpha()]
    topic = " ".join(words[:3]) if words else "this slide"
    questions.append({"slide_number": slide_no, "question": f"Can you define {topic}?"})
    questions.append({"slide_number": slide_no, "question": f"What is the main idea of slide {slide_no}?"})
    questions.append({"slide_number": slide_no, "question": f"Give one example related to {topic}."})
    return questions

@app.route("/generate_questions", methods=["POST"])
def generate_questions():
    data = request.get_json(silent=True) or {}
    slides = data.get("slides", [])
    out = []
    for s in slides:
        out.extend(make_basic_questions(s.get("text", ""), s.get("slide_number", 0)))
    return jsonify({"questions": out}), 200

if __name__ == "__main__":
    app.run(port=5002, debug=True)
