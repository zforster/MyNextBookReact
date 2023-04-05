import { Book as Recommendation } from "../datatypes/recommendation";
import { Container, Image, Text } from "@mantine/core";
import { Rating, Group, Badge } from "@mantine/core";

// const Book = ({ recommendation }: { recommendation: Recommendation }) => {
//   const formatNames = (names: string[]) => {
//     switch (names.length) {
//       case 1:
//         return names[0];
//       case 2:
//         return names.join(" & ");
//       default:
//         return "";
//     }
//   };

//   const TitleText = ({
//     recommendation,
//   }: {
//     recommendation: Recommendation;
//   }) => {
//     return (
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           flexDirection: "column",
//           padding: "15px 0 10px 0",
//           textAlign: "center",
//         }}
//       >
//         <Text size={"xl"}>{recommendation.title}</Text>
//         <Text>{formatNames(recommendation.authors)}</Text>
//         <Text lineClamp={2} size={"sm"}>
//           {recommendation.subtitle}
//         </Text>
//       </div>
//     );
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         flexDirection: "column",
//         padding: "30px",
//         maxWidth: "400px",
//         height: "450px",
//         maxHeight: "450px",
//         width: "400px",
//       }}
//     >
//       <a href={recommendation.amazonSearchUrl} target="_blank" rel="noreferrer">
//         <img
//           style={{ borderRadius: "0.25rem", width: "128px", height: "192px" }}
//           src={recommendation.thumbnailUrl}
//           alt="book_image"
//         />
//       </a>
//       <TitleText recommendation={recommendation} />
//       {recommendation.categories.map((category) => (
//         <Badge color="gray" variant="filled" style={{ margin: "0 0 10px 0" }}>
//           {category}
//         </Badge>
//       ))}
//       <Group position="center">
//         <Rating
//           readOnly
//           fractions={2}
//           value={
//             recommendation.averageRating ? recommendation.averageRating : 0
//           }
//         />
//       </Group>
//       <Text size={"xs"} style={{ paddingTop: "5px" }}>
//         {recommendation.totalRatings
//           ? `${
//               recommendation.averageRating ? recommendation.averageRating : 0
//             } Ratings`
//           : "0 Ratings"}
//       </Text>
//     </div>
//   );
// };

// export default Book;

const Book = ({ recommendation }: { recommendation: Recommendation }) => {
  return (
    <Container>
      <Image
        radius={"sm"}
        src={recommendation.thumbnailUrl}
        width={120}
        height={192}
      />
    </Container>
  );
};

export default Book;
