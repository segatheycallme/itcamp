import { Button, Container, createTheme, Flex, Image, MantineProvider, MantineThemeProvider, Paper, Space, Stack, Text } from "@mantine/core";
import { useContext } from "react";
import { context } from "../../App";

function Desktop({ el, setCartItems, grisine }) {
  return (
    <Paper bg="#f5f5f5" p="sm">
      <Flex>
        <Flex align="center" gap={10 * grisine} w="60%">
          <Image src={el.image} h={130 * grisine} w={130 * grisine} />
          <Space w={50 * grisine} />
          <div>
            <Text c="dimmed" fz={16 * grisine}>
              {el.desc}
            </Text>
            <Text fw={500} fz={20 * grisine}>
              {el.title}
            </Text>
          </div>
        </Flex>
        <Flex justify="flex-end" align="center" w="40%" gap={20 * grisine}>
          <div>
            <Text fz={18 * grisine}>{el.price.toFixed(2)}</Text>
            <Text c="dimmed" fz={14 * grisine}>x{el.count} = {(el.price * el.count).toFixed(2)}</Text>
          </div>
          <Button color="#f47422" fz={14 * grisine} px={18 * grisine} ps={18 * grisine} pe={18 * grisine} onClick={() => {
            setCartItems((prev) => prev.toSpliced(prev.indexOf(el), 1))
          }}>REMOVE ALL</Button>
        </Flex>
      </Flex>
    </Paper >
  )
}

export default function Cart() {
  const [cartItems, setCartItems] = useContext(context)
  let grisine = Math.min(window.innerWidth, 800) / 800
  return (
    <Container size="md" mt="xl">
      <Stack>
        {cartItems.length ?

          cartItems
            .map((el) => {
              return (
                <Desktop el={el} setCartItems={setCartItems} grisine={grisine} />
              )
            })
          :
          <Flex align="center" justify="flex-start" direction="column" w="100%">
            <Image src="/src/assets/shop.jpg" h={500} w={500} />
            <Text size="xl" mb="xl">You haven't added anything to the cart yet!</Text>
          </Flex>
        }
      </Stack>
    </Container>
  )
}
