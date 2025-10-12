import { getBlogPost, getAllBlogSlugs } from '@/lib/blogService';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, User, Tag } from 'lucide-react';
import Logo from '@/components/Logo';
import MDXContent from '@/components/MDXContent';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import ReadingProgress from '../../../components/ReadingProgress';

export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found - Mission 77 Nepal',
      description: 'The requested blog post could not be found.',
    };
  }

  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = new Date(post.date).toISOString();
  const imageUrl = post.coverImage ? `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mission77.pratapsharma.io'}${post.coverImage}` : undefined;

  return {
    title: `${post.title} | Mission 77 Nepal - ${post.districtName} District`,
    description: post.description,
    keywords: [
      'Nepal travel',
      'Nepal districts',
      post.districtName,
      post.districtId,
      'Nepal adventure',
      'travel blog',
      'Nepal tourism',
      ...(post.tags || [])
    ].join(', '),
    authors: [{ name: post.author || 'Mission 77 Nepal' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [post.author || 'Mission 77 Nepal'],
      tags: post.tags,
      url: `/blog/${slug}`,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Reading Progress Bar */}
      <ReadingProgress />
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Stories</span>
            </Link>
            <Logo />
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Article Header */}
        <article className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 rounded-3xl pointer-events-none" />
          
          <header className="relative mb-12 p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl">
            {post.coverImage && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}

            <div className="text-center mb-8">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                  {post.title}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                {post.description}
              </p>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-8 pb-8 border-b border-gray-700/50">
              <div className="flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-full">
                <MapPin className="h-5 w-5 text-blue-400" />
                <Link 
                  href={`/?district=${post.districtId}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  {post.districtName}
                </Link>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-400" />
                <time dateTime={post.date} className="text-gray-300">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
              </div>

              {post.author && (
                <div className="flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-full">
                  <User className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300 font-medium">{post.author}</span>
                </div>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                  >
                    <Tag className="h-4 w-4" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="relative">
            <MDXContent>
              <MDXRemote 
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeHighlight],
                  },
                }}
              />
            </MDXContent>
          </div>
        </article>

        {/* Article Footer */}
        <footer className="mt-16 p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-4">Continue Your Journey</h3>
            <p className="text-gray-300 mb-6">Explore more stories from Nepal&apos;s diverse districts</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>View All Stories</span>
            </Link>
            
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MapPin className="h-5 w-5" />
              <span>Explore Map</span>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

