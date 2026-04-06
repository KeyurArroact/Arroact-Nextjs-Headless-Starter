import Link from 'next/link';
import umbracoContext from '@/lib/umbracocontext';
import { PageModel } from 'arroact-umbraco-graphql-sdk';

interface SubNavigationProps {
  currentPage: PageModel;
}

export default async function SubNavigation({ currentPage }: SubNavigationProps) {
  let children: PageModel[] = [];

  try {
    if (currentPage.id) {
      children = await umbracoContext.getChildrenById(currentPage.id, {
        where: {
          propertyKey: 'umbracoNaviHide',
          propertyValue: 'False'
        }
      });
    }
  } catch (error) {
    console.error('Error loading sub-navigation:', error);
  }

  if (children.length === 0) {
    return null;
  }

  return (
    <nav>
      {children.map((item: PageModel) => (
        <div key={item.id}>
          <Link 
            className="nav-link nav-link--black nav-link--air-bottom" 
            href={item.url || '#'}
          >
            {item.name}
          </Link>
        </div>
      ))}
    </nav>
  );
}
