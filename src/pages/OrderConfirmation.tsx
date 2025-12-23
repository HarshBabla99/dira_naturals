import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import BrandHeader from "@/components/BrandHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  alt?: string;
}

interface OrderDetails {
  items: OrderItem[];
  subtotal: number;
  promoDiscount?: number;
  promoCode?: string;
  deliveryFee: number;
  deliveryMethod?: "delivery" | "pickup";
  vat: number;
  total: number;
  paymentMethod: string;
  transactionId?: string;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Try location.state first, then fall back to localStorage
  const getOrderDetails = (): OrderDetails | null => {
    if (location.state) {
      return location.state as OrderDetails;
    }
    const stored = localStorage.getItem("lastOrder");
    if (stored) {
      try {
        return JSON.parse(stored) as OrderDetails;
      } catch {
        return null;
      }
    }
    return null;
  };

  const orderDetails = getOrderDetails();

  useEffect(() => {
    document.title = "Order Confirmed | Thank You";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Your order has been confirmed. Thank you for shopping with us.");
    }
  }, []);

  // Redirect if no order details
  useEffect(() => {
    if (!orderDetails) {
      navigate("/shop");
    }
  }, [orderDetails, navigate]);

  // Validate required fields exist
  const isValidOrder = orderDetails && 
    orderDetails.items && 
    typeof orderDetails.total === 'number';

  if (!isValidOrder) {
    return null;
  }

  // Provide defaults for optional breakdown fields
  const subtotal = orderDetails.subtotal ?? orderDetails.total;
  const promoCode = orderDetails.promoCode;
  // If promoDiscount wasn't passed (or was lost), infer it from the totals.
  const promoDiscountRaw = orderDetails.promoDiscount;
  const deliveryFee = orderDetails.deliveryFee ?? 0;
  const deliveryMethod = orderDetails.deliveryMethod ?? "delivery";
  const vat = orderDetails.vat ?? 0;
  const inferredPromoDiscount = Math.max(0, subtotal + deliveryFee + vat - orderDetails.total);
  const promoDiscount = promoDiscountRaw && promoDiscountRaw > 0 ? promoDiscountRaw : promoCode ? inferredPromoDiscount : 0;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <BrandHeader />
      <main className="py-8 md:py-12 flex-1">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-10">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="font-serif text-3xl sm:text-4xl mb-2">{t("thankYou")}</h1>
            <p className="text-muted-foreground">{t("orderReceived")}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6">
            <h2 className="font-serif text-xl border-b border-border pb-3">{t("orderSummary")}</h2>

            <div className="space-y-3">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{t("subtotal")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-success">
                  <span>{t("discount")} {promoCode && `(${promoCode})`}</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{deliveryMethod === "delivery" ? t("delivery") : t("pickup")}</span>
                <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : t("free")}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("vat")} (18%)</span>
                <span>${vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                <span>{t("total")}</span>
                <span>${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 text-sm text-muted-foreground space-y-1">
              <p><strong>{t("delivery")}:</strong> {deliveryMethod === "delivery" ? t("homeDelivery") : t("storePickup")}</p>
              <p><strong>{t("payment")}:</strong> {orderDetails.paymentMethod}</p>
              {orderDetails.transactionId && (
                <p><strong>{t("transactionId")}:</strong> {orderDetails.transactionId}</p>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg">{t("continueShopping")}</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
