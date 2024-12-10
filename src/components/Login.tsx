// src/components/Login.tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Github, Mail, EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function Login() {
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const isPasswordValid = isLogin || (password === confirmPassword && password.length > 0);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGithub();
    } catch (error) {
      console.error('Github sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setPassword('');
    setConfirmPassword('');
    setEmail('');
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email/password auth
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold text-[#1e2b4d]">
            {isLogin ? 'Sign in' : 'Create account'}
          </h2>
        </div>

        <div className="grid gap-3">
          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 text-gray-700 h-12"
          >
            <Mail className="w-5 h-5 mr-2" />
            {isLogin ? 'Sign in' : 'Sign up'} with Google
          </Button>

          <Button
            onClick={handleGithubSignIn}
            disabled={loading}
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 text-gray-700 h-12"
          >
            <Github className="w-5 h-5 mr-2" />
            {isLogin ? 'Sign in' : 'Sign up'} with GitHub
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name" className="text-gray-600">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email" className="text-gray-600">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="relative">
            <Label htmlFor="password" className="text-gray-600">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[calc(50%-12px)] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-600">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || !isPasswordValid}
            className="w-full bg-[#1e2b4d] hover:bg-[#1e2b4d]/90 text-white h-12"
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </Button>
        </form>

        <div className="text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleAuthMode}
            className="text-[#1e2b4d] hover:underline font-medium"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>

        {!isLogin && (
          <p className="text-center text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-[#1e2b4d] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-[#1e2b4d] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
}