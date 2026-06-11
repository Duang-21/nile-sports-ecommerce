import { useState, useMemo, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Lock, CreditCard, 
  ChevronLeft, Loader2, Sparkles, Phone, MapPin, Mail, User, Printer, CheckCircle
} from 'lucide-react';
import { CartItem, ShippingDetails, PaymentDetails } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (product_id: string, size: string, quantity: number) => void;
  onRemoveItem: (product_id: string, size: string) => void;
  onClearCart: () => void;
}

type CheckoutStep = 'review' | 'shipping' | 'payment' | 'processing' | 'success';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  
  const [step, setStep] = useState<CheckoutStep>('review');
  const [successOrderId, setSuccessOrderId] = useState<string>('');
  
  // Shipping details state & validation
  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  });
  const [shippingErrors, setShippingErrors] = useState<Partial<Record<keyof ShippingDetails, string>>>({});

  // Payment details state & validation
  const [payment, setPayment] = useState<PaymentDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [paymentErrors, setPaymentErrors] = useState<Partial<Record<keyof PaymentDetails, string>>>({});
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Live gateway processing statuses logs
  const [gatewayLog, setGatewayLog] = useState<string>('Initializing secure ledger tunnel...');
  const [gatewayLogIndex, setGatewayLogIndex] = useState<number>(0);

  const logs = [
    'Establishing encrypted 256-bit SSL handshakes...',
    'Tokenizing credit card identifiers...',
    'Performing 3D-Secure secure checking...',
    'Routing order details to Nile Settlement Services...',
    'Verifying account financial deposits...',
    'Finalizing transaction security certificate...'
  ];

  // Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const tax = useMemo(() => {
    return Math.round(subtotal * 0.08 * 100) / 100; // 8% sales tax
  }, [subtotal]);

  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 15;

  const grandTotal = useMemo(() => {
    return Math.round((subtotal + tax + shippingFee) * 100) / 100;
  }, [subtotal, tax, shippingFee]);

  // Card details network detection
  const cardBrand = useMemo(() => {
    const raw = payment.cardNumber.replace(/\D/g, '');
    if (raw.startsWith('4')) return 'Visa';
    if (raw.startsWith('5')) return 'Mastercard';
    if (raw.startsWith('3')) return 'American Express';
    return 'Unknown';
  }, [payment.cardNumber]);

  // Staggered logs during gateway processing
  useEffect(() => {
    if (step !== 'processing') return;

    setGatewayLogIndex(0);
    setGatewayLog('Initializing secure payment verification gateway...');

    const timer = setInterval(() => {
      setGatewayLogIndex((prev) => {
        const next = prev + 1;
        if (next < logs.length) {
          setGatewayLog(logs[next]);
          return next;
        } else {
          clearInterval(timer);
          // Transition to success order
          const randomOrder = 'NSW-' + Math.floor(100000 + Math.random() * 900000);
          setSuccessOrderId(randomOrder);
          setStep('success');
          return prev;
        }
      });
    }, 900);

    return () => clearInterval(timer);
  }, [step]);

  // Handle outside Click or key locks
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Functions to change shipping fields
  const handleShippingChange = (field: keyof ShippingDetails, value: string) => {
    setShipping(prev => ({ ...prev, [field]: value }));
    if (shippingErrors[field]) {
      setShippingErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateShipping = () => {
    const errors: Partial<Record<keyof ShippingDetails, string>> = {};
    if (!shipping.fullName.trim()) errors.fullName = 'Full name is required';
    if (!shipping.email.trim() || !/\S+@\S+\.\S+/.test(shipping.email)) errors.email = 'Valid email is required';
    if (!shipping.address.trim()) errors.address = 'Street address is required';
    if (!shipping.city.trim()) errors.city = 'City is required';
    if (!shipping.zip.trim() || shipping.zip.length < 4) errors.zip = 'Valid ZIP / Postal code is required';
    if (!shipping.phone.trim() || shipping.phone.length < 7) errors.phone = 'Valid phone contact is required';

    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShippingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep('payment');
    }
  };

  // Format Card Number (adds space every 4 digits)
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format Expiry date MM/YY
  const formatExpiry = (value: string) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length >= 2) {
      return `${clean.substring(0, 2)}/${clean.substring(2, 4)}`;
    }
    return clean;
  };

  const handlePaymentChange = (field: keyof PaymentDetails, value: string) => {
    let formatted = value;
    if (field === 'cardNumber') {
      formatted = formatCardNumber(value).substring(0, 19); // 16 digits + 3 spaces
    } else if (field === 'expiryDate') {
      formatted = formatExpiry(value).substring(0, 5); // MM/YY
    } else if (field === 'cvv') {
      formatted = value.replace(/\D/g, '').substring(0, 4); // numbers only, max 4
    }

    setPayment(prev => ({ ...prev, [field]: formatted }));
    if (paymentErrors[field]) {
      setPaymentErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePayment = () => {
    const errors: Partial<Record<keyof PaymentDetails, string>> = {};
    const rawCard = payment.cardNumber.replace(/\s+/g, '');
    
    if (rawCard.length < 15) errors.cardNumber = 'Invalid card number length';
    if (payment.expiryDate.length < 5 || !payment.expiryDate.includes('/')) errors.expiryDate = 'Invalid date (MM/YY)';
    if (payment.cvv.length < 3) errors.cvv = 'Invalid CVV';
    if (!payment.cardholderName.trim()) errors.cardholderName = 'Cardholder name is required';

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validatePayment()) {
      setStep('processing');
    }
  };

  const triggerReset = () => {
    onClearCart();
    setStep('review');
    setShipping({ fullName: '', email: '', address: '', city: '', zip: '', phone: '' });
    setPayment({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/70 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Body Sheet */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-lg bg-[#0A0A0A] border-l border-white/10 h-full flex flex-col justify-between z-10 shadow-2xl relative"
            id="cart-drawer-sheet"
          >
            {/* Header section */}
            <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-blue-500" />
                <h3 className="font-sans text-lg text-zinc-100 font-black uppercase tracking-tight">
                  {step === 'review' && 'Shopping Bag'}
                  {step === 'shipping' && 'Shipping Address'}
                  {step === 'payment' && 'Secure payment'}
                  {step === 'processing' && 'Routing payment'}
                  {step === 'success' && 'Order receipt'}
                </h3>
                {cartItems.length > 0 && step === 'review' && (
                  <span className="bg-zinc-950 px-2.5 py-1 border border-white/10 rounded-none font-mono text-[9px] font-black text-blue-500">
                    {cartItems.reduce((sum, i) => sum + i.quantity, 0)} ITEMS
                  </span>
                )}
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
                id="cart-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Drawer Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              
              {/* STEP 1: SHOPPING BAG REVIEW */}
              {step === 'review' && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                      <div className="p-4 bg-zinc-955 rounded-none border border-white/10 text-zinc-500">
                        <ShoppingBag className="w-8 h-8 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-sans text-sm font-bold uppercase tracking-tight text-white">Your bag is empty</h4>
                        <p className="font-sans text-xs text-zinc-450 mt-1 max-w-[200px] font-light">
                          Select products from the store to load catalog additions.
                        </p>
                      </div>
                      <button 
                        onClick={onClose}
                        className="mt-4 font-mono text-[10px] text-blue-500 hover:text-white font-black uppercase tracking-widest cursor-pointer"
                      >
                        Keep Browsing
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div 
                          key={`${item.product.id}-${item.selectedSize}`}
                          className="flex gap-4 p-4 bg-zinc-955/60 border border-white/10 rounded-none relative group"
                        >
                          <div className="w-16 h-20 bg-zinc-950 rounded-none overflow-hidden shrink-0 border border-white/10">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-sans text-xs font-bold uppercase text-zinc-105 line-clamp-1">{item.product.name}</h4>
                                <span className="font-mono text-xs text-white font-black">${item.product.price * item.quantity}</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-1.5">
                                <span className="bg-zinc-950 border border-white/10 px-2 py-0.5 rounded-none font-mono text-[9px] uppercase text-blue-550 font-bold">
                                  SIZE: {item.selectedSize}
                                </span>
                                <span className="bg-zinc-950 border border-white/10 px-2 py-0.5 rounded-none font-mono text-[9px] uppercase text-zinc-500 font-bold">
                                  ${item.product.price} / EA
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity selection */}
                              <div className="flex items-center bg-zinc-950 border border-white/10 rounded-none py-0.5 px-0.5 scale-90 -ml-2 origin-left">
                                <button 
                                  className="px-2 py-1 text-zinc-500 hover:text-white transition-colors disabled:opacity-30 cursor-pointer text-xs"
                                  onClick={() => onUpdateQty(item.product.id, item.selectedSize, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  id={`qty-dec-${item.product.id}-${item.selectedSize}`}
                                >
                                  -
                                </button>
                                <span className="px-2 font-mono text-xs text-white font-bold">{item.quantity}</span>
                                <button 
                                  className="px-2 py-1 text-zinc-500 hover:text-white transition-colors cursor-pointer text-xs"
                                  onClick={() => onUpdateQty(item.product.id, item.selectedSize, item.quantity + 1)}
                                  id={`qty-inc-${item.product.id}-${item.selectedSize}`}
                                >
                                  +
                                </button>
                              </div>

                              <button 
                                onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                                className="text-zinc-550 hover:text-red-400 transition-colors cursor-pointer"
                                id={`trash-btn-${item.product.id}-${item.selectedSize}`}
                                aria-label="Delete item option"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* STEP 2: SHIPPING DETAILS FORM */}
              {step === 'shipping' && (
                <form id="shipping-form" onSubmit={handleShippingSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 mb-4">
                    <button 
                      type="button" 
                      onClick={() => setStep('review')}
                      className="text-zinc-400 hover:text-zinc-100 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back To Bag
                    </button>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-500" /> Full Courier Name
                      </label>
                      <input 
                        type="text" 
                        required
                        value={shipping.fullName}
                        onChange={(e) => handleShippingChange('fullName', e.target.value)}
                        placeholder="Johnathan Doe" 
                        className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-xs font-sans text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                        id="ship-fullName"
                      />
                      {shippingErrors.fullName && <p className="text-[10px] text-red-400 mt-1">{shippingErrors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-blue-500" /> Personal Email Address
                      </label>
                      <input 
                        type="email" 
                        required
                        value={shipping.email}
                        onChange={(e) => handleShippingChange('email', e.target.value)}
                        placeholder="john@example.com" 
                        className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-xs font-sans text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                        id="ship-email"
                      />
                      {shippingErrors.email && <p className="text-[10px] text-red-400 mt-1">{shippingErrors.email}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" /> House & Street Address
                      </label>
                      <input 
                        type="text" 
                        required
                        value={shipping.address}
                        onChange={(e) => handleShippingChange('address', e.target.value)}
                        placeholder="184 Pharaohs Boulevard Apt 4C" 
                        className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-xs font-sans text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                        id="ship-address"
                      />
                      {shippingErrors.address && <p className="text-[10px] text-red-100 mt-1">{shippingErrors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-450 font-bold mb-1.5">
                          City
                        </label>
                        <input 
                          type="text" 
                          required
                          value={shipping.city}
                          onChange={(e) => handleShippingChange('city', e.target.value)}
                          placeholder="Cairo" 
                          className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-xs font-sans text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                          id="ship-city"
                        />
                        {shippingErrors.city && <p className="text-[10px] text-red-400 mt-1">{shippingErrors.city}</p>}
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-450 font-bold mb-1.5">
                          ZIP / Postal Code
                        </label>
                        <input 
                          type="text" 
                          required
                          value={shipping.zip}
                          onChange={(e) => handleShippingChange('zip', e.target.value)}
                          placeholder="11511" 
                          className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-xs font-sans text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                          id="ship-zip"
                        />
                        {shippingErrors.zip && <p className="text-[10px] text-red-100 mt-1">{shippingErrors.zip}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-450 font-bold mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-blue-500" /> Mobile Contact Phone
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={shipping.phone}
                        onChange={(e) => handleShippingChange('phone', e.target.value)}
                        placeholder="+20 100 123 4567" 
                        className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-xs font-sans text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                        id="ship-phone"
                      />
                      {shippingErrors.phone && <p className="text-[10px] text-red-400 mt-1">{shippingErrors.phone}</p>}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4.5 bg-white hover:bg-[#0A0A0A] text-zinc-950 hover:text-white border border-white hover:border-white/20 rounded-none transition-all font-sans font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 cursor-pointer mt-8"
                    id="shipping-to-payment-btn"
                  >
                    <span>Continue to payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* STEP 3: PAYMENT GATEWAY (REALISTIC VISUAL CREDIT CARD CARD & SSL) */}
              {step === 'payment' && (
                <form id="payment-form" onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="flex items-center gap-2">
                    <button 
                      type="button" 
                      onClick={() => setStep('shipping')}
                      className="text-zinc-400 hover:text-zinc-100 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back to Shipping
                    </button>
                  </div>

                  {/* 3D-feeling Responsive virtual Credit Card mockup */}
                  <div className="perspective-1000 my-4">
                    <motion.div 
                      animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative w-full aspect-[1.58/1] bg-gradient-to-tr from-zinc-950 via-zinc-900 to-blue-950/40 border border-white/10 rounded-none p-6 flex flex-col justify-between shadow-2xl text-left overflow-hidden transform-style-3d select-none"
                    >
                      {/* Front Card layout */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between backface-hidden">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-mono text-[80%] uppercase tracking-widest text-blue-500 mb-1 font-bold">
                              NILE SPORTS SECURE GATEWAY
                            </p>
                            <span className="font-sans text-[11px] font-black text-zinc-100 tracking-wider">PREMIUM SECTOR CARD</span>
                          </div>
                          
                          {/* Card Network visual detection badge */}
                          <div className="text-right">
                            <span className="font-mono text-xs font-black italic text-zinc-300">
                              {cardBrand === 'Visa' ? 'VISA' : cardBrand === 'Mastercard' ? 'MC' : cardBrand === 'American Express' ? 'AMEX' : 'BANK'}
                            </span>
                            <span className="block text-[7px] text-zinc-500 uppercase tracking-widest font-mono font-bold">AUTHORIZED SECURE</span>
                          </div>
                        </div>

                        {/* Card Chip graphic icon */}
                        <div className="my-2 flex items-center gap-3">
                          <div className="w-8 h-6.5 bg-blue-500/10 border border-blue-500/20 rounded-none ring-1 ring-blue-500/20 relative">
                            <div className="absolute inset-y-1 left-2.5 right-2 text-zinc-650 flex items-center border-l border-white/15"></div>
                          </div>
                          <span className="font-mono text-[8.5px] text-zinc-500 uppercase tracking-widest mt-1 font-bold">PCI COMPLIANT</span>
                        </div>

                        {/* Interactive dynamic Credit Card numbers */}
                        <div>
                          <p className="font-mono text-base md:text-lg text-zinc-100 tracking-[0.2em] font-black">
                            {payment.cardNumber || '•••• •••• •••• ••••'}
                          </p>
                          <div className="flex justify-between items-end mt-4">
                            <div>
                              <p className="font-mono text-[7px] uppercase tracking-widest text-[#FFF]/30 mb-0.5">Card Holder</p>
                              <p className="font-serif text-xs italic text-zinc-350 tracking-wide truncate max-w-[200px]">
                                {payment.cardholderName || 'CLIENT MEMBER'}
                              </p>
                            </div>
                            <div>
                              <p className="font-mono text-[7px] uppercase tracking-widest text-[#FFF]/30 mb-0.5">Expires</p>
                              <p className="font-mono text-xs font-bold text-zinc-300">
                                {payment.expiryDate || 'MM/YY'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card reverse flip (CVV display) */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between backface-hidden rotateY-180 bg-zinc-950 border border-white/10 rounded-none">
                        <div className="h-10 bg-zinc-900 w-full -mx-6 mt-2 shrink-0"></div>
                        <div className="flex justify-end pr-8 mb-4">
                          <div className="text-right">
                            <p className="font-mono text-[7px] text-zinc-500 uppercase tracking-widest mb-1 font-bold">SECURE CVV SIGNATURE</p>
                            <div className="bg-zinc-900 px-5.5 py-1.5 rounded-none border border-white/5 font-mono text-xs font-black text-zinc-300 italic">
                              {payment.cvv || '•••'}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="font-mono text-[7.5px] text-zinc-600 text-center leading-[1.3] font-bold">
                            PCI-DSS compliant encrypted ledger processing. Authorized signature mandatory for refunds and orders claims.
                          </p>
                        </div>
                      </div>

                    </motion.div>
                  </div>

                  {/* Payment gateway field entries */}
                  <div className="space-y-4 text-left">
                    
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-440 font-bold mb-1.5">
                        Cardholder Name
                      </label>
                      <input 
                        type="text" 
                        required
                        value={payment.cardholderName}
                        onChange={(e) => handlePaymentChange('cardholderName', e.target.value)}
                        placeholder="Johnathan Doe" 
                        className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-xs font-sans text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                        onFocus={() => setIsCardFlipped(false)}
                        id="pay-cardholderName"
                      />
                      {paymentErrors.cardholderName && <p className="text-[10px] text-red-400 mt-1">{paymentErrors.cardholderName}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-440 font-bold mb-1.5">
                        Card Number
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          required
                          value={payment.cardNumber}
                          onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                          placeholder="4242 4242 4242 4242" 
                          className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-xs font-mono text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                          onFocus={() => setIsCardFlipped(false)}
                          id="pay-cardNumber"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-550">
                          <CreditCard className="w-4 h-4 text-blue-500" />
                        </span>
                      </div>
                      {paymentErrors.cardNumber && <p className="text-[10px] text-red-00 mt-1">{paymentErrors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-440 font-bold mb-1.5">
                          Expiration (MM/YY)
                        </label>
                        <input 
                          type="text" 
                          required
                          value={payment.expiryDate}
                          onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                          placeholder="12/28" 
                          className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-xs font-mono text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                          onFocus={() => setIsCardFlipped(false)}
                          id="pay-expiryDate"
                        />
                        {paymentErrors.expiryDate && <p className="text-[10px] text-red-400 mt-1">{paymentErrors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-440 font-bold mb-1.5">
                          CVV / CVC Code
                        </label>
                        <input 
                          type="password" 
                          required
                          value={payment.cvv}
                          onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                          placeholder="•••" 
                          className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-xs font-mono text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                          onFocus={() => setIsCardFlipped(true)}
                          onBlur={() => setIsCardFlipped(false)}
                          id="pay-cvv"
                        />
                        {paymentErrors.cvv && <p className="text-[10px] text-red-400 mt-1">{paymentErrors.cvv}</p>}
                      </div>
                    </div>

                  </div>

                  {/* SSL and Security Certificates Shield layout */}
                  <div className="bg-zinc-950 border border-white/10 p-5 rounded-none flex items-start gap-3 mt-6">
                    <Lock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="font-mono text-[9px] font-black uppercase tracking-widest text-zinc-300">
                        🔒 SSL CRYPTOGRAPHIC SETTLEMENT ENVIRONMENT
                      </p>
                      <p className="font-sans text-[11px] text-zinc-400 leading-normal mt-1 font-light">
                        Your transaction details are tokenized securely with military-grade AES-256 shields. Nile Sports Wear does not store raw credit card numbers. Secure token code standard is PCI-DSS Level 1.
                      </p>
                    </div>
                  </div>

                  {/* Payment Authorize Button */}
                  <button 
                    type="submit" 
                    className="w-full py-4.5 bg-white hover:bg-blue-600 text-zinc-950 hover:text-white border border-white hover:border-blue-600 font-sans font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 cursor-pointer mt-4 rounded-none transition-all"
                    id="payment-submit-btn"
                  >
                    <span>Authorize & Pay ${grandTotal}</span>
                  </button>
                </form>
              )}

              {/* STEP 4: INTERACTIVE GATEWAY API LOG PROCESSING */}
              {step === 'processing' && (
                <div className="h-full flex flex-col items-center justify-center py-16 text-center gap-6">
                  
                  {/* Glowing secure lock rotation container */}
                  <div className="p-8 bg-zinc-955 rounded-none border border-white/10 relative">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <Lock className="w-5 h-5 text-zinc-400 absolute inset-0 m-auto" />
                  </div>

                  <div>
                    <h4 className="font-sans text-sm font-black uppercase tracking-wider text-white">
                      Gateway Authorization in progress
                    </h4>
                    <p className="font-sans text-xs text-zinc-400 mt-1.5 font-light">
                      Please wait while we route transaction settlement credentials.
                    </p>
                  </div>

                  {/* Live Security Log Terminal Block */}
                  <div className="w-full bg-zinc-955 border border-white/10 rounded-none p-4 font-mono text-[9px] text-[#22c55e] text-left">
                    <p className="font-bold border-b border-white/10 pb-1.5 mb-2 uppercase tracking-wider text-zinc-400 flex justify-between items-center">
                      <span>NNSW SECURE LOGSHEET</span>
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    </p>
                    <div className="space-y-1.5">
                      <p className="opacity-45">&gt; CONNECTING BANK INGRESS APIS...</p>
                      <p className="opacity-65">&gt; TLS TUNNEL REGISTERED SECURE...</p>
                      {gatewayLogIndex >= 1 && <p className="opacity-75">&gt; TOKENIZING CARD CREDENTIALS...</p>}
                      {gatewayLogIndex >= 2 && <p className="opacity-85">&gt; PASSING 3DSECURE SIGNATURES...</p>}
                      {gatewayLogIndex >= 3 && <p className="opacity-90">&gt; CHECKING NileSettlement LEDGER API...</p>}
                      <p className="text-zinc-200 mt-3 flex items-center gap-2 font-bold animate-pulse">
                        <span className="inline-block animate-bounce">&bull;</span> {gatewayLog}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: SUCCESS RECEIPT PRINT PAGE */}
              {step === 'success' && (
                <div id="receipt-screen" className="space-y-6 text-left">
                  
                  {/* Huge elegant visual success confirmation */}
                  <div className="text-center py-6">
                    <CheckCircle className="w-16 h-16 text-[#22c55e] mx-auto mb-4" />
                    <h4 className="font-sans text-xl text-zinc-100 font-extrabold uppercase tracking-tight">Order Complete!</h4>
                    <p className="font-sans text-xs text-[#22c55e] font-mono mt-1 font-bold">TRANSACTION CONFIRMED 100%</p>
                  </div>

                  {/* Printable Invoice / Receipt frame */}
                  <div className="bg-zinc-955 border border-white/10 p-6 rounded-none space-y-4 border-t-4 border-t-blue-600 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rotate-45 transform translate-x-12 -translate-y-12 rounded-none"></div>
                    
                    {/* Invoice title */}
                    <div className="flex justify-between items-start border-b border-white/10 pb-4">
                      <div>
                        <h5 className="font-mono text-sm font-black text-zinc-100 uppercase tracking-widest">NILE CO. INVOICE</h5>
                        <p className="font-mono text-[9px] text-zinc-400 font-bold mt-1">REF: {successOrderId}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFF]/30 block font-bold">Date</span>
                        <span className="font-mono text-[10px] text-zinc-200 font-black">June 11, 2026</span>
                      </div>
                    </div>

                    {/* Delivery summary */}
                    <div className="text-xs space-y-1.5 py-1 text-zinc-400 border-b border-white/10 pb-4">
                      <p className="font-mono text-[8.5px] uppercase tracking-widest text-zinc-500 font-bold mb-1">SHIPPED TO</p>
                      <p className="text-zinc-200 font-bold uppercase">{shipping.fullName}</p>
                      <p>{shipping.address}, {shipping.city}, {shipping.zip}</p>
                      <p className="font-mono text-[9px]">{shipping.email} | {shipping.phone}</p>
                    </div>

                    {/* Listed Items */}
                    <div className="py-1">
                      <p className="font-mono text-[8.5px] uppercase tracking-widest text-zinc-550 font-bold mb-2">PURCHASE SUMMARY</p>
                      <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                        {cartItems.map((item) => (
                          <div key={item.product.id + '-' + item.selectedSize} className="flex justify-between text-xs text-zinc-400">
                            <span>
                              {item.product.name} ({item.selectedSize}) <span className="font-mono text-[11px] text-zinc-550">x{item.quantity}</span>
                            </span>
                            <span className="font-mono font-medium text-zinc-300">${item.product.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cost ledger breakdown */}
                    <div className="border-t border-zinc-900 pt-4 space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between text-zinc-450">
                        <span>Items Subtotal</span>
                        <span>${subtotal}</span>
                      </div>
                      <div className="flex justify-between text-zinc-450">
                        <span>VAT (8%)</span>
                        <span>${tax}</span>
                      </div>
                      <div className="flex justify-between text-zinc-450">
                        <span>Courier Shipping</span>
                        <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee}`}</span>
                      </div>
                      <div className="flex justify-between text-zinc-200 font-extrabold text-sm border-t border-zinc-900 pt-2">
                        <span>Incurred Paid</span>
                        <span className="text-amber-500">${grandTotal}</span>
                      </div>
                    </div>

                    {/* Bank Signature Footer */}
                    <div className="bg-zinc-900 p-2.5 rounded-lg font-mono text-[8.5px] text-zinc-500 text-center uppercase tracking-widest">
                      ACQUIRED BY SECURE PAYMENT GATEWAY API &bull; COMPLETE
                    </div>
                  </div>

                  {/* Receipt Options Action */}
                  <div className="flex gap-4">
                    <button 
                      onClick={() => window.print()}
                      className="flex-1 py-4.5 bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 rounded-xl transition-colors font-sans text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                      id="invoice-print-btn"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print invoice</span>
                    </button>
                    
                    <button 
                      onClick={triggerReset}
                      className="flex-1 py-4.5 bg-zinc-100 hover:bg-amber-500 text-zinc-950 rounded-xl transition-all font-sans font-bold text-xs uppercase tracking-widest flex items-center justify-center cursor-pointer"
                      id="invoice-continue-btn"
                    >
                      <span>Continue Shop</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom calculation and transition drawer footer (review screen only) */}
            {step === 'review' && cartItems.length > 0 && (
              <div className="p-6 md:p-8 border-t border-zinc-850 bg-zinc-950/40 text-left">
                <div className="space-y-2 mb-6 font-mono text-xs text-zinc-450">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-zinc-200">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Taxes (8%)</span>
                    <span className="text-zinc-200">${tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Courier</span>
                    <span className="text-zinc-200">
                      {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                    </span>
                  </div>
                  {shippingFee > 0 && (
                    <p className="text-[9px] text-amber-500/70 uppercase">
                      * Add ${100 - subtotal} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-zinc-900 pt-3 flex justify-between text-zinc-250 font-bold text-sm">
                    <span className="text-zinc-300">Est. Total</span>
                    <span className="text-amber-500 text-base">${grandTotal}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setStep('shipping')}
                  className="w-full py-4.5 bg-zinc-100 hover:bg-amber-500 text-zinc-950 transition-all font-sans font-medium text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 cursor-pointer"
                  id="checkout-proceed-btn"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <div className="flex items-center justify-center gap-2 mt-4 text-zinc-550 font-mono text-[9px] uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Verified 256-Bit SSL protection</span>
                </div>
              </div>
            )}

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
