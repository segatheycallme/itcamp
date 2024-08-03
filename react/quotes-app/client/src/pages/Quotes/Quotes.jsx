import { useContext, useEffect, useState } from "react"
import { getQuotes } from "../../utils/api"
import { userContext } from "../../App"
import "./Quotes.css"
import { Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/joy"
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'

export default function Quotes() {
  const { accessToken } = useContext(userContext)
  const [quotes, setQuotes] = useState([])
  console.log(quotes)

  useEffect(() => {
    getQuotes(accessToken).then((v) => { setQuotes(v.quotes) })
  }, [])

  return (
    <Stack justifyContent="start" gap="0.5em" alignItems="center" minHeight="calc(100vh - 6em)" py="1em">
      {quotes.map((el) => {
        const score = el.upvotesCount / (el.upvotesCount + el.downvotesCount)
        let red, green;
        if (score > 0.5) {
          red = Math.round((score - 1) * -400)
          green = 200
        } else {
          red = 200
          green = Math.round(400 * score)
        }
        return (
          <Card variant="outlined" color="primary" sx={{ width: "calc(20% + 35em)", maxWidth: "90%" }}>
            <CardContent orientation="horizontal">
              <CardActions orientation="vertical" sx={{ width: "min-content", gap: 0, alignItems: "center", pt: 0 }}>
                <button className="vote"><FaAngleUp color={el.givenVote === "upvote" ? "var(--joy-palette-primary-500)" : "black"} /></button>
                <Typography fontSize="lg" fontWeight="bold" textAlign="center" textColor={`rgb(${red}, ${green}, 0)`}>{(score * 100).toFixed(2) + "%"}</Typography>
                <Typography fontSize="sm" textAlign="center">{el.upvotesCount}/{el.downvotesCount}</Typography>
                <button className="vote"><FaAngleDown color={el.givenVote === "downvote" ? "var(--joy-palette-primary-500)" : "black"} /></button>
              </CardActions>
              <Divider orientation="vertical" />
              <Stack justifyContent="space-between" width="100%">
                <Typography textAlign="left">{el.content}</Typography>
                <Typography textAlign="right" color="neutral">-{el.author}</Typography>
              </Stack>
            </CardContent>
          </Card>
        )
      })}
    </Stack>
  )
}
