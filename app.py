from flask import Flask, render_template
import random
import io
import contextlib

app = Flask(__name__)

# 문제 목록: (파이썬 코드, 예상 출력) -> 출력은 직접 계산하지 않고 코드 실행으로 처리
code_list = [
    "print('Hello')",
    "print(1 + 2 * 3)",
    "for i in range(3):\n    print(i)",
    "a = [1, 2, 3]\nprint(a[1])",
    "print('A' * 3)",
    "x = 5\nif x > 3:\n    print('크다')\nelse:\n    print('작다')",
    "for i in range(2):\n    for j in range(2):\n        print(i, j)"
]

def execute_code(code: str) -> str:
    buffer = io.StringIO()
    try:
        with contextlib.redirect_stdout(buffer):
            exec(code, {})
    except Exception as e:
        return f"에러: {e}"
    return buffer.getvalue().strip()

@app.route("/")
def index():
    code = random.choice(code_list)
    answer = execute_code(code)
    return render_template("index.html", question=code, answer=answer)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)


