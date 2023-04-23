import { Book as BookType } from "../../datatypes/recommendation";
import {
  Button,
  Center,
  Container,
  Image,
  Space,
  Text,
  Tooltip,
} from "@mantine/core";
import { Badge } from "@mantine/core";
import { useEffect, useState } from "react";
import { ActionIcon } from "@mantine/core";
import { IconCaretDown, IconCaretUp } from "@tabler/icons";

type BookProps = {
  recommendation: BookType;
  resetCollapse: boolean;
  setResetCollapse: (resetCollapse: boolean) => void;
};

const Book = ({
  recommendation,
  resetCollapse,
  setResetCollapse,
}: BookProps) => {
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    if (resetCollapse) {
      setSeeMore(false);
      setResetCollapse(false);
    }
  }, [resetCollapse, setSeeMore, setResetCollapse]);

  const formatNames = (names: string[]) => {
    switch (names.length) {
      case 2:
        return names.join(" & ");
      default:
        return names[0];
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        paddingBottom: "60px",
        marginRight: "20px",
        marginLeft: "20px",
      }}
    >
      <Center sx={{ flexDirection: "column", display: "flex" }}>
        <Text
          size={"md"}
          align="center"
          sx={{ maxWidth: "500px", color: "white" }}
        >
          {recommendation.title}
          {recommendation.subtitle && `: ${recommendation.subtitle}`}
        </Text>

        <Space h="md" />

        <Tooltip label="Find on Amazon">
          <a
            href={recommendation.amazonSearchUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              sx={{
                "&:hover": {
                  opacity: "0.7",
                },
              }}
              radius={"sm"}
              src={recommendation.thumbnailUrl}
              width={120}
              height={192}
            />
          </a>
        </Tooltip>

        <Space h="md" />

        {recommendation.authors.length > 0 && (
          <Text size="sm" align="center">
            By {formatNames(recommendation.authors)}
          </Text>
        )}

        <Space h="md" />

        <Button
          variant="light"
          onClick={() => {
            const w = window.open(recommendation.amazonSearchUrl, "_blank");
            if (w) {
              w.focus();
            }
          }}
        >
          Find on Amazon
        </Button>

        <Space h="md" />

        {recommendation.description && (
          <Container>
            <Text size={"sm"} lineClamp={seeMore ? undefined : 4}>
              {recommendation.description}
            </Text>
            <Center>
              <ActionIcon onClick={() => setSeeMore(!seeMore)}>
                {seeMore ? <IconCaretUp /> : <IconCaretDown />}
              </ActionIcon>
            </Center>
          </Container>
        )}
      </Center>
    </Container>
  );
};

export default Book;
