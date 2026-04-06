import { notFound } from 'next/navigation';
import umbracoContext from '@/lib/umbracocontext';
import { Metadata } from 'next';
import { loadView } from '@/lib/viewLoader';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await umbracoContext.getContent(slug);
  const rootContent = await umbracoContext.getRoot();
  if (!content) {
    return {
      title: 'Page Not Found',
    };
  }

  // Use pageTitle property if available, fallback to name
  const pageTitle = content.Value('pageTitle') || content.name || 'Page';
  const siteName = rootContent?.Value('sitename') || 'Site';

  return {
    title: `${pageTitle} - ${siteName}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const content = await umbracoContext.getContent(slug);

  if (!content) {
    notFound();
  }
  const View = await loadView(content.contentType);

  if (!View) {
    return (
      <div>
        <h1>View Not Found</h1>
        <p>View file for content type <strong>{content.contentType}</strong> is not found in the views folder.</p>
        <p>Please create: <code>src/views/{content.contentType.toLowerCase()}.tsx</code></p>
        <p>You can create <strong>{content.contentType}</strong> view by using command:</p>
        <pre>npm run add:view -- {content.contentType.toLowerCase()}</pre>
      </div>
    );
  }

  return <View Model={content} searchParams={resolvedSearchParams} />;
}
