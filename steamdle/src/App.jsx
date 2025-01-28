import { useState } from 'react'
import WordGuess from './components/WordGuess'
import Keyboard from './components/Keyboard'

export default function App() {
  const [wordToGuess, setWordToGuess] = useState("bayonetta")
  const [guesses, setGuesses] = useState(Array(wordToGuess.length * 6).fill('-1'))
  return (
    <main className='main-content'>
      <WordGuess gridSize={guesses}/>
      <Keyboard/>
    </main>
  )
}
