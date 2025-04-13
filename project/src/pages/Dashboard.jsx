import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { ProgressBar } from '../components/ProgressBar';
import { UserCircle, Package } from 'lucide-react';

// Mock user data
const initialUserData = {
  name: 'Ram Ishwar',
  email: 'ramishwar@example.com',
  phone: '+91 9369308133',
};

// Mock orders data with correct sequence (Processing -> In Transit -> Delivered)
const mockOrders = [
  {
    id: '1',
    date: '2024-03-15',
    total: 129.99,
    status: 'Processing',
    items: 3,
    tracking: 0,
  },
  {
    id: '2',
    date: '2024-03-14',
    total: 79.99,
    status: 'In Transit',
    items: 1,
    tracking: 1,
  },
  {
    id: '3',
    date: '2024-03-13',
    total: 199.99,
    status: 'Delivered',
    items: 2,
    tracking: 2,
  },
];

export function Dashboard() {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const trackingSteps = ['Processing', 'In Transit', 'Delivered'];

  // Helper function to get status styles
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-purple-100 text-purple-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Section */}
        <Card
          title="Profile"
          className="relative"
        >
          <div className="flex items-start gap-6">
            <div className="hidden sm:block">
              <UserCircle className="w-24 h-24 text-gray-400" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsEditing(false);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserData(initialUserData);
                        setIsEditing(false);
                      }}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="mt-1 text-sm text-gray-900">{userData.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-sm text-gray-900">{userData.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 text-sm text-gray-900">{userData.phone}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Orders Section */}
        <Card title="Recent Orders">
          <Table
            headers={['Order ID', 'Date', 'Items', 'Total', 'Status', 'Actions']}
          >
            {mockOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.items}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${order.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() =>
                      setSelectedOrder(
                        selectedOrder === order.id ? null : order.id
                      )
                    }
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Track Order
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        </Card>

        {/* Order Tracking */}
        {selectedOrder && (
          <Card className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-medium">
                Tracking Order #{selectedOrder}
              </h3>
            </div>
            <ProgressBar
              steps={trackingSteps}
              currentStep={
                mockOrders.find((o) => o.id === selectedOrder)?.tracking || 0
              }
            />
          </Card>
        )}
      </div>
    </div>
  );
}