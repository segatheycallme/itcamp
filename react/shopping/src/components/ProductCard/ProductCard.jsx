import { FaShoppingCart } from "react-icons/fa"
import { Button, Card, Center, Image, Text } from '@mantine/core'
import { useContext } from "react"
import { context } from "../../App"

export default function ProductCard(props) {
  const icon = <FaShoppingCart />
  const [cartItems, setCartItems] = useContext(context)
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
      <Text fw={500} size="xl">
        {props.title}
      </Text>
      <Text fw={800} size="xl" ml="sm">
        {props.cost}
      </Text>

      <Center>
        {cartItems.find((el) => el === props.id) ?
          <>
            <Button w="15%" m="sm" color='#f47422'>-</Button>
            <Button w="15%" m="sm" color='#f47422'>+</Button>
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
