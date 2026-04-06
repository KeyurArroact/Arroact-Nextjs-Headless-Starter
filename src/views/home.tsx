import BlockGridRenderer from '@/lib/BlockGridRenderer';
import { ViewProps } from '@/types/view.types';
import Link from 'next/link';
import Image from 'next/image';

export default function HomeView({ Model }: ViewProps) {
  const backgroundImage = Model.getMediaUrl('HeroBackgroundImage');

  return (
    <>
      <section 
        className="section section--full-height background-image-full overlay overlay--dark section--content-center section--thick-border"
        style={{ position: 'relative' }}
      >
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt="Hero Background"
            fill
            priority
            quality={85}
            sizes="100vw"
            style={{
              objectFit: 'cover',
              zIndex: -1
            }}
          />
        )}
        <div className="section__hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <h1>{Model.heroHeader}</h1>
          <p className="section__description">{Model.heroDescription}</p>
          {Model.HeroCtalink && (
            <a 
              className="button button--border--solid" 
              href={Model.HeroCtalink.url}
            >
              {Model.heroCTACaption}
            </a>
          )}
        </div>
      </section>
      <section className="section section">
        <BlockGridRenderer blockGridData={Model.bodyText} />
      </section>

      <section className="section section--themed">
        <div className="container">
          <div className="row">
            <div className="ta-center">
                <h2>{Model.footerHeader}</h2>
                <p className="section__description mw-640 ma-h-auto">{Model.footerDescription}</p>

                <Link className="button button--border--light_solid" href={Model.FooterCtalink?.url}>
                    {Model.footerCTACaption}
                </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
