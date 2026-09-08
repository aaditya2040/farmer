import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Send,
  AlertCircle
} from 'lucide-react';

export const HelpSupport: React.FC = () => {
  const { t } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const faqs = [
    {
      q: 'How do I book a procurement slot on KisanSetu?',
      a: 'Farmers can log in using their 10-digit mobile number, navigate to "Slot Booking", select their nearest APMC Centre, choose an available date & convenient 1-hour time slot, enter produce quantity, and click Confirm to generate an official digital token pass.'
    },
    {
      q: 'What should I do if my produce moisture is higher than 12%?',
      a: 'As per Government of Maharashtra procurement norms, standard FAQ moisture must be at or below 12.0%. If higher, farmers are advised to sun-dry the produce on tarpaulins before entering the weighbridge to prevent quality deductions.'
    },
    {
      q: 'How soon is the MSP amount credited to my bank account after weighment?',
      a: 'Once the final tare weighment slip and J-Form are issued by the Mandi Superintendent, payment is directly transferred via PFMS / Aadhaar Payment Bridge (DBT) within 24 to 48 hours.'
    },
    {
      q: 'What documents are required when arriving at the APMC gate?',
      a: '1. Original or digital 7/12 land record extract with active kharif crop entry. 2. Aadhaar card. 3. Printed or digital SMS Token Pass (e.g. TOKEN A-127).'
    },
    {
      q: 'Can I reschedule my time slot if I cannot reach on time?',
      a: 'Yes, slots can be cancelled or rescheduled up to 4 hours prior to the allotted time slot without any penalty through the Farmer Dashboard.'
    }
  ];

  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = `TKT-MH-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketId(randomTicket);
    setGrievanceSubmitted(true);
  };

  return (
    <div className="govt-container py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border-2 border-govt-border shadow-govt flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-govt-navy font-govt flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-govt-navy" />
            <span>{t('help')} & Grievance Redressal (मदत व तक्रार निवारण)</span>
          </h2>
          <p className="text-xs text-slate-600">
            Dedicated 24x7 citizen support desk for agricultural procurement queries.
          </p>
        </div>

        <div className="text-xs font-mono font-bold bg-green-50 text-green-900 border border-green-300 px-3 py-1.5 rounded">
          Toll-Free Helpline: 1800-233-0244 / 1551
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Frequently Asked Questions (FAQ) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-lg border-2 border-govt-border shadow-govt space-y-4">
          <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider border-b border-slate-200 pb-2">
            Frequently Asked Citizen Inquiries (वारंवार विचारले जाणारे प्रश्न)
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3.5 text-left bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
                  </button>
                  {isOpen && (
                    <div className="p-3.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: e-Samadhan Grievance Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-lg border-2 border-govt-border shadow-govt space-y-4">
          <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-govt-saffron" />
            <span>e-Samadhan Grievance Registration (तक्रार नोंदणी)</span>
          </h3>

          {grievanceSubmitted ? (
            <div className="p-5 bg-green-50 border-2 border-green-300 rounded-lg text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-green-900">Grievance Registered Successfully</h4>
              <p className="text-xs text-green-800">
                Your ticket has been forwarded to the District Agriculture Officer.
              </p>
              <div className="text-xs font-mono font-bold bg-white p-2 rounded border border-green-200 text-slate-900">
                Ticket Reference: {ticketId}
              </div>
              <button
                onClick={() => setGrievanceSubmitted(false)}
                className="text-xs text-green-900 font-bold underline hover:no-underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitGrievance} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Issue Category</label>
                <select required className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden">
                  <option value="">-- Choose Category --</option>
                  <option value="slot">Slot Booking / Centre Availability</option>
                  <option value="queue">Queue Delay / Gate Entry Issue</option>
                  <option value="weighment">Weighbridge / Moisture Discrepancy</option>
                  <option value="payment">DBT Payment / PFMS Delay</option>
                  <option value="other">General Grievance</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Farmer Name & ID</label>
                <input
                  type="text"
                  required
                  defaultValue="Ramesh Dinkar Patil (MH-THN-2026-8849)"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your issue with date, token number, or mandi centre..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-govt-navy hover:bg-govt-navy-dark text-white font-bold rounded text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance Ticket</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
