import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Landmark, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLogo } from '../context/LogoContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const { customLogo } = useLogo();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email && password) {
      login(email, password);
      navigate('/dashboard');
    } else {
      setError('Please enter your email and password');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex" data-testid="login-page">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-500/20" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            {customLogo ? (
              <img src={customLogo} alt="Logo" className="w-32 h-14 rounded-xl object-cover" />
            ) : (
              <img src="https://customer-assets.emergentagent.com/job_deposit-lens/artifacts/x4wihjrc_hitachi-black.png" alt="Hitachi Logo" className="w-32 h-14 rounded-xl object-cover" />
            )}
            <div>
              <h1 className="font-heading font-bold text-2xl tracking-tight">Channel BI</h1>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Intelligence Platform</p>
            </div>
          </div>

          {/* Value Proposition */}
          <h2 className="font-heading text-4xl font-bold leading-tight mb-6">
            Retail Banking<br />
            <span className="text-blue-400">Intelligence Platform</span>
          </h2>
          
          <p className="text-lg text-slate-300 mb-8 max-w-md">
            Unified insight for products, branches, channels, and customers. 
            Make data-driven decisions with real-time analytics.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {[
              'Executive dashboards with real-time KPIs',
              'Multi-dimensional performance analytics',
              'Risk monitoring & early warning systems',
              'Self-service reporting & custom analysis'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-slate-700/50">
            <div>
              <p className="text-3xl font-heading font-bold text-white">$12.8B</p>
              <p className="text-sm text-slate-400">Total Deposits</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-white">892K</p>
              <p className="text-sm text-slate-400">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-white">142</p>
              <p className="text-sm text-slate-400">Branches</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            {customLogo ? (
              <img src={customLogo} alt="Logo" className="w-24 h-10 rounded-xl object-cover" />
            ) : (
              <img src="https://customer-assets.emergentagent.com/job_deposit-lens/artifacts/x4wihjrc_hitachi-black.png" alt="Hitachi Logo" className="w-24 h-10 rounded-xl object-cover" />
            )}
            <div>
              <h1 className="font-heading font-bold text-xl text-slate-900 dark:text-white">Channel BI</h1>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Intelligence Platform</p>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome back
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Sign in to access your analytics dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@channelbi.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                data-testid="login-email-input"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                  data-testid="login-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  data-testid="toggle-password-visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                data-testid="remember-me-checkbox"
              />
              <Label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                Remember me for 30 days
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 gap-2"
              disabled={isLoading}
              data-testid="login-submit-btn"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-50 dark:bg-slate-950 px-2 text-slate-400">Or continue with</span>
              </div>
            </div>

            {/* SSO Button */}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-11 gap-2"
              onClick={() => {
                login('sso.user@channelbi.com', 'sso');
                navigate('/dashboard');
              }}
              data-testid="sso-login-btn"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Sign in with SSO
            </Button>
          </form>

          {/* Security Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Protected by enterprise-grade security. Your data is encrypted in transit and at rest.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
