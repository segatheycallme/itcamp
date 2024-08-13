import { Button, Stack } from "@mui/joy";

export default function Pagination({ page, setPage, pageNum }) {
  if (page > pageNum) {
    setPage(pageNum)
  }
  const buttonSx = { aspectRatio: 1, borderRadius: "50%" }
  let pages;
  switch (pageNum) {
    case 1:
      pages = [1]
      break;
    case 2:
      pages = [1, 2]
      break;
    case 3:
      pages = [1, 2, 3]
      break;
    default:
      pages = [1, 2, 3, pageNum]
      break;
  }
  return (
    <Stack direction="row" gap="0.5em" mb="1em">
      <Button variant="outlined" sx={buttonSx} disabled={page <= 1} onClick={() => setPage(page - 1)}>{'<'}</Button>
      {pages.map((el) => <Button variant={page === el ? "solid" : "outlined"} sx={buttonSx} key={el} onClick={() => setPage(el)}>{el}</Button>)}
      <Button variant="outlined" sx={buttonSx} disabled={page >= pageNum} onClick={() => setPage(page + 1)}>{'>'}</Button>
    </Stack>
  )
}
