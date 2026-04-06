import { ViewProps } from '@/types/view.types';
import SectionHeader from '@/components/SectionHeader';
import BlockGridRenderer from '@/lib/BlockGridRenderer';
import SubNavigation from '@/components/SubNavigation';

export default function ContentpageView({ Model }: ViewProps) {
  return (
   <>
   <SectionHeader Model={Model} />
   <section className="section">

    <div className="container">

        <div className="col-md-3">
            <nav className="nav-bar nav-bar--list">
               <SubNavigation currentPage={Model} />
            </nav>
        </div>

        <div className="col-md-9">
            <article>
                <BlockGridRenderer blockGridData={Model.bodyText} />
            </article>
        </div>
    </div>

</section>
<link rel="stylesheet" href="/css/umbraco-starterkit-blockgrid.css" />
   </>
  );
}
