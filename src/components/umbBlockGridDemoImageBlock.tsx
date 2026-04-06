import Image from 'next/image';
import type { BlockComponentProps } from '@/lib/BlockGridRenderer';

export default async function umbBlockGridDemoImageBlock({ Model }: BlockComponentProps) {
  const imagePath = Model.getMediaUrl('image');

  return (
    <div className="umbBlockGridDemoImageBlock">
      {imagePath ? (
        <Image
          src={imagePath}
          alt={""}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <p>Missing image</p>
      )}
    </div>
  );
}
