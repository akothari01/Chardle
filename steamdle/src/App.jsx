import { useState } from 'react'
import WordGuess from './components/WordGuess'
import Keyboard from './components/Keyboard'

export default function App() {
  const [wordToGuess, setWordToGuess] = useState("bayonetta")
  const [guesses, setGuesses] = useState(Array(wordToGuess.length * 6).fill(''))
  const [index, setIndex] = useState(0)
  const[currentGuess, setCurrentGuess] = useState(1)
  const[guessCorrect, setGuessCorrect] = useState(Array(wordToGuess.length * 6).fill('#2b475f'))

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
    const newIndex = (index < currentGuess*wordToGuess.length+1 && index > (currentGuess-1)*wordToGuess.length) ? index - 1 : index
    setIndex(newIndex)
    setGuesses(prevGuess => {
      const newGuess = [...prevGuess]
      newGuess[newIndex] = ''
      return newGuess
    })
  }

  function enterInput(){
    if(index === currentGuess*wordToGuess.length){
      const guess = guesses
      setGuessCorrect(prevCor => {
        const newCor = [...prevCor]
        const word = wordToGuess.split('')
        for(let i = index - wordToGuess.length; i <= index-1; i++){
          if(guess[i] === word[i%wordToGuess.length]){
            newCor[i] = '#34eb6b'
          }
          else if(word.includes(guess[i])){
            newCor[i] = '#ebcf34'
          }
          else{
            newCor[i] = '#747877'
          }
        }
        return newCor
      })
      setCurrentGuess(prevGuess => prevGuess + 1)
    } 
  }


  return (
    <main className='main-content'>
      <WordGuess gridSize={guesses} coloring={guessCorrect}/>
      <Keyboard typing={handleTyping} del={deleteInput} ent={enterInput}/>
    </main>
  )
}
