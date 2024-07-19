import { Center, Grid, Pagination } from "@mantine/core"
import ProductCard from "../../components/ProductCard/ProductCard"
import { useState } from "react"


export default function Products({ products, fallback_desc }) {
  const elementsPerPage = 6
  const numOfPages = Math.ceil(products.length / elementsPerPage) - 1
  const [page, setPage] = useState(1);

  return (
    <>
      <Center>
        <Grid grow className="products-grid" w={1200} mt="md">
          {products.slice(page * elementsPerPage - elementsPerPage, page * elementsPerPage).map((el) => {
            return (
              <Grid.Col span={4} key={el.id} >
                <ProductCard image={el.image_url} title={el.title} desc={el.short_description ? el.short_description : fallback_desc} cost={el.current_price} id={el.id} stock={el.stock} discount={el.discount} />
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
