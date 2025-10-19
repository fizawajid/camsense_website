import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

const TestModelForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    modelType: '',
    video: null
  });
  const [videoPreview, setVideoPreview] = useState(null);
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
  

  const modelTypes = [
    { id: 'footfall', label: 'Footfall Detection' },
    { id: 'parking', label: 'Parking Lot Monitoring' },
    { id: 'shoplifting', label: 'Shoplifting Detection' },
    { id: 'guard', label: 'Guard Monitoring' }
  ];

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 20 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('Video file is too large. Please upload a video under 10 seconds (max 20MB).');
        return;
      }

      if (!file.type.startsWith('video/')) {
        alert('Please upload a valid video file.');
        return;
      }

      setFormData({ ...formData, video: file });
      
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.email || !formData.modelType || !formData.video) {
    alert('Please fill all fields and upload a video.');
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
    const submitData = new FormData();
    submitData.append('email', formData.email);
    submitData.append('modelType', formData.modelType);
    submitData.append('video', formData.video);

    const response = await fetch('http://localhost:5000/api/test-model', {
      // https://camsense-website.onrender.com/api/test-model
      
      method: 'POST',
      body: submitData
      // Don't set Content-Type header - FormData will set it automatically
    });

    const result = await response.json();

    if (response.ok) {
      setSubmitStatus('success');
      setTimeout(() => {
        setFormData({ email: '', modelType: '', video: null });
        setVideoPreview(null);
        setShowForm(false);
        setSubmitStatus(null);
      }, 3000);
    } else {
      throw new Error(result.error || 'Submission failed');
    }
  } catch (error) {
    console.error('Error submitting:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};
  

  const closeForm = () => {
    setShowForm(false);
    setFormData({ email: '', modelType: '', video: null });
    setVideoPreview(null);
    setSubmitStatus(null);
  };

  return (
    <>
    
      {/* Test Our Model Button */}
      <div className="mt-6">
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Test Our Model
        </button>
      </div>

      {/* Full Screen Modal Overlay */}
      {showForm && (
  <div 
    className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" 
    onClick={closeForm}
    style={{ pointerEvents: 'auto' }}
  >
          
          {/* Modal Content */}

<div 
  className="relative z-[100001] bg-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-600 animate-slideIn" 
  onClick={(e) => e.stopPropagation()}
  style={{ isolation: 'isolate' }}
>

            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-bold text-white">Test Our AI Model</h4>
              <button
                onClick={closeForm}
                className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Video (Max 10 seconds) *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="flex items-center justify-center w-full px-4 py-10 bg-slate-900 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-blue-500 transition-all group"
                  >
                    <div className="text-center">
                      <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <p className="text-sm text-gray-400 font-medium">
                        {formData.video ? formData.video.name : 'Click to upload video'}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">MP4, MOV, AVI (Max 20MB)</p>
                    </div>
                  </label>
                </div>

                {videoPreview && (
                  <div className="mt-4">
                    <video
                      src={videoPreview}
                      controls
                      className="w-full rounded-lg max-h-60 bg-black"
                    />
                  </div>
                )}
              </div>

              {/* Model Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Select Model Type *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {modelTypes.map((model) => (
                    <label
                      key={model.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.modelType === model.id
                          ? 'border-blue-500 bg-blue-500/10 shadow-lg'
                          : 'border-slate-600 bg-slate-900 hover:border-slate-500 hover:bg-slate-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name="modelType"
                        value={model.id}
                        checked={formData.modelType === model.id}
                        onChange={(e) => setFormData({ ...formData, modelType: e.target.value })}
                        className="w-4 h-4 text-blue-500"
                      />
                      <span className="ml-3 text-white font-medium">{model.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || submitStatus === 'success'}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  isSubmitting || submitStatus === 'success'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                } text-white shadow-lg`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : submitStatus === 'success' ? (
                  <span className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submitted Successfully!
                  </span>
                ) : (
                  'Submit for Testing'
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-start p-4 bg-green-500/20 border border-green-500 rounded-lg animate-slideIn">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 text-sm font-semibold mb-1">
                      Video submitted successfully!
                    </p>
                    <p className="text-green-300 text-xs">
                      Our team will process it and send results to your email.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-start p-4 bg-red-500/20 border border-red-500 rounded-lg animate-slideIn">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-400 text-sm font-semibold mb-1">
                      Submission failed
                    </p>
                    <p className="text-red-300 text-xs">
                      Please try again or contact support if the issue persists.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Info Note */}
            <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong className="text-gray-300">Note:</strong> After submission, our ML team will process your video with the selected model and send the results to your email within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default TestModelForm;



