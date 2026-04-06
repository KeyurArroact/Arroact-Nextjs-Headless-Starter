import { PageModel } from 'arroact-umbraco-graphql-sdk';

export interface ViewProps {
  Model: PageModel;
  searchParams?: { [key: string]: string | string[] | undefined };
}
