import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export const AlertHistory = ({ patientId }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('alerts_log')
        .select(`
          id, alert_type, sent_at, status, channel,
          medicines ( name )
        `)
        .eq('patient_id', patientId)
        .order('sent_at', { ascending: false })
        .limit(10);
      
      setAlerts(data || []);
      setLoading(false);
    };

    fetchAlerts();
  }, [patientId]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;

  if (alerts.length === 0) {
    return <div className="text-center bg-gray-50 p-4 rounded-2xl text-gray-500">No alerts found.</div>;
  }

  const getTypeStyle = (type) => {
    switch(type) {
      case 'emergency': return { bg: 'bg-red-100', text: 'text-red-800', label: 'Emergency' };
      case 'missed_dose': return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Missed Dose' };
      default: return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Alert' };
    }
  };

  return (
    <div className="space-y-3">
      {alerts.map(alert => {
        const style = getTypeStyle(alert.alert_type);
        const date = new Date(alert.sent_at);
        
        return (
          <div key={alert.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${style.bg} ${style.text}`}>
                  {style.label}
                </span>
                <span className="text-xs text-gray-400">via {alert.channel.toUpperCase()}</span>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {alert.alert_type === 'missed_dose' ? `Missed ${alert.medicines?.name}` : 'Patient requested help'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{date.toLocaleDateString()}</p>
              <p className="text-xs text-gray-400">{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
