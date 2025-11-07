import React, { useState } from "react";
import { Grids } from "./Grids";
import { Multi_div } from "./Multi_div";

export function Select_op() {
  const [op, setop] = useState("");
  const [dig, setdig] = useState(0);
  const [rows, setrows] = useState(0);
  const [otherdig, setotherdig] = useState(0);
  const [activeForm, setActiveForm] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const [showMulti, setShowMulti] = useState(false);
  const [hour, sethour] = useState(0);
  const [mini, setmini] = useState(0);
  const [sec, setsec] = useState(0);
  const [no_quest, setno_quest] = useState(0);

  const add_func = (e) => {
    e.preventDefault();
    if (activeForm !== "add") return;
    if (op === "") setop("Add/Sub");
    setShowGrid(true);
  };

  const multi_div = (e) => {
    e.preventDefault();
    if (activeForm !== "multi") return;
    if (op === "") setop("Multiplication");
    setShowMulti(true);
  };

  if (showGrid) {
    return (
      <Grids
        op={op}
        dig={dig}
        rows={rows}
        time={(hour * 3600 + mini * 60 + sec) * 1000}
        no_quest={no_quest}
      />
    );
  }

  if (showMulti) {
    return (
      <Multi_div
        op={op}
        dig={dig}
        otherdig={otherdig}
        time={(hour * 3600 + mini * 60 + sec) * 1000}
        no_quest={no_quest}
      />
    );
  }

  return (
    <div className="main_div min-h-screen w-full flex flex-col items-center via-black to-gray-900 text-white px-4 py-6">
      <p className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 mt-3 text-center drop-shadow-md">
        Calci Abacus
      </p>

      <div className="flex flex-col lg:flex-row justify-center gap-8 w-full max-w-6xl">
        {/* Addition/Subtraction Form */}
        <form
          onFocus={() => setActiveForm("add")}
          onSubmit={add_func}
          className="border-2 border-white/20 rounded-2xl bg-[#e4d3b9] text-black p-6 sm:p-8 flex flex-col gap-4 font-bold w-full max-w-md mx-auto shadow-xl"
        >
          <h2 className="text-center text-lg sm:text-xl font-bold mb-2">
            Addition / Subtraction
          </h2>

          <select
            value={op}
            onChange={(e) => setop(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Operation</option>
            <option value="Addition">Addition</option>
            <option value="Add/Sub">Add/Sub</option>
          </select>

          <select
            value={rows}
            onChange={(e) => setrows(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Rows</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            value={dig}
            onChange={(e) => setdig(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Digits</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            value={no_quest}
            onChange={(e) => setno_quest(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Number of Questions</option>
            {[10, 25, 50, 75].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-4 sm:grid-cols-5 items-center gap-2 w-full border p-2 rounded-md bg-white/40">
            <p className="col-span-1 text-center font-semibold">Time:</p>
            <input
              type="number"
              placeholder="HH"
              className="border p-1 rounded text-center w-full"
              min={0}
              value={hour}
              onChange={(e) => sethour(e.target.value)}
            />
            <input
              type="number"
              placeholder="MM"
              className="border p-1 rounded text-center w-full"
              min={0}
              value={mini}
              onChange={(e) => setmini(e.target.value)}
            />
            <input
              type="number"
              placeholder="SS"
              className="border p-1 rounded text-center w-full"
              min={0}
              value={sec}
              onChange={(e) => setsec(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-linear-to-r from-pink-500 to-red-500 text-white p-2 rounded-lg hover:scale-105 transition-all duration-200"
          >
            Submit
          </button>
        </form>

        {/* Multiplication / Division Form */}
        <form
          onFocus={() => setActiveForm("multi")}
          onSubmit={multi_div}
          className="border-2 border-white/20 rounded-2xl bg-[#e4d3b9] text-black p-6 sm:p-8 flex flex-col gap-4 font-bold w-full max-w-md mx-auto shadow-xl"
        >
          <h2 className="text-center text-lg sm:text-xl font-bold mb-2">
            Multiplication / Division
          </h2>

          <select
            value={op}
            onChange={(e) => setop(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Operation</option>
            <option value="Multiplication">Multiplication</option>
            <option value="Division">Division</option>
          </select>

          <select
            value={dig}
            onChange={(e) => setdig(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Digits</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            value={otherdig}
            onChange={(e) => setotherdig(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Other Digits</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            value={no_quest}
            onChange={(e) => setno_quest(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Number of Questions</option>
            {[10, 25, 50, 75].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-4 sm:grid-cols-5 items-center gap-2 w-full border p-2 rounded-md bg-white/40">
            <p className="col-span-1 text-center font-semibold">Time:</p>
            <input
              type="number"
              placeholder="HH"
              className="border p-1 rounded text-center w-full"
              min={0}
              value={hour}
              onChange={(e) => sethour(e.target.value)}
            />
            <input
              type="number"
              placeholder="MM"
              className="border p-1 rounded text-center w-full"
              min={0}
              value={mini}
              onChange={(e) => setmini(e.target.value)}
            />
            <input
              type="number"
              placeholder="SS"
              className="border p-1 rounded text-center w-full"
              min={0}
              value={sec}
              onChange={(e) => setsec(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-linear-to-r from-pink-500 to-red-500 text-white p-2 rounded-lg hover:scale-105 transition-all duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
