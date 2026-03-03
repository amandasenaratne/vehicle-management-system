import useAuth from "../../hooks/useAuth.js";

export default function Navbar({ title }) {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
          {user?.username?.[0]?.toUpperCase()}
        </div>
        <span className="text-sm text-gray-600 font-medium">{user?.username}</span>
      </div>
    </header>
  );
}
