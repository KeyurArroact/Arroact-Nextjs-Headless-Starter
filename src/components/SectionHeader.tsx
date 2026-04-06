import { ViewProps } from '@/types/view.types';

export default async function SectionHeader({ Model }: ViewProps) {
        return (
           <section className="section section--themed section--header section--content-center-bottom">
    <div className="section__hero-content">
        <h1 className="no-air">{Model.pageTitle}</h1>
    </div>
</section>
        );  
    }