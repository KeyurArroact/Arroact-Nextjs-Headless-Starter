import { ViewProps } from '@/types/view.types';
import SectionHeader from '@/components/SectionHeader';
import Link from 'next/link';
export default function ProductsView({ Model }: ViewProps) {
  const currency = Model.defaultCurrency ?? '';
  return (
    <>
      <SectionHeader Model={Model} />
      <section className="section">
      <div className="container">
        <div className="product-grid">
          {Model.featuredProducts?.map((item: any) => {
            const photoUrl = item.getMediaUrl('photos');
            return (
              <Link
                key={item.id}
                href={item.url || item.slug || '#'}
                className="product-grid__item"
                style={photoUrl ? { backgroundImage: `url('${photoUrl}')` } : undefined}
              >
                <div className="product-grid__item__overlay">
                  <div className="product-grid__item__name">{item.productName}</div>
                  <div className="product-grid__item__price">
                    {currency} {typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      </section>
    </>
  );
} 
