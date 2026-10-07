// src/context/HotelDataContext.jsx

import { createContext, useContext, useEffect, useState } from "react";

import roomsData from "../data/rooms";
import guestsData from "../data/guests";
import reservationsData from "../data/reservations";
import servicesData from "../data/services";
import inventoryData from "../data/inventory";
import staffData from "../data/staff";

const HotelDataContext = createContext();

const getStoredData = (key, defaultData) => {
  try {
    const storedData = localStorage.getItem(key);

    return storedData
      ? JSON.parse(storedData)
      : defaultData || [];
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return defaultData || [];
  }
};

const createId = (prefix) => {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)}`;
};

export const HotelDataProvider = ({ children }) => {
  /* =========================
     MAIN DATA
  ========================= */

  const [rooms, setRooms] = useState(() =>
    getStoredData("wisteriaRooms", roomsData)
  );

  const [guests, setGuests] = useState(() =>
    getStoredData("wisteriaGuests", guestsData)
  );

  const [reservations, setReservations] = useState(() =>
    getStoredData(
      "wisteriaReservations",
      reservationsData
    )
  );

  const [services, setServices] = useState(() =>
    getStoredData("wisteriaServices", servicesData)
  );

  const [inventory, setInventory] = useState(() =>
    getStoredData("wisteriaInventory", inventoryData)
  );

  const [staff, setStaff] = useState(() =>
    getStoredData("wisteriaStaff", staffData)
  );

  const [restaurantOrders, setRestaurantOrders] =
    useState(() =>
      getStoredData("wisteriaRestaurantOrders", [])
    );

  const [bills, setBills] = useState(() =>
    getStoredData("wisteriaBills", [])
  );

  /* =========================
     SAVE DATA
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "wisteriaRooms",
      JSON.stringify(rooms)
    );
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(
      "wisteriaGuests",
      JSON.stringify(guests)
    );
  }, [guests]);

  useEffect(() => {
    localStorage.setItem(
      "wisteriaReservations",
      JSON.stringify(reservations)
    );
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(
      "wisteriaServices",
      JSON.stringify(services)
    );
  }, [services]);

  useEffect(() => {
    localStorage.setItem(
      "wisteriaInventory",
      JSON.stringify(inventory)
    );
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem(
      "wisteriaStaff",
      JSON.stringify(staff)
    );
  }, [staff]);

  useEffect(() => {
    localStorage.setItem(
      "wisteriaRestaurantOrders",
      JSON.stringify(restaurantOrders)
    );
  }, [restaurantOrders]);

  useEffect(() => {
    localStorage.setItem(
      "wisteriaBills",
      JSON.stringify(bills)
    );
  }, [bills]);

  /* =========================
     ROOMS
  ========================= */

  const addRoom = (roomData) => {
    const newRoom = {
      id: createId("room"),
      ...roomData,
      status: roomData.status || "Available",
    };

    setRooms((prev) => [...prev, newRoom]);

    return newRoom;
  };

  const updateRoom = (roomId, updatedData) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? { ...room, ...updatedData }
          : room
      )
    );
  };

  const deleteRoom = (roomId) => {
    setRooms((prev) =>
      prev.filter((room) => room.id !== roomId)
    );
  };

  const updateRoomStatus = (roomId, status) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? { ...room, status }
          : room
      )
    );
  };

  /* =========================
     GUESTS
  ========================= */

  const addGuest = (guestData) => {
    const newGuest = {
      id: createId("guest"),
      ...guestData,
    };

    setGuests((prev) => [...prev, newGuest]);

    return newGuest;
  };

  const updateGuest = (guestId, updatedData) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === guestId
          ? { ...guest, ...updatedData }
          : guest
      )
    );
  };

  const deleteGuest = (guestId) => {
    setGuests((prev) =>
      prev.filter((guest) => guest.id !== guestId)
    );
  };

  /* =========================
     RESERVATIONS
  ========================= */

  const addReservation = (reservationData) => {
    const newReservation = {
      id: createId("reservation"),
      ...reservationData,
      status:
        reservationData.status || "Confirmed",
    };

    setReservations((prev) => [
      ...prev,
      newReservation,
    ]);

    return newReservation;
  };

  const updateReservation = (
    reservationId,
    updatedData
  ) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === reservationId
          ? {
              ...reservation,
              ...updatedData,
            }
          : reservation
      )
    );
  };

  const deleteReservation = (reservationId) => {
    setReservations((prev) =>
      prev.filter(
        (reservation) =>
          reservation.id !== reservationId
      )
    );
  };

  /* =========================
     SERVICES
  ========================= */

  const addService = (serviceData) => {
    const newService = {
      id: createId("service"),
      ...serviceData,
    };

    setServices((prev) => [...prev, newService]);

    return newService;
  };

  const updateService = (
    serviceId,
    updatedData
  ) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? { ...service, ...updatedData }
          : service
      )
    );
  };

  const deleteService = (serviceId) => {
    setServices((prev) =>
      prev.filter(
        (service) => service.id !== serviceId
      )
    );
  };

  /* =========================
     INVENTORY
  ========================= */

  const addInventoryItem = (itemData) => {
    const newItem = {
      id: createId("inventory"),
      ...itemData,
    };

    setInventory((prev) => [...prev, newItem]);

    return newItem;
  };

  const updateInventoryItem = (
    itemId,
    updatedData
  ) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, ...updatedData }
          : item
      )
    );
  };

  const deleteInventoryItem = (itemId) => {
    setInventory((prev) =>
      prev.filter((item) => item.id !== itemId)
    );
  };

  /* =========================
     STAFF
  ========================= */

  const addStaff = (staffData) => {
    const newStaff = {
      id: createId("staff"),
      ...staffData,
    };

    setStaff((prev) => [...prev, newStaff]);

    return newStaff;
  };

  const updateStaff = (
    staffId,
    updatedData
  ) => {
    setStaff((prev) =>
      prev.map((member) =>
        member.id === staffId
          ? { ...member, ...updatedData }
          : member
      )
    );
  };

  const deleteStaff = (staffId) => {
    setStaff((prev) =>
      prev.filter(
        (member) => member.id !== staffId
      )
    );
  };

  /* =========================
     RESTAURANT ORDERS
  ========================= */

  const addRestaurantOrder = (orderData) => {
    const newOrder = {
      id: createId("order"),
      ...orderData,
      status: orderData.status || "Pending",
    };

    setRestaurantOrders((prev) => [
      ...prev,
      newOrder,
    ]);

    return newOrder;
  };

  const updateRestaurantOrder = (
    orderId,
    updatedData
  ) => {
    setRestaurantOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, ...updatedData }
          : order
      )
    );
  };

  const deleteRestaurantOrder = (orderId) => {
    setRestaurantOrders((prev) =>
      prev.filter((order) => order.id !== orderId)
    );
  };

  /* =========================
     BILLING
  ========================= */

  const addBill = (billData) => {
    const newBill = {
      id: createId("bill"),
      ...billData,
    };

    setBills((prev) => [...prev, newBill]);

    return newBill;
  };

  const updateBill = (billId, updatedData) => {
    setBills((prev) =>
      prev.map((bill) =>
        bill.id === billId
          ? { ...bill, ...updatedData }
          : bill
      )
    );
  };

  const deleteBill = (billId) => {
    setBills((prev) =>
      prev.filter((bill) => bill.id !== billId)
    );
  };

  /* =========================
     ROOM STATISTICS
  ========================= */

  const totalRooms = rooms.length;

  const availableRooms = rooms.filter(
    (room) =>
      String(room.status).toLowerCase() ===
      "available"
  ).length;

  const occupiedRooms = rooms.filter(
    (room) =>
      String(room.status).toLowerCase() ===
      "occupied"
  ).length;

  const maintenanceRooms = rooms.filter(
    (room) =>
      String(room.status).toLowerCase() ===
      "maintenance"
  ).length;

  /* =========================
     CONTEXT VALUE
  ========================= */

  const value = {
    rooms,
    guests,
    reservations,
    services,
    inventory,
    staff,
    restaurantOrders,
    bills,

    addRoom,
    updateRoom,
    deleteRoom,
    updateRoomStatus,

    addGuest,
    updateGuest,
    deleteGuest,

    addReservation,
    updateReservation,
    deleteReservation,

    addService,
    updateService,
    deleteService,

    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,

    addStaff,
    updateStaff,
    deleteStaff,

    addRestaurantOrder,
    updateRestaurantOrder,
    deleteRestaurantOrder,

    addBill,
    updateBill,
    deleteBill,

    totalRooms,
    availableRooms,
    occupiedRooms,
    maintenanceRooms,
  };

  return (
    <HotelDataContext.Provider value={value}>
      {children}
    </HotelDataContext.Provider>
  );
};

/* =========================
   CUSTOM HOOK
========================= */

export const useHotelData = () => {
  const context = useContext(HotelDataContext);

  if (!context) {
    throw new Error(
      "useHotelData must be used inside HotelDataProvider"
    );
  }

  return context;
};

export default HotelDataContext;