import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavScroll = (elementId: string) => {
    navigate('/', { state: { scrollTo: elementId } });
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url("/assets/footer-bg.jpg") no-repeat center center/contain',
        backgroundColor: '#000000',
        borderTop: '1px solid var(--glass-border)',
        padding: '80px 0 30px 0',
        color: 'var(--cream)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div className="container">
        {/* Footer upper layout columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr repeat(3, 1fr)',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Link to="/" className="nav-logo">
              <img
                src="/assets/logo.png"
                alt="Chovique Logo"
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--gold)' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1548907040-4d42b52115ca?auto=format&fit=crop&w=100&q=80';
                }}
              />
              <span className="nav-logo-text">CHOVIQUE</span>
            </Link>
            <p style={{ color: 'var(--grey-light)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '300px' }}>
              Premium handmade chocolates crafted with love, passion, and the world's finest cocoa beans. Every piece is a journey of flavor.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {[
                { label: 'Instagram', svgPath: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01', svgViewBox: '0 0 24 24', isInsta: true },
                { label: 'Facebook', svgPath: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', svgViewBox: '0 0 24 24' },
                { label: 'Twitter', svgPath: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z', svgViewBox: '0 0 24 24' },
                { label: 'YouTube', svgPath: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z M9.75 15.02V8.48L15.5 11.75z', svgViewBox: '0 0 24 24' },
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={soc.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--cream)',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold)';
                    e.currentTarget.style.color = 'var(--gold)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.color = 'var(--cream)';
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox={soc.svgViewBox}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {soc.isInsta ? (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d={soc.svgPath.split(' ')[0]} />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </>
                    ) : (
                      <path d={soc.svgPath} />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', fontWeight: 600 }}>
              Quick Links
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, margin: 0 }}>
              <li style={{ listStyle: 'none' }}>
                <span onClick={() => handleNavScroll('popular')} style={{ color: 'var(--beige)', fontSize: '0.9rem', cursor: 'pointer' }}>Collections</span>
              </li>
              <li style={{ listStyle: 'none' }}>
                <Link to="/shop" style={{ color: 'var(--beige)', fontSize: '0.9rem' }}>Shop All</Link>
              </li>
              <li style={{ listStyle: 'none' }}>
                <Link to="/our-story" style={{ color: 'var(--beige)', fontSize: '0.9rem' }}>Our Story</Link>
              </li>
              <li style={{ listStyle: 'none' }}>
                <span onClick={() => handleNavScroll('reviews')} style={{ color: 'var(--beige)', fontSize: '0.9rem', cursor: 'pointer' }}>Reviews</span>
              </li>
              <li style={{ listStyle: 'none' }}>
                <Link to="/contact" style={{ color: 'var(--beige)', fontSize: '0.9rem' }}>Contact</Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', fontWeight: 600 }}>
              Categories
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, margin: 0 }}>
              {['Dark Chocolate', 'Milk Chocolate', 'White Chocolate', 'Gift Boxes', 'Beverages'].map((cat) => (
                <li key={cat} style={{ listStyle: 'none' }}>
                  <Link to={`/shop?category=${cat.split(' ')[0].toLowerCase()}`} style={{ color: 'var(--beige)', fontSize: '0.9rem' }}>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', fontWeight: 600 }}>
              Support
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, margin: 0 }}>
              {['Shipping & Delivery', 'Returns & Refunds', 'FAQ', 'Track Order', 'Corporate Orders'].map((item) => (
                <li key={item} style={{ listStyle: 'none' }}>
                  <a href="#" style={{ color: 'var(--beige)', fontSize: '0.9rem' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '15px',
            fontSize: '0.85rem',
            color: 'var(--grey-light)',
          }}
        >
          <p>© 2026 Chovique. All rights reserved. Handcrafted with ♥ in India.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit' }}>Terms of Service</a>
            <a href="#" style={{ color: 'inherit' }}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
