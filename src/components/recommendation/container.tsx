import {
  Card,
  Center,
  Text,
  Divider,
  Menu,
  Button,
  ActionIcon,
  Container,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useState } from "react";
import { RecommendationResponse } from "../../datatypes/recommendation";
import Book from "./book";
import { DateTime } from "luxon";
import { IconCopy, IconDotsVertical, IconMenu2 } from "@tabler/icons";

type BookContainerProps = {
  recommendationResponse: RecommendationResponse;
};

const BookContainer = ({ recommendationResponse }: BookContainerProps) => {
  const [resetCollapse, setResetCollapse] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const date = new Date(recommendationResponse?.timestamp);
  const localTimestamp = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
  };

  return (
    <Center p="xl">
      <Card p="xl" withBorder>
        <Card.Section p="xs">
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          >
            <Menu opened={openMenu} onChange={setOpenMenu}>
              <Menu.Target>
                <ActionIcon size="sm">
                  <IconDotsVertical />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={<IconCopy size={14} />}>Copy Link</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>

          <Text size={"xs"} align="center">
            {`Posted ${DateTime.fromISO(localTimestamp).toRelative()}`}
          </Text>
          <Text
            sx={{ maxWidth: "500px" }}
            size={"sm"}
            lineClamp={3}
            align="center"
          >
            {recommendationResponse?.userInput}
          </Text>
        </Card.Section>

        <Divider my="xs" />

        <Card.Section p="xs">
          <Carousel
            onSlideChange={() => {
              setResetCollapse(true);
            }}
            slideGap="xl"
            maw={500}
            mx="auto"
            withIndicators
            loop
          >
            {recommendationResponse?.books?.map((book) => (
              <Carousel.Slide
                key={`${book.title} ${book.subtitle}`}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Book
                  key={book.subtitle}
                  recommendation={book}
                  resetCollapse={resetCollapse}
                  setResetCollapse={setResetCollapse}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Card.Section>
      </Card>
    </Center>
  );
};

export default BookContainer;
