'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import apiClient from '@/lib/api';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    const fetchAdminData = async () => {
      try {
        const response = await apiClient.get('/admin');
        setMessage(response.data.message);
      } catch (error: any) {
        console.error('Error fetching admin data:', error);
        if (error.response?.status === 403) {
          router.push('/dashboard');
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAdminData();
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="mt-2 text-sm text-gray-700">
          Administrative tools and settings
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Admin Access
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            You have administrative privileges.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  {message || 'Admin access granted.'}
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    This is the admin panel. You can manage users, view reports, and configure system settings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Admin Features</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="text-md font-medium text-gray-900">User Management</h5>
                <p className="mt-1 text-sm text-gray-500">Manage user accounts and permissions</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="text-md font-medium text-gray-900">Attendance Reports</h5>
                <p className="mt-1 text-sm text-gray-500">View and export attendance records</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="text-md font-medium text-gray-900">System Settings</h5>
                <p className="mt-1 text-sm text-gray-500">Configure system preferences</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h5 className="text-md font-medium text-gray-900">Analytics</h5>
                <p className="mt-1 text-sm text-gray-500">View system analytics and insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
