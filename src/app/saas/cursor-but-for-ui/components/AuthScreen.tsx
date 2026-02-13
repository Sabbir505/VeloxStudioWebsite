import React, { useState } from 'react';
import { authService } from '../services/authService';
import { Sparkles, ArrowRight, Mail, User as UserIcon, Loader2, AlertCircle, Layers, Zap, Code2, Move3d, Lock, Eye, EyeOff, Github } from 'lucide-react';
import { User } from '../types';

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
      // Friendly Firebase error messages
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
    } catch (err: any) {
      setError('Could not send reset email. Check the address and try again.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#050505] text-white font-sans overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200 relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[128px]"></div>
      </div>

      {/* Left Panel - The "Pitch" */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 py-12 relative z-10">
        
        {/* Brand */}
        <div className="flex items-center gap-3 mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
               <Move3d className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase opacity-70">Cursor UI <span className="text-indigo-500">2026</span></span>
        </div>

        {/* Headline */}
        <div className="max-w-2xl space-y-6 mb-16">
            <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                The End of <br />
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300 animate-gradient bg-[length:200%_auto]">Generic</span> Interfaces.
            </h1>
            <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                Stop building "AI Slop". Generate spatial, depth-aware, and consistent design systems with the speed of thought.
            </p>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
             <div className="bg-white/5 border border-white/5 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors group">
                <Layers className="w-6 h-6 text-indigo-400 mb-3 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-sm font-semibold text-white mb-1">Consistency Engine</h3>
                <p className="text-[11px] text-zinc-500 leading-normal">
                    The "3 Laws" ensure nav bars and buttons never vanish or morph unexpectedly.
                </p>
             </div>
             <div className="bg-white/5 border border-white/5 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors group">
                <Zap className="w-6 h-6 text-amber-400 mb-3 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-sm font-semibold text-white mb-1">Gemini 3 Flash</h3>
                <p className="text-[11px] text-zinc-500 leading-normal">
                    Generate complex Bento Grids and Glassmorphism in milliseconds.
                </p>
             </div>
             <div className="col-span-2 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-white/5 p-5 rounded-2xl flex items-center justify-between group cursor-default">
                <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Production Ready</h3>
                    <p className="text-[11px] text-zinc-500">Export clean Tailwind + React code.</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <Code2 className="w-4 h-4 text-white" />
                </div>
             </div>
        </div>

      </div>

      {/* Right Panel - Visual & Form */}
      <div className="flex-1 relative flex items-center justify-center p-8 lg:p-0 z-20 overflow-hidden">
         
         {/* 3D Floating Elements (Decorative Background) */}
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 lg:opacity-100">
            <div className="relative w-[400px] h-[600px] [transform:rotateX(20deg)_rotateY(-20deg)_rotateZ(10deg)] [transform-style:preserve-3d]">
                {/* Back Card */}
                <div className="absolute inset-0 bg-zinc-900/80 border border-white/10 rounded-[3rem] shadow-2xl [transform:translateZ(-50px)] backdrop-blur-xl"></div>
                {/* Middle Card */}
                <div className="absolute inset-0 bg-zinc-800/80 border border-white/10 rounded-[3rem] shadow-2xl [transform:translateZ(0px)] backdrop-blur-xl flex flex-col p-6">
                    <div className="w-full h-32 bg-white/5 rounded-2xl mb-4 animate-pulse"></div>
                    <div className="w-2/3 h-4 bg-white/5 rounded-full mb-2"></div>
                    <div className="w-1/2 h-4 bg-white/5 rounded-full"></div>
                </div>
                {/* Front Card (Floats) */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/20 rounded-[3rem] shadow-[0_0_100px_rgba(99,102,241,0.2)] [transform:translateZ(60px)] backdrop-blur-sm animate-[float_6s_ease-in-out_infinite] flex items-center justify-center">
                    <div className="px-6 py-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs font-mono text-indigo-300 shadow-xl">
                        Generating UI...
                    </div>
                </div>
            </div>
         </div>

         {/* Glass Auth Form */}
         <div className="relative w-full max-w-[380px] bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl ring-1 ring-white/5 animate-in fade-in zoom-in-95 duration-500 delay-200">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-serif font-semibold text-white mb-2">{isLogin ? 'Welcome Back' : 'Join the Future'}</h2>
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
                    {isLogin ? 'Access your dashboard' : 'Start designing today'}
                </p>
            </div>

            {/* OAuth Buttons */}
            <div className="flex gap-3 mb-5">
                <button
                    type="button"
                    onClick={() => handleOAuth('google')}
                    disabled={!!oauthLoading}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 active:scale-[0.97] disabled:opacity-50"
                >
                    {oauthLoading === 'google' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                    )}
                    <span>Google</span>
                </button>
                <button
                    type="button"
                    onClick={() => handleOAuth('github')}
                    disabled={!!oauthLoading}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 active:scale-[0.97] disabled:opacity-50"
                >
                    {oauthLoading === 'github' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Github className="w-4 h-4" />
                    )}
                    <span>GitHub</span>
                </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">or continue with email</span>
                <div className="flex-1 h-px bg-white/10"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
                {!isLogin && (
                    <div className="group">
                        <div className="relative">
                            <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-900 transition-all"
                                placeholder="Designer Name"
                            />
                        </div>
                    </div>
                )}
                
                <div className="group">
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-900 transition-all"
                            placeholder="email@studio.com"
                            required
                        />
                    </div>
                </div>

                <div className="group">
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3.5 pl-10 pr-11 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-zinc-900 transition-all"
                            placeholder={isLogin ? 'Password' : 'Create password (min 6 chars)'}
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {isLogin && (
                    <div className="text-right">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            Forgot password?
                        </button>
                    </div>
                )}

                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-xs text-red-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {resetSent && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-xs text-green-400">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span>Password reset email sent! Check your inbox.</span>
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3.5 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98] flex items-center justify-center gap-2 mt-1"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                        <>
                            <span>{isLogin ? 'Enter Studio' : 'Create Account'}</span>
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-5 text-center">
                <button 
                    onClick={() => { setIsLogin(!isLogin); setError(''); setResetSent(false); setPassword(''); }}
                    className="text-xs text-zinc-500 hover:text-white transition-colors border-b border-transparent hover:border-zinc-500 pb-0.5"
                >
                    {isLogin ? "New here? Create an account" : "Have an account? Sign in"}
                </button>
            </div>
         </div>

      </div>

      {/* CSS for custom float animation since standard tailwind doesn't have it */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateZ(60px) translateY(0px); }
          50% { transform: translateZ(60px) translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default AuthScreen;