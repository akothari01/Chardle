import { useState } from 'react'
import WordGuess from './components/WordGuess'
import Keyboard from './components/Keyboard'

export default function App() {
  const [wordToGuess, setWordToGuess] = useState("bayonetta")
  const [guesses, setGuesses] = useState(Array(wordToGuess.length * 6).fill(''))
  const [index, setIndex] = useState(0)

  function handleTyping(letter){
    if(!(index % wordToGuess.length === 0) || index === 0){
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
    console.log(!(index % wordToGuess.length === 0))
    const newIndex = !(index % (wordToGuess.length-1) === 0) ? index - 1 : index
    setIndex(prevIndex => !(index % (wordToGuess.length-1) === 0) ? prevIndex - 1 : prevIndex)
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
