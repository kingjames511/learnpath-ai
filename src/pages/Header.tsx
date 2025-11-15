import { MessageSquare, Menu } from "lucide-react";

export const Header: React.FC<{ onMenuClick: () => void; title: string }> = ({
  onMenuClick,
  title,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MessageSquare size={20} className="text-gray-600" />
          </button>
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center lg:hidden">
            <span className="text-white font-semibold text-sm">RF</span>
          </div>
        </div>
      </div>
    </header>
  );
};
