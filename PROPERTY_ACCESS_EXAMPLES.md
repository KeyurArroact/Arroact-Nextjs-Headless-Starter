# PageModel Property Access Examples

The `PageModel` class now supports two ways to access properties:

## 1. Direct Property Access (Simplified)
Access property values directly using dot notation:

```tsx
// Simple value access
<h1>{Model.heroHeader}</h1>
<p>{Model.heroDescription}</p>

// Object property access
const backgroundUrl = Model.heroBackgroundImage?.url || '';

// Conditional rendering
{Model.heroCtaLink && (
  <a href={Model.heroCtaLink.url}>
    {Model.heroCtaCaption}
  </a>
)}
```

## 2. Metadata Access (Full Property Info)
Access property metadata (key, dataType, value) through the `properties` object:

```tsx
// Get full property metadata
const heroProp = Model.properties.heroHeader;
console.log(heroProp.key);       // "heroHeader"
console.log(heroProp.dataType);  // e.g., "Umbraco.TextBox"
console.log(heroProp.value);     // The actual value

// Check property type
if (Model.properties.heroImage?.dataType === "Umbraco.MediaPicker") {
  // Handle media picker
}
```

## 3. Legacy Methods (Still Supported)
The original methods still work for backward compatibility:

```tsx
// Get value using Value() method
const header = Model.Value('heroHeader');

// Check if property exists
if (Model.HasProperty('heroCtaLink')) {
  // Property exists and has a value
}
```

## Example Component

```tsx
import { ViewProps } from '@/types/view.types';

export default function HomeView({ Model }: ViewProps) {
  // Direct access - cleaner syntax
  const backgroundImage = Model.heroBackgroundImage?.url || '';

  // Metadata access - when you need type info
  const headerProp = Model.properties.heroHeader;
  console.log(`Property type: ${headerProp?.dataType}`);

  return (
    <section style={{ backgroundImage: `url('${backgroundImage}')` }}>
      <div>
        <h1>{Model.heroHeader}</h1>
        <p>{Model.heroDescription}</p>
        {Model.heroCtaLink && (
          <a href={Model.heroCtaLink.url}>
            {Model.heroCtaCaption}
          </a>
        )}
      </div>
    </section>
  );
}
```

## Benefits

- **Direct Access**: Cleaner, more intuitive syntax for common use cases
- **Metadata Access**: Full property information when you need to check data types or keys
- **Backward Compatible**: Existing `Value()` and `HasProperty()` methods still work
