import { CartView } from "@/components/CartView";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Shopping Cart" };

export default function Cart() {
  return (
    <>
      <PageHero title="Shopping Cart" trail={[{ label: "Shopping Cart" }]} />
      <section className="container">
        <CartView />
      </section>
    </>
  );
}
