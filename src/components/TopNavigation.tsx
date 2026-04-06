import Link from 'next/link';
import umbracoContext from '@/lib/umbracocontext';
import { PageModel } from 'arroact-umbraco-graphql-sdk';

export default async function TopNavigation() {
  let site: PageModel | null = null;
  let selection: PageModel[] = [];

  try {
    site = await umbracoContext.getRoot();
    if (site) {
      selection = await umbracoContext.getRootChildren({
        where: {
          propertyKey: 'umbracoNaviHide',
          propertyValue: 'False'
        }
      });
    }
  } catch (error) {
  }

  if (!site) {
    return <nav></nav>;
  }

  return (
    <nav>
      <Link 
        className="nav-link" 
        href={site.url || '/'}
      >
        {site.name}
      </Link>
      {selection.map((item: PageModel) => (
        <Link 
          key={item.id}
          className="nav-link" 
          href={item.url || '#'}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
