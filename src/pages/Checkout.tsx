import BrandHeader from "@/components/BrandHeader";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// NOTE: Replace with your shop's WhatsApp number in E.164 format (no + sign), e.g., "255712345678"
// In production, consider storing this in Supabase secrets and reading it via an Edge Function.
const SHOP_WHATSAPP_NUMBER = "255695234234";

type PaymentMethod = "cod" | "mobile";
type MobileWallet = "airtel" | "tigo" | "mpesa";
type DeliveryMethod = "delivery" | "pickup";

const buildWhatsAppLink = (phone: string, message: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const DELIVERY_FEE = 5.0;
const VAT_RATE = 0.18;

// Available promo codes
const PROMO_CODES: Record<string, { discount: number; type: "percent" | "fixed" }> = {
  SAVE10: { discount: 10, type: "percent" },
  DIRA20: { discount: 20, type: "percent" },
  FLAT5: { discount: 5, type: "fixed" },
};

const Checkout = () => {
  const { items, total: subtotal, clear } = useCart();
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [mobileWallet, setMobileWallet] = useState<MobileWallet | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("delivery");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; type: "percent" | "fixed" } | null>(null);
  const navigate = useNavigate();

  const deliveryFee = deliveryMethod === "delivery" && items.length > 0 ? DELIVERY_FEE : 0;
  
  // Calculate discount
  const promoDiscount = appliedPromo
    ? appliedPromo.type === "percent"
      ? (subtotal * appliedPromo.discount) / 100
      : appliedPromo.discount
    : 0;
  
  const discountedSubtotal = Math.max(0, subtotal - promoDiscount);
  const vat = (discountedSubtotal + deliveryFee) * VAT_RATE;
  const total = discountedSubtotal + deliveryFee + vat;

  const applyPromoCode = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, ...PROMO_CODES[code] });
      toast({ title: "Promo applied!", description: `Code "${code}" has been applied.` });
    } else {
      toast({ title: "Invalid code", description: "This promo code is not valid.", variant: "destructive" });
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode("");
  };

  // Basic SEO tags
  useEffect(() => {
    document.title = "Checkout | Dira Naturals – Luxe Lather";
    const descContent =
      "Secure, minimalist checkout for Dira Naturals artisanal soaps. Pay on Delivery or Mobile Banking.";

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", descContent);

    // Canonical tag
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
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

    const orderLines = items.map((i) => `${i.name} x${i.quantity} - $${(i.price * i.quantity).toFixed(2)}`).join("\n");

    const addressDetails = deliveryMethod === "delivery" 
      ? `\nAddress: ${address}, ${city}, ${region} ${pobox}`
      : "\nPickup at store";

    const baseDetails = `Customer: ${fullName}\nEmail: ${email}${addressDetails}`;

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

    const promoInfo = appliedPromo ? `\nPromo Code: ${appliedPromo.code} (-$${promoDiscount.toFixed(2)})` : "";

    if (paymentMethod === "cod") {
      const message = [
        "New Order – Pay on Delivery",
        baseDetails,
        "",
        "Items:",
        orderLines,
        promoInfo,
        "",
        `Subtotal: $${subtotal.toFixed(2)}`,
        appliedPromo ? `Discount: -$${promoDiscount.toFixed(2)}` : "",
        deliveryMethod === "delivery" ? `Delivery: $${deliveryFee.toFixed(2)}` : "Pickup: Free",
        `VAT (18%): $${vat.toFixed(2)}`,
        `Total: $${total.toFixed(2)}`,
        `Payment Method: Pay on Delivery`,
        `Delivery Method: ${deliveryMethod === "delivery" ? "Home Delivery" : "Store Pickup"}`,
      ].filter(Boolean).join("\n");

      const url = buildWhatsAppLink(phone, message);
      window.open(url, "_blank");
      toast({ title: "WhatsApp opened", description: "Please confirm the order in WhatsApp." });

      setTimeout(() => {
        const orderData = {
          items,
          subtotal,
          promoDiscount,
          promoCode: appliedPromo?.code,
          deliveryFee,
          deliveryMethod,
          vat,
          total,
          paymentMethod: "Pay on Delivery",
        };
        localStorage.setItem("lastOrder", JSON.stringify(orderData));
        clear();
        setSubmitting(false);
        navigate("/order-confirmation", { state: orderData });
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
        promoInfo,
        "",
        `Subtotal: $${subtotal.toFixed(2)}`,
        appliedPromo ? `Discount: -$${promoDiscount.toFixed(2)}` : "",
        deliveryMethod === "delivery" ? `Delivery: $${deliveryFee.toFixed(2)}` : "Pickup: Free",
        `VAT (18%): $${vat.toFixed(2)}`,
        `Total: $${total.toFixed(2)}`,
        `Wallet: ${mobileWallet.toUpperCase()}`,
        `Transaction ID: ${txId}`,
        `Delivery Method: ${deliveryMethod === "delivery" ? "Home Delivery" : "Store Pickup"}`,
      ].filter(Boolean).join("\n");

      const url = buildWhatsAppLink(phone, message);
      window.open(url, "_blank");

      setTimeout(() => {
        const orderData = {
          items,
          subtotal,
          promoDiscount,
          promoCode: appliedPromo?.code,
          deliveryFee,
          deliveryMethod,
          vat,
          total,
          paymentMethod: `Mobile Banking (${mobileWallet?.toUpperCase()})`,
          transactionId: txId,
        };
        localStorage.setItem("lastOrder", JSON.stringify(orderData));
        clear();
        setSubmitting(false);
        navigate("/order-confirmation", { state: orderData });
      }, 900);

      return;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrandHeader />
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 lg:mb-8">{t("checkout")}</h1>
          
          {/* Mobile: Order Summary first, then form */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Order Summary - Shows first on mobile, second on desktop */}
            <aside className="order-1 lg:order-2 space-y-6">
              <div className="card-lux">
                <h2 className="font-serif text-lg">{t("orderSummary")}</h2>
                <div className="mt-4 space-y-4">
                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t("emptyCart")}</p>
                  ) : (
                    items.map((i) => (
                      <div key={i.id} className="flex items-center gap-4">
                        <img src={i.image} alt={i.alt} className="h-16 w-16 rounded-md border object-cover" />
                        <div className="flex-1">
                          <p className="text-sm">
                            {i.name} × {i.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-medium">${(i.price * i.quantity).toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Promo Code */}
                <div className="mt-6 pt-4 border-t border-border">
                  <label className="text-sm font-medium">Promo Code</label>
                  {appliedPromo ? (
                    <div className="mt-2 flex items-center justify-between bg-muted/50 rounded-md px-3 py-2">
                      <span className="text-sm">
                        <span className="font-medium">{appliedPromo.code}</span>
                        <span className="text-muted-foreground ml-2">
                          (-{appliedPromo.type === "percent" ? `${appliedPromo.discount}%` : `$${appliedPromo.discount}`})
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="text-sm text-destructive hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        type="button"
                        onClick={applyPromoCode}
                        className="btn-ghost text-sm px-4 py-2"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="mt-6 pt-4 border-t border-border space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-success">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {deliveryMethod === "delivery" ? "Delivery" : "Pickup"}
                    </span>
                    <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : "Free"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT (18%)</span>
                    <span>${vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button - Desktop only, positioned in right column */}
              <button
                type="submit"
                form="checkout-form"
                className="btn w-full hidden lg:flex"
                disabled={submitting || items.length === 0}
                onClick={(e) => {
                  // Trigger form submission
                  const form = document.querySelector('form');
                  if (form) {
                    form.requestSubmit();
                  }
                  e.preventDefault();
                }}
              >
                {submitting ? t("processing") : `${t("placeOrder")} — $${total.toFixed(2)}`}
              </button>
            </aside>

            {/* Form Section - Shows second on mobile, first on desktop */}
            <section aria-labelledby="checkout-form" className="order-2 lg:order-1">
              <form id="checkout-form" onSubmit={onSubmit} className="space-y-6">
                {/* Customer Details */}
                <div className="space-y-4">
                  <h2 className="font-serif text-lg">{t("customerDetails")}</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-2 text-sm">
                      <span className="font-medium">{t("fullName")}</span>
                      <input
                        name="fullName"
                        required
                        className="border border-border rounded-md px-4 py-3 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Jane Doe"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm">
                      <span className="font-medium">{t("email")}</span>
                      <input
                        name="email"
                        type="email"
                        required
                        className="border border-border rounded-md px-4 py-3 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="jane@example.com"
                      />
                    </label>
                  </div>
                </div>

                {/* Delivery Method & Payment - Side by Side */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Delivery Method */}
                  <fieldset className="border border-border rounded-md p-4">
                    <legend className="text-sm font-medium px-2">{t("deliveryMethod")}</legend>
                    <div className="mt-2 space-y-3">
                      <label className="flex items-center gap-3 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="delivery"
                          checked={deliveryMethod === "delivery"}
                          onChange={() => setDeliveryMethod("delivery")}
                          className="accent-primary"
                        />
                        <span>{t("homeDelivery")} (+${DELIVERY_FEE.toFixed(2)})</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="pickup"
                          checked={deliveryMethod === "pickup"}
                          onChange={() => setDeliveryMethod("pickup")}
                          className="accent-primary"
                        />
                        <span>{t("storePickup")} ({t("free")})</span>
                      </label>
                    </div>
                  </fieldset>

                  {/* Payment Options */}
                  <fieldset className="border border-border rounded-md p-4">
                    <legend className="text-sm font-medium px-2">{t("payment")}</legend>
                    <div className="mt-2 space-y-3">
                      <label className="flex items-center gap-3 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="accent-primary"
                        />
                        <span>{t("payOnDelivery")}</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mobile"
                          checked={paymentMethod === "mobile"}
                          onChange={() => setPaymentMethod("mobile")}
                          className="accent-primary"
                        />
                        <span>{t("mobileBanking")}</span>
                      </label>
                    </div>
                  </fieldset>
                </div>

                {/* Mobile Wallet Options */}
                {paymentMethod === "mobile" && (
                  <div className="grid sm:grid-cols-3 gap-3 p-4 bg-muted/30 rounded-md">
                    {(["airtel", "tigo", "mpesa"] as MobileWallet[]).map((wallet) => (
                      <label key={wallet} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="wallet"
                          value={wallet}
                          checked={mobileWallet === wallet}
                          onChange={() => setMobileWallet(wallet)}
                          className="accent-primary"
                        />
                        {wallet === "airtel" && "Airtel Money"}
                        {wallet === "tigo" && "Tigo Pesa"}
                        {wallet === "mpesa" && "MPesa"}
                      </label>
                    ))}
                  </div>
                )}

                {/* Address - Only shown for delivery */}
                {deliveryMethod === "delivery" && (
                  <div className="space-y-4">
                    <h2 className="font-serif text-lg">{t("deliveryAddress")}</h2>
                    <label className="flex flex-col gap-2 text-sm">
                      <span className="font-medium">Address</span>
                      <input
                        name="address"
                        required={deliveryMethod === "delivery"}
                        className="border border-border rounded-md px-4 py-3 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="123 Kisutu Street"
                      />
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <label className="flex flex-col gap-2 text-sm">
                        <span className="font-medium">City</span>
                        <input
                          name="city"
                          required={deliveryMethod === "delivery"}
                          className="border border-border rounded-md px-4 py-3 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Dar es Salaam"
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-sm">
                        <span className="font-medium">Region</span>
                        <input
                          name="region"
                          required={deliveryMethod === "delivery"}
                          className="border border-border rounded-md px-4 py-3 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Dar es Salaam"
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-sm">
                        <span className="font-medium">P.O. Box</span>
                        <input
                          name="pobox"
                          required={deliveryMethod === "delivery"}
                          className="border border-border rounded-md px-4 py-3 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="12345"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* Submit button for mobile */}
                <button type="submit" className="btn w-full lg:hidden" disabled={submitting || items.length === 0}>
                  {submitting ? t("processing") : `${t("placeOrder")} — $${total.toFixed(2)}`}
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
