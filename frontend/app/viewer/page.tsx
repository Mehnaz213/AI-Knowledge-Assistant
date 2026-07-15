"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ViewerPage() {
    const params = useSearchParams();

    const file = params.get("file");
    const targetPage = Number(params.get("page")) || 1;

    const [token, setToken] = useState("");
    const [numPages, setNumPages] = useState(0);

    useEffect(() => {
        setToken(localStorage.getItem("token") || "");
    }, []);

    if (!token || !file) {
        return (
            <div className="p-10 text-white">
                Loading...
            </div>
        );
    }

    const pdfUrl =
        `http://127.0.0.1:8000/download/${file}?token=${token}`;

    return (
        <div className="bg-zinc-900 min-h-screen flex justify-center">

            <Document
                file={pdfUrl}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >

                {Array.from(
                    new Array(numPages),
                    (_, index) => (
                        <div
                            key={index}
                            id={`page-${index + 1}`}
                            className={
                                index + 1 === targetPage
                                    ? "ring-4 ring-cyan-500 my-6"
                                    : "my-6"
                            }
                        >
                            <Page
                                pageNumber={index + 1}
                                width={900}
                            />
                        </div>
                    )
                )}

            </Document>

        </div>
    );
}