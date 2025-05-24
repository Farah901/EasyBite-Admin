import './Dashboard.css'
import React from 'react'
import { Pie, Bar, Line } from 'react-chartjs-2'
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
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

function Dashboard() {
  // Static entities for demonstration
  const stats = {
    totalOrders: 120,
    pendingOrders: 15,
    completedOrders: 100,
    totalDishes: 45,
    availableDishes: 40,
    outOfStockDishes: 5,
  };

  const orderPieData = {
    labels: ['Pending Orders', 'Completed Orders'],
    datasets: [
      {
        data: [stats.pendingOrders, stats.completedOrders],
        backgroundColor: ['#FFCE56', 'tomato'],
        hoverBackgroundColor: ['#FFCE56', 'tomato'],
      },
    ],
  };

  const dishPieData = {
    labels: ['Available Dishes', 'Out of Stock Dishes'],
    datasets: [
      {
        data: [stats.availableDishes, stats.outOfStockDishes],
        backgroundColor: ['#ff446c', '#f692a8'],
        hoverBackgroundColor: ['#ff446c', '#f692a8'],
      },
    ],
  };

  // Example Bar chart data (e.g., orders per day)
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders per Day',
        data: [12, 19, 8, 15, 22, 17, 10],
        backgroundColor: '#36A2EB',
      },
    ],
  };

  // Example Line chart data (e.g., revenue trend)
  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [400, 600, 550, 700],
        fill: false,
        borderColor: '#FF6384',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className='text-center'>Dashboard</h2>
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

export default Dashboard