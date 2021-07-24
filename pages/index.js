// The reason you don't get error for fs and path is Next is smart enough to detect that you only use these in getStaticProps,
// which will sit on the server side, so will not cause problem with client side.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';

export default function Home({ posts }) {
  console.log('posts=', posts);
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <h2>Hello</h2>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'));

  // This log will log in terminal (server side), not devtool in webpage (clicent side)
  console.log('files=', files); // print: [ 'test.md' ]

  // Get slug and frontmatter from posts
  const posts = files.map((fileName) => {
    // Create slug
    const slug = fileName.replace('.md', '');

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', fileName),
      'utf-8'
    );

    // console.log('markdownWithMeta=', markdownWithMeta); // print out the content of the test.md

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  console.log(posts);
  // print: [ { slug: 'test' } ]
  /*
    [
      {
        slug: 'test',
        frontmatter: {
          title: 'Test Post',
          date: 'June 24 2021',
          excerpt: 'This is the excerpt',
          cover_image: '/images/posts/img1,jpg'
        }
      }
    ]
  */

  return {
    props: {
      // posts: 'The Posts',
      posts: posts,
    },
  };
}
