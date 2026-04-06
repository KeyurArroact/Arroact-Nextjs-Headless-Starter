import type { BlockComponentProps } from '@/lib/BlockGridRenderer';

export default async function umbBlockGridDemoHeadlineBlock({ Model }: BlockComponentProps) {
  return (
    <h2 style={{ padding: '20px' }}>{Model.Value("headline")}</h2>
  );
}
