'use client';

import { useEffect, useState } from "react";

export default function KnowledgeBasePage() {

    const [documents, setDocuments] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDocuments = async () => {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://127.0.0.1:8000/documents",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {

                console.log(await response.text());

                setLoading(false);

                return;

            }

            const data = await response.json();

            console.log("Documents:", data);

            setDocuments(data);
            setLoading(false);

        };

        loadDocuments();

    }, []);
    const filteredDocuments = documents.filter((doc) =>
        doc.name.toLowerCase().includes(
            search.toLowerCase()
        )
    );
    const handleDelete = async (filename: string) => {

        const confirmed = window.confirm(
            `Delete "${filename}"?`
        );

        if (!confirmed) return;

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://127.0.0.1:8000/documents/${encodeURIComponent(filename)}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {

                alert(data.detail);

                return;

            }

            setDocuments(prev =>
                prev.filter(doc => doc.name !== filename)
            );

            alert("Document deleted successfully.");

        }

        catch {

            alert("Unable to delete document.");

        }

    };
    if (loading) {

        return (

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold gradient-text">
                    Knowledge Base
                </h1>

                <p className="mt-8 text-muted-foreground">
                    Loading documents...
                </p>

            </div>

        );

    }
    return (

        <div className="h-full overflow-y-auto p-8">

            <h1 className="text-3xl font-bold gradient-text mb-8">

                Knowledge Base

            </h1>
            <input
                type="text"
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
        w-full
        rounded-xl
        border
        border-border
        bg-background
        px-4
        py-3
        mb-8
        outline-none
        focus:border-cyan-400
    "
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                <div className="rounded-xl border border-border p-6">

                    <p className="text-sm text-muted-foreground">
                        Indexed Documents
                    </p>

                    <p className="text-3xl font-bold mt-2">
                        {documents.length}
                    </p>

                </div>

                <div className="rounded-xl border border-border p-6">

                    <p className="text-sm text-muted-foreground">
                        Total Chunks
                    </p>

                    <p className="text-3xl font-bold mt-2">

                        {documents.reduce(

                            (total, doc) => total + doc.chunks,

                            0

                        )}

                    </p>

                </div>

                <div className="rounded-xl border border-border p-6">

                    <p className="text-sm text-muted-foreground">
                        Knowledge Base
                    </p>

                    <p className="text-lg font-semibold mt-3 text-green-500">
                        ● Ready
                    </p>

                </div>

            </div>
            <div className="space-y-4">

                {filteredDocuments.map((doc: any) => (

                    <div
                        key={doc.name}
                        className="rounded-2xl border border-border p-6 mb-5 hover:border-cyan-400/40 transition-all"
                    >

                        <div className="flex items-start justify-between">

                            <div>

                                <h3 className="text-lg font-semibold">

                                    📄 {doc.name}

                                </h3>

                                <div className="grid grid-cols-3 gap-8 mt-5">

                                    <div>

                                        <p className="text-xs uppercase tracking-wide text-muted-foreground">

                                            Status

                                        </p>

                                        <p className="mt-1 text-green-500 font-medium">

                                            ✅ {doc.status}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase tracking-wide text-muted-foreground">

                                            Chunks

                                        </p>

                                        <p className="mt-1 font-medium">

                                            {doc.chunks}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase tracking-wide text-muted-foreground">

                                            Size

                                        </p>

                                        <p className="mt-1 font-medium">

                                            {doc.size} MB

                                        </p>

                                    </div>

                                </div>

                            </div>

                            <button
                                onClick={() => handleDelete(doc.name)}
                                className="rounded-xl border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500/10 transition"
                            >

                                Delete

                            </button>

                        </div>

                    </div>

                ))}
                {filteredDocuments.length === 0 && (

                    <div className="rounded-2xl border border-dashed border-border p-12 text-center">

                        <h3 className="text-lg font-semibold">

                            No Documents Found

                        </h3>

                        <p className="text-muted-foreground mt-2">

                            Upload PDFs to build your knowledge base.

                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}