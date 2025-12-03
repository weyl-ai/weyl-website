// src/components/forms/RequestAccessForm.tsx
import * as React from 'react';

interface FormData {
  email: string;
  company: string;
  description: string;
}

interface FormErrors {
  email?: string;
  company?: string;
  description?: string;
}

export default function RequestAccessForm() {
  const [formData, setFormData] = React.useState<FormData>({
    email: '',
    company: '',
    description: '',
  });
  
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Company validation
    if (!formData.company || formData.company.trim().length < 2) {
      newErrors.company = 'Company/project name is required (min 2 characters)';
    }
    
    // Description validation
    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = 'Please describe what you are building (min 10 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      const response = await fetch('/api/request-access/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your request has been submitted. We\'ll be in touch soon.',
        });
        setFormData({ email: '', company: '', description: '' });
        setErrors({});
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to submit request. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block font-mono text-small font-semibold text-text-primary mb-2 tracking-wide"
        >
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-bg-surface border ${
            errors.email ? 'border-error' : 'border-border'
          } rounded-md font-mono text-body text-text-primary 
          focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary 
          transition-colors placeholder-text-muted`}
          placeholder="you@company.com"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-2 font-mono text-caption text-error">{errors.email}</p>
        )}
      </div>

      {/* Company Field */}
      <div>
        <label
          htmlFor="company"
          className="block font-mono text-small font-semibold text-text-primary mb-2 tracking-wide"
        >
          Company / Project Name *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-bg-surface border ${
            errors.company ? 'border-error' : 'border-border'
          } rounded-md font-mono text-body text-text-primary 
          focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary 
          transition-colors placeholder-text-muted`}
          placeholder="Acme Inc."
          disabled={isSubmitting}
        />
        {errors.company && (
          <p className="mt-2 font-mono text-caption text-error">{errors.company}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block font-mono text-small font-semibold text-text-primary mb-2 tracking-wide"
        >
          What are you building? *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 bg-bg-surface border ${
            errors.description ? 'border-error' : 'border-border'
          } rounded-md font-mono text-body text-text-primary 
          focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary 
          transition-colors placeholder-text-muted resize-vertical`}
          placeholder="Tell us about your project and how you plan to use the Weyl API..."
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="mt-2 font-mono text-caption text-error">
            {errors.description}
          </p>
        )}
      </div>

      {/* Submit Status */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-md border ${
            submitStatus.type === 'success'
              ? 'bg-success/10 border-success text-success'
              : 'bg-error/10 border-error text-error'
          }`}
        >
          <p className="font-mono text-small">{submitStatus.message}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-brand-primary text-bg-primary font-mono font-semibold 
        text-body rounded-md hover:brightness-110 transition-all shadow-glow-sm hover:shadow-glow
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Request'
        )}
      </button>

      <p className="text-center font-mono text-caption text-text-muted">
        All fields are required. We typically respond within 24 hours.
      </p>
    </form>
  );
}

