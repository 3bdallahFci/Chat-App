
function SkeletonCard() {
  return (
    <div className="p-4 border rounded-lg animate-pulse">
      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded"></div>
      <div className="mt-1 h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  );
}

export default SkeletonCard;
