import { HeadlessSDK } from 'arroact-umbraco-graphql-sdk';
import { cache } from 'react';

const isServer = typeof window === 'undefined';

if (isServer && !process.env.GRAPHQL_URL) {
  throw new Error('GRAPHQL_URL environment variable is required');
}

if (isServer && !process.env.NEXT_PUBLIC_ENV) {
  throw new Error('NEXT_PUBLIC_ENV environment variable is required');
}

const sdk = isServer ? new HeadlessSDK({
  environment: process.env.NEXT_PUBLIC_ENV as 'development' | 'staging' | 'production',
  graphqlUrl: process.env.GRAPHQL_URL!,
  mediaUrl: process.env.MEDIA_URL,
  apiKey: process.env.GRAPHQL_API_KEY,
  rootContentId: process.env.ROOT_CONTENT_ID,
  enableLogging: process.env.NEXT_PUBLIC_ENV === 'development',
  enableCache: process.env.NEXT_PUBLIC_ENV === 'production',
}) : null as any;

const getCachedRoot = cache(async () => {
  return await sdk.getRoot();
});

const getCachedChildren = cache(async (id: string, options?: any) => {
  return await sdk.getChildrenById(id, options);
});

export async function getContent(slug?: string[]) {
  if (!slug || slug.length === 0) {
    return await getCachedRoot();
  }

  const pathname = `/${slug.join('/')}`;
  const { page, children } = await sdk.getPageBySlugWithOptions(pathname);
  if (page) {
    page.children = children;
  }
  return page;
}

const umbracoContext = {
  getPageBySlug: sdk.getPageBySlug.bind(sdk),
  getContentById: sdk.getContentById.bind(sdk),
  getRoot: getCachedRoot,
  getMediaUrl: sdk.getMediaUrl.bind(sdk),
  currentContent: getCachedRoot,
  getContent,
  getRootChildren: sdk.getRootChildren.bind(sdk),
  getChildrenById: getCachedChildren,
  getPageBySlugWithOptions: sdk.getPageBySlugWithOptions.bind(sdk),
};

export default umbracoContext;
