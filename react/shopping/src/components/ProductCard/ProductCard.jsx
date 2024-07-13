import { FaShoppingCart } from "react-icons/fa"
import { Button, Card, Center, Image, Text } from '@mantine/core'

export default function ProductCard(props) {
  const icon = <FaShoppingCart />
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
            w={300}
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
        <Button w="50%" justify="space-between" my="lg" color='#f47422' leftSection={icon} rightSection=" ">ADD TO CART</Button>
      </Center>

    </Card>
  )
}
