import { getAllBlogSlugs } from '@/lib/blogService';

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Travel Stories from Nepal",
            "description": "Chronicles from exploring all 77 districts of Nepal",
            "image": "https://mission77.pratapsharma.io/images/blog/og-image.jpg",
            "author": {
              "@type": "Person",
              "name": "Mission 77 Nepal"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Mission 77 Nepal",
              "logo": {
                "@type": "ImageObject",
                "url": "https://mission77.pratapshchina.io/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://mission77.pratapshchina.io/blog"
            }
          }),
        }}
      />
      {children}
    </>
  );
}
