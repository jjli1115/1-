import { Lock } from "lucide-react";

export default function AchievementBadge({
    achievement,
    index
}) {
    return (
        <div className={`p-4 rounded-xl ${
            achievement.unlocked
            ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-md'
            : 'bg-white border-2 border-gray-200'
        } relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-200`}>
        
        {/* Locked Overlay */}
        {!achievement.unlocked && (
        <div className="absolute inset-0 bg-gray-100/60 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
        <Lock className="w-8 h-8 text-gray-400" />
        </div>
        )}

        {/* Achievement Content */}
        <div className="flex flex-col items-center text-center gap-2">
        /* Icon */
        <div className={`text-4xl ${
            achievement.unlocked
            ? 'animate-flip'
            : 'grayscale opacity-50'
        }`}>
            {achievement.icon || '🏆'}
        </div>

        {/* Title and Description */}
        <div>
            <h4 className={`font-semibold text-sm mb-1 ${
                achievement.unlocked ? 'text-gray-900' : 'text-gray-400'
            }`}>
                {achievement.title}
            </h4>
            <p className="text-xs text-gray-500">{achievement.description}</p>
        </div>

        /* Unlocked Badge */
        {achievement.unlocked && (
            <div className="bg-amber-100 text-amber-700 border border-amber-300 text-xs px-2 py-1 rounded-full font-medium">
                Unlocked!
            </div>
        )}
        </div>
    </div>
     );
}