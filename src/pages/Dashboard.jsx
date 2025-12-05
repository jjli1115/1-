import { Brain, Moon, DollarSign, Activity, Award } from 'lucide-react';
import { format, subDays } from "date-fns";
import StatsCard from "../components/dashboard/StatsCard"
import ProgressRing from "../components/dashboard/ProgressRing"
import AchievementBadge from "../components/dashboard/AchievementBadge"
import TrendChart from "../components/shared/TrendChart"

export default function Dashboard() {

    // Mock data

    const mockMetrics = [
        {
            id: 1,
            name: "Memory Recall",
            category: "memory",
            current_value: 85,
            baseline_value: 1,
            target_value: 99,
            unit: "%"
        },
        {
            id: 2,
            name: "Sleep Quality",
            category: "sleep",
            current_value: 7.5,
            baseline_value: 7,
            target_value: 8,
            unit: "hrs"
        },
        {
            id: 3,
            name: "Net Worth",
            category: "finance",
            current_value: 35420,
            baseline_value: 10000,
            target_value: 100000,
            unit: "$"
        },
        {
            id: 4,
            name: "Memory Recall",
            category: "memory",
            current_value: 85,
            baseline_value: 70,
            target_value: 99,
            unit: "%"
        },

    ];

    // Mock data for entries
    const mockEntries = Array.from({ length: 45 }, (_, i) => ({
        id: i + 1,
        metric_id: 1,
        value: Math.floor(Math.random() * 20) + 70,
        date: format(subDays(new Date(), i), 'yyyy-MM-dd')
    }));

    // Mock data for achievements
    const mockAchievements = [
        { id: 1, title: "First Step", description: "Logged your first entry", unlocked: true, icon: "🎯"},
        { id: 2, title: "Week Warrior", description: "7-day streak", unlocked: true, icon: "🔥"},
        { id: 3, title: "Month Master", description: "30-day streak", unlocked: true, icon: "💪"},
        { id: 4, title: "Century Club", description: "100 total entries", unlocked: true, icon: "💯"},
        { id: 5, title: "Early Bird", description: "14-day streak of waking up before 8am", unlocked: true, icon: "🌅"},
        { id: 6, title: "Peak Performance", description: "50 days of reaching your daily goals", unlocked: true, icon: "🦉"},
        { id: 7, title: "Finisher", description: "Completed 10 hard goals", unlocked: true, icon: "🌟"}
    ];

    const getMetricsByCategory = (category) => {
        return mockMetrics.filter(m => m.category === category);
    };

    const getRecentEntries = (metricId, days = 7) => {
        return mockEntries
        .filter(e => e.metric_id === metricId)
        .slice(0,days)
        .reverse()
        .map(e => ({
            date: format(new Date(e.date), 'MMM dd'),
            value: e.value
        }));
    };

    const calculateProgress = (metric) => {
        if (!metric.target_value || !metric.baseline_value) return 0;
        const progress = ((metric.current_value - metric.baseline_value) / (metric.target_value - metric.baseline_value)) * 100;
        return Math.min(Math.max(progress, 0), 100);
    };

    const unlockedAchievements = mockAchievements.filter(a => a.unlocked);
    const totalXP = mockEntries.length * 10;
    const currentLevel = Math.floor(totalXP / 100) + 1;
    const currentStreak = 5;

    return (
        <div className="p-4 pb-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome Section */}
                <div className="text-center py-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h2>
                    <p className="text-gray-600">Let's make today 1% better</p>
                </div>

                {/* Progress Ring Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-center mb-4">
                        <ProgressRing
                            progress={Math.min((mockEntries.length / 100) * 100, 100)}
                            size={140}
                            strokeWidth={10}
                            value={`${mockEntries.length}`}
                            label="entries"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{currentLevel}</p>
                            <p className="text-xs text-gray-600">Level</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{currentStreak}</p>
                            <p className="text-xs text-gray-600">Day Streak</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{unlockedAchievements.length}</p>
                            <p className="text-xs text-gray-600">Achievements</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="space-y-3">
                    {getMetricsByCategory('memory').slice(0,1).map(metric => (
                        <StatsCard
                            key={metric.id}
                            title={metric.name}
                            value={metric.current_value || 0}
                            unit={metric.unit}
                            change={5}
                            icon={Brain}
                            color="from-blue-500 to-cyan-500"
                            progress={calculateProgress(metric)}
                            />
                    ))}
                    
                    {getMetricsByCategory('sleep').slice(0, 1).map(metric => (
                        <StatsCard
                            key={metric.id}
                            title={metric.name}
                            value={metric.current_value || 0}
                            unit={metric.unit}
                            change={3}
                            icon={Moon}
                            color="from-purple-500 to-indigo-500"
                            progress={calculateProgress(metric)}
                            />
                    ))}

                    {getMetricsByCategory('finance').slice(0, 1).map(metric => (
                        <StatsCard
                            key={metric.id}
                            title={metric.name}
                            value={metric.current_value || 0}
                            unit={metric.unit}
                            change={8}
                            icon={DollarSign}
                            color="from-green-500 to-emerald-500"
                            progress={calculateProgress(metric)}
                            />
                    ))}

                    {getMetricsByCategory('fitness').slice(0, 1).map(metric => (
                        <StatsCard
                            key={metric.id}
                            title={metric.name}
                            value={metric.current_value || 0}
                            unit={metric.unit}
                            change={-2}
                            icon={Activity}
                            color="from-orange-500 to-red-500"
                            progress={calculateProgress(metric)}
                            />
                    ))}
                </div>

                {/* Trend Chart */}
                {mockMetrics.length > 0 && (
                    <TrendChart
                    data={getRecentEntries(mockMetrics[0].id)}
                    title="7-Day Progress Trend"
                    color="#a855fd7"
                    />
                )}

                {/* Achievements Section */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                        <Award className="w-5 h-5 text-amber-600" />
                        <h2 className="text-lg font-bold text-gray-900">Achievements</h2>
                    </div>
                    {<div className="grid grid-cols-3 gap-3">
                        {mockAchievements.slice(0, 6).map((achievement, index) => (
                            <AchievementBadge
                            key={achievement.id}
                            achievement={achievement}
                            index={index}
                            />
                        ))} 
                    </div>}
                </div>
            </div>
        </div>
    )
}


// Need to work on moving the app into TestFlight tomorrow (11.07.2025)
// As of 11.07.2025 10:37p, I failed to move the app into TestFlight, next planned date to move it will be 11.09.2025
// As of 11.08.2025 it seems like the process to move this onto iOS app could take 1-2 months, we will begin and see how long it takes and use this as a record
// As of 11.09.2025 it seems like I need to start porting the app from React to Swift UI to get it onto TestFlight
// 11.10.2025 - Today felt like a weekend, woke up early 7:06a but didn't want to jinx the day so went back to bed until 10:30a, got a krispy kreme donut and bunt cake (saw MacGregor)
// 11.11.2025 - Did a decent amount of work, ~4 hrs, for Boosted.AI but need to start on XCode tomorrow on Mac

// Below is imported from index.html from my personal website
//11.05.2025 Todo list: Import Bio Markers into 1%
//11.14.2025 My rate of learning and development in coding is so slow
//11.15.2025 Today is my birthday, and also the first day of the Bay Area Founders Club AI Summit, I think it's an ok conference
//11.20.2025 Today I am visiting HBS, it's an interesting place. I need to get a job where it's helpful for me to come here
//11.21.2025 Still at HBS today, with Section X India
//11.22.2025 Went to Harvard v Yale today, Harvard lost 28 to 45, and saw Angela's Freestyle dance show after
//11.23.2025 Flew back to the Bay from Boston today
//11.24.2025 Friendsgiving at Dave's new house today
//11.25.2025 Return to coding tomorrow to continue building 1% iOS App and the Find Anything iOS App
//11.26.2025 Things to track for personal benchmarking: Finances (Credit Score & Net Worth), Health (Sleep, Strength, Endurance, Weight, Biomarkers from Blood Tests, Gut Test, Skin)
//11.27.2025 Today was mom's birthday and Thanksgiving - I want to find out how to find the joy in coding and how to find ways to enjoy coding and code for hours at a time
//11.28.2025 Had dinner with Angela & Dad today, want to learn more about all the fields of AI (e.g. CoT, RNN, RLHF, etc) and review code base for The Mirror Ring
//11.29.2025 Went shopping for Mom's birthday today and had dinner at VF, goal for tomorrow: wake up at 8a, read Meta casestudy, complete the four different tabs for 1%
//11.30.2025 Last day of November this year, time goes fast; today I woke up at 9a, read the Meta casestudy, but did not complete the four tabs for 1%; tomorrow I will complete the four tabs for 1%
//12.01.2025 Still didn't complete the four tabs today. Do I give up or do I push through?
//12.02.2025 
//12.04.2025 Forgot to push yesterday; I want to write for Contrary and code after work
