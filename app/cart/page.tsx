import { CartView } from "@/components/CartView";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = { title: "Shopping Cart" };

export default function Cart() {
  return (
    <>
      <Breadcrumbs trail={[{ label: "Shopping Cart" }]} />
      <section className="container">
        <h1 className="font-display mb-8 text-4xl uppercase">Shopping Cart</h1>
        <CartView />
      </section>
    </>
  );
}
