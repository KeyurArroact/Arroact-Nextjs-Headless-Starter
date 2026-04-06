import { ViewProps } from '@/types/view.types';
import SectionHeader from '@/components/SectionHeader';
import BlogList from '@/components/BlogList';

export default async function BlogView({ Model, searchParams }: ViewProps) {
  const postsPerPage = Model.Value('howManyPostsShouldBeShown') || 10;
  
  const pageParam = searchParams?.page;
  const pageString = typeof pageParam === 'string' ? pageParam : Array.isArray(pageParam) ? pageParam[0] || '1' : '1';
  const currentPage = parseInt(pageString, 10);
  
  const blogNodeId = Model.id;

  console.log('Blog View - Model ID:', blogNodeId);
  console.log('Blog View - Posts Per Page:', postsPerPage);
  console.log('Blog View - Current Page:', currentPage);
  console.log('Blog View - Search Params:', searchParams);

  return (
    <>
      <SectionHeader Model={Model} />

      <section className="section">
        <div className="container">
          <BlogList 
            blogNodeId={blogNodeId}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            blogUrl={Model.url}
          />
        </div>
      </section>
    </>
  );
}
