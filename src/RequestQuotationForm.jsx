import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, FileText, ChevronDown } from 'lucide-react';

const RequestQuotationForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    modules: [],
    cameraCount: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  const moduleOptions = [
    { id: 'parking', label: 'Parking Lots Safety' },
    { id: 'shoplifting', label: 'Shoplifting Prevention' },
    { id: 'office', label: 'Office Safety' },
    { id: 'university', label: 'University Safety' },
    { id: 'productivity', label: 'Employee Productivity' },
    { id: 'home', label: 'Home Safety' },
  ];

  const cameraRanges = [
    '1–10 cameras',
    '11–50 cameras',
    '51–200 cameras',
    '200+ cameras',
    "I'm not sure yet",
  ];

  const toggleModule = (id) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.includes(id)
        ? prev.modules.filter((m) => m !== id)
        : [...prev.modules, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.company) {
      alert('Please fill in your name, email, and company name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Build the payload — mirrors the same endpoint pattern you used for test-model
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone || 'Not provided',
        modules: formData.modules.length
          ? formData.modules
              .map((id) => moduleOptions.find((m) => m.id === id)?.label)
              .join(', ')
          : 'Not specified',
        cameraCount: formData.cameraCount || 'Not specified',
        message: formData.message || 'No additional message',
      };

      const response = await fetch(
        'https://camsense-website.onrender.com/api/request-quotation',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            company: '',
            phone: '',
            modules: [],
            cameraCount: '',
            message: '',
          });
          setShowForm(false);
          setSubmitStatus(null);
        }, 3500);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Quotation request error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      modules: [],
      cameraCount: '',
      message: '',
    });
    setSubmitStatus(null);
  };

  return (
    <>
      {/* Trigger Button — drop this wherever you need it */}
      <div className="mt-6">
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Request a Quotation
        </button>
      </div>

      {/* Full-Screen Modal Overlay */}
      {showForm && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={closeForm}
          style={{ pointerEvents: 'auto' }}
        >
          {/* Modal Card */}
          <div
            className="relative z-[100001] bg-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-600 animate-slideIn"
            onClick={(e) => e.stopPropagation()}
            style={{ isolation: 'isolate' }}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-2xl font-bold text-white">Request a Quotation</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Tell us about your needs and we'll get back with a tailored price.
                </p>
              </div>
              <button
                onClick={closeForm}
                className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors flex-shrink-0 ml-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              {/* Name + Company row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company / Organization <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email + Phone row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number <span className="text-gray-500 text-xs">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 0000000"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Modules */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Modules Interested In <span className="text-gray-500 text-xs">(select all that apply)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {moduleOptions.map((mod) => {
                    const selected = formData.modules.includes(mod.id);
                    return (
                      <label
                        key={mod.id}
                        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          selected
                            ? 'border-cyan-500 bg-cyan-500/10 shadow-lg'
                            : 'border-slate-600 bg-slate-900 hover:border-slate-500 hover:bg-slate-800'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleModule(mod.id)}
                          className="w-4 h-4 text-cyan-500 accent-cyan-500"
                        />
                        <span className="ml-3 text-white text-sm font-medium">{mod.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Camera Count */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Approximate Number of Cameras
                </label>
                <div className="relative">
                  <select
                    value={formData.cameraCount}
                    onChange={(e) => setFormData({ ...formData, cameraCount: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="" className="text-gray-500">Select a range…</option>
                    {cameraRanges.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Requirements <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your security setup, specific requirements, or any questions you have…"
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || submitStatus === 'success'}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting || submitStatus === 'success'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105'
                } text-white shadow-lg`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Request…
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Request Sent!
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Send Quotation Request
                  </>
                )}
              </button>

              {/* Status banners */}
              {submitStatus === 'success' && (
                <div className="flex items-start p-4 bg-green-500/20 border border-green-500 rounded-lg animate-slideIn">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 text-sm font-semibold mb-1">Request received!</p>
                    <p className="text-green-300 text-xs">
                      Our team will review your requirements and email you a tailored quotation within 24–48 hours.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-start p-4 bg-red-500/20 border border-red-500 rounded-lg animate-slideIn">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-400 text-sm font-semibold mb-1">Submission failed</p>
                    <p className="text-red-300 text-xs">
                      Please try again or email us directly at{' '}
                      <a href="mailto:safi@camsense.org" className="underline">safi@camsense.org</a>.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer note */}
            <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong className="text-gray-300">Note:</strong> Your information is kept confidential and used only to prepare your quotation. We typically respond within 24–48 business hours.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.95) translateY(-20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
      `}</style>
    </>
  );
};

export default RequestQuotationForm;