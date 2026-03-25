'use client';

import { useEffect, useState } from 'react';

interface Node {
  id: number;
  callsign: string;
  ip: string;
  status: 'online' | 'offline';
  last_heartbeat: string;
}

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [prevNodes, setPrevNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flashRows, setFlashRows] = useState<Record<number, string>>({});

  const fetchNodes = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/get_nodes.php');
      if (!res.ok) throw new Error(`Failed to fetch nodes: ${res.statusText}`);
      const data: Node[] = await res.json();

      // detect changes and flash
      const newFlash: Record<number, string> = {};
      data.forEach((node) => {
        const prev = prevNodes.find((n) => n.id === node.id);
        if (prev && prev.status !== node.status) {
          newFlash[node.id] = node.status === 'online' ? 'bg-green-200' : 'bg-red-200';
        }
      });
      setFlashRows(newFlash);

      // remove flash after 1s
      if (Object.keys(newFlash).length > 0) {
        setTimeout(() => setFlashRows({}), 1000);
      }

      setPrevNodes(nodes);
      setNodes(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching nodes:', err);
      setError(err.message || 'Unknown error');
    }
  };

  const simulateUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/update_nodes.php');
      if (!res.ok) throw new Error(`Failed to update nodes: ${res.statusText}`);
      await res.json();
      await fetchNodes();
      setError(null);
    } catch (err: any) {
      console.error('Error simulating update:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNodes();
    const interval = setInterval(fetchNodes, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">44Net Node Dashboard</h1>

      <button
        onClick={simulateUpdate}
        disabled={loading}
        className={`mb-6 px-4 py-2 rounded text-white font-semibold transition ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? 'Updating...' : 'Simulate Update'}
      </button>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-2 px-4 border-b">Callsign</th>
              <th className="text-left py-2 px-4 border-b">IP</th>
              <th className="text-left py-2 px-4 border-b">Status</th>
              <th className="text-left py-2 px-4 border-b">Last Heartbeat</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node) => (
              <tr
                key={node.id}
                className={`${flashRows[node.id] ?? ''} transition-colors duration-500`}
              >
                <td className="py-2 px-4 border-b">{node.callsign}</td>
                <td className="py-2 px-4 border-b">{node.ip}</td>
                <td
                  className={`py-2 px-4 border-b font-bold ${
                    node.status === 'online' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {node.status}
                </td>
                <td className="py-2 px-4 border-b">{node.last_heartbeat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}