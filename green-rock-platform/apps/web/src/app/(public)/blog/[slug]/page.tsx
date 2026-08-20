import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { publicApi } from '@/lib/api';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverUrl?: string;
  publishedAt?: string;
  tags: string[];
  author?: { firstName: string; lastName: string };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const res = await publicApi.getBlogPost(slug);
    const post = res.data as BlogPost;
    return {
      title: post.title,
      description: post.excerpt || post.title,
      openGraph: post.coverUrl ? { images: [{ url: post.coverUrl }] } : undefined,
    };
  } catch {
    return { title: 'Blog Post' };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post: BlogPost;
  try {
    const res = await publicApi.getBlogPost(slug);
    post = res.data as BlogPost;
  } catch {
    notFound();
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
          </Button>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          )}
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 max-w-4xl">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {post.author && (
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author.firstName} {post.author.lastName}
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-RW', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>
      </section>

      {post.coverUrl && (
        <div className="container mx-auto px-4 -mt-4 mb-8">
          <div className="aspect-[21/9] relative overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div
            className="space-y-4 text-muted-foreground leading-relaxed [&_h2]:text-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mt-6 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </>
  );
}
