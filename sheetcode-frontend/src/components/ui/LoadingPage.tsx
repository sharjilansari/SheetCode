function LoadingPage() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center text-white">
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium">Loading...</p>
    </div>
  );
}

export default LoadingPage;
