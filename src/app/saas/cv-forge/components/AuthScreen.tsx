import React, { useState } from 'react';
import { authService, User } from '../services/authService';
import { Sparkles, ArrowRight, Mail, User as UserIcon, Loader2, AlertCircle, FileText, CheckCircle2, Layout, Lock, Eye, EyeOff, Github } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResetSent(false);
    setIsLoading(true);

    try {
      if (isLogin) {
        const user = await authService.login(email, password);
        onLogin(user);
      } else {
        if (!name.trim()) throw new Error("Name is required");
        if (password.length < 6) throw new Error("Password must be at least 6 characters");
        const user = await authService.signup(email, password, name);
        onLogin(user);
      }
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/user-not-found') setError('No account found with this email.');
      else if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') setError('Invalid email or password.');
      else if (code === 'auth/email-already-in-use') setError('This email is already registered.');
      else if (code === 'auth/weak-password') setError('Password must be at least 6 characters.');
      else if (code === 'auth/invalid-email') setError('Please enter a valid email address.');
      else if (code === 'auth/too-many-requests') setError('Too many attempts. Please try again later.');
      else setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setError('');
    setOauthLoading(provider);
    try {
      const user = provider === 'google'
        ? await authService.loginWithGoogle()
        : await authService.loginWithGithub();
      onLogin(user);
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/popup-closed-by-user') setError('Sign-in popup was closed.');
      else if (code === 'auth/account-exists-with-different-credential') setError('An account already exists with this email using a different sign-in method.');
      else setError(err.message || 'OAuth sign-in failed');
    } finally {
      setOauthLoading(null);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Enter your email first, then click "Forgot password?"');
      return;
    }
    try {
      await authService.resetPassword(email);
      setResetSent(true);
      setError('');
    } catch {
      setError('Could not send reset email. Check the address and try again.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 text-slate-800 font-sans overflow-hidden selection:bg-blue-200 relative">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-400/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-300/10 rounded-full blur-[80px]"></div>
      </div>

      {/* Left Panel */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 py-12 relative z-10">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold tracking-widest uppercase text-slate-600">CV Forge <span className="text-blue-600">AI</span></span>
        </div>

        <div className="max-w-2xl space-y-6 mb-16">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Stop Formatting.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Start Interviewing.</span>
          </h1>
          <p className="text-lg text-slate-600 font-light leading-relaxed max-w-lg">
            Transform your career history into a stunning, ATS-optimized resume in seconds. 9 premium templates, AI-powered formatting.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-lg">
          <div className="bg-white/80 border border-slate-200 p-5 rounded-2xl backdrop-blur-sm hover:shadow-md transition-shadow group">
            <FileText className="w-6 h-6 text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-sm font-semibold text-slate-800 mb-1">9 Templates</h3>
            <p className="text-[11px] text-slate-500 leading-normal">Modern, Classic, Tech, Creative, and more professional designs.</p>
          </div>
          <div className="bg-white/80 border border-slate-200 p-5 rounded-2xl backdrop-blur-sm hover:shadow-md transition-shadow group">
            <Layout className="w-6 h-6 text-indigo-600 mb-3 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-sm font-semibold text-slate-800 mb-1">Drag & Drop</h3>
            <p className="text-[11px] text-slate-500 leading-normal">Reorder sections to highlight what matters most for each role.</p>
          </div>
          <div className="col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-5 rounded-2xl flex items-center justify-between group cursor-default">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">AI-Powered</h3>
              <p className="text-[11px] text-slate-500">Paste text, get a professional CV instantly.</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 relative flex items-center justify-center p-8 lg:p-0 z-20 overflow-hidden">
        <div className="relative w-full max-w-[380px] bg-white/90 backdrop-blur-2xl border border-slate-200 p-8 rounded-3xl shadow-2xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{isLogin ? 'Welcome Back' : 'Get Started'}</h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">
              {isLogin ? 'Access your CV dashboard' : 'Create your first CV today'}
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="flex gap-3 mb-5">
            <button type="button" onClick={() => handleOAuth('google')} disabled={!!oauthLoading}
              className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 active:scale-[0.97] disabled:opacity-50">
              {oauthLoading === 'google' ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              <span>Google</span>
            </button>
            <button type="button" onClick={() => handleOAuth('github')} disabled={!!oauthLoading}
              className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 active:scale-[0.97] disabled:opacity-50">
              {oauthLoading === 'github' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
              <span>GitHub</span>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">or continue with email</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {!isLogin && (
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="Your Name" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                placeholder="email@example.com" required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-10 pr-11 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                placeholder={isLogin ? 'Password' : 'Create password (min 6 chars)'} required minLength={6} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" onClick={handleForgotPassword}
                  className="text-[11px] text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-600">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {resetSent && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-xs text-green-600">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>Password reset email sent! Check your inbox.</span>
              </div>
            )}

            <button type="submit" disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] flex items-center justify-center gap-2 mt-1">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button onClick={() => { setIsLogin(!isLogin); setError(''); setResetSent(false); setPassword(''); }}
              className="text-xs text-slate-500 hover:text-blue-600 transition-colors border-b border-transparent hover:border-blue-500 pb-0.5">
              {isLogin ? "New here? Create an account" : "Have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
