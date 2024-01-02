import Image from "next/image";
import { supabase } from "supabase";
import PromoCard from "src/products/components/PromoCard";

export default function ProductPage({ product }) {
  return (
    <section className="product-section">
      <article className="product">
        <div className="product-wrap">
          <Image
            width={1000}
            height={300}
            src={`/assets/${product.slug}.png`}
            alt={product.name}
          />
        </div>
        <section>
          <header>
            <h3>{product.name}</h3>
          </header>
          <section>
            <div>
              <p>{product.description}</p>
            </div>
          </section>
        </section>
        <section>
          <PromoCard />
        </section>
      </article>
    </section>
  );
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
