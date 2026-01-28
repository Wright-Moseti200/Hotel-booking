import { Contextdata } from '../context/Contextprovider'
import React, { useContext, useState } from 'react'

const AuthModal = ({ isOpen, onClose, isLoginMode = true }) => {
    const { login, signup } = useContext(Contextdata);
    const [isLogin, setIsLogin] = useState(isLoginMode)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')


    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl animate-fade-in relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    {/* Close Icon - using generic X if asset not found, but trying assets first or SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {isLogin ? 'Please enter your details to sign in' : 'Join us to unlock exclusive hotel offers'}
                    </p>
                </div>

                <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault();
                    if (isLogin) {
                        const result = await login(email, password);
                        if (result.success) onClose();
                    } else {
                        const result = await signup(username, email, password);
                        if (result.success) onClose();
                    }
                }}>
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Username</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="johndoe"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50 focus:bg-white"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50 focus:bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50 focus:bg-white"
                        />
                    </div>

                    <button className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-lg hover:bg-gray-800 transform active:scale-[0.98] transition-all shadow-lg mt-4">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="font-bold text-black hover:underline ml-1"
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default AuthModal
