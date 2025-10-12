import { getAllBlogPosts } from '@/lib/blogService';
import BlogCard from '@/components/BlogCard';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { BookOpen, ArrowLeft, MapPin } from 'lucide-react';
import { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Travel Stories | Mission 77 Nepal - Chronicles from All 77 Districts',
  description: 'Read captivating travel stories and experiences from exploring all 77 districts of Nepal. Join the journey through mountains, valleys, and diverse cultures.',
  keywords: [
    'Nepal travel stories',
    'Nepal travel blog',
    '77 districts Nepal',
    'Nepal adventure stories',
    'travel blog Nepal',
    'Nepal tourism',
    'Nepal travel experiences',
    'Mission 77 Nepal'
  ].join(', '),
  openGraph: {
    title: 'Travel Stories | Mission 77 Nepal',
    description: 'Chronicles from exploring all 77 districts of Nepal',
    type: 'website',
    url: '/blog',
    images: [
      {
        url: '/images/blog/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mission 77 Nepal Travel Stories',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Stories | Mission 77 Nepal',
    description: 'Chronicles from exploring all 77 districts of Nepal',
    images: ['/images/blog/og-image.jpg'],
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <Link 
              href="/"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Map</span>
            </Link>
            <Logo />
          </div>

          {/* Hero Content */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/30">
                <BookOpen className="h-12 w-12 text-blue-400" />
              </div>
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  Travel Stories
                </span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Chronicles from my journey across all 77 districts of Nepal. 
              Discover the beauty, culture, and adventure that awaits in every corner of this incredible country.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span>{posts.length} Stories Published</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span>77 Districts to Explore</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {posts.length > 0 ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Latest Adventures
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Each story captures the essence of a different district, from the highest peaks to the deepest valleys.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">Join the Journey</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Follow along as we explore all 77 districts of Nepal. Each story brings you closer to understanding the incredible diversity and beauty of this country.
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Explore the Map</span>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 max-w-2xl mx-auto">
              <div className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/30 w-fit mx-auto mb-6">
                <BookOpen className="h-16 w-16 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Stories Coming Soon</h3>
              <p className="text-gray-300 mb-6">
                The journey has just begun! Blog posts will appear here as we explore each of Nepal&apos;s 77 districts.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MapPin className="h-5 w-5" />
                <span>Start Exploring</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

