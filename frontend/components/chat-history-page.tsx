'use client';

import { useEffect, useState } from "react";
import { isToday, isYesterday } from "date-fns";
import {
    MessageSquare,
    Trash2,
    Pencil,
    Download
} from "lucide-react";
import { Button } from './ui/button';

interface Conversation {
    id: number;
    title: string;
    created_at: string;

    // Used only in frontend
    date?: Date;
    preview?: string;
}

interface ChatHistoryPageProps {
    onOpenConversation: (id: number) => void;
}

function groupConversations(conversations: Conversation[]) {

    const groups = {
        today: [] as Conversation[],
        yesterday: [] as Conversation[],
        previous7days: [] as Conversation[],
        older: [] as Conversation[],
    };

    conversations.forEach((conversation) => {

        if (!conversation.date) return;

        if (isToday(conversation.date)) {
            groups.today.push(conversation);
        }
        else if (isYesterday(conversation.date)) {
            groups.yesterday.push(conversation);
        }
        else if (
            Date.now() - conversation.date.getTime()
            < 7 * 24 * 60 * 60 * 1000
        ) {
            groups.previous7days.push(conversation);
        }
        else {
            groups.older.push(conversation);
        }

    });

    return groups;
}

export default function ChatHistoryPage({
    onOpenConversation,
}: ChatHistoryPageProps) {
    const [conversations, setConversations] =
        useState<Conversation[]>([]);
    const [search, setSearch] = useState("");
    const deleteConversation = async (id: number) => {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://127.0.0.1:8000/conversation/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) return;

        setConversations(prev =>
            prev.filter(c => c.id !== id)
        );

    };

    const renameConversation = async (
        id: number,
        currentTitle: string
    ) => {

        const newTitle = window.prompt(
            "Enter new conversation title:",
            currentTitle
        );

        if (!newTitle || newTitle.trim() === "") return;

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://127.0.0.1:8000/conversation/${id}/rename?title=${encodeURIComponent(newTitle)}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) return;

        setConversations(prev =>
            prev.map(c =>
                c.id === id
                    ? { ...c, title: newTitle }
                    : c
            )
        );

    };

    const exportConversation = async (id: number) => {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://127.0.0.1:8000/conversation/${id}/export/pdf`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) return;

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = `conversation_${id}.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    };
    useEffect(() => {

        const loadConversations = async () => {

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                "http://127.0.0.1:8000/conversations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) return;

            const data = await response.json();

            setConversations(data);

        };

        loadConversations();

    }, []);
    const filteredConversations = conversations.filter(c =>
        c.title.toLowerCase().includes(
            search.toLowerCase()
        )
    );

    const groups = groupConversations(

        filteredConversations.map(c => ({

            ...c,

            date: new Date(c.created_at + "Z"),

            preview: ""

        }))

    );

    const renderGroup = (
        title: string,
        conversations: Conversation[]
    ) => {
        if (conversations.length === 0) return null;

        return (
            <div className="mb-8" key={title}>
                <h3 className="text-xs tracking-widest font-semibold text-cyan-400 uppercase mb-3 px-2">
                    {title}
                </h3>

                <div className="space-y-3">
                    {conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => onOpenConversation(conversation.id)}
                            className="w-full flex items-start gap-3 p-4 rounded-xl glass hover-lift smooth-transition hover:border-cyan-400/30 border border-border text-left group"
                        >
                            <MessageSquare className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />

                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">
                                    {conversation.title}
                                </p>

                                <p className="text-sm text-muted-foreground truncate mt-1">
                                    {conversation.preview}
                                </p>
                            </div>
                            <div className="flex gap-1">

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        renameConversation(
                                            conversation.id,
                                            conversation.title
                                        );

                                    }}
                                >
                                    <Pencil className="w-4 h-4 text-cyan-400" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        exportConversation(conversation.id);

                                    }}
                                >

                                    <Download className="w-4 h-4 text-green-400" />

                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        deleteConversation(conversation.id);

                                    }}
                                >
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                </Button>


                            </div>
                        </div>
                    ))}
                </div>
            </div >
        );
    };

    return (
        <div className="flex-1 overflow-auto p-8 page-fade">
            <h2 className="text-2xl font-bold gradient-text mb-8">
                Chat History
            </h2>
            <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
        w-full
        mb-8
        px-4
        py-3
        rounded-xl
        bg-background
        border
        border-border
        outline-none
        focus:border-cyan-400
    "
            />

            <div className="max-w-3xl">

                {renderGroup('Today', groups.today)}

                {renderGroup('Yesterday', groups.yesterday)}

                {renderGroup('Previous 7 Days', groups.previous7days)}

                {renderGroup('Older', groups.older)}

                {conversations.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">

                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-400 flex items-center justify-center mb-6">
                            <MessageSquare className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-xl font-semibold">
                            No conversations yet
                        </h3>

                        <p className="text-sm text-muted-foreground mt-2">
                            Your previous chats will appear here.
                        </p>

                    </div>
                )}

            </div>
        </div>
    );
}