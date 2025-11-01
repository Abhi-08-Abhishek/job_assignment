import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpenseChart = () => {
  const { items = [] } = useSelector((state) => state.transactions);

  // Calculate totals safely
  const income = items
    .filter((i) => i.type === "income")
    .reduce((acc, cur) => acc + (Number(cur.amount) || 0), 0);

  const expense = items
    .filter((i) => i.type === "expense")
    .reduce((acc, cur) => acc + (Number(cur.amount) || 0), 0);

  const balance = income - expense;

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: [
          "rgba(34,197,94,0.8)", // green
          "rgba(239,68,68,0.8)", // red
        ],
        borderColor: ["#16a34a", "#dc2626"],
        borderWidth: 2,
        hoverOffset: 10,
        cutout: "75%", // donut style
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#374151",
          font: { size: 14, weight: "600" },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#f9fafb",
        cornerRadius: 6,
        padding: 12,
      },
    },
    animation: { animateScale: true, animateRotate: true },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Income vs Expense
        </h2>
        <span className="text-sm text-gray-500">
          Balance:{" "}
          <span
            className={`font-semibold ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{balance.toLocaleString("en-IN")}
          </span>
        </span>
      </div>

      {/* Chart */}
      <div className="relative h-64 w-full">
        <Pie data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs text-gray-500">Balance</p>
          <p
            className={`text-lg font-bold ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{balance.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
