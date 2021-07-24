import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import Link from 'next/link';

const PostPage = ({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) => {
  return (
    <>
      <Link href='/'>
        <a className='btn btn-back'>Go Back</a>
      </Link>
      <div className='card card-page'>
        <h1 className='post-title'>{title}</h1>
        <div className='post-date'>Posted on {date}</div>
        <img src={cover_image} alt='' />
        <div className='post-body'>
          <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  console.log('paths=', paths);
  /* print in terminal when refreshing http://localhost:3000/blog/django-crash-course
    paths= [
      { params: { slug: 'django-crash-course' } },
      { params: { slug: 'javascript-performance-tips' } },
      { params: { slug: 'new-in-php-8' } },
      { params: { slug: 'python-book-review' } },
      { params: { slug: 'react-crash-course' } },
      { params: { slug: 'tailwind-vs-bootstrap' } },
      { params: { slug: 'writing-great-unit-tests' } }
    ]
 */

  return {
    // paths: [{ params: { slug: 'my slug' } }],
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  console.log('slug=', slug); // return slug= javascript-performance-tips when you refresh on http://localhost:3000/blog/javascript-performance-tips page.

  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}

export default PostPage;
