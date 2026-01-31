'use client';

import { useState } from 'react';

export default function StoreContactForm() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 p-6 text-center rounded-sm">
        <p className="text-green-700 font-sans font-medium mb-4">
          Thank you! Your inquiry has been sent to the store.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-brand-red text-xs uppercase tracking-widest hover:underline"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required type="text" placeholder="Name" className="w-full border-b border-gray-300 py-2 outline-none focus:border-brand-red transition-colors font-sans" />
        <input required type="email" placeholder="Email" className="w-full border-b border-gray-300 py-2 outline-none focus:border-brand-red transition-colors font-sans" />
      </div>
      <select className="w-full border-b border-gray-300 py-2 outline-none bg-transparent font-sans">
        <option>General Inquiry</option>
        <option>Wholesale</option>
        <option>Press</option>
      </select>
      <textarea required placeholder="Message" rows={4} className="w-full border-b border-gray-300 py-2 outline-none focus:border-brand-red transition-colors font-sans"></textarea>
      <button type="submit" className="bg-charcoal text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-brand-red transition-colors font-sans font-medium">
        Send Message
      </button>
    </form>
  );
}
