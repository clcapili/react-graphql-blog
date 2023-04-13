import { GraphQLClient, gql } from "graphql-request";

const hygraph = new GraphQLClient(
  "https://api-ca-central-1.hygraph.com/v2/clga3urel2kwb01ui39oz3srj/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: {slug: $slug}){
      id
      author {
        name
        title
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

const SLUGLIST = gql`
  {
    posts {
      author {
        name
        title
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
`

export async function getStaticPaths() {
  const {posts} = await hygraph.request(SLUGLIST);
  const paths = posts.map(post => ({ params: { slug: post.slug } }));

  return { 
    paths, 
    fallback: false 
  };
}

export async function getStaticProps({params}) {
  const data = await hygraph.request(QUERY, { slug: params.slug });
  
  return {
    props: {
      post: data.post,
    },
    revalidate: 10,
  }
}

export default function BlogArticle({post}) {
  return (
    <main className='pt-8 pb-16 lg:pt-16 lg:pb-24'>
      <div className='flex justify-between px-4 mx-auto max-w-screen-xl'>
        <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
          <header class="mb-4 lg:mb-6 not-format">
            <address class="flex items-center mb-6 not-italic">
                <div class="inline-flex items-center mr-3 text-sm">
                    <img class="mr-4 w-16 h-16 rounded-full" src={post.author.avatar.url} alt={post.author.avatarAlt} />
                    <div>
                        <a href="#" rel="author" class="text-xl font-bold">{post.author.name}</a>
                        <p class="text-base font-light text-gray-500">{post.author.title}</p>
                        <p class="text-base font-light text-gray-500"><time pubdate datetime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time></p>
                    </div>
                </div>
            </address>
            <h1 class="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 lg:text-4xl">{post.title}</h1>
          </header>

          <div dangerouslySetInnerHTML={
            {__html: post.content.html}
          }></div>
        </article>
      </div>
    </main>
  );
}
