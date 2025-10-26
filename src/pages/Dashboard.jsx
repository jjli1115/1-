import { Brain, Moon, DollarSign, Activity, Award } from 'lucide-react';
import { format, subDays } from "date-fns";
import StatsCard from "../components/dashboard/StatsCard"
import ProgressRing from "../components/dashboard/ProgressRing"
import AchievementsBadge from "../components/dashboard/AchievementBadge"
import TrendChart from "../components/dashboard/TrendChart"

export default function Dashboard() {

    // Mock data

    const mockMetrics = [
        {
            id: 001,
            name: "Memory Recall",
            category: "memory",
            current_value: 85,
            baseline_value: 70,
            target_value: 99,
            unit: "%"
        },
        {
            id: 002,
            name: "Sleep Quality",
            category: "sleep",
            current_value: 7.5,
            baseline_value: 7,
            target_value: 8,
            unit: "hrs"
        },
        {
            id: 003,
            name: "Net Worth",
            category: "finance",
            current_value: 5420,
            baseline_value: 5000,
            target_value: 100000000,
            unit: "%"
        },
        {
            id: 004,
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
        { id: 1, title: "Week Warrior", description: "7-day streak", unlocked: true, icon: "🔥"},
        { id: 1, title: "Month Master", description: "30-day streak", unlocked: true, icon: "💪"},
        { id: 1, title: "Century Club", description: "100 total entries", unlocked: true, icon: "💯"},
        { id: 1, title: "Early Bird", description: "14-day streak of waking up before 8am", unlocked: true, icon: "🌅"},
        { id: 1, title: "Peak Performance", description: "50 days of reaching your daily goals", unlocked: true, icon: "🦉"},
        { id: 1, title: "Finisher", description: "Completed 10 hard goals", unlocked: true, icon: "🌟"}
    ];

    const getMetricsByCategory = (category) => {
        return mockMetrics.filter(m => m.category === category);
    };

    const getRecentEntries = (metricId, days = 7) => {
        return mockEntries
        .filter(e => e.metric_id === metricID)
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

    
}