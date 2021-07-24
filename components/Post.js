import React from 'react';
import Link from 'next/link';

const Post = ({ post }) => {
  return (
    <div className='card'>
      <img src={post.frontmatter.cover_image} alt='' />
    </div>
  );
};

export default Post;
