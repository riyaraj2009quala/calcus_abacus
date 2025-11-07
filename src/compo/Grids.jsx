import React, { useState, useEffect, useRef } from 'react';

export function Grids({ op, dig, rows, time, no_quest }) {
  const [questions, setQuestions] = useState([]);
  const [userAns, setUserAns] = useState({});
  const [showSubmit, setShowSubmit] = useState(true);
  const [remaining, setRemaining] = useState(time);
  const timerRef = useRef(null);

  const makeQuestion = () => {
    setQuestions(prev => {
      const startId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
      const sign = op === 'add/sub' ? ['+', '-'] : ['+', '+'];
      const len = Math.min(6, no_quest - prev.length);

      const newQuestions = Array.from({ length: len }, (_, i) => {
        let total = 0;
        const power_ = Math.pow(10, dig - 1);
        const numbers = Array.from({ length: rows }, () => {
          const num = Math.floor(Math.random() * 9 * power_) + power_;
          const randomSign = sign[Math.floor(Math.random() * sign.length)];
          if (randomSign === '-') total -= num;
          else total += num;
          return { num, randomSign };
        });
        return { id: startId + i, numbers, total };
      });

      return [...prev, ...newQuestions];
    });
  };

  // Infinite scroll
  const infiniteScroll = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      makeQuestion();
    }
  };

  useEffect(() => {
    makeQuestion();
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, []);

  const handleSubmit = e => {
    if (e) e.preventDefault();
    setShowSubmit(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Timer effect
  useEffect(() => {
    const endTime = Date.now() + remaining;
    timerRef.current = setInterval(() => {
      const diff = endTime - Date.now();
      if (diff <= 0) {
        clearInterval(timerRef.current);
        setRemaining(0);
        handleSubmit();
      } else setRemaining(diff);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  const getClasses = question => {
    if (showSubmit) return {
      container: 'p-4 m-2 rounded-4xl flex flex-col items-center mb-4 shadow-md',
      numDiv: 'num bg-[#e4d3b9] h-[60%] w-full rounded-lg text-xl mb-3 flex flex-col items-center justify-center'
    };

    const userVal = userAns[question.id];
    if (userVal === question.total) {
      return {
        container: 'p-4 m-2 rounded-4xl flex flex-col items-center mb-4 border-2 border-green-400 shadow-green-400',
        numDiv: 'num p-4 h-[60%] w-full rounded-lg text-xl mb-3 border-2 border-green-400 shadow-green-400 flex flex-col items-center justify-center'
      };
    } else {
      return {
        container: 'p-4 m-2 rounded-4xl flex flex-col items-center mb-4 border-2 border-red-400 shadow-red-400',
        numDiv: 'num p-4 h-[60%] w-full rounded-lg text-xl mb-3 border-2 border-red-400 shadow-red-400 flex flex-col items-center justify-center'
      };
    }
  };

  return (
    <div className="mainbox w-full min-h-screen flex flex-col p-2 sm:p-4">
      {/* Timer */}
      <div className='showtime sticky top-2 bg-neutral-400 grid grid-cols-3 place-items-center text-sm sm:text-base font-extrabold py-2 rounded-md w-fit mx-auto mb-4 z-10'>
        <div>{hours.toString().padStart(2, "0")}:</div>
        <div>{minutes.toString().padStart(2, "0")}:</div>
        <div>{seconds.toString().padStart(2, "0")}</div>
      </div>

      <p className="font-extrabold text-3xl sm:text-4xl text-white text-center mb-4">Calci Abacus</p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {questions.map(question => {
            const classes = getClasses(question);
            return (
              <div key={question.id} className={`${classes.container} bg-[linear-gradient(to_bottom,#DCA06D,#948979)] w-[90%] sm:w-[80%]`}>
                <span className="mb-2 font-bold text-lg sm:text-xl">Question {question.id}</span>
                <div className={`${classes.numDiv} bg-[linear-gradient(to_bottom,#DCA06D,#948979)] w-full text-center`}>
                  {question.numbers.map((n, idx) => (
                    <span key={idx} className="block">{n.randomSign}{n.num}</span>
                  ))}
                </div>
                <div className="res mt-4 flex flex-col items-center w-full">
                  <input
                    type="number"
                    value={userAns[question.id] ?? ''}
                    readOnly={!showSubmit}
                    className="userans mt-7  bg-white text-black w-3/4 sm:w-2/4 h-10 sm:h-12 mb-3 text-center rounded-lg"
                    onChange={e => setUserAns(prev => ({ ...prev, [question.id]: parseFloat(e.target.value) }))}
                  />
                  {!showSubmit && (
                    <div className="ans bg-amber-950 h-10 sm:h-12 w-full rounded-lg text-center text-amber-50 mt-2 sm:mt-5 flex items-center justify-center">
                      Ans: {question.total}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {showSubmit && (
          <div className="flex justify-center mt-6">
            <button type="submit" className="bg-[rgba(87,121,255,0.57)] text-black px-6 py-2 rounded text-base sm:text-lg hover:scale-105 transition-transform duration-200">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
