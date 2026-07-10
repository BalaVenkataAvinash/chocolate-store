import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, UserRole, Order, Banner, OfflineSale, SupportTicket, CustomerAddress, SupportNotification } from '../types';
import { initialProducts, initialBanners, initialOrders, initialOfflineSales } from '../data/mockData';

interface AppContextType {
  user: User | null;
  role: UserRole;
  login: (email: string, role: UserRole) => boolean;
  register: (name: string, email: string) => boolean;
  logout: () => void;
  products: Product[];
  banners: Banner[];
  orders: Order[];
  offlineSales: OfflineSale[];
  wishlist: Product[];
  cart: CartItem[];
  theme: {
    primary: string;
    darkChocolate: string;
    gold: string;
    roseGold: string;
    black: string;
  };
  addToCart: (product: Product, quantity: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  moveToCart: (product: Product) => void;
  placeOrder: (shippingAddress: Order['shippingAddress'], deliveryOption: string, paymentMethod: string) => Order;
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'ratingsCount' | 'reviews'>) => void;
  updateProductInventory: (productId: string, weight: string, price: number) => void;
  addOfflineSale: (sale: Omit<OfflineSale, 'id' | 'date'>) => void;
  importOfflineSales: (salesList: Omit<OfflineSale, 'id' | 'date'>[]) => void;
  updateBanner: (id: string, bannerData: Partial<Banner>) => void;
  updateThemeColors: (colors: { primary?: string; darkChocolate?: string; gold?: string; roseGold?: string; black?: string }) => void;
  tickets: SupportTicket[];
  addSupportTicket: (category: SupportTicket['category'], description: string) => void;
  resolveSupportTicket: (ticketId: string, adminNotes?: string) => void;
  submitTicketFeedback: (ticketId: string, feedback: 'Resolved' | 'Not Resolved') => void;
  acknowledgeTicketNotification: (ticketId: string) => void;
  updateUserProfilePicture: (base64Image: string) => void;
  updateUserProfile: (profile: { name?: string; phone?: string; dob?: string; gender?: string; preferences?: string }) => void;
  addresses: CustomerAddress[];
  addAddress: (address: Omit<CustomerAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  notifications: SupportNotification[];
  removeNotification: (id: string) => void;
  addNotification: (text: string, type: SupportNotification['type'], referenceId?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultTheme = {
  primary: '#3B1E08',
  darkChocolate: '#1A0D00',
  gold: '#C9A84C',
  roseGold: '#B76E79',
  black: '#0A0A0A',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- Auth State ---
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('chovique_role');
    return (saved as UserRole) || 'guest';
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('chovique_user');
    if (savedUser) return JSON.parse(savedUser);

    const savedRole = localStorage.getItem('chovique_role') as UserRole;
    if (savedRole && savedRole !== 'guest') {
      return {
        id: 'u1',
        name: savedRole === 'customer' ? 'Priya Sharma' : savedRole === 'admin' ? 'Atelier Admin' : 'Enterprise Chief',
        email: `${savedRole}@chovique.com`,
        role: savedRole,
        profile: {
          name: savedRole === 'customer' ? 'Priya Sharma' : savedRole === 'admin' ? 'Atelier Admin' : 'Enterprise Chief',
          email: `${savedRole}@chovique.com`,
          phone: '+91 98765 43210',
          avatar: savedRole === 'customer' ? 'PS' : savedRole === 'admin' ? 'AD' : 'SA',
          dob: savedRole === 'customer' ? '1995-08-15' : undefined,
          gender: savedRole === 'customer' ? 'Female' : undefined,
          preferences: savedRole === 'customer' ? 'Dark Chocolate, Gift Boxes' : undefined,
          address: {
            street: 'Flat 402, Royal Gardens, Sector 15',
            city: 'Mumbai',
            state: 'Maharashtra',
            zip: '400053'
          }
        }
      };
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('chovique_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('chovique_user');
    }
  }, [user]);

  // --- Theme State ---
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('chovique_theme');
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('chovique_products');
    if (!saved) return initialProducts;
    try {
      const parsed = JSON.parse(saved) as Product[];
      return parsed.map((p) => {
        const initial = initialProducts.find((ip) => ip.id === p.id);
        if (initial) {
          return { ...p, hoverImage: initial.hoverImage, image: initial.image };
        }
        return p;
      });
    } catch {
      return initialProducts;
    }
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('chovique_banners');
    return saved ? JSON.parse(saved) : initialBanners;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('chovique_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [offlineSales, setOfflineSales] = useState<OfflineSale[]>(() => {
    const saved = localStorage.getItem('chovique_offline_sales');
    return saved ? JSON.parse(saved) : initialOfflineSales;
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('chovique_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('chovique_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Sync theme changes with DOM root variables ---
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--chocolate-brown', theme.primary);
    root.style.setProperty('--dark-chocolate', theme.darkChocolate);
    root.style.setProperty('--gold', theme.gold);
    root.style.setProperty('--rose-gold', theme.roseGold);
    root.style.setProperty('--black', theme.black || '#0A0A0A');

    // Dynamic RGB helper for translucent overlays
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '26, 13, 0';
    };

    root.style.setProperty('--primary-rgb', hexToRgb(theme.primary));
    root.style.setProperty('--dark-chocolate-rgb', hexToRgb(theme.darkChocolate));

    localStorage.setItem('chovique_theme', JSON.stringify(theme));
  }, [theme]);

  // Save states to localStorage for premium simulation longevity
  useEffect(() => {
    localStorage.setItem('chovique_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('chovique_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('chovique_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('chovique_offline_sales', JSON.stringify(offlineSales));
  }, [offlineSales]);

  useEffect(() => {
    localStorage.setItem('chovique_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('chovique_cart', JSON.stringify(cart));
  }, [cart]);

  // --- Auth Handlers ---
  const login = (email: string, targetRole: UserRole): boolean => {
    const name = targetRole === 'customer' ? 'Priya Sharma' : targetRole === 'admin' ? 'Atelier Admin' : 'Enterprise Chief';
    const loggedUser: User = {
      id: targetRole === 'customer' ? 'u1' : targetRole === 'admin' ? 'u2' : 'u3',
      name,
      email,
      role: targetRole,
      profile: {
        name,
        email,
        phone: '+91 98765 43210',
        avatar: targetRole === 'customer' ? 'PS' : targetRole === 'admin' ? 'AD' : 'SA',
        dob: targetRole === 'customer' ? '1995-08-15' : undefined,
        gender: targetRole === 'customer' ? 'Female' : undefined,
        preferences: targetRole === 'customer' ? 'Dark Chocolate, Gift Boxes' : undefined,
        address: {
          street: 'Flat 402, Royal Gardens, Sector 15',
          city: 'Mumbai',
          state: 'Maharashtra',
          zip: '400053'
        }
      }
    };
    setUser(loggedUser);
    setRole(targetRole);
    localStorage.setItem('chovique_role', targetRole);
    return true;
  };

  const register = (name: string, email: string): boolean => {
    const newUser: User = {
      id: 'u_new',
      name,
      email,
      role: 'customer',
      profile: {
        name,
        email,
        phone: '',
        avatar: name.substring(0, 2).toUpperCase(),
        dob: '',
        gender: '',
        preferences: '',
        address: { street: '', city: '', state: '', zip: '' }
      }
    };
    setUser(newUser);
    setRole('customer');
    localStorage.setItem('chovique_role', 'customer');
    return true;
  };

  const logout = () => {
    setUser(null);
    setRole('guest');
    localStorage.setItem('chovique_role', 'guest');
    setCart([]);
    setWishlist([]);
  };

  // --- Cart Operations ---
  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  // --- Wishlist Operations ---
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const moveToCart = (product: Product) => {
    toggleWishlist(product);
    addToCart(product, 1);
  };

  // --- Order Placement ---
  const placeOrder = (
    shippingAddress: Order['shippingAddress'],
    deliveryOption: string,
    paymentMethod: string
  ): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = deliveryOption === 'Same Day Delivery' ? 250 : deliveryOption === 'Express Delivery' ? 150 : 0;
    const discount = 0; // Simulated coupon discount could be computed here
    const total = subtotal + shipping - discount;

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      total,
      subtotal,
      discount,
      shipping,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      shippingAddress,
      deliveryOption,
      paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addNotification(`Your order ${newOrder.id} has been placed successfully for ₹${newOrder.total}.`, 'order', newOrder.id);
    return newOrder;
  };

  // --- Admin Add Product ---
  const addProduct = (newProd: Omit<Product, 'id' | 'rating' | 'ratingsCount' | 'reviews'>) => {
    const product: Product = {
      ...newProd,
      id: `p${products.length + 1}`,
      rating: 5.0,
      ratingsCount: 1,
      reviews: [],
    };
    setProducts((prev) => [product, ...prev]);
  };

  // --- Admin Update Product Inventory ---
  const updateProductInventory = (productId: string, weight: string, price: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, weight, price } : p))
    );
  };

  // --- Admin Offline Sales Manual Entry ---
  const addOfflineSale = (sale: Omit<OfflineSale, 'id' | 'date'>) => {
    const newSale: OfflineSale = {
      ...sale,
      id: `OFL-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
    };
    setOfflineSales((prev) => [newSale, ...prev]);
  };

  // --- Superadmin Sales CSV File Uploader Parser ---
  const importOfflineSales = (salesList: Omit<OfflineSale, 'id' | 'date'>[]) => {
    const dateStr = new Date().toISOString().split('T')[0];
    const newSales: OfflineSale[] = salesList.map((s, idx) => ({
      ...s,
      id: `OFL-IMP-${Math.floor(100 + Math.random() * 900)}-${idx}`,
      date: dateStr,
    }));
    setOfflineSales((prev) => [...newSales, ...prev]);
  };

  // --- Admin Homepage Editor ---
  const updateBanner = (id: string, bannerData: Partial<Banner>) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...bannerData } : b))
    );
  };

  // --- Superadmin Theme Builder Customizer ---
  const updateThemeColors = (colors: { primary?: string; darkChocolate?: string; gold?: string; roseGold?: string; black?: string }) => {
    setTheme((prev: typeof defaultTheme) => ({
      ...prev,
      ...colors,
    }));
  };

  // --- Support Tickets State & Handlers ---
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('chovique_tickets');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'TKT-1082',
        customerId: 'u1',
        customerName: 'Priya Sharma',
        category: 'Slow delivery',
        description: 'My order ORD-9872 was delayed by 2 days, and I wanted it for a special anniversary dinner.',
        status: 'Resolved',
        adminNotes: 'Sincere apologies for the delay due to a logistics bottleneck in our transit partners. We have marked this with our high-priority support. A discount code CHOV40 has been applied for your future orders.',
        customerResolutionFeedback: 'Resolved',
        date: '2026-06-15',
        notified: true,
      },
      {
        id: 'TKT-3829',
        customerId: 'u1',
        customerName: 'Priya Sharma',
        category: 'Chocolate melted',
        description: 'The Royal Truffle box arrived slightly melted in the corners. I think the cold packaging melted during the final leg of transit.',
        status: 'Pending',
        date: '2026-06-27',
        notified: false,
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('chovique_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const addSupportTicket = (category: SupportTicket['category'], description: string) => {
    const newTicket: SupportTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: user?.id || 'guest',
      customerName: user?.name || 'Anonymous Customer',
      category,
      description,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      notified: false,
    };
    setTickets((prev) => [newTicket, ...prev]);
  };

  const resolveSupportTicket = (ticketId: string, adminNotes?: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          addNotification(`Support Complaint ${ticketId} has been resolved by Admin.`, 'support', ticketId);
          return { ...t, status: 'Resolved', adminNotes, notified: false };
        }
        return t;
      })
    );
  };

  const submitTicketFeedback = (ticketId: string, feedback: 'Resolved' | 'Not Resolved') => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, customerResolutionFeedback: feedback }
          : t
      )
    );
  };

  const acknowledgeTicketNotification = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, notified: true } : t))
    );
  };

  // --- Profile, Addresses, and Notifications Operations ---
  const updateUserProfilePicture = (base64Image: string) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        profile: {
          ...prev.profile,
          avatarImage: base64Image
        }
      };
    });
  };

  const updateUserProfile = (updatedProfile: { name?: string; phone?: string; dob?: string; gender?: string; preferences?: string }) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        name: updatedProfile.name !== undefined ? updatedProfile.name : prev.name,
        profile: {
          ...prev.profile,
          ...updatedProfile
        }
      };
    });
  };

  const [addresses, setAddresses] = useState<CustomerAddress[]>(() => {
    const saved = localStorage.getItem('chovique_addresses');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'addr-1',
        title: 'Primary Residence',
        name: 'Priya Sharma',
        street: 'Flat 402, Royal Gardens, Sector 15',
        city: 'Mumbai',
        state: 'Maharashtra',
        zip: '400053',
        phone: '+91 98765 43210',
        isDefault: true,
      },
      {
        id: 'addr-2',
        title: 'Corporate Office',
        name: 'Priya Sharma',
        street: 'Tower C, Unit 902, Tech Hub',
        city: 'Mumbai',
        state: 'Maharashtra',
        zip: '400076',
        phone: '+91 98765 43210',
        isDefault: false,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('chovique_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = (newAddr: Omit<CustomerAddress, 'id'>) => {
    const address: CustomerAddress = {
      ...newAddr,
      id: `addr-${Date.now()}`,
    };
    setAddresses(prev => {
      if (address.isDefault) {
        return prev.map(a => ({ ...a, isDefault: false })).concat(address);
      }
      return [...prev, address];
    });
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev =>
      prev.map(a => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const [notifications, setNotifications] = useState<SupportNotification[]>(() => {
    const saved = localStorage.getItem('chovique_notifications');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'notif-1',
        text: 'Your order ORD-5431 has been marked as Processing and is being curated.',
        date: new Date().toISOString().split('T')[0],
        read: false,
        type: 'order',
        referenceId: 'ORD-5431',
      },
      {
        id: 'notif-2',
        text: 'Order ORD-9872 has been successfully delivered in cooler packs.',
        date: new Date().toISOString().split('T')[0],
        read: false,
        type: 'order',
        referenceId: 'ORD-9872',
      },
      {
        id: 'notif-3',
        text: 'Exclusive Offer: Use code CHOV40 for 40% off during the festive season!',
        date: new Date().toISOString().split('T')[0],
        read: false,
        type: 'general',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('chovique_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (text: string, type: SupportNotification['type'], referenceId?: string) => {
    const notif: SupportNotification = {
      id: `notif-${Date.now()}`,
      text,
      date: new Date().toISOString().split('T')[0],
      read: false,
      type,
      referenceId,
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        role,
        login,
        register,
        logout,
        products,
        banners,
        orders,
        offlineSales,
        wishlist,
        cart,
        theme,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        moveToCart,
        placeOrder,
        addProduct,
        updateProductInventory,
        addOfflineSale,
        importOfflineSales,
        updateBanner,
        updateThemeColors,
        tickets,
        addSupportTicket,
        resolveSupportTicket,
        submitTicketFeedback,
        acknowledgeTicketNotification,
        updateUserProfilePicture,
        updateUserProfile,
        addresses,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        notifications,
        removeNotification,
        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
