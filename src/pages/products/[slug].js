import { supabase } from "supabase";

export default function ProductPage({ product }) {
  console.log(product);
  return <div>product page</div>;
}

export async function getStaticPaths() {
  const { data: products } = await supabase.from("product").select("slug");

  const paths = products.map((product) => ({
    params: {
      slug: product.slug,
    },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

// 'getStaticPaths' requires using 'getStaticProps'
export async function getStaticProps(context) {
  const slug = context.params.slug;

  const { data: product } = await supabase
    .from("product")
    .select("*")

    // filters
    .eq("slug", slug)
    // return as single object instead of array
    .single();

  return {
    // Passed to the page component as props
    props: { product },
  };
}
