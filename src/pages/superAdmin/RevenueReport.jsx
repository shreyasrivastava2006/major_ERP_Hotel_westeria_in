import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bar,
  Doughnut,
  Line,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import SuperAdminLayout from "../../components/layout/SuperAdminLayout.jsx";
import "./RevenueReport.css";

// =====================================================
// REGISTER CHARTS
// =====================================================

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

// =====================================================
// STORAGE KEYS
// =====================================================

const SUBSCRIPTION_KEY = "wisteriaSubscriptions";
const PLANS_KEY = "wisteriaSubscriptionPlans";
const HOTELS_KEY = "wisteriaHotels";

// =====================================================
// DEFAULT PLANS
// =====================================================

const defaultPlans = [
  {
    id: 1,
    name: "Basic",
    price: 999,
    billingCycle: "Monthly",
  },
  {
    id: 2,
    name: "Premium",
    price: 2499,
    billingCycle: "Monthly",
  },
  {
    id: 3,
    name: "Enterprise",
    price: 4999,
    billingCycle: "Monthly",
  },
];

// =====================================================
// HELPERS
// =====================================================

const readStorage = (key, fallback = []) => {
  try {
    const saved = localStorage.getItem(key);

    if (saved !== null) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
  }

  return fallback;
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getMonthKey = (date) => {
  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) return "";

  return `${parsed.getFullYear()}-${String(
    parsed.getMonth() + 1
  ).padStart(2, "0")}`;
};

const getDateRange = (range) => {
  const today = new Date();

  const end = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59
  );

  let start;

  switch (range) {
    case "Last Month":
      start = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );

      return {
        start,
        end: new Date(
          today.getFullYear(),
          today.getMonth(),
          0,
          23,
          59,
          59
        ),
      };

    case "Last 3 Months":
      start = new Date(
        today.getFullYear(),
        today.getMonth() - 2,
        1
      );
      break;

    case "This Year":
      start = new Date(today.getFullYear(), 0, 1);
      break;

    default:
      start = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
  }

  return { start, end };
};

const isDateInRange = (date, range) => {
  if (!date) return false;

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) return false;

  const { start, end } = getDateRange(range);

  return parsed >= start && parsed <= end;
};

const getMonthlyAmount = (subscription) => {
  const amount = Number(subscription.price) || 0;

  return subscription.billingCycle === "Yearly"
    ? amount / 12
    : amount;
};

const escapeCSV = (value) =>
  `"${String(value ?? "").replace(/"/g, '""')}"`;

// =====================================================
// MAIN COMPONENT
// =====================================================

function RevenueReport() {
  const navigate = useNavigate();

  // =====================================================
  // DATA
  // =====================================================

  const [subscriptions, setSubscriptions] = useState(() =>
    readStorage(SUBSCRIPTION_KEY)
  );

  const [plans, setPlans] = useState(() =>
    readStorage(PLANS_KEY, defaultPlans)
  );

  const [hotels, setHotels] = useState(() =>
    readStorage(HOTELS_KEY)
  );

  // =====================================================
  // FILTERS
  // =====================================================

  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("This Month");
  const [planFilter, setPlanFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  // =====================================================
  // REFRESH DATA
  // =====================================================

  useEffect(() => {
    const refreshData = () => {
      setSubscriptions(readStorage(SUBSCRIPTION_KEY));
      setPlans(readStorage(PLANS_KEY, defaultPlans));
      setHotels(readStorage(HOTELS_KEY));
    };

    window.addEventListener("focus", refreshData);
    window.addEventListener("storage", refreshData);

    return () => {
      window.removeEventListener("focus", refreshData);
      window.removeEventListener("storage", refreshData);
    };
  }, []);

  // =====================================================
  // ENRICH SUBSCRIPTIONS
  // =====================================================

  const revenueRecords = useMemo(() => {
    return subscriptions.map((subscription) => {
      const hotel = hotels.find(
        (item) =>
          String(item.id) === String(subscription.hotelId)
      );

      const plan = plans.find(
        (item) =>
          String(item.id) === String(subscription.planId)
      );

      return {
        ...subscription,

        hotelName:
          hotel?.name ||
          subscription.hotelName ||
          "Unknown Hotel",

        planName:
          plan?.name ||
          subscription.planName ||
          "Unknown Plan",

        price: Number(
          subscription.price ?? plan?.price ?? 0
        ),

        billingCycle:
          subscription.billingCycle ||
          plan?.billingCycle ||
          "Monthly",

        paymentStatus:
          subscription.paymentStatus || "Pending",
      };
    });
  }, [subscriptions, hotels, plans]);

  // =====================================================
  // FILTER RECORDS
  // =====================================================

  const filteredRecords = useMemo(() => {
    return revenueRecords.filter((record) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        record.hotelName.toLowerCase().includes(query) ||
        record.planName.toLowerCase().includes(query);

      const matchesPlan =
        planFilter === "All" ||
        String(record.planId) === String(planFilter);

      const matchesPayment =
        paymentFilter === "All" ||
        record.paymentStatus === paymentFilter;

      const matchesDate = isDateInRange(
        record.startDate,
        dateRange
      );

      return (
        matchesSearch &&
        matchesPlan &&
        matchesPayment &&
        matchesDate
      );
    });
  }, [
    revenueRecords,
    search,
    planFilter,
    paymentFilter,
    dateRange,
  ]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const stats = useMemo(() => {
    const paidRecords = filteredRecords.filter(
      (record) => record.paymentStatus === "Paid"
    );

    const pendingRecords = filteredRecords.filter(
      (record) => record.paymentStatus === "Pending"
    );

    const totalRevenue = paidRecords.reduce(
      (total, record) => total + record.price,
      0
    );

    const pendingRevenue = pendingRecords.reduce(
      (total, record) => total + record.price,
      0
    );

    const monthlyRecurring = revenueRecords
      .filter((record) => {
        if (record.status === "Cancelled") return false;

        const today = new Date();
        const expiry = new Date(
          `${record.endDate}T23:59:59`
        );

        return expiry >= today;
      })
      .reduce(
        (total, record) =>
          total + getMonthlyAmount(record),
        0
      );

    return {
      totalRevenue,
      pendingRevenue,
      monthlyRecurring,
      transactions: filteredRecords.length,
      paidTransactions: paidRecords.length,
    };
  }, [filteredRecords, revenueRecords]);

  // =====================================================
  // MONTHLY REVENUE CHART
  // =====================================================

  const monthlyRevenue = useMemo(() => {
    const months = [];

    const today = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth() - i,
        1
      );

      const key = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      months.push({
        key,
        label: date.toLocaleDateString("en-IN", {
          month: "short",
        }),
        revenue: 0,
      });
    }

    revenueRecords.forEach((record) => {
      if (record.paymentStatus !== "Paid") return;

      const monthKey = getMonthKey(record.startDate);

      const month = months.find(
        (item) => item.key === monthKey
      );

      if (month) {
        month.revenue += record.price;
      }
    });

    return months;
  }, [revenueRecords]);

  const revenueChartData = {
    labels: monthlyRevenue.map((month) => month.label),

    datasets: [
      {
        label: "Revenue",
        data: monthlyRevenue.map(
          (month) => month.revenue
        ),
        borderColor: "#b48d5e",
        backgroundColor: "rgba(198, 164, 119, 0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#b48d5e",
        borderWidth: 2.5,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) =>
            formatCurrency(context.parsed.y),
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          color: "#9b8b7c",
          callback: (value) =>
            `₹${(value / 1000).toFixed(0)}K`,
        },

        grid: {
          color: "#f0e8de",
        },
      },

      x: {
        ticks: {
          color: "#918174",
        },

        grid: {
          display: false,
        },
      },
    },
  };

  // =====================================================
  // PLAN REVENUE
  // =====================================================

  const planRevenue = useMemo(() => {
    const grouped = {};

    filteredRecords.forEach((record) => {
      if (record.paymentStatus !== "Paid") return;

      if (!grouped[record.planName]) {
        grouped[record.planName] = 0;
      }

      grouped[record.planName] += record.price;
    });

    return Object.entries(grouped).map(
      ([name, revenue]) => ({
        name,
        revenue,
      })
    );
  }, [filteredRecords]);

  const planChartData = {
    labels: planRevenue.map((item) => item.name),

    datasets: [
      {
        data: planRevenue.map((item) => item.revenue),

        backgroundColor: [
          "#c6a477",
          "#8b6874",
          "#a9b7a0",
          "#d2b79a",
          "#b48d5e",
        ],

        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const planChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "#806f62",
          padding: 18,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  // =====================================================
  // HOTEL REVENUE
  // =====================================================

  const hotelRevenue = useMemo(() => {
    const grouped = {};

    filteredRecords.forEach((record) => {
      if (record.paymentStatus !== "Paid") return;

      if (!grouped[record.hotelName]) {
        grouped[record.hotelName] = 0;
      }

      grouped[record.hotelName] += record.price;
    });

    return Object.entries(grouped)
      .map(([name, revenue]) => ({
        name,
        revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [filteredRecords]);

  const hotelChartData = {
    labels: hotelRevenue.map((item) => item.name),

    datasets: [
      {
        label: "Revenue",
        data: hotelRevenue.map((item) => item.revenue),
        backgroundColor: "#c6a477",
        borderRadius: 7,
        maxBarThickness: 42,
      },
    ],
  };

  const hotelChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          color: "#9b8b7c",
          callback: (value) =>
            `₹${(value / 1000).toFixed(0)}K`,
        },

        grid: {
          color: "#f0e8de",
        },
      },

      x: {
        ticks: {
          color: "#918174",
        },

        grid: {
          display: false,
        },
      },
    },
  };

  // =====================================================
  // EXPORT CSV
  // =====================================================

  const handleExport = () => {
    const headers = [
      "Hotel",
      "Plan",
      "Amount",
      "Billing Cycle",
      "Start Date",
      "Expiry Date",
      "Payment Status",
      "Subscription Status",
    ];

    const rows = filteredRecords.map((record) => [
      record.hotelName,
      record.planName,
      record.price,
      record.billingCycle,
      record.startDate,
      record.endDate,
      record.paymentStatus,
      record.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "Wisteria_Revenue_Report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <SuperAdminLayout>
      <div className="super-revenue-page">

        {/* BREADCRUMB */}

        <div className="super-revenue-breadcrumb">
          <button
            onClick={() => navigate("/super-admin")}
          >
            Super Admin
          </button>

          <i className="bi bi-chevron-right"></i>

          <span>Reports</span>

          <i className="bi bi-chevron-right"></i>

          <strong>Revenue Report</strong>
        </div>

        {/* HEADER */}

        <div className="super-revenue-header">
          <div>
            <span className="super-revenue-eyebrow">
              FINANCIAL ANALYTICS
            </span>

            <h1>Revenue Report</h1>

            <p>
              Track subscription revenue, payment records
              and financial performance across hotels.
            </p>
          </div>

          <div className="super-revenue-header-actions">
            <button
              className="super-revenue-back-btn"
              onClick={() => navigate("/super-admin")}
            >
              <i className="bi bi-arrow-left"></i>
              Dashboard
            </button>

            <button
              className="super-revenue-export-btn"
              onClick={handleExport}
            >
              <i className="bi bi-download"></i>
              Export Report
            </button>
          </div>
        </div>

        {/* STATISTICS */}

        <div className="super-revenue-stats">

          <div className="super-revenue-stat-card">
            <div className="super-revenue-stat-icon gold">
              <i className="bi bi-cash-stack"></i>
            </div>

            <div className="super-revenue-stat-content">
              <span>Total Revenue</span>
              <strong>
                {formatCurrency(stats.totalRevenue)}
              </strong>
              <small>Paid subscriptions in selected period</small>
            </div>
          </div>

          <div className="super-revenue-stat-card">
            <div className="super-revenue-stat-icon purple">
              <i className="bi bi-arrow-repeat"></i>
            </div>

            <div className="super-revenue-stat-content">
              <span>Monthly Recurring Revenue</span>
              <strong>
                {formatCurrency(stats.monthlyRecurring)}
              </strong>
              <small>Estimated recurring revenue</small>
            </div>
          </div>

          <div className="super-revenue-stat-card">
            <div className="super-revenue-stat-icon rose">
              <i className="bi bi-hourglass-split"></i>
            </div>

            <div className="super-revenue-stat-content">
              <span>Pending Payments</span>
              <strong>
                {formatCurrency(stats.pendingRevenue)}
              </strong>
              <small>Unpaid subscription amounts</small>
            </div>
          </div>

          <div className="super-revenue-stat-card">
            <div className="super-revenue-stat-icon green">
              <i className="bi bi-receipt"></i>
            </div>

            <div className="super-revenue-stat-content">
              <span>Total Transactions</span>
              <strong>{stats.transactions}</strong>
              <small>
                {stats.paidTransactions} marked as paid
              </small>
            </div>
          </div>

        </div>

        {/* FILTERS */}

        <div className="super-revenue-filter-card">
          <div className="super-revenue-filter-heading">
            <div className="super-revenue-filter-icon">
              <i className="bi bi-funnel"></i>
            </div>

            <div>
              <strong>Revenue Filters</strong>
              <span>
                Filter subscription payment records
              </span>
            </div>
          </div>

          <div className="super-revenue-filter-controls">
            <div className="super-revenue-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search hotel or plan..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <select
              value={dateRange}
              onChange={(event) =>
                setDateRange(event.target.value)
              }
            >
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="Last 3 Months">
                Last 3 Months
              </option>
              <option value="This Year">This Year</option>
            </select>

            <select
              value={planFilter}
              onChange={(event) =>
                setPlanFilter(event.target.value)
              }
            >
              <option value="All">All Plans</option>

              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>

            <select
              value={paymentFilter}
              onChange={(event) =>
                setPaymentFilter(event.target.value)
              }
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            <button
              className="super-revenue-clear-btn"
              onClick={() => {
                setSearch("");
                setDateRange("This Month");
                setPlanFilter("All");
                setPaymentFilter("All");
              }}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              Clear
            </button>
          </div>
        </div>

        {/* CHARTS */}

        <div className="super-revenue-charts">

          {/* MONTHLY REVENUE */}

          <div className="super-revenue-chart-card">
            <div className="super-revenue-chart-header">
              <div>
                <span>REVENUE ANALYTICS</span>
                <h2>Monthly Revenue Trend</h2>
                <p>
                  Subscription revenue over the last six months
                </p>
              </div>

              <div className="super-revenue-chart-icon">
                <i className="bi bi-graph-up-arrow"></i>
              </div>
            </div>

            <div className="super-revenue-chart-body">
              <Line
                data={revenueChartData}
                options={revenueChartOptions}
              />
            </div>
          </div>

          {/* PLAN BREAKDOWN */}

          <div className="super-revenue-chart-card">
            <div className="super-revenue-chart-header">
              <div>
                <span>SUBSCRIPTION ANALYTICS</span>
                <h2>Revenue by Plan</h2>
                <p>
                  Paid revenue distribution by subscription plan
                </p>
              </div>

              <div className="super-revenue-chart-icon">
                <i className="bi bi-pie-chart"></i>
              </div>
            </div>

            <div className="super-revenue-doughnut">
              {planRevenue.length > 0 ? (
                <Doughnut
                  data={planChartData}
                  options={planChartOptions}
                />
              ) : (
                <div className="super-revenue-chart-empty">
                  No paid subscription data available.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* HOTEL REVENUE */}

        <div className="super-revenue-chart-card super-revenue-full-chart">
          <div className="super-revenue-chart-header">
            <div>
              <span>HOTEL COMPARISON</span>
              <h2>Hotel-wise Subscription Revenue</h2>
              <p>
                Compare revenue generated from each hotel
              </p>
            </div>

            <div className="super-revenue-chart-icon">
              <i className="bi bi-bar-chart"></i>
            </div>
          </div>

          <div className="super-revenue-chart-body">
            {hotelRevenue.length > 0 ? (
              <Bar
                data={hotelChartData}
                options={hotelChartOptions}
              />
            ) : (
              <div className="super-revenue-chart-empty">
                No hotel revenue data available.
              </div>
            )}
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}

        <div className="super-revenue-table-card">
          <div className="super-revenue-table-header">
            <div>
              <span>PAYMENT RECORDS</span>
              <h2>Subscription Transactions</h2>
              <p>
                Showing {filteredRecords.length} records
              </p>
            </div>

            <button
              className="super-revenue-manage-btn"
              onClick={() =>
                navigate("/super-admin/subscriptions")
              }
            >
              <i className="bi bi-credit-card"></i>
              Manage Subscriptions
            </button>
          </div>

          <div className="super-revenue-table-wrapper">
            <table className="super-revenue-table">
              <thead>
                <tr>
                  <th>HOTEL</th>
                  <th>SUBSCRIPTION PLAN</th>
                  <th>AMOUNT</th>
                  <th>BILLING CYCLE</th>
                  <th>START DATE</th>
                  <th>EXPIRY DATE</th>
                  <th>PAYMENT STATUS</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td>
                        <div className="super-revenue-hotel-cell">
                          <div className="super-revenue-hotel-icon">
                            <i className="bi bi-building"></i>
                          </div>

                          <div>
                            <strong>{record.hotelName}</strong>
                            <span>
                              Hotel ID: {record.hotelId}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="super-revenue-plan-badge">
                          <i className="bi bi-gem"></i>
                          {record.planName}
                        </span>
                      </td>

                      <td>
                        <strong className="super-revenue-amount">
                          {formatCurrency(record.price)}
                        </strong>
                      </td>

                      <td>{record.billingCycle}</td>

                      <td>{formatDate(record.startDate)}</td>

                      <td>{formatDate(record.endDate)}</td>

                      <td>
                        <span
                          className={`super-revenue-payment ${
                            record.paymentStatus === "Paid"
                              ? "paid"
                              : "pending"
                          }`}
                        >
                          <span className="status-dot"></span>
                          {record.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">
                      <div className="super-revenue-empty">
                        <i className="bi bi-receipt"></i>
                        <h3>No Revenue Records Found</h3>
                        <p>
                          Assign hotel subscriptions or
                          change the selected filters.
                        </p>

                        <button
                          onClick={() =>
                            navigate("/super-admin/subscriptions")
                          }
                        >
                          <i className="bi bi-plus-lg"></i>
                          Manage Subscriptions
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </SuperAdminLayout>
  );
}

export default RevenueReport;