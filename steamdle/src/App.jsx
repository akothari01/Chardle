import { useState } from 'react'
import {useEffect} from 'react'
import WordGuess from './components/WordGuess'
import Keyboard from './components/Keyboard'
import Confetti from 'react-confetti'

export default function App() {
  const [wordToGuess, setWordToGuess] = useState("sonic")
  const [guesses, setGuesses] = useState(Array(wordToGuess.length * 6).fill(''))
  const [index, setIndex] = useState(0)
  const[currentGuess, setCurrentGuess] = useState(1)
  const[guessCorrect, setGuessCorrect] = useState(Array(wordToGuess.length * 6).fill('#9cb7db'))
  const [gameWon, setGameWon] = useState(false)
  const gameLost = index >= wordToGuess.length*6+1
  const gameOver = gameWon || gameLost

  function handleTyping(letter){
    if(!gameOver && index < wordToGuess.length*6){
    if(index < currentGuess * wordToGuess.length){
      setGuesses(prevGuess => {
        const newGuess = [...prevGuess]
        newGuess[index] = letter
        return newGuess
      })
      setIndex(prevIndex => prevIndex + 1)
    }
    } 
  }

  function deleteInput(){
    if(!gameOver){
      const newIndex = (index < currentGuess*wordToGuess.length+1 && index > (currentGuess-1)*wordToGuess.length) ? index - 1 : index
      setIndex(newIndex)
      setGuesses(prevGuess => {
        const newGuess = [...prevGuess]
        newGuess[newIndex] = ''
        return newGuess
      })
    }
  }

  function enterInput(){
    if(!gameOver){
      if(index === currentGuess*wordToGuess.length){
        const guess = guesses
        let gameStatus = true
        setGuessCorrect(prevCor => {
          const newCor = [...prevCor]
          const word = wordToGuess.split('')
          for(let i = index - wordToGuess.length; i <= index-1; i++){
            if(guess[i] === word[i%wordToGuess.length]){
              newCor[i] = '#34eb6b'
            }
            else if(word.includes(guess[i])){
              newCor[i] = '#ebcf34'
              gameStatus = false
            }
            else{
              newCor[i] = '#747877'
              gameStatus = false
            }
          }
          setGameWon(gameStatus)
          return newCor
        })
        setCurrentGuess(prevGuess => prevGuess + 1)
      }
    }
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if(event.key === "Enter"){
        enterInput()
      }
      else if(event.key === "Backspace"){
        deleteInput()
      }
      else if(event.key.match(/^[0-9a-z]+$/)){
        handleTyping(event.key)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () =>{
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, [guesses, currentGuess])

  return (
    <main className='main-content'>
      {gameWon ? <Confetti/> : undefined}
      <WordGuess gridSize={guesses} coloring={guessCorrect}/>
      <Keyboard typing={handleTyping} del={deleteInput} ent={enterInput}/>
    </main>
  )
}
