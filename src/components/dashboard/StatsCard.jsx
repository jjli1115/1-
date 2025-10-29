import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({
    title,
    value,
    unit,
    change,
    icon: Icon,
    color,
    progress
}) {
    const isPositive = change >= 0;

    return (
    <div className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden relative group">
        {/* Background gradient overlap */}
        <div className={ `absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
        
        <div className="p-6 relative z-10">
            {/* Icon and change indicator */}
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                {change !== undefined && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(change)}%
                        </div>
                )}
                </div>
                
            {/* Title and Value */}
            <div>
                <p className="text-gray-600 text-sm mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{value}</span>
                    <span className="text-gray-500 text-sm">{unit}</span>
                </div>
            </div>

            {/* Progress Bar */}
            {progress !== undefined && (
                <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress to goal</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                        style={{ width: `${progress}%` }}
                        className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
                        />
                    </div>
                </div>
            )}
        </div>
    </div>
    )
}