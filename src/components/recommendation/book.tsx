import { Book as BookType } from "../../datatypes/recommendation";
import {
  Button,
  Center,
  Container,
  Image,
  Menu,
  Space,
  Text,
} from "@mantine/core";
import { Rating, Badge } from "@mantine/core";
import { useState } from "react";
import { IconShoppingCart } from "@tabler/icons";
import ReactGA from "react-ga4";

type BookProps = {
  recommendation: BookType;
  resetCollapse: boolean;
  isMobile: boolean;
  setResetCollapse: (resetCollapse: boolean) => void;
};

const Book = ({
  recommendation,
  resetCollapse,
  isMobile,
  setResetCollapse,
}: BookProps) => {
  const [openAmazonMenu, setOpenAmazonMenu] = useState(false);

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

        <Image
          radius={"sm"}
          src={recommendation.thumbnailUrl}
          width={isMobile ? 100 : 120}
          height={isMobile ? 172 : 192}
        />

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

        <Menu opened={openAmazonMenu} onChange={setOpenAmazonMenu}>
          <Menu.Target>
            <Button leftIcon={<IconShoppingCart />} variant="light">
              Find on Amazon
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            {[
              {
                region: "Amazon UK",
                baseUrl: "https://amazon.co.uk",
                affiliateTag: "&tag=pagepundit-21",
              },
              {
                region: "Amazon US",
                baseUrl: "https://amazon.com",
                affiliateTag: "&tag=pagepundit-20",
              },
            ].map((item) => (
              <Menu.Item
                onClick={() => {
                  const url = `${item.baseUrl}/${recommendation.amazonSearchUrl}${item.affiliateTag}`;
                  const w = window.open(
                    `${item.baseUrl}/${recommendation.amazonSearchUrl}${item.affiliateTag}`,
                    "_blank"
                  );
                  if (w) {
                    w.focus();
                  }
                  ReactGA.event({
                    category: "Book Reccomendation",
                    action: "Amazon Link Click",
                    label: url,
                  });
                }}
              >
                {item.region}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>

        <Space h="md" />

        {recommendation.description && (
          <Container>
            <Text size={isMobile ? "xs" : "sm"} lineClamp={4} align="center">
              {recommendation.description}
            </Text>
          </Container>
        )}
      </Center>
    </Container>
  );
};

export default Book;
