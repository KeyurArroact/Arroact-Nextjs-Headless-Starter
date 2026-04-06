import { ViewProps } from '@/types/view.types';
import SectionHeader from '@/components/SectionHeader';
import BlockGridRenderer from '@/lib/BlockGridRenderer';

export default function BlogpostView({ Model }: ViewProps) {
  const categories = Model.Value('categories');
  let categoryArray: string[] = [];
  
  if (categories) {
    if (typeof categories === 'string') {
      try {
        categoryArray = JSON.parse(categories);
      } catch {
        categoryArray = categories.split(',').map(c => c.trim()).filter(Boolean);
      }
    } else if (Array.isArray(categories)) {
      categoryArray = categories;
    }
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
      <SectionHeader Model={Model} />
      <section className="section">
        <div className="container">
          <article>
            <div className="blogpost-meta">
              <small className="blogpost-date">{formatDate(Model.publishedDate)}</small>
              <span className="blogpost-cat">
                {categoryArray.map((category, index) => (
                  <span key={index}>
                    {category}{' '}
                  </span>
                ))}
              </span>
            </div>
            <h3>{Model.excerpt}</h3>
            <BlockGridRenderer blockGridData={Model.bodyText} />
           
            {/* todo: implement discus comments */}
          </article>
        </div>
      </section>
    </>
  );
}
