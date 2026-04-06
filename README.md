# Arroact Next.js Headless Starter

Production-ready Next.js 14+ starter application for Umbraco headless CMS with GraphQL.

## 🚀 Features

- ✅ **Next.js 14+** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Arroact SDK** pre-configured
- ✅ **Dynamic Routing** for CMS pages
- ✅ **SEO Ready** with metadata generation
- ✅ **Environment Configuration** for all stages

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Configure your environment variables
# Edit .env.local with your Umbraco GraphQL endpoint
```

## 🔧 Environment Setup

Create a `.env.local` file in the root:

```env
GRAPHQL_URL=https://your-umbraco-site.com/graphql
GRAPHQL_API_KEY=your-api-key-here
ROOT_CONTENT_ID=your-root-content-id
NEXT_PUBLIC_ENV=development
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GRAPHQL_URL` | Umbraco GraphQL endpoint | Yes |
| `GRAPHQL_API_KEY` | API authentication key | No |
| `ROOT_CONTENT_ID` | Root content node ID | No |
| `NEXT_PUBLIC_ENV` | Environment type (development/staging/production) | Yes |

## 🏃 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

The app will be available at `http://localhost:3000`.

## 📁 Project Structure

```
src/
├── app/
│   ├── [slug]/
│   │   └── page.tsx          # Dynamic page route
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── not-found.tsx          # 404 page
└── lib/
    └── sdk.ts                 # SDK configuration
```

## 🎯 Usage

### Dynamic Pages

Pages are automatically fetched from Umbraco based on the URL slug:

```
https://yoursite.com/about       → Fetches page with slug "about"
https://yoursite.com/contact     → Fetches page with slug "contact"
```

### Customizing the SDK

Edit `src/lib/sdk.ts` to customize SDK behavior:

```typescript
import { HeadlessSDK, Environment } from '@arroact/umbraco-graphql-sdk';

const sdk = new HeadlessSDK({
  environment: process.env.NEXT_PUBLIC_ENV as Environment,
  graphqlUrl: process.env.GRAPHQL_URL!,
  apiKey: process.env.GRAPHQL_API_KEY,
  rootContentId: process.env.ROOT_CONTENT_ID,
  enableLogging: process.env.NEXT_PUBLIC_ENV === 'development',
  enableCache: process.env.NEXT_PUBLIC_ENV === 'production',
});

export default sdk;
```

### Adding Custom Pages

Create new routes in the `app/` directory:

```typescript
// app/blog/page.tsx
import sdk from '@/lib/sdk';

export default async function BlogPage() {
  // Your custom logic
  return <div>Blog Page</div>;
}
```

### Metadata Generation

The starter includes automatic metadata generation:

```typescript
export async function generateMetadata({ params }: PageProps) {
  const page = await sdk.getPageBySlug(params.slug);
  
  return {
    title: page?.metaTitle || page?.title,
    description: page?.metaDescription,
  };
}
```

## 🎨 Styling

This starter uses inline styles for simplicity. You can easily integrate:

- **Tailwind CSS** - Add `tailwindcss` and configure
- **CSS Modules** - Already supported by Next.js
- **Styled Components** - Install and configure
- **Any CSS framework** - Your choice

## 🔒 Security

- Environment variables are properly scoped
- API keys are server-side only
- No sensitive data in client bundles

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build the application:

```bash
npm run build
```

Then deploy the `.next` folder according to your platform's requirements.

## 📊 Performance

- Server-side rendering for SEO
- Automatic code splitting
- Optimized bundle sizes
- Image optimization ready

## 🧪 Testing

Add your preferred testing framework:

```bash
# Jest
npm install --save-dev jest @testing-library/react

# Playwright
npm install --save-dev @playwright/test
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please maintain the existing code structure.

## 📞 Support

For issues and questions, please open a GitHub issue.
