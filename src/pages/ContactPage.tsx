import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Subscription Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Demo Inquiry Submitted! Support team acknowledged.', 'success');
  };

  const contactFaqs = [
    {
      q: 'Can I change my tiffin delivery address mid-subscription?',
      a: 'Yes, you can update your primary delivery address anytime in your Customer Account or contact kitchen support prior to 9:00 AM for lunch and 4:00 PM for dinner.'
    },
    {
      q: 'What packaging is used for hot deliveries?',
      a: 'We use food-grade, 100% recyclable, microwave-safe containers wrapped inside thermal insulated foil bags to ensure your dal and rotis arrive warm and fragrant.'
    },
    {
      q: 'Do you cater for office team lunches or bulk corporate events?',
      a: 'Yes! We deliver bulk executive combos and thalis for corporate meetings with prior 24-hour notice. Reach out via our demo inquiry form.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
          Kitchen Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-forest-900 font-sans tracking-tight">
          Contact FreshBox Tiffin
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Have questions about meal ingredients, custom catering, or jar returns? Our team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-5">
          <h3 className="text-base sm:text-lg font-extrabold text-charcoal-800 pb-3 border-b border-cream-200 flex items-center justify-between">
            <span>Send a Kitchen Message</span>
            <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded font-mono">
              Demo Form
            </span>
          </h3>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-extrabold text-emerald-900">
                Inquiry Received (Demo Simulation)
              </h4>
              <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
                Thank you, {name || 'Customer'}. In a live deployment, our kitchen operations lead would reply within 15 minutes.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="bg-forest-500 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-sm p-3 rounded-xl border border-cream-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">Email or Phone *</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full text-sm p-3 rounded-xl border border-cream-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-cream-300 bg-cream-50/50 font-semibold focus:outline-none focus:ring-2 focus:ring-forest-500"
                >
                  <option value="Subscription Inquiry">Monthly Subscription Inquiry</option>
                  <option value="Water Jar Delivery">20L Water Jar Question</option>
                  <option value="Dietary Request">Custom Dietary / Jain Request</option>
                  <option value="Corporate Catering">Office / Bulk Catering</option>
                  <option value="Other Feedback">Other Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Message *</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="How can our kitchen help you today?"
                  className="w-full text-sm p-3 rounded-xl border border-cream-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-forest-500 hover:bg-forest-600 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Demo Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Contact Details, WhatsApp UI, Kitchen Timings */}
        <div className="lg:col-span-5 space-y-6">
          {/* Contact Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-300 shadow-card space-y-4">
            <h3 className="text-base font-extrabold text-charcoal-800 pb-3 border-b border-cream-200">
              Kitchen Operational Details
            </h3>

            <div className="space-y-3.5 text-xs text-charcoal-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-forest-50 text-forest-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-charcoal-800">Support Hotline (Placeholder)</p>
                  <p className="font-mono text-charcoal-700">+91 98765 43210 / +91 80 4123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-forest-50 text-forest-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-charcoal-800">Kitchen Email</p>
                  <p className="text-charcoal-700">support@freshboxtiffin.demo</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-forest-50 text-forest-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-charcoal-800">Central Kitchen Facility</p>
                  <p className="text-charcoal-700">Plot 45, Food Tech Hub, Outer Ring Road, Bellandur, Bengaluru 560103</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-forest-50 text-forest-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-charcoal-800">Dispatch Timings</p>
                  <p className="text-charcoal-700">Morning 7:30 AM – Night 10:30 PM (All 7 Days)</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Chat UI */}
            <div className="pt-3 border-t border-cream-200">
              <button
                type="button"
                onClick={() =>
                  alert('Demo WhatsApp Trigger: In live app, this connects directly to +91 98765 43210 on WhatsApp web or mobile.')
                }
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp Support (Demo UI)</span>
              </button>
            </div>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-card space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal-700 pb-2 border-b border-cream-200">
              Quick Contact FAQs
            </h4>
            <div className="space-y-2">
              {contactFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-cream-200 rounded-xl overflow-hidden text-xs">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3 font-bold text-left text-charcoal-800 flex justify-between items-center gap-2 bg-cream-50/50"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-charcoal-400 transition-transform ${
                          isOpen ? 'rotate-180 text-forest-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="p-3 text-charcoal-600 bg-white border-t border-cream-200 leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
