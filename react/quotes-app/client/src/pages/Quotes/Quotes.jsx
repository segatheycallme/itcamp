import { useContext, useEffect, useState } from "react"
import { getQuotes } from "../../utils/api"
import { userContext } from "../../App"
import "./Quotes.css"
import { Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/joy"
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'

export default function Quotes() {
  const { accessToken } = useContext(userContext)
  const [_quotes, setQuotes] = useState([])

  useEffect(() => {
    getQuotes(accessToken).then((v) => { setQuotes(v) })
  }, [])

  return (
    <Stack justifyContent="start" gap="0.5em" alignItems="center" minHeight="calc(100vh - 6em)" pt="1em">
      <Card variant="outlined" color="primary" sx={{ width: "calc(20% + 35em)", maxWidth: "90%" }}>
        <CardContent orientation="horizontal">
          <CardActions orientation="vertical" sx={{ width: "min-content", gap: 0, alignItems: "center", pt: 0 }}>
            <button className="vote"><FaAngleUp /></button>
            <Typography fontSize="lg" textAlign="center">50%</Typography>
            <Typography fontSize="sm" textAlign="center">10/10</Typography>
            <button className="vote"><FaAngleDown /></button>
          </CardActions>
          <Divider orientation="vertical" />
          <Stack justifyContent="space-between" width="100%">
            <Typography textAlign="left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam fuga amet fugit soluta laborum error enim voluptatem culpa repudiandae sed eum, ea rem accusamus facere optio beatae a praesentium tenetur.</Typography>
            <Typography textAlign="right" color="neutral">-avdo mahmutovic</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
