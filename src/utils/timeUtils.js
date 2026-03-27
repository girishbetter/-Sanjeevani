export const getMinutesRemaining = (scheduledTime) => {
  const now = new Date();
  const [hours, minutes] = scheduledTime.split(':').map(Number);
  
  const scheduledDate = new Date();
  scheduledDate.setHours(hours, minutes, 0, 0);
  
  const diffMs = scheduledDate - now;
  const diffMins = Math.floor(diffMs / 60000);
  
  return diffMins;
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minutes.padStart(2, '0')} ${ampm}`;
};
