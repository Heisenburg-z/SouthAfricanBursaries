import React from 'react';

const AnalyticsTab = ({ analytics }) => {
  return (
    <div className="space-y-6">
      {/* User Growth Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth (Last 30 Days)</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {analytics.userGrowth.map((data, index) => {
            const maxCount = Math.max(...analytics.userGrowth.map(d => d.count));
            const height = (data.count / maxCount) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                  style={{ height: `${height}%` }}
                  title={`${data.count} users`}
                ></div>
                <span className="text-xs text-gray-500 mt-2">
                  {new Date(data._id).getDate()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Opportunities */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Opportunities by Applications</h3>
        <div className="space-y-4">
          {analytics.topOpportunities.map((opp, index) => (
            <div key={opp._id} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{opp.title}</div>
                <div className="text-sm text-gray-500">{opp.provider}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{opp.applicationsCount}</div>
                <div className="text-sm text-gray-500">applications</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Distribution & Category Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
          <div className="space-y-3">
            {analytics.statusDistribution.map((status) => (
              <div key={status._id} className="flex items-center justify-between">
                <span className="text-gray-700">{status._id}</span>
                <span className="font-bold text-gray-900">{status.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Statistics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Statistics</h3>
          <div className="space-y-3">
            {analytics.categoryStats.map((cat) => {
              const maxApps = Math.max(...analytics.categoryStats.map(c => c.totalApplications));
              const percentage = (cat.totalApplications / maxApps) * 100;
              return (
                <div key={cat._id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700 capitalize">{cat._id}</span>
                    <span className="font-bold text-gray-900">{cat.totalApplications} apps</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;

