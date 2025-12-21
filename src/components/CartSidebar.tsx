import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const { isOpen, items, total, increment, decrement, remove, closeCart, clear } = useCart();

  return (
    <div aria-hidden={!isOpen} className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/20 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Sidebar */}
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-background border-l shadow-xl transform transition-transform ${isOpen ? 'translate-x-0 animate-slide-in-right' : 'translate-x-full animate-slide-out-right'} flex flex-col`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="font-serif text-lg">Your Cart</h3>
          <button type="button" onClick={closeCart} className="btn-ghost">Close</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img src={item.image} alt={item.alt} className="h-20 w-20 rounded-md border object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => remove(item.id)} className="text-sm text-muted-foreground hover:underline">Remove</button>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button onClick={() => decrement(item.id)} className="btn-ghost px-3 py-1">−</button>
                    <span className="min-w-6 text-center">{item.quantity}</span>
                    <button onClick={() => increment(item.id)} className="btn-ghost px-3 py-1">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-6 border-t space-y-4 pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-3">
            <button onClick={clear} className="btn-ghost flex-1">Clear</button>
            <Link to="/checkout" onClick={closeCart} className="btn flex-1 text-center">Proceed to Checkout</Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CartSidebar;
