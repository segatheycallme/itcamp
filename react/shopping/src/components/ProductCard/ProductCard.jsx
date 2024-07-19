import { FaShoppingCart } from "react-icons/fa"
import { Button, Card, Center, Image, Text } from '@mantine/core'
import { useContext, useState } from "react"
import { context } from "../../App"

export default function ProductCard(props) {
  let item = { ...props, count: 1, discountedPrice: 0 };
  const [forceRefresh, setForceRefresh] = useState(false)
  const icon = <FaShoppingCart />
  const [cartItems, setCartItems] = useContext(context)
  const price = Number(item.cost.replaceAll(/[,.]/g, "")) / 100
  let itemInContext = cartItems.find((el) => el.id === item.id)
  item.price = price * (1 - item.discount / 100)

  return (
    <Card
      shadow="sm"
      padding="md"
      bg='#f5f5f5'
    >
      <Card.Section p="lg" pb="xs">
        <Center>
          <Image
            src={item.image}
            w={250}
            alt="No way!"
          />
        </Center>
      </Card.Section>
      <Text mt="sm" c="dimmed" size="sm">
        {item.desc}
      </Text>
      <Text fw={500} size="xl" style={{ minHeight: "66px" }}>
        {item.title}
      </Text>
      <Text fw={800} size="xl" ml="sm">
        {item.discount ?
          <><span style={{ color: "#f44910" }}>{item.price.toFixed(2)}</span> <strike style={{ color: "#aaa", fontSize: "0.8em", marginLeft: "0.4em" }}>{price.toFixed(2)}</strike></>
          : price.toFixed(2)
        }
      </Text>

      <Center>
        {itemInContext ?
          <>
            <Button m="lg" color='#f47422' onClick={() => {
              if (itemInContext.count < 2) {
                setCartItems((prev) => prev.toSpliced(prev.indexOf(item), 1))
              } else {
                itemInContext.count--
                setForceRefresh(!forceRefresh)
              }
            }}>-</Button>
            <Text size="xl">{itemInContext.count}</Text>
            <Button m="lg" color='#f47422' onClick={() => {
              itemInContext.count++
              setForceRefresh(!forceRefresh)
            }}>+</Button>
          </>
          :
          <Button w="50%" justify="space-between" my="lg" color='#f47422' leftSection={icon} rightSection=" " onClick={() => {
            setCartItems((prev) => [...prev, item])
          }
          }>ADD TO CART</Button>
        }
      </Center>

    </Card >
  )
}
