export const DashboardContent: React.FC = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-gray-500 text-sm font-medium mb-2">
          Total Courses
        </h3>
        <p className="text-3xl font-bold text-gray-800">24</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-gray-500 text-sm font-medium mb-2">
          Active Students
        </h3>
        <p className="text-3xl font-bold text-gray-800">1,284</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-gray-500 text-sm font-medium mb-2">
          Completion Rate
        </h3>
        <p className="text-3xl font-bold text-gray-800">87%</p>
      </div>
    </div>
  </div>
);
