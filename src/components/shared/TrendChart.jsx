import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TrendChart({ data, title, color ="#a855f7" }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                    datakey="date"
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    />
                    <YAxis
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                    contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        color: '#111827'
                    }}
                    />
                    <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    dot={{ fill: color, r: 4}}
                    activeDot={{ r: 6}}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}