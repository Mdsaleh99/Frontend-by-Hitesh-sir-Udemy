
function Card({ children, title, color = "blue" }) {
  const colorClasses = {
    blue: "border-blue-500 bg-blue-50",
    green: "border-green-500 bg-green-50",
    purple: "border-purple-500 bg-purple-50",
    red: "border-red-500 bg-red-50",
  };

  return (
    <div
      className={`border-l-4 ${colorClasses[color]} p-6 rounded-lg shadow-md`}
    >
      {title && (
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      )}
      <div className="text-gray-700">{children}</div>
    </div>
  );
}

// Container component that arranges children
function Container({ children, layout = "vertical" }) {
  const layoutClasses = {
    vertical: "flex flex-col space-y-4",
    horizontal: "flex flex-row flex-wrap gap-4",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  };

  return <div className={layoutClasses[layout]}>{children}</div>;
}

export default function ChildrenProps() {
  return (
    <section className="p-8 bg-white rounded-xl shadow-lg">
      <h2>Children prop</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
        corporis sed obcaecati vero error consequatur!
      </p>
      <div className="space-y-6">
        <div>
          <h3>Card Component</h3>
          <Container layout="grid">
            <Card
              title="User Profile"
              color="blue"
            >
              <p className="mb-2">
                <strong>Name:</strong> John Doe
              </p>
              <p className="mb-2">
                <strong>Email:</strong> john@example.com
              </p>
              <p>
                <strong>Role:</strong> Developer
              </p>
            </Card>

            <Card
              title="Statistics"
              color="green"
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Users:</span>
                  <span className="font-bold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Sessions:</span>
                  <span className="font-bold">567</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue:</span>
                  <span className="font-bold">$89,000</span>
                </div>
              </div>
            </Card>

            <Card
              title="Quick Actions"
              color="purple"
            >
              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
                  Create New
                </button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                  View All
                </button>
              </div>
            </Card>

            <Card
              title="Warning"
              color="red"
            >
              <p>
                Your trial period ends in 5 days. Please upgrade your account to
                continue using all features.
              </p>
            </Card>
          </Container>
        </div>
      </div>
    </section>
  );
}