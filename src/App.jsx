import Root from './components/Root'
import Home from './components/Home'
import Profile from './components/Profile'
import Scores from './components/Scores'
import Concentration from './components/Concentration'
import Wordle from './components/Wordle'
// import Minesweeper from './components/Minesweeper'
// import Snake from './components/Snake'
// import Typeracer from './components/Typeracer'
// import Pong from './components/Pong'
// import Cribbage from './components/Cribbage'
// import Hearts from './components/Hearts'
// import Solitaire from './components/Solitaire'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { PreferenceProvider } from './context/PreferenceContext'
import { ScoreProvider } from './context/ScoreContext'

const router = createBrowserRouter([
  { path: '/', element: <Root />, children: [
    { path: '/home', element: <Home />},
    { path: '/profile', element: <Profile /> },
    { path: '/scores', element: <Scores /> },
    { path: '/concentration', element: <Concentration /> },
    { path: '/wordle', element: <Wordle /> },
    // { path: '/minesweeper', element: <Minesweeper /> },
    // { path: '/snake', element: <Snake /> },
    // { path: '/typeracer', element: <Typeracer /> },
    // { path: '/pong', element: <Pong /> },
    // { path: '/cribbage', element: <Cribbage /> },
    // { path: '/hearts', element: <Hearts /> },
    // { path: '/solitaire', element: <Solitaire /> }, 
  ]}
]);

export default function App() {
  return (
    <ScoreProvider>
      <PreferenceProvider>
        <RouterProvider router={router} />
      </PreferenceProvider>
    </ScoreProvider>
  )
}
