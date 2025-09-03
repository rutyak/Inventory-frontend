import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./SalesChart.module.css";
import CalenderIcon from "../../assets/icons/CalenderIcon.svg";

const data = [
  { name: "Jan", Purchase: 48000, Sales: 43000 },
  { name: "Feb", Purchase: 51000, Sales: 42000 },
  { name: "Mar", Purchase: 41000, Sales: 47000 },
  { name: "Apr", Purchase: 32000, Sales: 39000 },
  { name: "May", Purchase: 40000, Sales: 41000 },
  { name: "Jun", Purchase: 23000, Sales: 35000 },
  { name: "Jul", Purchase: 30000, Sales: 27000 },
  { name: "Aug", Purchase: 24000, Sales: 23000 },
  { name: "Sep", Purchase: 39000, Sales: 38000 },
  { name: "Oct", Purchase: 27000, Sales: 32000 },
];

const SalesChart = () => {
  return (
    <div className={styles.chartWrapper}>
      <div className={styles.header}>
        <h3>Sales & Purchase</h3>
        <button className={styles.btn}>
          <img src={CalenderIcon} alt="CalenderIcon" /> Weekly
        </button>
      </div>

      {/* Chart */}
      <div className={styles.chartBody}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={16}>
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => value.toLocaleString()} />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            <Bar dataKey="Purchase" fill="#4ab5f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Sales" fill="#32cd32" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
