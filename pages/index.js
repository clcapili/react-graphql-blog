import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "../src/components/BlogCard";

const hygraph = new GraphQLClient(
  "https://api-ca-central-1.hygraph.com/v2/clga3urel2kwb01ui39oz3srj/master"
);

const QUERY = gql`
  {
    posts {
      id
      author {
        name
        avatar {
          url
        }
        avatarAlt
      }
      title
      slug
      featuredImage {
        url
      }
      featuredImageAlt
      excerpt
      content {
        html
      }
      date_published
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
    <main className='grid max-w-[26rem] sm:max-w-[52.5rem] mt-16 sm:mt-20 md:mt-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto gap-2 lg:gap-y-4 xl:gap-x-4 lg:max-w-7xl px-3 lg:px-4 xl:px-0'>
      {posts.map((post) => (
        <BlogCard 
          key={post.id} 
          author={post.author} 
          title={post.title} 
          slug={post.slug} 
          featuredImage={post.featuredImage} 
          featuredImageAlt={post.featuredImageAlt}
          excerpt={post.excerpt} 
          datePublished={post.date_published}
        />
      ))}
    </main>
  );
}
