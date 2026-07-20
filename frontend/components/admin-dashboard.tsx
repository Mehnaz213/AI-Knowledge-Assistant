'use client';

import {
  Brain,
  BarChart3,
  Users,
  FileText,
  Settings,
  LogOut,
  Upload,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { LucideIcon } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const stats = [
    {
      label: 'Total Users',
      value: '847',
      icon: Users,
      trend: '▲ 12% this month',
    },
    {
      label: 'Documents',
      value: '2,341',
      icon: FileText,
      trend: '▲ 89 new this month',
    },
    {
      label: 'Queries Today',
      value: '5,234',
      icon: BarChart3,
      trend: '▲ 45% vs yesterday',
    },
    {
      label: 'Storage Used',
      value: '18.4 GB',
      icon: Upload,
      trend: '▲ 1.2 GB this month',
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-sidebar flex flex-col shrink-0">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center ">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">RAGent AI</h1>
              <p className="text-xs text-muted-foreground">
                Enterprise Knowledge Assistant
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <NavItem icon={Upload} label="Upload PDFs" />
          <NavItem icon={FileText} label="Knowledge Base" />
          <NavItem icon={BarChart3} label="Analytics" active />
          <NavItem icon={Users} label="User Management" />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Button
            onClick={toggleTheme}
            variant="outline"
            className="w-full justify-start gap-2"
          >
            {theme === 'light' ? (
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
            className="w-full justify-start gap-2 text-destructive"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="glass-elevated border-b border-border sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold gradient-text">
                  Analytics Overview
                </h2>
                <p className="text-muted-foreground text-sm mt-1">Welcome back, {user?.name}. Here's today's system overview.</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Admin Role</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-elevated hover-lift smooth-transition p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-muted-foreground">{stat.label}</h3>
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-elevated hover-lift smooth-transition p-6 rounded-xl">
              <h3 className="font-bold mb-4">Query Volume Trend</h3>
              <div className="h-64 bg-primary/5 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Live Analytics</p>
              </div>
            </div>
            <div className="glass-elevated hover-lift smooth-transition p-6 rounded-xl">
              <h3 className="font-bold mb-4">User Activity</h3>
              <div className="h-64 bg-primary/5 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Live analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
        ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg'
        : 'text-sidebar-foreground hover:bg-sidebar-accent/10 hover:translate-x-1 smooth-transition'
        }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
