import BrandHeader from "@/components/BrandHeader";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// In production, consider storing this in Supabase secrets and reading it via an Edge Function.
const SHOP_WHATSAPP_NUMBER = "255695234234";

type PaymentMethod = "cod" | "mobile";
type MobileWallet = "airtel" | "tigo" | "mpesa";

const buildWhatsAppLink = (phone: string, message: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const Checkout = () => {
  const { items, total, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [mobileWallet, setMobileWallet] = useState<MobileWallet | null>(null);
  const navigate = useNavigate();

  // Basic SEO tags
  useEffect(() => {
    document.title = "Checkout | Dira Naturals – Luxe Lather";
    const descContent =
      "Secure, minimalist checkout for Dira Naturals artisanal soaps. Pay on Delivery or Mobile Banking.";

    let metaDesc = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", descContent);

    // Canonical tag
    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;

    // Pull form values from the uncontrolled inputs
    const fd = new FormData(e.currentTarget);
    const fullName = String(fd.get("fullName") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const address = String(fd.get("address") || "").trim();
    const city = String(fd.get("city") || "").trim();
    const region = String(fd.get("region") || "").trim();
    const pobox = String(fd.get("pobox") || "").trim();

    const orderLines = items
      .map(
        (i) => `${i.name} x${i.quantity} - $${(i.price * i.quantity).toFixed(2)}`
      )
      .join("\n");

    const baseDetails = `Customer: ${fullName}\nEmail: ${email}\nAddress: ${address}, ${city}, ${region} ${pobox}`;

    // Resolve shop WhatsApp number; abort if not configured
    const phone = SHOP_WHATSAPP_NUMBER;
    if (!phone || phone.startsWith("REPLACE_WITH")) {
      toast({
        title: "WhatsApp number not configured",
        description:
          "Open src/pages/Checkout.tsx and set SHOP_WHATSAPP_NUMBER to your shop's E.164 number (e.g., 255712345678).",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    if (paymentMethod === "cod") {
      const message = [
        "New Order – Pay on Delivery",
        baseDetails,
        "",
        "Items:",
        orderLines,
        "",
        `Total: $${total.toFixed(2)}`,
        "Payment Method: Pay on Delivery",
      ].join("\n");

      const url = buildWhatsAppLink(phone, message);
      window.open(url, "_blank");
      toast({ title: "WhatsApp opened", description: "Please confirm the order in WhatsApp." });

      setTimeout(() => {
        clear();
        setSubmitting(false);
        navigate("/");
      }, 900);
      return;
    }

    // Mobile banking mock flow
    if (paymentMethod === "mobile") {
      if (!mobileWallet) {
        toast({
          title: "Select a wallet",
          description: "Choose Airtel Money, Tigo Pesa, or MPesa.",
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      // TODO: Replace this block with real mobile money API calls via a Supabase Edge Function.
      // Suggested approach:
      // 1) Create an Edge Function per wallet (e.g., /functions/airtel-collect, /functions/mpesa-c2b)
      // 2) Store API keys and credentials in Supabase Secrets
      // 3) Call the function here with fetch, passing order + customer details
      // 4) Use the response to get a real transaction ID and status

      const txId = `${mobileWallet.toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

      toast({
        title: "Mock payment initiated",
        description: `${mobileWallet.toUpperCase()} transaction ${txId}`,
      });

      const message = [
        "New Order – Mobile Banking",
        baseDetails,
        "",
        "Items:",
        orderLines,
        "",
        `Total: $${total.toFixed(2)}`,
        `Wallet: ${mobileWallet.toUpperCase()}`,
        `Transaction ID: ${txId}`,
      ].join("\n");

      const url = buildWhatsAppLink(phone, message);
      window.open(url, "_blank");

      setTimeout(() => {
        clear();
        setSubmitting(false);
        navigate("/");
      }, 900);

      return;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrandHeader />
      <main className="section">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <section aria-labelledby="checkout-title">
            <h1 id="checkout-title" className="heading-md">Checkout</h1>
            <form onSubmit={onSubmit} className="mt-6 space-y-6 pb-24">
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2 text-sm">
                  Full name
                  <input name="fullName" required className="border rounded-md px-4 py-3 bg-background" placeholder="Jane Doe" />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  Email
                  <input name="email" type="email" required className="border rounded-md px-4 py-3 bg-background" placeholder="jane@example.com" />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm">
                Address
                <input name="address" required className="border rounded-md px-4 py-3 bg-background" placeholder="123 Kisutu Street" />
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                <label className="flex flex-col gap-2 text-sm">
                  City
                  <input name="city" required className="border rounded-md px-4 py-3 bg-background" placeholder="Dar es Salaam" />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  Region
                  <input name="region" required className="border rounded-md px-4 py-3 bg-background" placeholder="Dar es Salaam" />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  PO Box
                  <input name="pobox" required className="border rounded-md px-4 py-3 bg-background" placeholder="12345" />
                </label>
              </div>

              {/* Payment Options */}
              <fieldset className="border rounded-md p-4">
                <legend className="text-sm font-medium">Payment</legend>

                <div className="mt-3 space-y-3">
                  <label className="flex items-center gap-3 text-sm">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <span>Pay on Delivery (WhatsApp)</span>
                  </label>

                  <div className="space-y-2">
                    <label className="flex items-center gap-3 text-sm">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mobile"
                        checked={paymentMethod === "mobile"}
                        onChange={() => setPaymentMethod("mobile")}
                      />
                      <span>Mobile Banking</span>
                    </label>
                    {paymentMethod === "mobile" && (
                      <div className="ml-6 grid sm:grid-cols-3 gap-3">
                        <label className="flex items-center gap-2 text-xs">
                          <input
                            type="radio"
                            name="wallet"
                            value="airtel"
                            checked={mobileWallet === "airtel"}
                            onChange={() => setMobileWallet("airtel")}
                          />
                          Airtel Money
                        </label>
                        <label className="flex items-center gap-2 text-xs">
                          <input
                            type="radio"
                            name="wallet"
                            value="tigo"
                            checked={mobileWallet === "tigo"}
                            onChange={() => setMobileWallet("tigo")}
                          />
                          Tigo Pesa
                        </label>
                        <label className="flex items-center gap-2 text-xs">
                          <input
                            type="radio"
                            name="wallet"
                            value="mpesa"
                            checked={mobileWallet === "mpesa"}
                            onChange={() => setMobileWallet("mpesa")}
                          />
                          MPesa
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </fieldset>

              <div className="sticky bottom-0 z-10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-t pt-4">
                <button disabled={submitting || items.length === 0} className="btn w-full">
                  {submitting ? 'Processing…' : `Place Order — $${total.toFixed(2)}`}
                </button>
              </div>
            </form>
          </section>
          <aside className="card-lux h-max">
            <h2 className="font-serif text-lg">Order Summary</h2>
            <div className="mt-4 space-y-4">
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              ) : (
                items.map((i) => (
                  <div key={i.id} className="flex items-center gap-4">
                    <img src={i.image} alt={i.alt} className="h-16 w-16 rounded-md border object-cover" />
                    <div className="flex-1">
                      <p className="text-sm">{i.name} × {i.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">${(i.price * i.quantity).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
