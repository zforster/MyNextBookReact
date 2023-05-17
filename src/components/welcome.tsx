import { Card, Text } from "@mantine/core";

const Welcome = () => (
  <Card maw="500px" withBorder={true} color="primary">
    <Text color="white" size={"xl"} fw={700}>
      Welcome to PagePundit 👋
    </Text>
    <Text color="white" size={"sm"} py={"xs"}>
      We use AI to take the hassle out of finding your next great read!
    </Text>
    <Text color="white" size={"sm"} pb="xs">
      Want to get started? Tell us about the book you are looking for. For
      example:
    </Text>
    <Text size={"sm"}>'Books that discuss the impact of AI'</Text>
    <Text color="white" size={"sm"} pt="xs">
      Press enter and we'll provide book recommendations in 10-20 seconds!
    </Text>
  </Card>
);

export default Welcome;
