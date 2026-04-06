import type { BlockComponentProps } from '@/lib/BlockGridRenderer';

export default async function feature({ Model }: BlockComponentProps) {
  console.log(Model);
  return (
    <div className="product-advantage">
    <h4>{Model.featureName}</h4>
    <h5>{Model.featureDetails}</h5>
</div>
  );
}
