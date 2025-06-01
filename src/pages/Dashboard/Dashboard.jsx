import "./Dashboard.css";
import { TailSpin } from 'react-loader-spinner';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://backend-api-test-gi6nhwpne-farah901s-projects.vercel.app/api/dashboard/stats"
        );
        if (res.data.success) {
          console.log("Dashboard stats:", res.data.data); // For debugging
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };

    fetchStats();
  }, []);
  if (
    !stats ||
    !stats.ordersPerDay ||
    !stats.revenuePerWeek ||
    !Array.isArray(stats.revenuePerWeek)
  ) {
    return (
      <div
        className="dashboard-container"
        style={{ textAlign: "center", paddingTop: "50px" }}
      >
        <TailSpin height={80} width={80} color="#FF446C" ariaLabel="loading" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Standard day order
  const orderDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const orderPieData = {
    labels: ["Pending Orders", "Completed Orders"],
    datasets: [
      {
        data: [stats.pendingOrders || 0, stats.completedOrders || 0],
        backgroundColor: ["#FFCE56", "tomato"],
        hoverBackgroundColor: ["#FFCE56", "tomato"],
      },
    ],
  };

  const dishPieData = {
    labels: ["Available Dishes", "Out of Stock Dishes"],
    datasets: [
      {
        data: [stats.availableDishes || 0, stats.outOfStockDishes || 0],
        backgroundColor: ["#ff446c", "#f692a8"],
        hoverBackgroundColor: ["#ff446c", "#f692a8"],
      },
    ],
  };

  const barData = {
    labels: orderDays,
    datasets: [
      {
        label: "Orders per Day",
        data: orderDays.map((day) => stats.ordersPerDay[day] || 0),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Revenue (MAD)",
        data: stats.revenuePerWeek,
        fill: false,
        borderColor: "#FF6384",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="text-center">Dashboard</h2>
      <div className="dashboard-entities">
        <div className="dashboard-entity">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="dashboard-entity">
          <h3>Total Dishes</h3>
          <p>{stats.totalDishes}</p>
        </div>
      </div>
      <div className="dashboard-charts">
        <div className="dashboard-charts-row">
          <div className="dashboard-chart">
            <h4>Orders Status</h4>
            <Pie data={orderPieData} />
          </div>
          <div className="dashboard-chart">
            <h4>Dishes Availability</h4>
            <Pie data={dishPieData} />
          </div>
        </div>
        <div className="dashboard-charts-row">
          <div className="dashboard-chart">
            <h4>Orders Per Day</h4>
            <Bar data={barData} />
          </div>
          <div className="dashboard-chart">
            <h4>Revenue Trend</h4>
            <Line data={lineData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
