"use client"

import { useState, FormEvent } from 'react';
import { Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';

export default function ChangePassword() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password validation
  const hasLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const hasUpperCase = /[A-Z]/.test(newPassword);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!hasLength || !hasNumber || !hasSpecial || !hasUpperCase) {
      setError('Please meet all password requirements');
      setLoading(false);
      return;
    }

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Password changed successfully');
      setUsername('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-2xl font-bold text-center">Change Password</h2>
        </div>

        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
              <XCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Confirm new password"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-700 mb-2">Password Requirements:</p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${hasLength ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <span className={hasLength ? 'text-blue-600' : 'text-gray-600'}>
                    At least 8 characters
                  </span>
                </li>
                <li className="flex items-center text-sm">
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${hasNumber ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <span className={hasNumber ? 'text-blue-600' : 'text-gray-600'}>
                    Contains a number
                  </span>
                </li>
                <li className="flex items-center text-sm">
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${hasSpecial ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <span className={hasSpecial ? 'text-blue-600' : 'text-gray-600'}>
                    Contains a special character
                  </span>
                </li>
                <li className="flex items-center text-sm">
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${hasUpperCase ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <span className={hasUpperCase ? 'text-blue-600' : 'text-gray-600'}>
                    Contains an uppercase letter
                  </span>
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}