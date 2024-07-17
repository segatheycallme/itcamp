import { FaShoppingCart } from "react-icons/fa"
import { Button, Card, Center, Image, Text } from '@mantine/core'
import { useContext } from "react"
import { context } from "../../App"

export default function ProductCard(props) {
  const icon = <FaShoppingCart />
  const [cartItems, setCartItems] = useContext(context)
  const price = Number(props.cost.replaceAll(/[,.]/g, "")) / 100
  return (
    <Card
      shadow="sm"
      padding="md"
      bg='#f5f5f5'
    >
      <Card.Section p="lg" pb="xs">
        <Center>
          <Image
            src={props.image}
            w={250}
            alt="No way!"
          />
        </Center>
      </Card.Section>
      <Text mt="sm" c="dimmed" size="sm">
        {props.desc}
      </Text>
      <Text fw={500} size="xl" style={{ minHeight: "66px" }}>
        {props.title}
      </Text>
      <Text fw={800} size="xl" ml="sm">
        {props.discount ?
          <><span style={{ color: "#f44910" }}>{(price * (1 - props.discount / 100)).toFixed(2)}</span> <strike style={{ color: "#aaa", fontSize: "0.8em", marginLeft: "0.4em" }}>{price.toFixed(2)}</strike></>
          : price.toFixed(2)
        }
      </Text>

      <Center>
        {cartItems.includes(props.id) ?
          <>
            <Button m="lg" color='#f47422' onClick={() => {
              setCartItems((prev) => prev.toSpliced(prev.indexOf(props.id), 1))
            }}>-</Button>
            <Text size="xl">{cartItems.filter((el) => el === props.id).length}</Text>
            <Button m="lg" color='#f47422' onClick={() => {
              setCartItems((prev) => [...prev, props.id])
            }}>+</Button>
          </>
          :
          <Button w="50%" justify="space-between" my="lg" color='#f47422' leftSection={icon} rightSection=" " onClick={() => {
            setCartItems((prev) => [...prev, props.id])
          }
          }>ADD TO CART</Button>
        }
      </Center>

    </Card >
  )
}
