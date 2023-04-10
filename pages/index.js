import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "@/components/BlogCard";

const hygraph = new GraphQLClient(
  "https://api-ca-central-1.hygraph.com/v2/clga3urel2kwb01ui39oz3srj/master"
);

const QUERY = gql`
  {
    posts {
      id
      title
      slug
      featuredImage {
        url
      }
      content {
        html
      }
      date_published
      author {
        name
        avatar {
          url
        }
      }
    }
  }
`;

export async function getStaticProps() {
  const {posts} = await hygraph.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

export default function Home({ posts }) {
  return (
    <main>
      {posts.map((post) => (
        <BlogCard 
          key={post.id} 
          title={post.title} 
          slug={post.slug} 
          author={post.author} 
          featuredImage={post.featuredImage} 
          datePublished={post.date_published}
        />
      ))}
    </main>
  );
}
