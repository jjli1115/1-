import { Brain } from "lucide-react";

export default function Memory() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white shadow-md rounded-2xl p-8 max-w-lg w-full text-center">
                <div className="flex items-center justify-center mb-4">
                    <Brain className="w-10 h-10 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Memory Training
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Track your daily progress and sharpen your mind.
                    </p>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
                        Start Session
                    </button>
                    </div>
                </div>
    );
}