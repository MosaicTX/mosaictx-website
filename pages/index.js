import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { Blocks } from "../components/Blocks";
import { ContactForm } from "../components/forms/ContactForm";
import { JoinForm } from "../components/forms/JoinForm";

export default function Home(props) {
  // data passes through in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout
      description={data.page.meta?.description}
      title={data.page.meta?.title}
      metaimg={data.page.meta?.image}
    >
      <Blocks blocks={data.page.blocks} />
      <ContactForm />
      <JoinForm />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
      //myOtherProp: 'some-other-data',
    },
  };
};
