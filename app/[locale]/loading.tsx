export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f6f3ed] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#efe5d4] border-t-[#8b5e2b]"></div>
        <p className="text-sm text-slate-600">Loading...</p>
      </div>
    </div>
  );
}

