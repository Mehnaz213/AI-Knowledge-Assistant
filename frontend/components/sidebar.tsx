'use client';

import { useRef } from 'react';

import {
    Upload,
    Trash2,
    Brain,
    LogOut,
    Moon,
    Sun,
    MessageSquare,
    History,
    Settings,
    BarChart3,
    Database,
    LucideIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';

interface SidebarProps {
    onClearChat: () => void;
    onUploadPDF?: (file: File) => void;
    currentPage?: string;
    onPageChange?: (page: string) => void;
    onNewChat?: () => void;
}

export default function Sidebar({
    onClearChat,
    onUploadPDF,
    currentPage = 'chat',
    onPageChange,
    onNewChat,
}: SidebarProps) {

    const { logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const isAdmin = user?.role?.toLowerCase() === "admin";

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePageChange = (page: string) => {
        onPageChange?.(page);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        if (!e.target.files?.length) return;

        onUploadPDF?.(e.target.files[0]);

        e.target.value = "";

    };

    return (

        <>
            {/* Hidden File Picker */}

            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                hidden
                onChange={handleFileChange}
            />

            <aside className="w-80 flex flex-col bg-sidebar border-r border-border">

                {/* Header */}

                <div className="p-6 border-b border-border">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">

                            <Brain className="w-6 h-6 text-white" />

                        </div>

                        <div>

                            <h1 className="text-xl font-bold gradient-text">

                                RAGent AI

                            </h1>

                            <p className="text-xs text-muted-foreground">

                                Enterprise Knowledge Assistant

                            </p>

                        </div>

                    </div>

                    <div className="mt-5 text-sm">

                        <span className="text-muted-foreground">

                            Welcome,

                        </span>{' '}

                        <span className="font-medium">

                            {user?.name}

                        </span>

                    </div>

                </div>

                {/* Navigation */}

                <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-2">

                    <Button
                        onClick={onNewChat}
                        className="w-full justify-start gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    >
                        <MessageSquare className="w-4 h-4" />

                        New Chat

                    </Button>

                    <div className="border-t border-border my-4" />

                    <NavButton
                        icon={MessageSquare}
                        label="Chat"
                        active={currentPage === "chat"}
                        onClick={() => handlePageChange("chat")}
                    />

                    <NavButton
                        icon={History}
                        label="Chat History"
                        active={currentPage === "history"}
                        onClick={() => handlePageChange("history")}
                    />


                    <NavButton
                        icon={Settings}
                        label="Settings"
                        active={currentPage === "settings"}
                        onClick={() => handlePageChange("settings")}
                    />

                    {isAdmin && (

                        <>

                            <div className="border-t border-border my-5" />

                            <p className="text-xs uppercase tracking-wider text-muted-foreground px-3">

                                Administration

                            </p>

                            {/* Upload directly */}

                            <NavButton
                                icon={Upload}
                                label="Upload PDF"
                                onClick={handleUploadClick}
                            />

                            <NavButton
                                icon={Database}
                                label="Knowledge Base"
                                active={currentPage === "knowledge-base"}
                                onClick={() => handlePageChange("knowledge-base")}
                            />

                            <NavButton
                                icon={BarChart3}
                                label="Analytics"
                                active={currentPage === "analytics"}
                                onClick={() => handlePageChange("analytics")}
                            />

                        </>

                    )}

                    <div className="border-t border-border my-5" />

                    <NavButton
                        icon={Trash2}
                        label="Clear Chat"
                        onClick={onClearChat}
                    />

                </nav>

                {/* Footer */}

                <div className="p-4 border-t border-border space-y-2">

                    <Button
                        onClick={toggleTheme}
                        variant="outline"
                        className="w-full justify-start gap-2"
                    >
                        {theme === "light" ? (
                            <>
                                <Moon className="w-4 h-4" />
                                Dark Mode
                            </>
                        ) : (
                            <>
                                <Sun className="w-4 h-4" />
                                Light Mode
                            </>
                        )}
                    </Button>

                    <Button
                        onClick={logout}
                        variant="outline"
                        className="w-full justify-start gap-2 text-red-400"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>

                </div>

            </aside>

        </>

    );
}

interface NavButtonProps {
    icon: LucideIcon;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

function NavButton({
    icon: Icon,
    label,
    active,
    onClick,
}: NavButtonProps) {

    return (

        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'glass hover:bg-white/10 text-foreground'
                }`}
        >

            <Icon className="w-4 h-4" />

            <span className="text-sm font-medium">

                {label}

            </span>

        </button>

    );

}