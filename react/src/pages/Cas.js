import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function Cas() {
  const [data, setData] = useState({})
  const [number, setNumber] = useState(77)
  const [input, setInput] = useState(77)

  const getSomething = () => {
    fetch(`https://api.vaktija.ba/vaktija/v1/${number}`)
      .then(response => response.json())
      .then(json => {
        setData(json)
        return json
      })
  }
  const handleChangeNumber = () => {
    setNumber(input)
  }

  useEffect(() => {
    getSomething()
  }, [number])

  return (
    <div>
      {
        <span>{data?.lokacija}</span>
      }
      {
        data?.vakat?.map((el) => {
          return <span>{el}</span>
        })
      }
      <TextField onChange={(event) => { setInput(Number(event.target.value)) }} value={input} type='text' />
      <Button onClick={getSomething}>Daj mi vreme za namaz...</Button>
      <Button onClick={handleChangeNumber}>Daj mi drzavau sa id {input}</Button>
    </div>
  )
}
