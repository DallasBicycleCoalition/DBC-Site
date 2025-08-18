import { urlFor } from "../../src/utils/utils";

type CaptionedImageValue = {
  image: any;
  altText?: string;
  caption?: string;
};

export default function CaptionedImage({ value }: { value: CaptionedImageValue }) {
  if (!value || !value.image) return null;
  const imageUrl = urlFor(value.image).url();
  return (
    <figure className="captioned-image">
      <img
        src={imageUrl}
        alt={value.altText || "Image"}
        className="post-image"
      />
      {value.caption && <figcaption>{value.caption}</figcaption>}
    </figure>
  );
}
