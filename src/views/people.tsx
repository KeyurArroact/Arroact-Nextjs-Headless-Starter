import { ViewProps } from '@/types/view.types';
import SectionHeader from '@/components/SectionHeader';
import { PageModel } from 'arroact-umbraco-graphql-sdk';

function SocialLink(content: string | undefined, service: string) {
  if (!content) return null;
  return (
    <a className="employee-grid__item__contact-item" href={`http://${service}.com/${content}`} target="_blank" rel="noopener noreferrer">{service}</a>
  );
}

export default function PeopleView({ Model }: ViewProps) {
  return (
   <>
    <SectionHeader Model={Model} />
    <section className="section">

    <div className="container">
      <div className="employee-grid"> 
        {Model.children.map((item: PageModel) => (
<div key={item.id} className="employee-grid__item">
    <div className="employee-grid__item__image" style={{backgroundImage: `url('${item.getMediaUrl('photo')}')`}}></div>
    <div className="employee-grid__item__details">
        <h3 className="employee-grid__item__name">{item.name}</h3>
       
        <div className="employee-grid__item__contact">
            {SocialLink(item.FacebookUsername, "facebook")}
            {SocialLink(item.TwitterUsername, "twitter")}
            {SocialLink(item.LinkedInUsername, "linkedin")}
            {SocialLink(item.InstagramUsername, "instagram")}
        </div>
    </div>
</div>
        ))}
      </div>
     </div>
    </section>
   </>
  );
}
