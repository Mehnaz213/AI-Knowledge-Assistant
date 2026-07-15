'use client';

import {
    CheckCircle2,
    Loader2,
    AlertCircle,
} from 'lucide-react';

interface UploadStatusProps {
    fileName?: string;
    status: 'idle' | 'processing' | 'success' | 'error';
    chunkCount?: number;
    error?: string;
}

export default function UploadStatus({
    fileName,
    status,
    chunkCount,
    error,
}: UploadStatusProps) {

    if (status === 'idle') return null;

    return (

        <div className="fixed bottom-6 right-6 z-50 page-fade">

            <div className="glass-elevated neon-border rounded-2xl p-5 w-[360px] shadow-2xl hover-lift">

                {status === 'processing' && (

                    <div className="flex items-start gap-4">

                        <Loader2 className="w-6 h-6 text-cyan-400 animate-spin mt-0.5 flex-shrink-0" />

                        <div>

                            <h3 className="font-semibold">

                                Processing PDF

                            </h3>

                            <p className="text-sm text-muted-foreground mt-1 break-all">

                                {fileName}

                            </p>

                            <p className="text-xs text-cyan-400 mt-3">

                                Chunking document and generating embeddings...

                            </p>

                        </div>

                    </div>

                )}

                {status === 'success' && (

                    <div className="flex items-start gap-4">

                        <CheckCircle2 className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />

                        <div>

                            <h3 className="font-semibold text-green-400">

                                Upload Successful

                            </h3>

                            <p className="text-sm mt-1 break-all">

                                {fileName}

                            </p>

                            {chunkCount !== undefined && (

                                <p className="text-xs text-muted-foreground mt-2">

                                    {chunkCount} document chunks indexed successfully.

                                </p>

                            )}

                            <p className="text-xs text-green-400 mt-3 font-medium">

                                Ready for querying.

                            </p>

                        </div>

                    </div>

                )}

                {status === 'error' && (

                    <div className="flex items-start gap-4">

                        <AlertCircle className="w-6 h-6 text-red-400 mt-0.5 flex-shrink-0" />

                        <div>

                            <h3 className="font-semibold text-red-400">

                                Upload Failed

                            </h3>

                            <p className="text-sm text-red-300 mt-2 break-words">

                                {error || 'An unexpected error occurred while processing the PDF.'}

                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );
}