import umbracoContext from '@/lib/umbracocontext';

export async function exampleGetRootChildren() {
  const children = await umbracoContext.getRootChildren({
    first: 10,
    skip: 0,
  });
  
  return children;
}

export async function exampleGetRootChildrenWithFilter() {
  const children = await umbracoContext.getRootChildren({
    first: 10,
    where: {
      propertyKey: 'umbracoNaviHide',
      propertyValue: 'False',
    },
  });
  
  return children;
}

export async function exampleGetRootChildrenWithSort() {
  const children = await umbracoContext.getRootChildren({
    first: 10,
    orderBy: 'DESC',
  });
  
  return children;
}

export async function exampleGetRootChildrenWithPropertySort() {
  const children = await umbracoContext.getRootChildren({
    first: 10,
    orderByProperty: {
      propertyKey: 'createDate',
      direction: 'DESC',
    },
  });
  
  return children;
}

export async function exampleGetRootChildrenNoOptions() {
  const children = await umbracoContext.getRootChildren();
  
  return children;
}

export async function exampleGetPageBySlugWithChildren() {
  const result = await umbracoContext.getPageBySlugWithOptions('/blog', {
    first: 10,
    orderBy: 'DESC',
  });
  
  const { page, children } = result;
  
  return { page, children };
}

export async function exampleGetPageBySlugNoOptions() {
  const result = await umbracoContext.getPageBySlugWithOptions('/about');
  
  const { page, children } = result;
  
  return { page, children };
}
