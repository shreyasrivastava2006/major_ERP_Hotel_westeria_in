import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  Doughnut,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import SuperAdminLayout from "../../components/layout/SuperAdminLayout.jsx";
import "./HotelPerformance.css";

// =====================================================
// REGISTER CHARTS
// =====================================================

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// =====================================================
// SAMPLE HOTEL PERFORMANCE DATA
// =====================================================

const performanceData = [
  {
    id: 1,
    name: "Wisteria Grand",
    location: "Lucknow, Uttar Pradesh",
    totalRooms: 120,
    occupiedRooms: 102,
    bookings: 450,
    revenue: 1250000,
    rating: 4.8,
    growth: 18.5,
    status: "Excellent",
  },
  {
    id: 2,
    name: "Wisteria Palace",
    location: "Kanpur, Uttar Pradesh",
    totalRooms: 100,
    occupiedRooms: 72,
    bookings: 320,
    revenue: 820000,
    rating: 4.5,
    growth: 12.4,
    status: "Good",
  },
  {
    id: 3,
    name: "Wisteria Residency",
    location: "Varanasi, Uttar Pradesh",
    totalRooms: 80,
    occupiedRooms: 52,
    bookings: 250,
    revenue: 560000,
    rating: 4.2,
    growth: 8.2,
    status: "Average",
  },
  {
    id: 4,
    name: "Wisteria Heritage",
    location: "Jaipur, Rajasthan",
    totalRooms: 90,
    occupiedRooms: 76,
    bookings: 365,
    revenue: 980000,
    rating: 4.7,
    growth: 15.8,
    status: "Excellent",
  },
  {
    id: 5,
    name: "Wisteria Royal",
    location: "Delhi, India",
    totalRooms: 150,
    occupiedRooms: 111,
    bookings: 510,
    revenue: 1480000,
    rating: 4.6,
    growth: 20.3,
    status: "Good",
  },
];

// =====================================================
// HELPERS
// =====================================================

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const getOccupancy = (hotel) => {
  if (!hotel.totalRooms) return 0;

  return Math.round(
    (hotel.occupiedRooms / hotel.totalRooms) * 100
  );
};

const getPerformanceStatus = (occupancy) => {
  if (occupancy >= 80) return "Excellent";
  if (occupancy >= 70) return "Good";
  return "Average";
};

// =====================================================
// MAIN COMPONENT
// =====================================================

function HotelPerformance() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState("This Month");

  // =====================================================
  // FILTER HOTELS
  // =====================================================

  const filteredHotels = useMemo(() => {
    return performanceData.filter((hotel) => {
      const query = search.toLowerCase().trim();

      const occupancy = getOccupancy(hotel);
      const performance = getPerformanceStatus(occupancy);

      const matchesSearch =
        hotel.name.toLowerCase().includes(query) ||
        hotel.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        performance === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const stats = useMemo(() => {
    const totalHotels = filteredHotels.length;

    const totalBookings = filteredHotels.reduce(
      (sum, hotel) => sum + hotel.bookings,
      0
    );

    const totalRevenue = filteredHotels.reduce(
      (sum, hotel) => sum + hotel.revenue,
      0
    );

    const totalRooms = filteredHotels.reduce(
      (sum, hotel) => sum + hotel.totalRooms,
      0
    );

    const occupiedRooms = filteredHotels.reduce(
      (sum, hotel) => sum + hotel.occupiedRooms,
      0
    );

    const averageOccupancy = totalRooms
      ? Math.round((occupiedRooms / totalRooms) * 100)
      : 0;

    return {
      totalHotels,
      totalBookings,
      totalRevenue,
      averageOccupancy,
    };
  }, [filteredHotels]);

  // =====================================================
  // OCCUPANCY CHART
  // =====================================================

  const occupancyChartData = {
    labels: filteredHotels.map((hotel) => hotel.name),

    datasets: [
      {
        label: "Occupancy %",
        data: filteredHotels.map(getOccupancy),
        backgroundColor: [
          "#c6a477",
          "#8b6874",
          "#a9b7a0",
          "#d2b79a",
          "#b48d5e",
        ],
        borderRadius: 7,
        maxBarThickness: 45,
      },
    ],
  };

  const occupancyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) =>
            `Occupancy: ${context.parsed.y}%`,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        max: 100,

        ticks: {
          callback: (value) => `${value}%`,
          color: "#9b8b7c",
        },

        grid: {
          color: "#f0e8de",
        },
      },

      x: {
        ticks: {
          color: "#918174",
          font: {
            size: 10,
          },
        },

        grid: {
          display: false,
        },
      },
    },
  };

  // =====================================================
  // REVENUE CHART
  // =====================================================

  const revenueChartData = {
    labels: filteredHotels.map((hotel) => hotel.name),

    datasets: [
      {
        label: "Revenue",
        data: filteredHotels.map((hotel) => hotel.revenue),
        backgroundColor: "#c6a477",
        borderRadius: 7,
        maxBarThickness: 42,
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
            `₹${(value / 100000).toFixed(1)}L`,
        },

        grid: {
          color: "#f0e8de",
        },
      },

      x: {
        ticks: {
          color: "#918174",
          font: {
            size: 10,
          },
        },

        grid: {
          display: false,
        },
      },
    },
  };

  // =====================================================
  // OCCUPANCY DISTRIBUTION
  // =====================================================

  const excellentHotels = filteredHotels.filter(
    (hotel) => getOccupancy(hotel) >= 80
  ).length;

  const goodHotels = filteredHotels.filter(
    (hotel) =>
      getOccupancy(hotel) >= 70 &&
      getOccupancy(hotel) < 80
  ).length;

  const averageHotels = filteredHotels.filter(
    (hotel) => getOccupancy(hotel) < 70
  ).length;

  const distributionData = {
    labels: ["Excellent", "Good", "Average"],

    datasets: [
      {
        data: [
          excellentHotels,
          goodHotels,
          averageHotels,
        ],

        backgroundColor: [
          "#b48d5e",
          "#8b6874",
          "#a9b7a0",
        ],

        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const distributionOptions = {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "72%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "#806f62",
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 11,
          },
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
      "Location",
      "Total Rooms",
      "Occupied Rooms",
      "Occupancy %",
      "Bookings",
      "Revenue",
      "Guest Rating",
      "Growth %",
      "Performance",
    ];

    const rows = filteredHotels.map((hotel) => {
      const occupancy = getOccupancy(hotel);

      return [
        hotel.name,
        hotel.location,
        hotel.totalRooms,
        hotel.occupiedRooms,
        occupancy,
        hotel.bookings,
        hotel.revenue,
        hotel.rating,
        hotel.growth,
        getPerformanceStatus(occupancy),
      ];
    });

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      ["\uFEFF" + csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Wisteria_Hotel_Performance.csv";

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
      <div className="hotel-performance-page">

        {/* BREADCRUMB */}

        <div className="hotel-performance-breadcrumb">
          <button
            type="button"
            onClick={() => navigate("/super-admin")}
          >
            Super Admin
          </button>

          <i className="bi bi-chevron-right"></i>

          <span>Reports</span>

          <i className="bi bi-chevron-right"></i>

          <strong>Hotel Performance</strong>
        </div>

        {/* HEADER */}

        <div className="hotel-performance-header">
          <div>
            <span className="hotel-performance-eyebrow">
              SUPER ADMIN ANALYTICS
            </span>

            <h1>Hotel Performance</h1>

            <p>
              Monitor occupancy, bookings, revenue and
              operational performance across all hotels.
            </p>
          </div>

          <div className="hotel-performance-header-actions">
            <button
              type="button"
              className="hotel-performance-back-btn"
              onClick={() => navigate("/super-admin")}
            >
              <i className="bi bi-arrow-left"></i>
              Dashboard
            </button>

            <button
              type="button"
              className="hotel-performance-export-btn"
              onClick={handleExport}
            >
              <i className="bi bi-download"></i>
              Export Report
            </button>
          </div>
        </div>

        {/* STATISTICS */}

        <div className="hotel-performance-stats">

          <div className="hotel-performance-stat-card">
            <div className="hotel-performance-stat-icon gold">
              <i className="bi bi-buildings"></i>
            </div>

            <div className="hotel-performance-stat-content">
              <span>Total Hotels</span>
              <strong>{stats.totalHotels}</strong>
              <small>Hotels in report</small>
            </div>
          </div>

          <div className="hotel-performance-stat-card">
            <div className="hotel-performance-stat-icon purple">
              <i className="bi bi-calendar-check"></i>
            </div>

            <div className="hotel-performance-stat-content">
              <span>Total Bookings</span>
              <strong>
                {stats.totalBookings.toLocaleString("en-IN")}
              </strong>
              <small>Reservations recorded</small>
            </div>
          </div>

          <div className="hotel-performance-stat-card">
            <div className="hotel-performance-stat-icon green">
              <i className="bi bi-door-open"></i>
            </div>

            <div className="hotel-performance-stat-content">
              <span>Average Occupancy</span>
              <strong>{stats.averageOccupancy}%</strong>
              <small>Across selected hotels</small>
            </div>
          </div>

          <div className="hotel-performance-stat-card">
            <div className="hotel-performance-stat-icon rose">
              <i className="bi bi-currency-rupee"></i>
            </div>

            <div className="hotel-performance-stat-content">
              <span>Total Revenue</span>
              <strong>
                {formatCurrency(stats.totalRevenue)}
              </strong>
              <small>Hotel revenue</small>
            </div>
          </div>

        </div>

        {/* FILTERS */}

        <div className="hotel-performance-filter-card">
          <div className="hotel-performance-filter-heading">
            <div className="hotel-performance-filter-icon">
              <i className="bi bi-funnel"></i>
            </div>

            <div>
              <strong>Performance Filters</strong>
              <span>
                Search and compare hotel performance
              </span>
            </div>
          </div>

          <div className="hotel-performance-filter-controls">
            <div className="hotel-performance-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search hotel or location..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Performance</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
            </select>

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

            <button
              type="button"
              className="hotel-performance-clear-btn"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setDateRange("This Month");
              }}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              Clear
            </button>
          </div>
        </div>

        {/* CHARTS */}

        <div className="hotel-performance-charts">

          {/* OCCUPANCY */}

          <div className="hotel-performance-chart-card">
            <div className="hotel-performance-chart-header">
              <div>
                <span>OCCUPANCY ANALYTICS</span>
                <h2>Hotel Occupancy Comparison</h2>
                <p>
                  Occupied rooms percentage by hotel
                </p>
              </div>

              <div className="hotel-performance-chart-icon">
                <i className="bi bi-bar-chart"></i>
              </div>
            </div>

            <div className="hotel-performance-chart-body">
              <Bar
                data={occupancyChartData}
                options={occupancyChartOptions}
              />
            </div>
          </div>

          {/* REVENUE */}

          <div className="hotel-performance-chart-card">
            <div className="hotel-performance-chart-header">
              <div>
                <span>REVENUE ANALYTICS</span>
                <h2>Revenue Comparison</h2>
                <p>
                  Revenue generated by each hotel
                </p>
              </div>

              <div className="hotel-performance-chart-icon">
                <i className="bi bi-graph-up-arrow"></i>
              </div>
            </div>

            <div className="hotel-performance-chart-body">
              <Bar
                data={revenueChartData}
                options={revenueChartOptions}
              />
            </div>
          </div>

        </div>

        {/* DISTRIBUTION + TOP HOTEL */}

        <div className="hotel-performance-insights">

          <div className="hotel-performance-chart-card">
            <div className="hotel-performance-chart-header">
              <div>
                <span>PERFORMANCE OVERVIEW</span>
                <h2>Hotel Performance Distribution</h2>
                <p>
                  Hotels categorized by occupancy
                </p>
              </div>
            </div>

            <div className="hotel-performance-doughnut">
              <Doughnut
                data={distributionData}
                options={distributionOptions}
              />
            </div>
          </div>

          <div className="hotel-performance-highlight-card">
            <div className="hotel-performance-highlight-header">
              <span>TOP PERFORMING HOTEL</span>

              <i className="bi bi-trophy-fill"></i>
            </div>

            {filteredHotels.length > 0 ? (
              (() => {
                const topHotel = [...filteredHotels].sort(
                  (a, b) => b.revenue - a.revenue
                )[0];

                return (
                  <>
                    <div className="hotel-performance-highlight-icon">
                      <i className="bi bi-building-check"></i>
                    </div>

                    <h2>{topHotel.name}</h2>

                    <p>{topHotel.location}</p>

                    <div className="hotel-performance-highlight-stats">
                      <div>
                        <span>REVENUE</span>
                        <strong>
                          {formatCurrency(topHotel.revenue)}
                        </strong>
                      </div>

                      <div>
                        <span>OCCUPANCY</span>
                        <strong>
                          {getOccupancy(topHotel)}%
                        </strong>
                      </div>

                      <div>
                        <span>GUEST RATING</span>
                        <strong>
                          <i className="bi bi-star-fill"></i>{" "}
                          {topHotel.rating}
                        </strong>
                      </div>
                    </div>
                  </>
                );
              })()
            ) : (
              <p>No hotel data available.</p>
            )}
          </div>

        </div>

        {/* TABLE */}

        <div className="hotel-performance-table-card">
          <div className="hotel-performance-table-header">
            <div>
              <span>HOTEL COMPARISON</span>
              <h2>Detailed Hotel Performance</h2>
              <p>
                Showing {filteredHotels.length} hotels
              </p>
            </div>

            <span className="hotel-performance-period">
              <i className="bi bi-calendar3"></i>
              {dateRange} (Demo)
            </span>
          </div>

          <div className="hotel-performance-table-wrapper">
            <table className="hotel-performance-table">
              <thead>
                <tr>
                  <th>HOTEL</th>
                  <th>TOTAL ROOMS</th>
                  <th>OCCUPANCY</th>
                  <th>BOOKINGS</th>
                  <th>REVENUE</th>
                  <th>GUEST RATING</th>
                  <th>GROWTH</th>
                  <th>PERFORMANCE</th>
                </tr>
              </thead>

              <tbody>
                {filteredHotels.length > 0 ? (
                  filteredHotels.map((hotel) => {
                    const occupancy = getOccupancy(hotel);
                    const performance =
                      getPerformanceStatus(occupancy);

                    return (
                      <tr key={hotel.id}>
                        <td>
                          <div className="hotel-performance-hotel-cell">
                            <div className="hotel-performance-hotel-icon">
                              <i className="bi bi-building"></i>
                            </div>

                            <div>
                              <strong>{hotel.name}</strong>
                              <span>{hotel.location}</span>
                            </div>
                          </div>
                        </td>

                        <td>{hotel.totalRooms}</td>

                        <td>
                          <div className="hotel-performance-occupancy-cell">
                            <div>
                              <strong>{occupancy}%</strong>
                            </div>

                            <div className="hotel-performance-progress">
                              <div
                                style={{
                                  width: `${occupancy}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        <td>
                          {hotel.bookings.toLocaleString("en-IN")}
                        </td>

                        <td>
                          <strong className="hotel-performance-revenue">
                            {formatCurrency(hotel.revenue)}
                          </strong>
                        </td>

                        <td>
                          <span className="hotel-performance-rating">
                            <i className="bi bi-star-fill"></i>
                            {hotel.rating}
                          </span>
                        </td>

                        <td>
                          <span className="hotel-performance-growth">
                            <i className="bi bi-arrow-up-right"></i>
                            {hotel.growth}%
                          </span>
                        </td>

                        <td>
                          <span
                            className={`hotel-performance-badge ${performance.toLowerCase()}`}
                          >
                            {performance}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8">
                      <div className="hotel-performance-empty">
                        <i className="bi bi-inbox"></i>
                        <h3>No Hotels Found</h3>
                        <p>
                          Try changing the search or filters.
                        </p>
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

export default HotelPerformance;