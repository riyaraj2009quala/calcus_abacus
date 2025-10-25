// TestGrid.jsx
import React from "react";
import { Grids } from "./Grids";
import {Multi_div} from './Multi_div'
export  function TestGrid() {
  return (
    <Multi_div
      op="add/sub"
      dig={2}
      otherdig={3}
      time={5000}
      no_quest={10}
    />
  );
}
