import type { BlockComponentProps } from '@/lib/BlockGridRenderer';

export default async function umbBlockGridDemoRichTextBlock({ Model }: BlockComponentProps) {
  return (
   <div dangerouslySetInnerHTML={{ __html: Model.richText }} />
  );
}
