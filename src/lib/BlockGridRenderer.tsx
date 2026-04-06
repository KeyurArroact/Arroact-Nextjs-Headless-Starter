import { parseBlockGridData, logBlockInfo } from './blockgrid';
import { createBlockModel, type BlockGridItem } from 'arroact-umbraco-graphql-sdk';

export interface BlockComponentProps {
  Model: ReturnType<typeof createBlockModel>;
}

interface BlockGridRendererProps {
  blockGridData: any;
}

async function loadComponent(contentType: string, Model: ReturnType<typeof createBlockModel>) {
  try {
    const Component = await import(`@/components/${contentType}`);
    const LoadedComponent = Component.default;
    return <LoadedComponent Model={Model} />;
  } catch (error: any) {
    if (error.code === 'MODULE_NOT_FOUND' || error.message?.includes('Cannot find module')) {
      return (
        <div style={{
          padding: '20px',
          margin: '10px 0',
          border: '2px dashed #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
          color: '#c92a2a'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>⚠️ Component Not Found</h3>
          <p style={{ margin: '0 0 10px 0' }}>
            <strong>{contentType}.tsx</strong> file not available in component folder.
          </p>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
            <strong>Content Type:</strong> {contentType}
          </p>
          <div style={{
            backgroundColor: '#2d2d2d',
            color: '#f8f8f2',
            padding: '12px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <p style={{ margin: '0 0 8px 0', color: '#6272a4' }}># Create the component using script:</p>
            <code>npm run add:component {contentType}</code>
            <p style={{ margin: '12px 0 8px 0', color: '#6272a4' }}># Or manually create:</p>
            <code>touch src/components/{contentType}.tsx</code>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{
          padding: '20px',
          margin: '10px 0',
          border: '2px dashed #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
          color: '#c92a2a'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>⚠️ Component Error</h3>
          <p style={{ margin: '0 0 10px 0' }}>
            Error loading <strong>{contentType}.tsx</strong>
          </p>
          <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
            {error.message}
          </p>
        </div>
      );
    }
  }
}

export default async function BlockGridRenderer({ blockGridData }: BlockGridRendererProps) {
  const { blocks } = parseBlockGridData(blockGridData);

  if (blocks.length === 0) {
    return null;
  }

  const renderedBlocks = await Promise.all(
    blocks.map(async (block: BlockGridItem, index: number) => {
      logBlockInfo(block, index);
      
      const blockContent = { ...block.content, areas: block.areas ?? [] };
      const Model = createBlockModel(blockContent, block.settings, block.contentType);
      const component = await loadComponent(block.contentType, Model);

      return {
        component,
        key: `${block.contentType}-${index}`
      };
    })
  );

  return (
    <div className="block-grid">
      {renderedBlocks.map((item) => (
        <div key={item.key}>
          {item.component}
        </div>
      ))}
    </div>
  );
}
