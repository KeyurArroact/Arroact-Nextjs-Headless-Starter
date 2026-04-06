import umbracoContext from '@/lib/umbracocontext';
import Link from 'next/link';
import type { PageModel } from 'arroact-umbraco-graphql-sdk';
import Pagination from './Pagination';

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

interface BlogListProps {
  blogNodeId: string;
  postsPerPage: number;
  currentPage: number;
  blogUrl: string;
}

export default async function BlogList({ blogNodeId, postsPerPage, currentPage, blogUrl }: BlogListProps) {
  const skip = (currentPage - 1) * postsPerPage;
  
  console.log('BlogList - Blog Node ID:', blogNodeId);
  console.log('BlogList - Posts Per Page:', postsPerPage);
  console.log('BlogList - Current Page:', currentPage);
  console.log('BlogList - Skip:', skip);
  
  let blogPosts: PageModel[] = [];
  let hasMore = false;
  
  try {
    const fetchedPosts = await umbracoContext.getChildrenById(blogNodeId, {
      first: postsPerPage + 1,
      skip: skip
    });
    
    hasMore = fetchedPosts.length > postsPerPage;
    blogPosts = hasMore ? fetchedPosts.slice(0, postsPerPage) : fetchedPosts;
    
    console.log('BlogList - Fetched posts count:', blogPosts.length);
    console.log('BlogList - Has more pages:', hasMore);
  } catch (error) {
    console.error('BlogList - Error fetching posts:', error);
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
    <>
      <div className="blogposts">
        {blogPosts.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          blogPosts.map((post) => (
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
          ))
        )}
      </div>
      
      {blogPosts.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={currentPage}
          baseUrl={blogUrl}
          hasMore={hasMore}
        />
      )}
    </>
  );
}
