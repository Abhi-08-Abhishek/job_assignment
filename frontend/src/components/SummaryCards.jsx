import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

const SummaryCards = () => {
  const { items } = useSelector((state) => state.transactions);

  const income = items
    .filter((i) => i.type === "income")
    .reduce((acc, cur) => acc + cur.amount, 0);
  const expense = items
    .filter((i) => i.type === "expense")
    .reduce((acc, cur) => acc + cur.amount, 0);
  const balance = income - expense;

  const cards = [
    {
      title: "Total Income",
      value: income,
      icon: <ArrowUpCircle className="text-green-600" size={28} />,
      gradient: "from-green-50 to-green-100 border-green-200",
      textColor: "text-green-700",
    },
    {
      title: "Total Expense",
      value: expense,
      icon: <ArrowDownCircle className="text-red-600" size={28} />,
      gradient: "from-red-50 to-red-100 border-red-200",
      textColor: "text-red-700",
    },
    {
      title: "Net Balance",
      value: balance,
      icon: <Wallet className="text-blue-600" size={28} />,
      gradient: "from-blue-50 to-blue-100 border-blue-200",
      textColor: "text-blue-700",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mt-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.03 }}
          className={`p-6 rounded-2xl border shadow-md bg-gradient-to-br ${card.gradient} hover:shadow-lg transition-all`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-semibold ${card.textColor}`}>{card.title}</h3>
            {card.icon}
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            ₹ {card.value.toLocaleString()}
          </p>
          <p className="text-sm font-semibold mt-1">
            {card.title === "Net Balance"
              ? "Your current balance"
              : card.title === "Total Income"
              ? "Earnings this period"
              : "Total spending"}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;
