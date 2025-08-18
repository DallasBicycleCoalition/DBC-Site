import { PortableText } from "@portabletext/react";
import CaptionedImage from "../components/CaptionedImage";

interface PostBodyProps {
  body: any;
}

export default function PostBody({ body }: PostBodyProps) {
  if (!body) return null;
  return (
    <PortableText
      value={body}
      components={{
        types: {
          captionedImage: (props) => <CaptionedImage {...props} />,
        },
      }}
    />
  );
}
