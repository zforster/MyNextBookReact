import { Header, Container } from "@mantine/core";
import { IconBook } from "@tabler/icons";

export const HeaderBanner = () => {
  return (
    <Header height={50} mb={120}>
      <Container
        style={{
          display: "flex",
          height: "100%",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href={"/#/home"}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconBook style={{ color: "gray" }} size={30} />
        </a>
      </Container>
    </Header>
  );
};
