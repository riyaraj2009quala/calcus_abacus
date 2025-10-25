 import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Grids} from './compo/Grids'
import {Multi_div} from './compo/Multi_div'
import {Select_op} from './compo/select_op'
import {TestGrid} from './compo/Testgrid'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Multi_div/> */}
    {/* <Grids/> */}
     <Select_op/>
     {/* <TestGrid/> */}
     </>
  )
}

export default App
