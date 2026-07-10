import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, ArrowRight, Minus, Plus, Tag } from 'lucide-react';
import { useApp } from '../../app/providers';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { pageTransition } from '../../lib/framer';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, role } = useApp();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingAmount = subtotal > 1500 || subtotal === 0 ? 0 : 150;
  const totalAmount = subtotal - discountAmount + shippingAmount;

  // Apply Coupon code
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'CHOV40') {
      setDiscountPercent(40);
      setCouponApplied(true);
      setCouponError('');
    } else if (couponCode.toUpperCase() === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try CHOV40 or WELCOME10.');
      setCouponApplied(false);
    }
  };

  const handleCheckout = () => {
    if (role === 'guest') {
      navigate('/login');
    } else {
      // Store current discount calculations in sessionStorage for checkout use
      sessionStorage.setItem('chovique_checkout_discount', discountPercent.toString());
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          paddingTop: '120px',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'var(--gradient-hero)',
        }}
      >
        <ShoppingBag size={64} style={{ color: 'var(--gold)', marginBottom: '24px' }} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--cream)', marginBottom: '10px' }}>
          Your Cart is Empty
        </h2>
        <p style={{ color: 'var(--beige)', marginBottom: '30px', maxWidth: '400px' }}>
          Indulge in our premium selections of dark truffles, golden pralines, and hot chocolate shaves.
        </p>
        <Link to="/shop">
          <Button variant="gold" size="lg" glow>
            Start Shopping
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        paddingTop: '120px',
        minHeight: '100vh',
        background: 'var(--gradient-hero)',
        paddingBottom: '60px',
      }}
    >
      <div className="container">
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: 700,
            color: 'var(--cream)',
            borderBottom: '1px solid var(--glass-border)',
            paddingBottom: '15px',
            marginBottom: '30px',
          }}
        >
          Your Chocolates Cart
        </h1>

        <div className="cart-layout">
          {/* Cart items list */}
          <div className="cart-items-list">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="glass-panel cart-item-card"
                style={{
                  border: '1px solid var(--glass-border)',
                }}
              >
                {/* Product image */}
                <div style={{ width: '100px', height: '100px', borderRadius: '4px', overflow: 'hidden' }}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1548907040-4d42b52115ca?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                </div>

                {/* Details */}
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--cream)', fontWeight: 600, margin: '0 0 6px 0' }}>
                    {item.product.name}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gold)', textTransform: 'uppercase' }}>
                    {item.product.weight} · {item.product.category}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '4px',
                    background: 'rgba(0,0,0,0.2)',
                  }}
                >
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    style={{ padding: '8px 12px', color: 'var(--beige)' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ width: '30px', textAlign: 'center', fontWeight: 600, color: 'var(--cream)', fontSize: '0.9rem' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    style={{ padding: '8px 12px', color: 'var(--beige)' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Pricing & remove */}
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '100px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--cream)' }}>
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    style={{
                      color: 'var(--rose-gold)',
                      fontSize: '0.8rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Summary Sidepanel */}
          <aside
            className="glass-panel cart-summary"
            style={{
              border: '1px solid var(--glass-border)',
              background: 'rgba(var(--dark-chocolate-rgb), 0.4)',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--cream)', marginBottom: '20px' }}>
              Order Summary
            </h3>

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--beige)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {couponApplied && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#2ecc71' }}>
                  <span>Promo Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--beige)' }}>
                <span>Shipping</span>
                <span>{shippingAmount === 0 ? 'Free' : `₹${shippingAmount.toLocaleString()}`}</span>
              </div>
              {shippingAmount > 0 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--grey-light)', margin: '-8px 0 0 0' }}>
                  Free shipping on orders above ₹1,500.
                </p>
              )}
              <div
                style={{
                  borderTop: '1px solid var(--glass-border)',
                  paddingTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--cream)',
                }}
              >
                <span>Total</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Coupon Promo form */}
            <form onSubmit={handleApplyCoupon} style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <div style={{ flexGrow: 1 }}>
                  <Input
                    placeholder="Promo Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    error={couponError}
                    fullWidth
                  />
                </div>
                <Button type="submit" variant="glass" style={{ height: '48px', marginBottom: '15px' }}>
                  Apply
                </Button>
              </div>
              {couponApplied && (
                <span style={{ fontSize: '0.8rem', color: '#2ecc71', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <Tag size={12} /> Discount code applied successfully!
                </span>
              )}
            </form>

            {/* Checkout proceed */}
            <Button variant="gold" fullWidth size="lg" glow onClick={handleCheckout}>
              Proceed to Checkout
              <ArrowRight size={16} />
            </Button>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};
export default CartPage;
