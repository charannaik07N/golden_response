import { useEffect, useState } from "react";
import { fetchOrders } from "../api/orders";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../components/Loader.jsx";

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchOrders();
      setOrders(data || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <div className="bg-white border rounded-lg p-4">
        <p className="font-semibold">{user?.name}</p>
        <p className="text-sm text-slate-500">{user?.email}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Orders</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="space-y-2">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border rounded p-3">
                <div className="text-sm">Order #{order._id.slice(-6)}</div>
                <div className="text-sm text-slate-500">
                  ${order.totalAmount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
