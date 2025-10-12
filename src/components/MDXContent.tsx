import React from 'react';

interface MDXContentProps {
  children: React.ReactNode;
}

export default function MDXContent({ children }: MDXContentProps) {
  return (
    <div className={`prose prose-invert prose-slate max-w-none prose-lg
      prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight prose-headings:leading-tight
      
      prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:font-bold prose-h1:text-white prose-h1:border-b prose-h1:border-gray-700 prose-h1:pb-4
      
      prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:font-semibold prose-h2:text-blue-100 prose-h2:leading-tight
      
      prose-h3:text-2xl prose-h3:mb-5 prose-h3:mt-8 prose-h3:font-medium prose-h3:text-blue-200 prose-h3:leading-tight
      
      prose-h4:text-xl prose-h4:mb-4 prose-h4:mt-6 prose-h4:font-medium prose-h4:text-blue-300 prose-h4:leading-tight
      
      prose-p:text-gray-200 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:tracking-wide prose-p:font-normal
      
      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline prose-a:font-normal prose-a:transition-colors prose-a:duration-200
      
      prose-strong:text-white prose-strong:font-semibold
      
      prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2
      prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2
      prose-li:text-gray-200 prose-li:mb-1 prose-li:text-lg prose-li:leading-relaxed prose-li:font-normal
      
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:pr-6 prose-blockquote:py-4 prose-blockquote:italic prose-blockquote:text-gray-300 prose-blockquote:bg-gray-800/50 prose-blockquote:rounded-r-lg prose-blockquote:my-8 prose-blockquote:text-lg prose-blockquote:leading-relaxed prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:border-l-blue-400
      
      prose-code:text-blue-300 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-gray-700 prose-code:font-normal
      
      prose-pre:bg-gray-900 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border prose-pre:border-gray-700 prose-pre:shadow-lg prose-pre:my-8 prose-pre:font-mono prose-pre:text-sm
      
      prose-img:rounded-lg prose-img:shadow-lg prose-img:mb-8 prose-img:border prose-img:border-gray-700 prose-img:transition-opacity prose-img:duration-300 hover:prose-img:opacity-90
      
      prose-hr:border-gray-700 prose-hr:my-12 prose-hr:border-t prose-hr:border-solid
      
      prose-table:text-gray-200 prose-table:border-collapse prose-table:border prose-table:border-gray-700 prose-table:rounded-lg prose-table:overflow-hidden prose-table:my-8 prose-table:shadow-lg
      prose-th:bg-gray-800 prose-th:text-white prose-th:font-semibold prose-th:px-4 prose-th:py-3 prose-th:border prose-th:border-gray-700 prose-th:text-left
      prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-gray-700 prose-td:bg-gray-900/50 prose-td:text-gray-200`}>
      {children}
    </div>
  );
}