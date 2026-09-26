import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin, MessageSquare, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storeLocations } from '../data/storesData';

export const ContactSection: React.FC = () => {
  const { t, language } = useApp();

  const [topic, setTopic] = useState('topicGeneral');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredBranch, setPreferredBranch] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setPreferredBranch('');
      setMessage('');
    }, 700);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-semibold text-[#1B5E45] tracking-wider uppercase">
            Customer Care & Partnerships
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B3B2B] tracking-tight">
            {t('contactTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[#4E6057] leading-relaxed">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Inquiries & Headquarters Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF7F0] p-6 sm:p-8 rounded-2xl border border-[#E6E0D5] space-y-6">
              <h3 className="font-display text-xl font-bold text-[#0B3B2B]">
                Direct Contact Channels
              </h3>
              <p className="text-xs sm:text-sm text-[#52645C] leading-relaxed">
                Whether you wish to suggest a new drink recipe, inquire about franchise development, or organize corporate catering for your team, our concierges are ready to assist.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3EF] flex items-center justify-center shrink-0 text-[#1B5E45]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0B3B2B]">{t('headquarters')}</div>
                    <div className="text-xs text-[#52645C] mt-0.5 leading-relaxed">{t('headquartersVal')}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3EF] flex items-center justify-center shrink-0 text-[#1B5E45]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0B3B2B]">{t('hotline')}</div>
                    <div className="text-xs text-[#52645C] mt-0.5">{t('hotlineVal')}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3EF] flex items-center justify-center shrink-0 text-[#1B5E45]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0B3B2B]">{t('emailUs')}</div>
                    <div className="text-xs text-[#52645C] mt-0.5">{t('emailVal')}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3EF] flex items-center justify-center shrink-0 text-[#1B5E45]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0B3B2B]">{t('lineOA')}</div>
                    <div className="text-xs text-[#52645C] mt-0.5 font-mono">{t('lineOAVal')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E6E0D5] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#EBF3EF] text-[#1B5E45] rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display text-2xl font-bold text-[#0B3B2B]">
                  Message Dispatched
                </h4>
                <p className="text-sm text-[#52645C] max-w-md mx-auto leading-relaxed">
                  {t('sendSuccess')}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 text-xs font-semibold text-[#0B3B2B] bg-[#EAE5DB] hover:bg-[#DDD6C8] rounded-xl transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Inquiry Subject */}
                <div>
                  <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-1.5">
                    {t('inquiryTopic')}
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D9D3C7] rounded-xl bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#1B5E45] text-[#1A2621]"
                  >
                    <option value="topicGeneral">{t('topicGeneral')}</option>
                    <option value="topicFranchise">{t('topicFranchise')}</option>
                    <option value="topicCatering">{t('topicCatering')}</option>
                    <option value="topicFeedback">{t('topicFeedback')}</option>
                    <option value="topicBeans">{t('topicBeans')}</option>
                  </select>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-1.5">
                      {t('yourName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Supachai K."
                      className="w-full text-xs p-3 border border-[#D9D3C7] rounded-xl bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#1B5E45] text-[#1A2621]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-1.5">
                      {t('yourEmail')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. supachai@example.com"
                      className="w-full text-xs p-3 border border-[#D9D3C7] rounded-xl bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#1B5E45] text-[#1A2621]"
                    />
                  </div>
                </div>

                {/* Phone & Preferred Branch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-1.5">
                      {t('yourPhone')}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 089-123-4567"
                      className="w-full text-xs p-3 border border-[#D9D3C7] rounded-xl bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#1B5E45] text-[#1A2621]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-1.5">
                      {t('preferredBranch')}
                    </label>
                    <select
                      value={preferredBranch}
                      onChange={(e) => setPreferredBranch(e.target.value)}
                      className="w-full text-xs p-3 border border-[#D9D3C7] rounded-xl bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#1B5E45] text-[#1A2621]"
                    >
                      <option value="">-- Any Branch / Global --</option>
                      {storeLocations.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name[language] || s.name.en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-1.5">
                    {t('messageLabel')} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('messagePlaceholder')}
                    className="w-full text-xs p-3 border border-[#D9D3C7] rounded-xl bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#1B5E45] text-[#1A2621]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-[#0B3B2B] hover:bg-[#1B5E45] active:scale-[0.98] rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t('sending') : t('sendMessageBtn')}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
