import TestRecommendations from "./Test";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { DashboardContent } from "./DashHome";
import { Header } from "./Header";
const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const getPageTitle = () => {
  //   const item = menuItems.find((item) => item.id === activeItem);
  //   return item?.label || "Dashboard";
  // };

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardContent />;
      case "courses":
        return <TestRecommendations />;

      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeItem={activeItem}
        onItemClick={setActiveItem}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} title={"home"} />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
