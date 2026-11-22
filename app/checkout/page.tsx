import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata = { title: "Checkout" };

export default function Checkout() {
  return (
    <>
      <Breadcrumbs trail={[{ label: "Shopping Cart", href: "/cart" }, { label: "Checkout" }]} />
      <section className="container">
        <h1 className="font-display mb-8 text-4xl uppercase">Checkout</h1>
        <CheckoutForm />
      </section>
    </>
  );
}
