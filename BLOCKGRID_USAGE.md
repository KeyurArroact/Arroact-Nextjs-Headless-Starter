# Block Grid Renderer Usage

## Overview
The `BlockGridRenderer` component dynamically loads and renders Umbraco Block Grid components based on their content types.

## Basic Usage

```tsx
import BlockGridRenderer from '@/components/BlockGridRenderer';
import { ViewProps } from '@/types/view.types';

export default function MyView({ Model }: ViewProps) {
  return (
    <div>
      <h1>{Model.title}</h1>
      
      {/* Render Block Grid property */}
      <BlockGridRenderer blockGridData={Model.Value('mainContent')} />
    </div>
  );
}
```

## How It Works

1. **Receives Block Grid Data**: Pass the Block Grid data directly using `Model.Value('propertyAlias')`
2. **Identifies Content Types**: For each block, it identifies the content type (e.g., "heroBlock", "textBlock")
3. **Loads Components**: Dynamically imports the corresponding component from `/src/components/`
4. **Renders or Shows Error**: If component exists, it renders it. If not, shows a helpful error message

**Note**: BlockGridRenderer is a client component, so you must pass plain data (not the Model class instance) to avoid serialization issues.

## Component Naming Convention

Content Type → Component Name:
- `heroBlock` → `HeroBlock.tsx`
- `textBlock` → `TextBlock.tsx`
- `imageGallery` → `ImageGallery.tsx`

## Creating Block Components

Each block component should follow this structure:

```tsx
interface YourBlockProps {
  content: any;        // Block content data
  settings?: any;      // Block settings (optional)
}

export default function YourBlock({ content, settings }: YourBlockProps) {
  return (
    <div className="your-block">
      <h2>{content?.heading}</h2>
      <p>{content?.text}</p>
    </div>
  );
}
```

**Note**: Block components receive only `content` and `settings` props. If you need page-level data, pass it through the content structure in Umbraco.

## Error Handling

If a component is missing, the renderer displays:
- Component name that's missing
- Content type information
- Command to create the component

Example error message:
```
⚠️ Component Not Found
HeroBlock.tsx file not available in component folder.

Content Type: heroBlock

# Create the component:
npx windsurf create component HeroBlock

# Or manually create:
touch src/components/HeroBlock.tsx
```

## Example: Complete View with Block Grid

```tsx
import BlockGridRenderer from '@/components/BlockGridRenderer';
import { ViewProps } from '@/types/view.types';

export default function ContentPage({ Model }: ViewProps) {
  return (
    <>
      <section className="hero">
        <h1>{Model.pageTitle}</h1>
      </section>

      <section className="main-content">
        <BlockGridRenderer blockGridData={Model.Value('bodyContent')} />
      </section>

      <section className="sidebar">
        <BlockGridRenderer blockGridData={Model.Value('sidebarContent')} />
      </section>
    </>
  );
}
```

## Supported Block Grid Data Formats

The renderer supports multiple data structures:
- Array of blocks: `[{contentType: "...", content: {...}}, ...]`
- Object with items: `{items: [{contentType: "...", content: {...}}]}`
- Object with blocks: `{blocks: [{contentType: "...", content: {...}}]}`
