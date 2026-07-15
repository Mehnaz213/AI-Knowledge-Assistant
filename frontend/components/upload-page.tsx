'use client';

import { useRef, useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UploadPage() {

    const inputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const chooseFile = () => {
        inputRef.current?.click();
    };

    const uploadFile = async () => {

        if (!selectedFile) {
            setMessage("Please choose a PDF first.");
            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("pdf", selectedFile);

            const response = await fetch(
                `${API_URL}/upload`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Upload failed");
            }

            setMessage("Document uploaded successfully.");

            setSelectedFile(null);

        } catch (err: any) {

            setMessage(err.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="flex-1 overflow-auto p-8">

            <h2 className="text-3xl font-bold gradient-text mb-8">
                Upload PDF
            </h2>

            <div className="glass rounded-2xl p-10 border border-border">

                <input
                    type="file"
                    accept=".pdf"
                    ref={inputRef}
                    hidden
                    onChange={(e) => {

                        if (e.target.files?.length) {
                            setSelectedFile(e.target.files[0]);
                        }

                    }}
                />

                <div className="flex flex-col items-center">

                    <Upload className="w-16 h-16 text-cyan-400 mb-6" />

                    <button
                        onClick={chooseFile}
                        className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                        Choose PDF
                    </button>

                    {selectedFile && (

                        <div className="mt-6 flex items-center gap-3">

                            <FileText className="text-cyan-400" />

                            <span>{selectedFile.name}</span>

                        </div>

                    )}

                    <button

                        onClick={uploadFile}

                        disabled={loading || !selectedFile}

                        className="mt-8 px-8 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-40"

                    >

                        {loading ? "Uploading..." : "Upload"}

                    </button>

                    {message && (

                        <div className="mt-8 flex items-center gap-2">

                            {message.includes("success") ? (

                                <CheckCircle className="text-green-500" />

                            ) : (

                                <AlertCircle className="text-red-500" />

                            )}

                            <span>{message}</span>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}