import { Button, Center, Container, Flex, Image, Paper, Space, Stack, Text } from "@mantine/core";
import { useContext } from "react";
import { context } from "../../App";
import { useState } from 'react'
import { formatPrice } from "../../utils/formattedPrice";

function CartCard({ el, setCartItems, scale, setModal, cartItems }) {
  const [forceRefresh, setForceRefresh] = useState(false)
  return (
    <Paper bg="#f5f5f5" p="sm">
      <Flex>
        <Flex align="center" gap={10 * scale} w="60%">
          <Image src={el.image} h={130 * scale} w={130 * scale} />
          <Space w={50 * scale} />
          <div>
            <Text c="dimmed" fz={16 * scale}>
              {el.desc}
            </Text>
            <Text fw={500} fz={20 * scale}>
              {el.title}
            </Text>
          </div>
        </Flex>
        <Flex justify="flex-end" align="center" w="40%" gap={20 * scale}>
          <div>
            <Text fz={18 * scale}>{formatPrice(el.price)}</Text>
            <Text c="dimmed" fz={14 * scale}>x{el.count} = {formatPrice(el.price * el.count)}</Text>
          </div>
          <div>
            <Center>
              <Button disabled={el.count >= el.stock} fz={14 * scale} px={12 * scale} ps={12 * scale} pe={12 * scale} h={25} mb={10} color="#f47422" onClick={() => {
                el.count++
                localStorage.setItem("cart", JSON.stringify(cartItems))
                setForceRefresh(!forceRefresh)
              }}>+</Button>
            </Center>
            <Center>
              <Text fz={18 * scale}>{el.count}</Text>
            </Center>
            <Center>
              <Button fz={14 * scale} px={12 * scale} ps={12 * scale} pe={12 * scale} h={25} mt={10} color="#f47422" onClick={() => {
                if (el.count < 2) {
                  setModal({
                    title: "Are you sure you want to remove this item from the cart?", confirm: () => {
                      setCartItems((prev) => prev.filter((item) => el.id !== item.id))
                      localStorage.setItem("cart", JSON.stringify(cartItems))
                      setModal({})
                    }, cancel: () => { setModal({}) }
                  })
                } else {
                  el.count--
                  localStorage.setItem("cart", JSON.stringify(cartItems))
                  setForceRefresh(!forceRefresh)
                }
              }}>-</Button>
            </Center>
          </div>
        </Flex>
        <Space w={30 * scale} />
      </Flex>
    </Paper >
  )
  // <Button color="#f47422" fz={14 * scale} px={18 * scale} ps={18 * scale} pe={18 * scale} onClick={() => {
  //   setCartItems((prev) => prev.toSpliced(prev.indexOf(el), 1))
  // }}>REMOVE ALL</Button>
}

export default function Cart({ setModal }) {
  const [cartItems, setCartItems] = useContext(context)
  let scale = Math.min(window.innerWidth, 800) / 800
  return (
    <Container size="md" mt="xl">
      <Stack>
        {cartItems.length ?

          cartItems
            .map((el) => {
              return (
                <CartCard el={el} setCartItems={setCartItems} scale={scale} setModal={setModal} cartItems={cartItems} />
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
