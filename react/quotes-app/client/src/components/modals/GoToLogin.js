import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const GoToLogin = () => {
  const [opened, { close, open }] = useDisclosure(true);

  return (
    <div
      style={{
        height: "30vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        title="You are not logged in"
      >
        <Text>To see quotes from our app, you must first log in.</Text>

        <Group mt="xl" style={{ display: "flex", justifyContent: "center" }}>
          <Button color="teal" radius="md" uppercase>
            <Link to="/" style={{ textDecoration: "none", color: "#ffffff" }}>
              GO TO LOGIN PAGE
            </Link>
          </Button>
        </Group>
      </Modal>
      <Group position="center">
        <Button color="teal" radius="md" uppercase onClick={open}>
          MESSAGE FOR YOU
        </Button>
      </Group>
    </div>
  );
};

export default GoToLogin;
