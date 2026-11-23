import { CheckoutForm } from "@/components/CheckoutForm";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Checkout" };

export default function Checkout() {
  return (
    <>
      <PageHero title="Checkout" eyebrow="Secure checkout" trail={[{ label: "Shopping Cart", href: "/cart" }, { label: "Checkout" }]} />
      <section className="container">
        <CheckoutForm />
      </section>
    </>
  );
}
