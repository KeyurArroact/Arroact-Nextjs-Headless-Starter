import { ViewProps } from '@/types/view.types';
import SectionHeader from '@/components/SectionHeader';
import OpenStreetMap from '@/components/OpenStreetMap';

export default function ContactView({ Model }: ViewProps) {
  return (
    <>
      <SectionHeader Model={Model} />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>{Model.mapHeader}</h2>
              {Model.mapCoordinates && (
                <OpenStreetMap mapData={Model.mapCoordinates} height="400px" />
              )}
            </div>
            <div className="col-md-6">
              <h2>{Model.contactFormHeader}</h2>
              <div dangerouslySetInnerHTML={{ __html: Model.contactIntro }} />
           
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
