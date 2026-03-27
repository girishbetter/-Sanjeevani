export const PillIcon = ({ shape, color, className = "w-10 h-10" }) => {
  const getShapeClasses = () => {
    switch(shape) {
      case 'round': return 'rounded-full aspect-square';
      case 'oval': return 'rounded-[50%] aspect-video'; 
      case 'capsule': return 'rounded-full aspect-[2/1]';
      default: return 'rounded-full aspect-square';
    }
  };

  return (
    <div 
      className={`${getShapeClasses()} ${className} shadow-sm border border-gray-200 inline-block`}
      style={{ backgroundColor: color || '#15803d' }}
    />
  );
};
