import { Grid } from "@mantine/core"
import ProductCard from "../../components/ProductCard/ProductCard"
import PRODUCTS_JSON from "/src/common/products.json"


export default function Products() {
  return (
    <Grid grow className="products-grid">
      {PRODUCTS_JSON.map((el) => {
        return (
          <Grid.Col span={3} >
            <ProductCard image={el.image_url} title={el.title} desc={el.short_description} cost={el.current_price} />
          </Grid.Col>
        )
      })}
    </Grid>
  )
}
