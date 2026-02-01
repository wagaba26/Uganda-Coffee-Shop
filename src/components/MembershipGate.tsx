'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { createSupabaseClient } from '@/lib/supabaseClient';

type AuthMode = 'signin' | 'signup';
type SmsStep = 'idle' | 'sent';

export default function MembershipGate({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Membership.auth');
  const supabase = useMemo(() => createSupabaseClient(), []);
  const [sessionActive, setSessionActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [smsStep, setSmsStep] = useState<SmsStep>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const init = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      setSessionActive(!!data.session);

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSessionActive(!!session);
      });
      unsubscribe = () => listener.subscription.unsubscribe();
      setLoading(false);
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [supabase]);

  const normalizeJapanesePhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const withoutLeadingZero = digits.startsWith('0') ? digits.slice(1) : digits;
    return `+81${withoutLeadingZero}`;
  };

  const handleEmailAuth = async () => {
    setErrorMessage('');
    setStatusMessage('');

    if (!supabase) return;

    if (authMode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMessage(error.message);
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setErrorMessage(error.message);
    else setStatusMessage(t('signup_success'));
  };

  const handleSendSms = async () => {
    setErrorMessage('');
    setStatusMessage('');

    if (!supabase) return;

    const formatted = normalizeJapanesePhone(phone);
    const { error } = await supabase.auth.signInWithOtp({ phone: formatted });
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    setSmsStep('sent');
    setStatusMessage(t('sms_sent'));
  };

  const handleVerifySms = async () => {
    setErrorMessage('');
    setStatusMessage('');

    if (!supabase) return;

    const formatted = normalizeJapanesePhone(phone);
    const { error } = await supabase.auth.verifyOtp({
      phone: formatted,
      token: smsCode,
      type: 'sms'
    });
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    setStatusMessage(t('sms_verified'));
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500 font-sans">{t('loading')}</div>
    );
  }

  if (!supabase) {
    return (
      <div className="py-16 text-center text-red-600 font-sans">
        {t('missing_env')}
      </div>
    );
  }

  if (sessionActive) {
    return (
      <div className="space-y-8">
        <div className="flex justify-end">
          <button
            onClick={handleSignOut}
            className="text-sm uppercase tracking-widest text-brand-red hover:underline"
          >
            {t('sign_out')}
          </button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 shadow-sm p-8 md:p-10">
      <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">{t('title')}</h2>
      <p className="text-gray-600 font-sans mb-8">{t('subtitle')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-red mb-2">
              {t('email_label')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-brand-red transition-colors font-sans"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-red mb-2">
              {t('password_label')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-brand-red transition-colors font-sans"
              placeholder="••••••••"
            />
          </div>
          <button
            onClick={handleEmailAuth}
            className="bg-charcoal text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-brand-red transition-colors font-sans font-medium"
          >
            {authMode === 'signin' ? t('sign_in') : t('sign_up')}
          </button>
          <button
            onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
            className="text-xs uppercase tracking-widest text-brand-red hover:underline"
          >
            {authMode === 'signin' ? t('switch_to_signup') : t('switch_to_signin')}
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-red mb-2">
              {t('phone_label')}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-brand-red transition-colors font-sans"
              placeholder="090-1234-5678"
            />
            <p className="text-xs text-gray-500 mt-2">{t('phone_hint')}</p>
          </div>

          {smsStep === 'sent' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-red mb-2">
                {t('code_label')}
              </label>
              <input
                type="text"
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                className="w-full border-b border-gray-300 py-2 outline-none focus:border-brand-red transition-colors font-sans"
                placeholder={t('code_placeholder')}
              />
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {smsStep === 'idle' ? (
              <button
                onClick={handleSendSms}
                className="bg-brand-red text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-red-700 transition-colors font-sans font-medium"
              >
                {t('send_code')}
              </button>
            ) : (
              <button
                onClick={handleVerifySms}
                className="bg-brand-red text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-red-700 transition-colors font-sans font-medium"
              >
                {t('verify_code')}
              </button>
            )}
            {smsStep === 'sent' && (
              <button
                onClick={() => setSmsStep('idle')}
                className="text-xs uppercase tracking-widest text-charcoal hover:text-brand-red transition-colors"
              >
                {t('edit_phone')}
              </button>
            )}
          </div>
        </div>
      </div>

      {(statusMessage || errorMessage) && (
        <div className={`mt-6 text-sm font-sans ${errorMessage ? 'text-red-600' : 'text-green-600'}`}>
          {errorMessage || statusMessage}
        </div>
      )}
    </div>
  );
}
