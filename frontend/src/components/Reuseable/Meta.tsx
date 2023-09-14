import { Helmet } from "react-helmet-async";

interface postProp {
  title?: string;
  description?: string;
  keywords?: string;
}

export default function Meta({ title, description, keywords }: postProp) {
  return (
    <Helmet>
      <title>{title} </title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: "E-commerce",
};
