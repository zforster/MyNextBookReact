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
import { useMediaQuery } from "@mantine/hooks";
import { Rating, Badge } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import { ActionIcon } from "@mantine/core";
import { IconCaretDown, IconCaretUp, IconShoppingCart } from "@tabler/icons";

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
  const [isOverflowDesc, setIsOverflowDesc] = useState(false);
  const textRef = useRef(null);

  const isMobile = useMediaQuery("(max-width: 41em)");

  useEffect(() => {
    if (resetCollapse) {
      setSeeMore(false);
      setResetCollapse(false);
    }
  }, [resetCollapse, setSeeMore, setResetCollapse]);

  useEffect(() => {
    if (textRef.current !== null && textRef.current !== undefined) {
      const textElement = textRef.current as HTMLDivElement;
      const lineHeight = parseInt(getComputedStyle(textElement).lineHeight, 10);
      const maxHeight = lineHeight * 3;
      const isOverflowing = textElement.clientHeight > maxHeight;
      setIsOverflowDesc(isOverflowing);
    }
  }, [recommendation.description]);

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
        paddingBottom: "40px",
      }}
    >
      <Center sx={{ flexDirection: "column", display: "flex" }}>
        <Text
          lineClamp={3}
          size={isMobile ? "sm" : "md"}
          align="center"
          sx={{ color: "white" }}
        >
          {recommendation.title}
          {recommendation.subtitle && `: ${recommendation.subtitle}`}
        </Text>

        <Space h="sm" />

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
              width={isMobile ? 100 : 120}
              height={isMobile ? 172 : 192}
            />
          </a>
        </Tooltip>

        <Space h="md" />

        {recommendation.authors.length > 0 && (
          <Text size="sm" align="center" maw="400px">
            By {formatNames(recommendation.authors)}
          </Text>
        )}

        <Space h="md" />

        <Container
          sx={{
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Rating
            readOnly
            fractions={2}
            value={
              recommendation.averageRating ? recommendation.averageRating : 0
            }
          />
          <Space w="xs" />
          <Text size={"xs"} style={{ paddingTop: "3px" }}>
            {recommendation.totalRatings
              ? `${
                  recommendation.averageRating
                    ? recommendation.averageRating
                    : 0
                } Ratings`
              : "0 Ratings"}
          </Text>
        </Container>

        <Space h="md" />

        {recommendation.categories.map((category) => (
          <Badge variant="outline" key={category}>
            {category}
          </Badge>
        ))}
        {recommendation.categories.length > 0 && <Space h="md" />}
        <Button
          leftIcon={<IconShoppingCart />}
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
            <div ref={textRef}>
              <Text
                size={isMobile ? "xs" : "sm"}
                lineClamp={seeMore ? undefined : 4}
              >
                {recommendation.description}
              </Text>
            </div>
            {isOverflowDesc && (
              <Center>
                <ActionIcon onClick={() => setSeeMore(!seeMore)}>
                  {seeMore ? <IconCaretUp /> : <IconCaretDown />}
                </ActionIcon>
              </Center>
            )}
          </Container>
        )}
      </Center>
    </Container>
  );
};

export default Book;
