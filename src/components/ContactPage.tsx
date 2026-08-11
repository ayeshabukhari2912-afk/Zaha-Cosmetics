import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, MessageCircle, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      addToast('success', 'Message Sent!', 'Thank you for reaching out. Our beauty advisor will respond shortly.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#1e8d4f] inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          We Are Here For You
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0e301d]">
          Contact Zaha Cosmetics
        </h1>
        <p className="text-sm sm:text-base text-zinc-600">
          Have questions about a shade match, ingredient consultation, or your order? Connect with our dedicated beauty team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-2xs space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#0e301d]">Send Us A Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#1e8d4f] focus:ring-2 focus:ring-[#2eaf67]/20 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#1e8d4f] focus:ring-2 focus:ring-[#2eaf67]/20 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#1e8d4f] focus:ring-2 focus:ring-[#2eaf67]/20 outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Your Message *</label>
              <textarea
                required
                rows={5}
                placeholder="How can we assist your beauty journey today?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#1e8d4f] focus:ring-2 focus:ring-[#2eaf67]/20 outline-hidden"
              />
            </div>

            <button
              id="contact-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0e301d] text-[#d4af37] font-bold text-xs hover:bg-[#1e8d4f] hover:text-white transition-colors shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Contact Details & Store Locations */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#0e301d] text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl border border-[#2eaf67]/30">
            <h3 className="font-serif text-2xl font-bold text-[#d4af37]">Beauty Concierge</h3>

            <div className="space-y-4 text-xs text-stone-200">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#2eaf67] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Email Enquiries</span>
                  <span>support@zahacosmetics.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#2eaf67] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">VIP Helpline</span>
                  <span>+1 (800) 924-2232 (Mon-Sat, 9am - 7pm)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2eaf67] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Flagship Atelier</span>
                  <span>740 N Rodeo Drive, Beverly Hills, CA 90210</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider block">Follow Zaha Cosmetics</span>
              <div className="flex items-center gap-3">
                <a href="#instagram" className="p-2.5 rounded-full bg-white/10 text-white hover:bg-[#2eaf67] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#facebook" className="p-2.5 rounded-full bg-white/10 text-white hover:bg-[#2eaf67] transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#whatsapp" className="p-2.5 rounded-full bg-white/10 text-white hover:bg-[#2eaf67] transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Location Placeholder Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-3">
            <h4 className="font-serif font-bold text-[#0e301d]">Visit Our Boutique</h4>
            <div className="aspect-video bg-stone-100 rounded-2xl overflow-hidden relative border border-stone-200">
              <img
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
                alt="Store Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#0e301d] shadow-md">
                  Beverly Hills Flagship Store
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
