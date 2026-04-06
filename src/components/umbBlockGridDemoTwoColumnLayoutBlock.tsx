import type { BlockComponentProps } from '@/lib/BlockGridRenderer';
import BlockAreaRenderer from '@/lib/BlockAreaRenderer';

export default async function umbBlockGridDemoTwoColumnLayoutBlock({ Model }: BlockComponentProps) {
  return (
   <div className="umb-block-grid__area-container"
     style={{"--umb-block-grid--area-grid-columns": Model.areaGridColumns?.toString() ?? Model.gridColumns?.toString() ?? "12"} as React.CSSProperties}>
      <BlockAreaRenderer Model={Model} />
    </div>
  );
}
