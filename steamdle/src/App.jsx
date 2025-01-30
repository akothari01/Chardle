import { useState } from 'react'
import WordGuess from './components/WordGuess'
import Keyboard from './components/Keyboard'

export default function App() {
  const [wordToGuess, setWordToGuess] = useState("bayonetta")
  const [guesses, setGuesses] = useState(Array(wordToGuess.length * 6).fill(''))
  const [index, setIndex] = useState(0)
  const[currentGuess, setCurrentGuess] = useState(1)

  function handleTyping(letter){
    if(index < currentGuess * wordToGuess.length){
      setGuesses(prevGuess => {
        const newGuess = [...prevGuess]
        newGuess[index] = letter
        return newGuess
      })
      setIndex(prevIndex => prevIndex + 1)
    } 
  }

  function deleteInput(){
    console.log(index)
    const newIndex = (index < currentGuess*wordToGuess.length+1) ? index - 1 : index
    setIndex(newIndex)
    console.log(index)
    setGuesses(prevGuess => {
      const newGuess = [...prevGuess]
      newGuess[newIndex] = ''
      return newGuess
    })
  }

  return (
    <main className='main-content'>
      <WordGuess gridSize={guesses}/>
      <Keyboard typing={handleTyping} del={deleteInput}/>
    </main>
  )
}
