import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Modal, Button, Group, TextInput, Box } from "@mantine/core";
import { toast } from "react-hot-toast";

const AddQuote = ({ render }) => {
  const [opened, setOpened] = useState(false);
  const [userInput, setUserInput] = useState({
    content: "",
    author: "",
    tags: "",
  });
  const handleNewQuote = (event) => {
    event.preventDefault();
    axios
      .post(
        `http://localhost:8000/quotes`,
        {
          content: userInput.content,
          author: userInput.author,
          tags: userInput.tags.split(","),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        render((prev) => !prev);
        // console.log(response.data);
        setTimeout(
          () =>
            setUserInput({
              content: "",
              author: "",
              tags: "",
            }),
          100
        );
        setTimeout(() => setOpened(false), 200);
        toast("Successfully added a new Quote!", {
          icon: "🎉",
          style: {
            borderRadius: "0.8rem",
            backgroundColor: "#4e7768",
            color: "#f0fffa",
            boxShadow:
              "rgba(0, 0, 0, 0.6) 0px 4px 6px -1px, rgba(0, 0, 0, 0.2) 0px 2px 4px -1px",
          },
        });
      })
      .catch((error) => {
        render((prev) => !prev);
        // console.log(error.response.data)
      });
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add a new Quote"
      >
        <Box sx={{ minWidth: 340 }} mx="auto">
          <form onSubmit={handleNewQuote}>
            <TextInput
              withAsterisk
              label="Content"
              placeholder="Enter the Content of the Quote"
              value={userInput.content}
              onChange={(event) =>
                setUserInput((prev) => ({
                  ...prev,
                  content: event.target.value,
                }))
              }
              required
            />
            <TextInput
              withAsterisk
              label="Author"
              placeholder="Enter the Author of the Quote"
              value={userInput.author}
              onChange={(event) =>
                setUserInput((prev) => ({
                  ...prev,
                  author: event.target.value,
                }))
              }
              required
            />
            <TextInput
              withAsterisk
              label="Tags"
              placeholder="Enter the Tags of the Quote"
              value={userInput.tags}
              onChange={(event) =>
                setUserInput((prev) => ({
                  ...prev,
                  tags: event.target.value,
                }))
              }
              required
            />
            <Group
              position="right"
              mt="xl"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                uppercase
                color="teal"
                radius="md"
                style={{ width: "10rem", letterSpacing: "0.07rem" }}
              >
                add quote
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <Group position="center">
        <Button
          onClick={() => setOpened(true)}
          uppercase
          color="teal"
          radius="md"
          style={{
            width: "12rem",
            letterSpacing: "0.07rem",
            position: "relative",
            top: "1.5rem",
          }}
        >
          Add new quote
        </Button>
      </Group>
    </>
  );
};

export default AddQuote;
