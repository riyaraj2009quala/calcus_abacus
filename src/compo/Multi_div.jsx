import React, { useState, useEffect, useRef } from "react";

export function Multi_div({ op, dig, otherdig, time, no_quest }) {
  const [questions, setQuestions] = useState([]);
  const [userAns, setUserAns] = useState({});
  const [showSubmit, setShowSubmit] = useState(true);
  const timerRef = useRef(null);
  const [remaining, setRemaining] = useState(time);

  const digNum = Number(dig);
  const otherDigNum = Number(otherdig);
  const totalQuestions = Number(no_quest);

  // Generate questions
  const makeQuestions = () => {
    setQuestions((prev) => {
      const startId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
      const len = Math.min(9, totalQuestions - prev.length); // load max 9 at a time
      const sign = op === "Multiplication" ? "×" : "÷";

      const newQuestions = Array.from({ length: len }, (_, i) => {
        const power1 = Math.pow(10, digNum - 1);
        const num1 = Math.floor(Math.random() * 9 * power1) + power1;

        const power2 = Math.pow(10, otherDigNum - 1);
        const num2 = Math.floor(Math.random() * 9 * power2) + power2;

        const total =
          sign === "÷" ? parseFloat((num1 / num2).toFixed(2)) : num1 * num2;

        return { id: startId + i, num1, num2, total, sign };
      });

      return [...prev, ...newQuestions];
    });
  };

  // Infinite scroll
  const infiniteScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 50
    ) {
      makeQuestions();
    }
  };

  useEffect(() => {
    makeQuestions();
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, []);

  // Handle submit
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (showSubmit) {
      setShowSubmit(false);
      clearInterval(timerRef.current);
      setRemaining(0);
    }
  };

  // Timer
  useEffect(() => {
    const endTime = Date.now() + time;
    timerRef.current = setInterval(() => {
      const diff = endTime - Date.now();
      if (diff <= 0) {
        clearInterval(timerRef.current);
        handleSubmit();
      } else {
        setRemaining(diff);
      }
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [time]);

  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  const getQuestionClass = (question) => {
    if (showSubmit)
      return "p-4 bg-[linear-gradient(to_bottom,#DCA06D,#948979)] m-2 rounded-2xl flex flex-col items-center shadow-md";
    const userVal = userAns[question.id] ?? null;
    return userVal === question.total
      ? "p-4 bg-[rgba(0,255,0,0.5)] m-2 rounded-2xl flex flex-col items-center border-[2px] border-green-400 shadow-green-400"
      : "p-4 bg-[rgba(255,0,0,0.5)] m-2 rounded-2xl flex flex-col items-center border-[2px] border-red-400 shadow-red-400";
  };

  const getNumClass = (question) => {
    if (showSubmit)
      return "num bg-[#e4d3b9] h-[60%] w-full rounded-lg text-xl sm:text-2xl mb-3 flex flex-col items-center justify-center";
    const userVal = userAns[question.id] ?? null;
    return userVal === question.total
      ? "num bg-[rgba(0,255,0,0.5)] h-[60%] w-full rounded-lg text-xl sm:text-2xl mb-3 flex flex-col items-center justify-center"
      : "num bg-[rgba(255,0,0,0.5)] h-[60%] w-full rounded-lg text-xl sm:text-2xl mb-3 flex flex-col items-center justify-center";
  };

  return (
    <div className="mainbox w-full flex flex-col p-2 sm:p-4">
      <p className="font-[CC Elsewhere] font-extrabold text-3xl sm:text-4xl text-white text-center mb-4">
        Calci Abacus
      </p>

      <div className="showtime sticky top-2 bg-neutral-400 grid grid-cols-3 place-items-center text-sm sm:text-base font-extrabold py-2 rounded-md w-fit mx-auto mb-4 px-4 z-10">
        <div>{hours.toString().padStart(2, "0")}:</div>
        <div>{minutes.toString().padStart(2, "0")}:</div>
        <div>{seconds.toString().padStart(2, "0")}</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {questions.map((q) => (
            <div key={q.id} className={`${getQuestionClass(q)} w-[90%] sm:w-[80%]`}>
              <span className="mb-2 font-bold text-lg sm:text-xl">Question {q.id}</span>
              <div className={`${getNumClass(q)} text-center`}>
                <span>{q.num1}</span>
                <span>
                  {q.sign}
                  {q.num2}
                </span>
              </div>

              <div className="res flex flex-col items-center w-full">
                <input
                  type="number"
                  className="userans bg-white text-black w-3/4 sm:w-2/4 h-10 sm:h-12 mb-3 text-center rounded-lg text-base sm:text-lg"
                  value={userAns[q.id] ?? ""}
                  onChange={(e) =>
                    setUserAns((prev) => ({
                      ...prev,
                      [q.id]: parseFloat(e.target.value),
                    }))
                  }
                  readOnly={!showSubmit}
                />
                {!showSubmit && (
                  <div className="ans bg-amber-950 text-white h-10 sm:h-12 w-full rounded-lg text-center flex items-center justify-center mt-2 text-base sm:text-lg">
                    Ans: {q.total}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {showSubmit && (
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[rgba(87,121,255,0.57)] text-black px-6 py-2 rounded text-base sm:text-lg hover:scale-105 transition-transform duration-200"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
