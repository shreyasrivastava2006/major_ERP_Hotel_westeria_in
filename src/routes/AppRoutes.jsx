import { BrowserRouter, Routes, Route } from "react-router-dom";

// =====================================================
// BASIC PAGES
// =====================================================

import Welcome from "../components/Welcome.jsx";
import Home from "../components/Home.jsx";

// =====================================================
// AUTHENTICATION
// =====================================================

import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";

// =====================================================
// SUPER ADMIN
// =====================================================

import SuperAdminDashboard from "../pages/superAdmin/SuperAdminDashboard.jsx";

// Hotels
import Hotels from "../pages/superAdmin/Hotels.jsx";
import AddHotel from "../pages/superAdmin/AddHotel.jsx";
import HotelDetails from "../pages/superAdmin/HotelDetails.jsx";

// Users
import Users from "../pages/superAdmin/Users.jsx";
import AddUser from "../pages/superAdmin/AddUser.jsx";

// Plans & Subscriptions
import Plans from "../pages/superAdmin/Plans.jsx";
import Subscriptions from "../pages/superAdmin/Subscriptions.jsx";

// Reports
import HotelPerformance from "../pages/superAdmin/HotelPerformance.jsx";
import SuperAdminRevenueReport from "../pages/superAdmin/RevenueReport.jsx";

// System
import Support from "../pages/superAdmin/Support.jsx";
import SystemSettings from "../pages/superAdmin/SystemSettings.jsx";
import ActivityLogs from "../pages/superAdmin/ActivityLogs.jsx";

// =====================================================
// HOTEL ADMIN DASHBOARD
// =====================================================

import Dashboard from "../pages/dashboard/Dashboard.jsx";

// =====================================================
// ROOMS
// =====================================================

import Rooms from "../pages/rooms/Rooms.jsx";

// =====================================================
// GUESTS
// =====================================================

import Guests from "../pages/guests/Guests.jsx";

// =====================================================
// RESERVATIONS
// =====================================================

import Reservations from "../pages/reservations/Reservations.jsx";

// =====================================================
// FRONT OFFICE
// =====================================================

import FrontOffice from "../pages/frontOffice/FrontOffice.jsx";
import CheckIn from "../pages/frontOffice/CheckIn.jsx";
import CheckOut from "../pages/frontOffice/CheckOut.jsx";
import GuestRequests from "../pages/frontOffice/GuestRequests.jsx";
import RoomTransfer from "../pages/frontOffice/RoomTransfer.jsx";

// =====================================================
// HOUSEKEEPING
// =====================================================

import Housekeeping from "../pages/housekeeping/Housekeeping.jsx";
import CleaningSchedule from "../pages/housekeeping/CleaningSchedule.jsx";
import RoomInspection from "../pages/housekeeping/RoomInspection.jsx";
import StaffManagement from "../pages/housekeeping/StaffManagement.jsx";

// =====================================================
// RESTAURANT
// =====================================================

import Restaurant from "../pages/restaurant/Restaurant.jsx";
import Menu from "../pages/restaurant/Menu.jsx";
import MenuManagement from "../pages/restaurant/MenuManagement.jsx";
import NewOrder from "../pages/restaurant/NewOrder.jsx";
import Orders from "../pages/restaurant/Orders.jsx";

// =====================================================
// SERVICES
// =====================================================

import Services from "../pages/services/Services.jsx";
import Laundry from "../pages/services/Laundry.jsx";
import RoomServices from "../pages/services/RoomServices.jsx";
import ServicesRequest from "../pages/services/ServicesRequest.jsx";

// =====================================================
// BILLING
// =====================================================

import Billing from "../pages/billing/Billing.jsx";
import Invoices from "../pages/billing/Invoices.jsx";
import InvoiceDetails from "../pages/billing/InvoiceDetails.jsx";
import Payments from "../pages/billing/Payments.jsx";

// =====================================================
// INVENTORY
// =====================================================

import Inventory from "../pages/inventory/Inventory.jsx";
import AddItems from "../pages/inventory/AddItems.jsx";
import StockHistory from "../pages/inventory/StockHistory.jsx";
import Suppliers from "../pages/inventory/Suppliers.jsx";

// =====================================================
// STAFF
// =====================================================

import Staff from "../pages/staff/Staff.jsx";
import AddStaff from "../pages/staff/AddStaff.jsx";
import StaffDetails from "../pages/staff/StaffDetails.jsx";
import StaffAttendance from "../pages/staff/StaffAttendance.jsx";

// =====================================================
// MAINTENANCE
// =====================================================

import Maintenance from "../pages/maintenance/Maintenance.jsx";
import MaintenanceRequests from "../pages/maintenance/MaintenanceRequests.jsx";
import Equipments from "../pages/maintenance/Equipments.jsx";

// =====================================================
// HOTEL ADMIN REPORTS
// =====================================================

import Reports from "../pages/reports/Reports.jsx";
import BookingReport from "../pages/reports/BookingReport.jsx";
import OccupancyReport from "../pages/reports/OccupancyReport.jsx";
import HotelAdminRevenueReport from "../pages/reports/RevenueReport.jsx";

// =====================================================
// SETTINGS
// =====================================================

import Settings from "../pages/settings/Settings.jsx";
import HotelProfile from "../pages/settings/HotelProfile.jsx";
import UserManagement from "../pages/settings/UserManagement.jsx";
import RolesPermissions from "../pages/settings/RolesPermissions.jsx";

// =====================================================
// 404 PAGE
// =====================================================

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f4ed",
        color: "#4b3940",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "18px",
          borderRadius: "50%",
          background: "#efe4d4",
          color: "#a47b4e",
          fontSize: "26px",
        }}
      >
        <i className="bi bi-exclamation-lg"></i>
      </div>

      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontWeight: 500,
        }}
      >
        404 - Page Not Found
      </h1>

      <p
        style={{
          color: "#938579",
          fontSize: "13px",
        }}
      >
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

// =====================================================
// MAIN APP ROUTES
// =====================================================

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =============================================
            BASIC ROUTES
        ============================================= */}

        <Route
          path="/"
          element={<Welcome />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        {/* =============================================
            AUTHENTICATION
        ============================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* =============================================
            SUPER ADMIN DASHBOARD
        ============================================= */}

        <Route
          path="/super-admin"
          element={<SuperAdminDashboard />}
        />

        {/* =============================================
            SUPER ADMIN - HOTELS
        ============================================= */}

        <Route
          path="/super-admin/hotels"
          element={<Hotels />}
        />

        <Route
          path="/super-admin/hotels/add"
          element={<AddHotel />}
        />

        <Route
          path="/super-admin/add-hotel"
          element={<AddHotel />}
        />

        <Route
          path="/super-admin/hotel-details"
          element={<HotelDetails />}
        />

        {/* =============================================
            SUPER ADMIN - USERS
        ============================================= */}

        <Route
          path="/super-admin/users"
          element={<Users />}
        />

        <Route
          path="/super-admin/users/add"
          element={<AddUser />}
        />

        {/* =============================================
            SUPER ADMIN - PLANS
        ============================================= */}

        <Route
          path="/super-admin/plans"
          element={<Plans />}
        />

        {/* =============================================
            SUPER ADMIN - SUBSCRIPTIONS
        ============================================= */}

        <Route
          path="/super-admin/subscriptions"
          element={<Subscriptions />}
        />

        {/* =============================================
            SUPER ADMIN - HOTEL PERFORMANCE
        ============================================= */}

        <Route
          path="/super-admin/reports/hotel-performance"
          element={<HotelPerformance />}
        />

        <Route
          path="/super-admin/hotel-performance"
          element={<HotelPerformance />}
        />

        {/* =============================================
            SUPER ADMIN - REVENUE REPORT
        ============================================= */}

        <Route
          path="/super-admin/reports/revenue"
          element={<SuperAdminRevenueReport />}
        />

        <Route
          path="/super-admin/revenue-report"
          element={<SuperAdminRevenueReport />}
        />

        {/* =============================================
            SUPER ADMIN - SUPPORT
        ============================================= */}

        <Route
          path="/super-admin/support"
          element={<Support />}
        />

        {/* =============================================
            SUPER ADMIN - SYSTEM SETTINGS
        ============================================= */}

        <Route
          path="/super-admin/system-settings"
          element={<SystemSettings />}
        />

        {/* =============================================
            SUPER ADMIN - ACTIVITY LOGS
        ============================================= */}

        <Route
          path="/super-admin/activity-logs"
          element={<ActivityLogs />}
        />

        {/* =============================================
            HOTEL ADMIN DASHBOARD
        ============================================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* =============================================
            ROOMS
        ============================================= */}

        <Route
          path="/rooms"
          element={<Rooms />}
        />

        {/* =============================================
            GUESTS
        ============================================= */}

        <Route
          path="/guests"
          element={<Guests />}
        />

        {/* =============================================
            RESERVATIONS
        ============================================= */}

        <Route
          path="/reservations"
          element={<Reservations />}
        />

        {/* =============================================
            FRONT OFFICE
        ============================================= */}

        <Route
          path="/front-office"
          element={<FrontOffice />}
        />

        <Route
          path="/front-office/checkin"
          element={<CheckIn />}
        />

        <Route
          path="/front-office/checkout"
          element={<CheckOut />}
        />

        <Route
          path="/front-office/guest-requests"
          element={<GuestRequests />}
        />

        <Route
          path="/front-office/room-transfer"
          element={<RoomTransfer />}
        />

        {/* =============================================
            HOUSEKEEPING
        ============================================= */}

        <Route
          path="/housekeeping"
          element={<Housekeeping />}
        />

        <Route
          path="/housekeeping/cleaning-schedule"
          element={<CleaningSchedule />}
        />

        <Route
          path="/housekeeping/room-inspection"
          element={<RoomInspection />}
        />

        <Route
          path="/housekeeping/staff-management"
          element={<StaffManagement />}
        />

        {/* =============================================
            RESTAURANT
        ============================================= */}

        <Route
          path="/restaurant"
          element={<Restaurant />}
        />

        <Route
          path="/restaurant/menu"
          element={<Menu />}
        />

        <Route
          path="/restaurant/menu-management"
          element={<MenuManagement />}
        />

        <Route
          path="/restaurant/new-order"
          element={<NewOrder />}
        />

        <Route
          path="/restaurant/orders"
          element={<Orders />}
        />

        {/* =============================================
            SERVICES
        ============================================= */}

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/services/laundry"
          element={<Laundry />}
        />

        <Route
          path="/services/room-services"
          element={<RoomServices />}
        />

        <Route
          path="/services/requests"
          element={<ServicesRequest />}
        />

        <Route
          path="/services/request"
          element={<ServicesRequest />}
        />

        {/* =============================================
            BILLING
        ============================================= */}

        <Route
          path="/billing"
          element={<Billing />}
        />

        <Route
          path="/billing/invoices"
          element={<Invoices />}
        />

        <Route
          path="/billing/invoice-details"
          element={<InvoiceDetails />}
        />

        <Route
          path="/billing/payments"
          element={<Payments />}
        />

        {/* =============================================
            INVENTORY
        ============================================= */}

        <Route
          path="/inventory"
          element={<Inventory />}
        />

        <Route
          path="/inventory/add-items"
          element={<AddItems />}
        />

        <Route
          path="/inventory/stock-history"
          element={<StockHistory />}
        />

        <Route
          path="/inventory/suppliers"
          element={<Suppliers />}
        />

        {/* =============================================
            STAFF
        ============================================= */}

        <Route
          path="/staff"
          element={<Staff />}
        />

        <Route
          path="/staff/add"
          element={<AddStaff />}
        />

        <Route
          path="/staff/details"
          element={<StaffDetails />}
        />

        <Route
          path="/staff/attendance"
          element={<StaffAttendance />}
        />

        {/* =============================================
            MAINTENANCE
        ============================================= */}

        <Route
          path="/maintenance"
          element={<Maintenance />}
        />

        <Route
          path="/maintenance/requests"
          element={<MaintenanceRequests />}
        />

        <Route
          path="/maintenance/equipment"
          element={<Equipments />}
        />

        {/* =============================================
            HOTEL ADMIN REPORTS
        ============================================= */}

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/reports/booking"
          element={<BookingReport />}
        />

        <Route
          path="/reports/occupancy"
          element={<OccupancyReport />}
        />

        <Route
          path="/reports/revenue"
          element={<HotelAdminRevenueReport />}
        />

        {/* =============================================
            HOTEL ADMIN SETTINGS
        ============================================= */}

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/settings/hotel-profile"
          element={<HotelProfile />}
        />

        <Route
          path="/settings/user-management"
          element={<UserManagement />}
        />

        <Route
          path="/settings/roles-permissions"
          element={<RolesPermissions />}
        />

        {/* =============================================
            PAGE NOT FOUND
        ============================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;