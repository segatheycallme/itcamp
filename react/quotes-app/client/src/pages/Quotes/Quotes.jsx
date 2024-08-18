import { useContext, useEffect, useState } from "react"
import { getQuotes, getTags, submitQuote, vote } from "../../utils/api"
import { userContext } from "../../App"
import "./Quotes.css"
import { Button, Card, CardActions, CardContent, CircularProgress, DialogTitle, Divider, Input, Modal, ModalDialog, Option, Select, Stack, Typography } from "@mui/joy"
import { FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/fa'
import Pagination from "../../components/Pagination/Pagination"

export default function Quotes() {
  const { accessToken } = useContext(userContext)

  const [quotes, setQuotes] = useState([])
  const [tags, setTags] = useState([])
  const [page, setPage] = useState(1)
  const [pageNum, setPageNum] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const [filters, setFilters] = useState({ sortDirection: "asc", sortBy: "upvotesCount" })

  const [author, setAuthor] = useState("")
  const [quote, setQuote] = useState("")
  const [tagsString, setTagsString] = useState("")
  const [open, setOpen] = useState(false)

  const QUOTES_PER_PAGE = 5

  useEffect(() => {
    const timeoutID = setTimeout(() => setPageNum(0), 100)
    getQuotes(QUOTES_PER_PAGE, page, accessToken, filters).then((v) => {
      setQuotes(v.quotes)
      clearTimeout(timeoutID)
      setPageNum(Math.ceil(v.quotesCount / QUOTES_PER_PAGE))
    })
  }, [page, refresh, filters])
  useEffect(() => {
    getTags(accessToken).then((v) => {
      setTags(v)
    })
  }, [refresh])

  return (
    <Stack justifyContent="start" gap="0.5em" alignItems="center" minHeight="calc(100vh - 7em)" pt="1em">
      {pageNum > 0 ?
        <>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog>
              <DialogTitle>Create new quote</DialogTitle>
              <form onSubmit={(event) => {
                event.preventDefault()
                let newTags = tagsString.split(",")
                newTags.forEach((el, i, arr) => arr[i] = el.trim())
                submitQuote(author, quote, newTags, accessToken)
                setOpen(false)
                setAuthor("")
                setQuote("")
                setTagsString("")
                setRefresh(!refresh)
              }}>
                <Input value={author} onChange={(event) => setAuthor(event.target.value)} required placeholder="Author" sx={{ m: "0.3em" }} />
                <Input value={quote} onChange={(event) => setQuote(event.target.value)} required placeholder="Quote" sx={{ m: "0.3em" }} />
                <Input value={tagsString} onChange={(event) => setTagsString(event.target.value)} required placeholder="Comma seperated tags" sx={{ m: "0.3em" }} />
                <Stack direction="row" justifyContent="space-between" sx={{ mx: "0.3em", mt: "0.7em" }} >
                  <Button color="neutral" variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit" color="primary" variant="outlined">Submit</Button>
                </Stack>
              </form>
            </ModalDialog>
          </Modal>
          <Stack direction="row" gap="1em">
            <Select defaultValue="asc" onChange={(event, val) => {
              event.preventDefault()
              setFilters({ ...filters, sortDirection: val })
            }}>
              <Option value="asc">Ascending</Option>
              <Option value="desc">Descending</Option>
            </Select>
            <Select defaultValue="upvotesCount" onChange={(event, val) => {
              event.preventDefault()
              setFilters({ ...filters, sortBy: val })
            }}>
              <Option value="author">Author</Option>
              <Option value="createdAt">New</Option>
              <Option value="upvotesCount">Top</Option>
            </Select>
            <Select defaultValue={-1} onChange={(event, val) => {
              event.preventDefault()
              if (val + 1) {
                setFilters({ ...filters, tags: tags[val] })
              } else {
                setFilters({ sortDirection: filters.sortDirection, sortBy: filters.sortBy })
              }
            }}>
              <Option value={-1}>All tags</Option>
              {tags.map((el, i) => <Option value={i} key={i}>{el}</Option>)}
            </Select>
            <Button variant="outlined" sx={{ bgcolor: "var(--joy-palette-background-surface)" }} onClick={() => {
              setOpen(true)
            }}>Add quote</Button>
          </Stack>
          {quotes.map((el) => {
            let score = el.upvotesCount / (el.upvotesCount + el.downvotesCount)
            if (isNaN(score)) {
              score = 0;
            }
            let red, green;
            if (score > 0.5) {
              red = Math.round((score - 1) * -400)
              green = 200
            } else {
              red = 200
              green = Math.round(400 * score)
            }
            return (
              <Card variant="outlined" color="primary" sx={{ width: "calc(20% + 35em)", maxWidth: "90%", fontSize: "0.66em" }} key={el.id}>
                <CardContent orientation="horizontal">
                  <CardActions orientation="vertical" sx={{ width: "min-content", gap: 0, alignItems: "center", pt: 0 }}>
                    <button className="vote" onClick={() =>
                      vote("upvote", el.givenVote, el.id, accessToken).finally(() => { setRefresh(!refresh) })
                    } ><FaAngleDoubleUp color={el.givenVote === "upvote" ? "var(--joy-palette-primary-500)" : "black"} /></button>
                    <Typography fontSize="lg" fontWeight="bold" textAlign="center" textColor={`rgb(${red}, ${green}, 0)`}>{Math.round(score * 100) + "%"}</Typography>
                    <Typography fontSize="sm" textAlign="center">{el.upvotesCount}/{el.downvotesCount}</Typography>
                    <button className="vote" onClick={() => {
                      vote("downvote", el.givenVote, el.id, accessToken).finally(() => { setRefresh(!refresh) })
                    }} ><FaAngleDoubleDown color={el.givenVote === "downvote" ? "var(--joy-palette-primary-500)" : "black"} /></button>
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
        </>
        :
        <CircularProgress size="lg" />
      }
    </Stack>
  )
}
