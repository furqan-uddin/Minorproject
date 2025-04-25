//src/pages/admin/AdminDashboard
import React, { useEffect, useState } from "react";
import API from "../../api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/admin/stats");
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return <p className="text-center text-gray-500">Loading stats...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 space-y-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700">Admin Dashboard</h2>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        <StatCard label="Total Users" value={stats.userCount} color="indigo" />
        <StatCard label="Total Questions" value={stats.questionCount} color="green" />
        <StatCard label="Total Results" value={stats.resultCount} color="yellow" />
      </div>

      {/* Top Users */}
      <SectionCard title="Top 5 Users by Score" color="indigo">
        <ul className="space-y-2">
          {stats.topUsers.map((u, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{u.name} ({u.email})</span>
              <span className="font-semibold text-indigo-700">{u.totalScore} pts</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Category Breakdown */}
      <SectionCard title="Category-wise Quiz Attempts" color="green">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          {stats.categoryBreakdown.map((cat, i) => (
            <li key={i} className="flex justify-between">
              <span>{cat.category}</span>
              <span className="font-semibold">{cat.count}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Monthly Submissions */}
      <SectionCard title="Monthly Quiz Submissions" color="yellow">
        <ul className="space-y-2 text-gray-700">
          {stats.monthlyStats.map((m, i) => (
            <li key={i} className="flex justify-between">
              <span>{`${m._id.month}/${m._id.year}`}</span>
              <span className="font-semibold">{m.count}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
};

// Reusable Stat Box
const StatCard = ({ label, value, color }) => (
  <div className={`bg-white rounded-xl shadow p-6 border-t-4 border-${color}-500`}>
    <h4 className="text-lg font-semibold text-gray-600">{label}</h4>
    <p className={`text-3xl font-bold text-${color}-700`}>{value}</p>
  </div>
);

// Reusable Section Container
const SectionCard = ({ title, color, children }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h4 className={`text-xl font-bold text-${color}-700 mb-4`}>{title}</h4>
    {children}
  </div>
);

export default AdminDashboard;
