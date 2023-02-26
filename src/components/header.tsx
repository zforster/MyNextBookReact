import { Header, Container, Group, Text } from "@mantine/core";
import { Button } from "@mantine/core";
import { IconCoffee } from "@tabler/icons";
import { IconBook } from "@tabler/icons";

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export const HeaderBanner = ({ links }: HeaderSimpleProps) => {
  const items = links.map((link) => (
    <Button variant="light" rightIcon={<IconCoffee size={14} />}>
      {link.label}
    </Button>
  ));

  return (
    <Header height={60} mb={120}>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text
            c={"white"}
            style={{ paddingRight: "7px" }}
            weight={"bolder"}
            size={"xl"}
          >
            My Next Book
          </Text>
          <IconBook style={{ color: "white" }} size={30} />
        </div>

        <Group spacing={5}>{items}</Group>
      </Container>
    </Header>
  );
};
