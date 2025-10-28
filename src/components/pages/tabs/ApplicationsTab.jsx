import React from 'react';
import { Search, Download, Eye } from 'lucide-react';

const ApplicationsTab = ({
  applications,
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm,
  handleExport,
  handleUpdateApplicationStatus,
  openModal
}) => {
  const filteredApplications = applications
    .filter(app => filterStatus === 'all' || app.status === filterStatus)
    .filter(app => {
      const searchLower = searchTerm.toLowerCase();
      return (
        app.applicant?.firstName?.toLowerCase().includes(searchLower) ||
        app.applicant?.lastName?.toLowerCase().includes(searchLower) ||
        app.opportunity?.title?.toLowerCase().includes(searchLower)
      );
    });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by applicant or opportunity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => handleExport('applications')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opportunity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {application.applicant?.firstName} {application.applicant?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{application.applicant?.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{application.opportunity?.title}</div>
                      <div className="text-sm text-gray-500">{application.opportunity?.provider}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(application.applicationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={application.status}
                      onChange={(e) => handleUpdateApplicationStatus(application._id, e.target.value)}
                      className={`px-3 py-1 text-xs font-medium rounded-full border-0 ${
                        application.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : application.status === 'Under Review'
                          ? 'bg-blue-100 text-blue-800'
                          : application.status === 'Shortlisted'
                          ? 'bg-purple-100 text-purple-800'
                          : application.status === 'Accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => openModal('application', application)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredApplications.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No applications found</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationsTab;
