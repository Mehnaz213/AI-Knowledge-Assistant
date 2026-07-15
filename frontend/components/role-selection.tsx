'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth, type UserRole } from '@/lib/auth-context';
import { Brain, Users } from 'lucide-react';
import ParticleBackground from './particle-background';

export default function RoleSelection() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (role: UserRole) => {

        if (!email || !password) {
            setError('Please enter email and password.');
            return;
        }

        setError('');
        setIsLoading(true);

        try {

            await login(email, password, role);

        } catch (err) {

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Login failed.');
            }

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-background via-background to-primary/5 relative">

            <ParticleBackground />

            {/* Left Section */}

            <div className="hidden lg:flex lg:flex-1 flex-col justify-center items-center px-12 relative z-10">

                <div className="max-w-md">

                    <div className="flex items-center gap-3 mb-6">

                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-400 flex items-center justify-center">

                            <Brain className="w-8 h-8 text-white" />

                        </div>

                        <h1 className="text-4xl font-bold gradient-text">
                            RAGent AI
                        </h1>

                    </div>

                    <p className="text-lg text-muted-foreground mb-4">
                        Enterprise Knowledge Assistant
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Login to access your organization's AI knowledge base.
                    </p>

                </div>

            </div>

            {/* Right Section */}

            <div className="flex flex-1 justify-center items-center px-6 relative z-10">

                <div className="glass p-8 rounded-2xl w-full max-w-sm">

                    <h2 className="text-2xl font-bold mb-2">
                        Welcome
                    </h2>

                    <p className="text-sm text-muted-foreground mb-6">
                        Sign in to continue
                    </p>

                    <div className="space-y-4">

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background outline-none"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background outline-none"
                        />

                    </div>

                    {error && (

                        <div className="mt-4 text-sm text-red-500">
                            {error}
                        </div>

                    )}

                    <div className="space-y-3 mt-6">

                        <Button
                            onClick={() => handleLogin('admin')}
                            disabled={isLoading}
                            className="w-full gap-2"
                        >
                            <Brain className="w-4 h-4" />

                            {isLoading
                                ? 'Logging in...'
                                : 'Login as Admin'}

                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => handleLogin('employee')}
                            disabled={isLoading}
                            className="w-full gap-2"
                        >
                            <Users className="w-4 h-4" />

                            {isLoading
                                ? 'Logging in...'
                                : 'Login as Employee'}

                        </Button>

                    </div>

                </div>

            </div>

        </div>
    );
}