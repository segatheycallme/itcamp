import { useContext, useEffect, useState } from "react"
import { getQuotes } from "../../utils/api"
import { userContext } from "../../App"
import "./Quotes.css"
import { Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/joy"
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import Pagination from "../../components/Pagination/Pagination"

export default function Quotes() {
  const { accessToken } = useContext(userContext)
  const [quotes, setQuotes] = useState([])
  const [page, setPage] = useState(1)
  const [pageNum, setPageNum] = useState(0)

  const QUOTES_PER_PAGE = 5

  useEffect(() => {
    getQuotes(accessToken, QUOTES_PER_PAGE, page).then((v) => {
      setQuotes(v.quotes)
      setPageNum(Math.ceil(v.quotesCount / QUOTES_PER_PAGE))
    })
  }, [page])

  return (
    <Stack justifyContent="start" gap="0.5em" alignItems="center" minHeight="calc(100vh - 7em)" pt="1em">
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
          <Card variant="outlined" color="primary" sx={{ width: "calc(20% + 35em)", maxWidth: "90%", fontSize: "0.8em" }}>
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
      <Pagination page={page} setPage={setPage} pageNum={pageNum} />
    </Stack>
  )
}
