import React, { useState } from 'react';
import { Mail, CheckCircle, TrendingUp, Search, Download, Send } from 'lucide-react';

const NewsletterTab = ({
  newsletters,
  searchTerm,
  setSearchTerm,
  handleExport,
  isAdmin // NEW: Pass true if viewing as admin
}) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [adminMsg, setAdminMsg] = useState('');

  const filteredNewsletters = newsletters.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const activeCount = newsletters.filter(sub => sub.isSubscribed).length;

  // NEW: Admin send newsletter function
  async function handleSendNewsletter() {
    setSending(true);
    setAdminMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, content }),
      });
      const data = await res.json();
      if (data.success) {
        setAdminMsg(`Success: Newsletter sent to ${data.stats.successful} of ${data.stats.total} emails`);
        setSubject('');
        setContent('');
      } else {
        setAdminMsg(data.message || 'Failed to send newsletter');
      }
    } catch (e) {
      setAdminMsg('Network or server error: ' + e.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* ADMIN Panel: Compose Newsletter */}
      {isAdmin && (
        <div className="bg-white border border-emerald-100 rounded-lg p-6 mb-6 shadow flex flex-col gap-3">
          <h3 className="text-lg font-semibold mb-2">Send Newsletter</h3>
          <input
            className="border px-2 py-2 rounded font-medium mb-2"
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            disabled={sending}
          />
          <textarea
            className="border px-2 py-2 rounded mb-2"
            placeholder="HTML content for your newsletter"
            rows={5}
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={sending}
          />
          <button
            className="bg-emerald-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-emerald-700 transition disabled:opacity-50"
            onClick={handleSendNewsletter}
            disabled={sending || !subject || !content}
          >
            <Send className="w-5 h-5" />
            {sending ? 'Sending...' : 'Send Newsletter'}
          </button>
          {adminMsg && (
            <p className="mt-1 text-sm text-emerald-700">{adminMsg}</p>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Subscribers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{newsletters.length}</p>
            </div>
            <Mail className="w-12 h-12 text-blue-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Subscribers</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{activeCount}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Growth Rate</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">+12%</p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Search & Export */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search subscribers..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => handleExport('newsletter')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscribed Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNewsletters.map(subscriber => (
                <tr key={subscriber._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{subscriber.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {subscriber.isSubscribed ? (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        Unsubscribed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredNewsletters.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No subscribers found</p>
        </div>
      )}
    </div>
  );
};

export default NewsletterTab;
