import { ViewProps } from '@/types/view.types';
import SectionHeader from '@/components/SectionHeader';
import BlockGridRenderer from '@/lib/BlockGridRenderer';
import umbracoContext from '@/lib/umbracocontext';
import { PageModel } from 'arroact-umbraco-graphql-sdk';
export default async function ProductView({ Model }: ViewProps) {
   let parent: PageModel | null = null;
   let defaultCurrency ='';
   try
   {
    parent= await umbracoContext.getContentById(Model.parentId);
   
    defaultCurrency = parent?.defaultCurrency;
   }catch(error){
    console.log(error);
   }
  const photoUrl = Model.getMediaUrl('photos');
  //const parrent=await umbracoContext.getContentById(Model.parentId);
 
  return (
    <>
    {parent && <SectionHeader Model={parent} />}
    <section className="section">
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <div className="product-image-container">
                    <img className="product-image" src={photoUrl} alt={Model.productName} />
                </div>
            </div>
            <div className="col-md-6">
                <h1>{Model.productName}</h1>
                <div className="product-price">{defaultCurrency} {Model.price.toFixed(2)}</div>
                <div className="product-teaser">{Model.description}</div>
                <div className="product-button">
                    <button className="button button--border--solid">Buy</button>
                </div>
                <div className="product-advantages">
                   <BlockGridRenderer blockGridData={Model.features} />
                </div>
            </div>
        </div>
    </div>
</section>
<section className="section section--sand">
    <div className="container">
        <BlockGridRenderer blockGridData={Model.bodyText} />
    </div>
</section>
    </>
  );
}
