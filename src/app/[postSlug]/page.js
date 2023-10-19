import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  // console.log(params);
  const blogPost = await loadBlogPost(params.postSlug);
  // could have destructured the above line like so:
  // const { frontmatter, content } = await loadBlogPost(params.postSlug);

  // console.log(blogPost);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={blogPost.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={blogPost.content} />
      </div>
    </article>
  );
}

export default BlogPost;
