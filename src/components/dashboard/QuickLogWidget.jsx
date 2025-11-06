export default function ProgressRing({
    progress,
    size = 140,
    strokeWidth = 10,
    value,
    label
}) {
    /* Circle dimension calculation */
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) *  circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
        /* SVG Circle */
        <svg width={size} height={size} className="transform -rotate-90">
        /* Background Circle */
        <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
        fill="none"
        />
        
        /* Progress Circle */
        <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#gradient)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
        />

        /* Gradient Definition */
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="a855f7" />
            </linearGradient>
        </defs>
        </svg>

        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-500 mt-1">{label}</span>
        </div>
    </div>
    )

}
