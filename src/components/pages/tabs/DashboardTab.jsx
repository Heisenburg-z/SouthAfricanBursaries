import React from 'react';
import { Users, Briefcase, Clock, FileText, Mail, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const DashboardTab = ({ stats, recentActivity }) => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          color="blue"
          trend="+12%"
        />
        <StatCard
          title="Active Opportunities"
          value={stats.activeOpportunities}
          icon={Briefcase}
          color="green"
          trend="+8%"
        />
        <StatCard
          title="Pending Applications"
          value={stats.pendingApplications}
          icon={Clock}
          color="yellow"
          trend="+15%"
        />
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={FileText}
          color="purple"
          trend="+20%"
        />
        <StatCard
          title="Newsletter Subscribers"
          value={stats.totalSubscribers}
          icon={Mail}
          color="indigo"
          trend="+5%"
        />
        <StatCard
          title="Success Rate"
          value={`${stats.successRate}%`}
          icon={TrendingUp}
          color="green"
          trend="+3%"
        />
        <StatCard
          title="Inactive Opportunities"
          value={stats.inactiveOpportunities}
          icon={AlertCircle}
          color="red"
        />
        <StatCard
          title="Active Subscribers"
          value={stats.activeSubscribers}
          icon={CheckCircle}
          color="teal"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications by Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications by Status</h3>
          <div className="space-y-3">
            <StatusBar
              label="Pending"
              count={stats.applicationsByStatus.pending}
              total={stats.totalApplications}
              color="yellow"
            />
            <StatusBar
              label="Under Review"
              count={stats.applicationsByStatus.underreview}
              total={stats.totalApplications}
              color="blue"
            />
            <StatusBar
              label="Shortlisted"
              count={stats.applicationsByStatus.shortlisted}
              total={stats.totalApplications}
              color="purple"
            />
            <StatusBar
              label="Accepted"
              count={stats.applicationsByStatus.accepted}
              total={stats.totalApplications}
              color="green"
            />
            <StatusBar
              label="Rejected"
              count={stats.applicationsByStatus.rejected}
              total={stats.totalApplications}
              color="red"
            />
          </div>
        </div>

        {/* Opportunities by Category */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Opportunities by Category</h3>
          <div className="space-y-3">
            {Object.entries(stats.opportunitiesByCategory).map(([category, count]) => (
              <CategoryBar key={category} label={category} count={count} />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.slice(0, 10).map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

// StatCard Component
const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    red: 'bg-red-100 text-red-600',
    teal: 'bg-teal-100 text-teal-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

// StatusBar Component
const StatusBar = ({ label, count, total, color }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  const colorClasses = {
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    red: 'bg-red-500'
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">{count}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// CategoryBar Component
const CategoryBar = ({ label, count }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-700 capitalize">{label}</span>
    <span className="text-sm font-bold text-gray-900">{count}</span>
  </div>
);

// ActivityItem Component
const ActivityItem = ({ activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case 'user':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'application':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'opportunity':
        return <Briefcase className="w-5 h-5 text-purple-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="flex items-start gap-3">
      <div className="mt-1">{getIcon()}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
        <p className="text-sm text-gray-500">{activity.details}</p>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(activity.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default DashboardTab;
