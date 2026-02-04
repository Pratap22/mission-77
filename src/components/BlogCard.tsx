'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';
import { BlogMetadata } from '@/lib/blogService';

interface BlogCardProps {
  post: BlogMetadata;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 h-full">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {post.coverImage && (
          <div className="relative h-64 overflow-hidden">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60" />
            
            {/* Read More Badge */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <span>Read</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        )}
        
        <div className="relative p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2 leading-tight">
            {post.title}
          </h3>
          
          <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
            {post.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-full">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span className="font-medium">{post.districtName}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-full">
              <Calendar className="h-4 w-4 text-blue-400" />
              <time dateTime={post.date} className="font-medium">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="flex items-center gap-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          {/* Hover Effect Indicator */}
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}