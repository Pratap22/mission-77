import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  districtId: string;
  districtName: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
  content: string;
}

export interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  districtId: string;
  districtName: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
}

const blogDirectory = path.join(process.cwd(), 'content/blog');

export function getAllBlogPosts(): BlogMetadata[] {
  // Check if directory exists
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || '',
        districtId: data.districtId || '',
        districtName: data.districtName || '',
        coverImage: data.coverImage,
        tags: data.tags || [],
        author: data.author || 'Anonymous',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPostsData;
}

export function getBlogPostsByDistrict(districtId: string): BlogMetadata[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter((post) => post.districtId === districtId);
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '',
      districtId: data.districtId || '',
      districtName: data.districtName || '',
      coverImage: data.coverImage,
      tags: data.tags || [],
      author: data.author || 'Anonymous',
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

