'use client';

import { useState, useEffect } from "react";

export default function AnalyticsPage() {

    const [analytics, setAnalytics] = useState({
        users: 0,
        conversations: 0,
        messages: 0,
        recent: [] as any[],
    });

    useEffect(() => {

        const loadAnalytics = async () => {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://127.0.0.1:8000/analytics",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) return;

            const data = await response.json();

            setAnalytics(data);
            console.log("Analytics:", data);

        };

        loadAnalytics();

    }, []);

    return (
        <div className="flex-1 p-8">

            <h1 className="text-3xl font-bold gradient-text">
                Analytics
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                <div className="rounded-xl border border-border p-6">
                    <h3 className="text-sm text-muted-foreground">
                        Total Users
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {analytics.users}
                    </p>
                </div>

                <div className="rounded-xl border border-border p-6">
                    <h3 className="text-sm text-muted-foreground">
                        Conversations
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {analytics.conversations}
                    </p>
                </div>

                <div className="rounded-xl border border-border p-6">
                    <h3 className="text-sm text-muted-foreground">
                        Messages
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {analytics.messages}
                    </p>
                </div>

            </div>
            <div className="mt-10">

                <h2 className="text-xl font-semibold mb-4">
                    Recent Conversations
                </h2>

                <div className="space-y-3">

                    {analytics.recent.map((conversation: any, index) => (

                        <div
                            key={index}
                            className="rounded-xl border border-border p-4"
                        >

                            <p className="font-medium">
                                {conversation.title}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {conversation.user}
                            </p>

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );

}