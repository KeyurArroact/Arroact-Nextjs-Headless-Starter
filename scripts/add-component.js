#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Error: Component name is required');
  console.log('Usage: npm run add-component <ComponentName>');
  process.exit(1);
}

const formattedName = componentName;

const componentDir = path.join(__dirname, '../src/components');
const componentPath = path.join(componentDir, `${formattedName}.tsx`);

// Check if component already exists
if (fs.existsSync(componentPath)) {
  console.log(`⚠️  Component ${formattedName}.tsx already exists`);
  process.exit(0);
}

// Create component template
const componentTemplate = `import type { BlockComponentProps } from '@/lib/BlockGridRenderer';

export default async function ${formattedName}({ Model }: BlockComponentProps) {
  return (
    <div className="${componentName.toLowerCase()}">
      <h2>${formattedName} Component</h2>
      
      {/* Add your component content here */}
      
      {/* Debug: Show all properties */}
      <details style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5' }}>
        <summary>Debug: Properties</summary>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify({ 
            properties: Model.properties,
            contentType: Model.contentType
          }, null, 2)}
        </pre>
      </details>
    </div>
  );
}
`;

// Ensure components directory exists
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// Write component file
fs.writeFileSync(componentPath, componentTemplate);

console.log(`✅ Created component: ${formattedName}.tsx`);
console.log(`📁 Location: src/components/${formattedName}.tsx`);
console.log(`\n🎉 Component ready! You can now use it in your BlockGrid.`);
