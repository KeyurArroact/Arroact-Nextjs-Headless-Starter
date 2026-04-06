import { createBlockModel, type BlockGridArea } from 'arroact-umbraco-graphql-sdk';

export interface BlockAreaComponentProps {
  area: BlockGridArea;
  children: React.ReactNode;
}

interface BlockAreaRendererProps {
  Model: ReturnType<typeof createBlockModel>;
}

async function loadBlockComponent(contentType: string, Model: ReturnType<typeof createBlockModel>) {
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

async function renderAreaItems(area: BlockGridArea) {
  if (area.items.length === 0) return [];

  return Promise.all(
    area.items.map(async (item, index) => {
      if (!item.contentType) return { component: null, key: `area-item-${index}` };

      const itemContent = { ...item.content, areas: item.areas ?? [] };
      const Model = createBlockModel(itemContent, item.settings, item.contentType);
      const component = await loadBlockComponent(item.contentType, Model);

      return {
        component,
        key: `${item.contentType}-${index}`,
      };
    })
  );
}

async function loadAreaComponent(alias: string, area: BlockGridArea, renderedItems: { component: any; key: string }[]) {
  try {
    const Component = await import(`@/components/${alias}`);
    const LoadedComponent = Component.default;
    const itemNodes = renderedItems.map((item) => (
      <div key={item.key}>{item.component}</div>
    ));
    return <LoadedComponent area={area}>{itemNodes}</LoadedComponent>;
  } catch (error: any) {
    if (error.code === 'MODULE_NOT_FOUND' || error.message?.includes('Cannot find module')) {
      return (
        <div data-area={alias}>
          {renderedItems.map((item) => (
            <div key={item.key}>{item.component}</div>
          ))}
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
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>⚠️ Area Component Error</h3>
          <p style={{ margin: '0 0 10px 0' }}>
            Error loading area component <strong>{alias}.tsx</strong>
          </p>
          <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
            {error.message}
          </p>
        </div>
      );
    }
  }
}

export default async function BlockAreaRenderer({ Model }: BlockAreaRendererProps) {
  const areas: BlockGridArea[] = Model.areas ?? [];

  if (areas.length === 0) {
    return null;
  }

  const renderedAreas = await Promise.all(
    areas.map(async (area, index) => {
      const renderedItems = await renderAreaItems(area);
      const component = await loadAreaComponent(area.alias, area, renderedItems);

      return {
        component,
        key: `area-${area.alias}-${index}`,
      };
    })
  );

  return (
    <>
      {renderedAreas.map((area, index) => {
        const raw = areas[index];
        return (
          <div
            key={area.key}
            className="umb-block-grid__area"
            style={{
              "--umb-block-grid--area-column-span": raw?.columnSpan?.toString() ?? "1",
              "--umb-block-grid--area-row-span": raw?.rowSpan?.toString() ?? "1",
            } as React.CSSProperties}
          >
            {area.component}
          </div>
        );
      })}
    </>
  );
}
