import type { BlockComponentProps } from '@/lib/BlockGridRenderer';
import umbracoContext from '@/lib/umbracocontext';
import Link from 'next/link';
import type { PageModel } from 'arroact-umbraco-graphql-sdk';

function CategoryLinks({ categories }: { categories?: any }) {
  if (!categories) return null;
  
  let categoryArray: string[] = [];
  
  if (typeof categories === 'string') {
    try {
      categoryArray = JSON.parse(categories);
    } catch {
      categoryArray = categories.split(',').map(c => c.trim()).filter(Boolean);
    }
  } else if (Array.isArray(categories)) {
    categoryArray = categories;
  } else {
    return null;
  }
  
  if (categoryArray.length === 0) return null;
  
  return (
    <>
      {categoryArray.map((category, index) => (
        <span key={index}>
          {index > 0 && ', '}
          <span>{category}</span>
        </span>
      ))}
    </>
  );
}

export default async function latestBlogposts({ Model }: BlockComponentProps) {
  const blogNodeId = Model.startNode?.[0]?.id;
  const numberOfPosts = Model.numberOfPosts || 3;
  const currentPage = (Model as any).currentPage || 1;
  const skip = (currentPage - 1) * numberOfPosts;
  
  console.log('LatestBlogposts - Blog Node ID:', blogNodeId);
  console.log('LatestBlogposts - Number of Posts:', numberOfPosts);
  console.log('LatestBlogposts - Current Page:', currentPage);
  console.log('LatestBlogposts - Skip:', skip);
  
  let blogPosts: PageModel[] = [];
  let hasMore = false;
  
  if (blogNodeId) {
    try {
      const fetchedPosts = await umbracoContext.getChildrenById(blogNodeId, {
        first: numberOfPosts + 1,
        skip: skip
      });
      
      hasMore = fetchedPosts.length > numberOfPosts;
      blogPosts = hasMore ? fetchedPosts.slice(0, numberOfPosts) : fetchedPosts;
      
      console.log('LatestBlogposts - Fetched posts count:', blogPosts.length);
      console.log('LatestBlogposts - Has more pages:', hasMore);
      console.log('LatestBlogposts - Posts:', blogPosts.map(p => ({ id: p.id, name: p.name, url: p.url })));
    } catch (error) {
      console.error('LatestBlogposts - Error fetching posts:', error);
    }
  } else {
    console.warn('LatestBlogposts - No blog node ID provided');
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  return (
    <div className="blogposts">
      {blogPosts.map((post) => (
        <Link href={post.url} key={post.id} className="blogpost">
          <div className="blogpost-meta">
            <small className="blogpost-date">{formatDate(post.publishedDate)}</small>
            <small className="blogpost-cat">
              <CategoryLinks categories={post.Value('categories')} />
            </small>
          </div>
          <h3 className="blogpost-title">{post.Value('pageTitle')}</h3>
          <div className="blogpost-excerpt">{post.Value('excerpt')}</div>
        </Link>
      ))}
    </div>
  );
}
