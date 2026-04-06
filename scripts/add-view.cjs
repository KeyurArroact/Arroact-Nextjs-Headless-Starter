const fs = require('fs');
const path = require('path');

function toSafeName(input) {
  return String(input || '')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .toLowerCase();
}

function toPascalCase(input) {
  const parts = String(input || '')
    .trim()
    .split(/[-_\s]+/)
    .filter(Boolean);

  return parts.map((p) => p[0].toUpperCase() + p.slice(1)).join('');
}

function main() {
  const rawName = process.argv[2];
  const name = toSafeName(rawName);

  if (!name) {
    console.error('Usage: npm run add:view -- <viewName>');
    console.error('Example: npm run add:view -- aboutus');
    process.exit(1);
  }

  const appRoot = path.join(__dirname, '..');
  const viewsDir = path.join(appRoot, 'src', 'views');
  const targetFile = path.join(viewsDir, `${name}.tsx`);

  fs.mkdirSync(viewsDir, { recursive: true });

  if (fs.existsSync(targetFile)) {
    console.error(`View already exists: src/views/${name}.tsx`);
    process.exit(1);
  }

  const componentName = `${toPascalCase(name)}View`;

  const template = `import { ViewProps } from '@/types/view.types';

export default function ${componentName}({ Model }: ViewProps) {
  return (
    <div>
      <h1>{Model.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: Model.content }} />
      
      {/* Access any property using Model.Value() method */}
      {/* Example: {Model.Value('subtitle')} */}
      {/* Or directly: {Model.properties.subtitle} */}
    </div>
  );
}
`;

  fs.writeFileSync(targetFile, template, 'utf8');
  console.log(`Created view: src/views/${name}.tsx`);
}

main();
