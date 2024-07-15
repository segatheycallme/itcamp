import { Center, Grid, Pagination } from "@mantine/core"
import ProductCard from "../../components/ProductCard/ProductCard"
import PRODUCTS_JSON from "/src/common/products.json"
import { useState } from "react"


export default function Products() {
  const elementsPerPage = 6
  const numOfPages = Math.ceil(PRODUCTS_JSON.length / elementsPerPage) - 1
  console.log(numOfPages)
  const [page, setPage] = useState(0);

  return (
    <>
      <Center>
        <Grid grow className="products-grid" w={1200} mt="md">
          {PRODUCTS_JSON.slice(page * elementsPerPage, page * elementsPerPage + elementsPerPage).map((el) => {
            return (
              <Grid.Col span={4} >
                <ProductCard image={el.image_url} title={el.title} desc={el.short_description} cost={el.current_price} id={el.id} stock={el.stock} />
              </Grid.Col>
            )
          })}
        </Grid>
      </Center>
      <Center my={50}>
        <Pagination total={numOfPages} value={page} onChange={setPage} size="lg" color="#f47422" />
      </Center>
    </>
  )
}
