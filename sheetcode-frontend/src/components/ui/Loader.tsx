function Loader() {
  return (
    <div className="flex items-center justify-center text-white w-full h-full">
      <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin" />
      <p className="text-sm font-medium ml-2 hidden">Loading...</p>
    </div>
  );
}

export default Loader;
