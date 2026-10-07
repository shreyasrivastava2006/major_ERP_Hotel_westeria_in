import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import PageHeader from "../../components/layout/PageHeader";
import Breadcrumb from "../../components/layout/Breadcrumb";

import { useHotel } from "../../context/HotelContext";
import { useHotelData } from "../../context/HotelDataContext";

import "./Housekeeping.css";

const DEFAULT_TASKS = [
  {
    id: "HK-TASK-001",
    hotelId: "HOTEL-001",
    hotelName: "Wisteria In",
    room: "101",
    roomId: "101",
    task: "Room Cleaning",
    assignedTo: "Anita Sharma",
    status: "Clean",
    priority: "Normal",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "HK-TASK-002",
    hotelId: "HOTEL-001",
    hotelName: "Wisteria In",
    room: "102",
    roomId: "102",
    task: "Room Cleaning",
    assignedTo: "Pooja Verma",
    status: "In Progress",
    priority: "High",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "HK-TASK-003",
    hotelId: "HOTEL-001",
    hotelName: "Wisteria In",
    room: "205",
    roomId: "205",
    task: "Deep Cleaning",
    assignedTo: "Neha Singh",
    status: "Dirty",
    priority: "High",
    date: new Date().toISOString().split("T")[0],
  },
];

function Housekeeping() {
  const { selectedHotel } = useHotel();
  const { rooms, staff, updateRoomStatus } = useHotelData();

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "wisteriaHousekeepingTasks"
      );

      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  });

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    room: "",
    assignedTo: "",
    task: "Room Cleaning",
    status: "Dirty",
    priority: "Normal",
  });

  const hotelId =
    selectedHotel?.id ||
    selectedHotel?.hotelId ||
    selectedHotel?.code ||
    "";

  const hotelName =
    selectedHotel?.name ||
    selectedHotel?.hotelName ||
    "Wisteria In";

  const hotelCode =
    selectedHotel?.code ||
    selectedHotel?.hotelCode ||
    selectedHotel?.id ||
    "";

  const hotelRating =
    selectedHotel?.rating ||
    selectedHotel?.stars ||
    selectedHotel?.starRating ||
    "5 Star";

  const hotelCity =
    selectedHotel?.city ||
    selectedHotel?.location ||
    "Lucknow";

  const hotelState =
    selectedHotel?.state ||
    selectedHotel?.stateName ||
    "Uttar Pradesh";

  const hotelRooms = useMemo(() => {
    if (!hotelId) return rooms;

    const hasHotelData = rooms.some(
      (room) =>
        room.hotelId ||
        room.hotel_id ||
        room.hotelCode
    );

    if (!hasHotelData) return rooms;

    return rooms.filter(
      (room) =>
        String(
          room.hotelId ||
            room.hotel_id ||
            room.hotelCode ||
            ""
        ) === String(hotelId)
    );
  }, [rooms, hotelId]);

  const hotelStaff = useMemo(() => {
    if (!hotelId) return staff;

    const hasHotelData = staff.some(
      (member) =>
        member.hotelId ||
        member.hotel_id ||
        member.hotelCode
    );

    if (!hasHotelData) return staff;

    return staff.filter(
      (member) =>
        String(
          member.hotelId ||
            member.hotel_id ||
            member.hotelCode ||
            ""
        ) === String(hotelId)
    );
  }, [staff, hotelId]);

  const hotelTasks = useMemo(() => {
    if (!hotelId) return tasks;

    const hasHotelData = tasks.some(
      (task) => task.hotelId
    );

    if (!hasHotelData) return tasks;

    return tasks.filter(
      (task) =>
        String(task.hotelId) === String(hotelId)
    );
  }, [tasks, hotelId]);

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);

    localStorage.setItem(
      "wisteriaHousekeepingTasks",
      JSON.stringify(updatedTasks)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTask = (e) => {
    e.preventDefault();

    if (!formData.room) {
      alert("Please select a room.");
      return;
    }

    const selectedRoom = hotelRooms.find(
      (room) =>
        String(
          room.roomNumber ??
            room.number ??
            room.id ??
            ""
        ) === String(formData.room)
    );

    const selectedStaff = hotelStaff.find(
      (member) =>
        String(member.name || "") ===
        String(formData.assignedTo)
    );

    const newTask = {
      id: `HK-${Date.now()}`,
      hotelId,
      hotelName,
      room: formData.room,
      roomId: selectedRoom?.id || "",
      task: formData.task,
      assignedTo:
        selectedStaff?.name ||
        formData.assignedTo ||
        "Unassigned",
      status: formData.status,
      priority: formData.priority,
      date: new Date()
        .toISOString()
        .split("T")[0],
    };

    saveTasks([newTask, ...tasks]);

    setFormData({
      room: "",
      assignedTo: "",
      task: "Room Cleaning",
      status: "Dirty",
      priority: "Normal",
    });

    setShowForm(false);
  };

  const updateTaskStatus = (
    taskId,
    newStatus
  ) => {
    const task = tasks.find(
      (item) => item.id === taskId
    );

    const updatedTasks = tasks.map((item) =>
      item.id === taskId
        ? {
            ...item,
            status: newStatus,
          }
        : item
    );

    saveTasks(updatedTasks);

    if (task?.roomId) {
      if (newStatus === "Clean") {
        updateRoomStatus(
          task.roomId,
          "Available"
        );
      }

      if (newStatus === "Dirty") {
        updateRoomStatus(
          task.roomId,
          "Maintenance"
        );
      }
    }
  };

  const deleteTask = (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this housekeeping task?"
    );

    if (!confirmed) return;

    saveTasks(
      tasks.filter(
        (task) => task.id !== taskId
      )
    );
  };

  const totalTasks = hotelTasks.length;

  const cleanTasks = hotelTasks.filter(
    (task) => task.status === "Clean"
  ).length;

  const dirtyTasks = hotelTasks.filter(
    (task) => task.status === "Dirty"
  ).length;

  const inProgressTasks = hotelTasks.filter(
    (task) =>
      task.status === "In Progress"
  ).length;

  return (
    <MainLayout>
      <div className="housekeeping-page">

        <Breadcrumb
          items={[
            {
              label: "Dashboard",
              path: "/dashboard",
            },
            {
              label: "Housekeeping",
            },
          ]}
        />

        <PageHeader
          title="Housekeeping"
          subtitle="Manage room cleaning and housekeeping tasks"
        >
          <button
            type="button"
            className="housekeeping-add-btn"
            onClick={() =>
              setShowForm((prev) => !prev)
            }
          >
            <i className="bi bi-plus-lg"></i>
            {showForm ? "Close" : "Add Task"}
          </button>
        </PageHeader>

        {/* SELECTED PROPERTY */}

        {selectedHotel && (
          <div className="housekeeping-property-bar">

            <div className="property-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="property-label">
              SELECTED PROPERTY
            </div>

            <div className="property-name">
              {hotelName}
            </div>

            <div className="property-details">
              {hotelCode && (
                <span>{hotelCode}</span>
              )}

              <span>•</span>

              <span>{hotelRating}</span>

              <span>•</span>

              <span>
                {hotelCity}
                {hotelState
                  ? `, ${hotelState}`
                  : ""}
              </span>
            </div>
          </div>
        )}

        {/* STATS */}

        <div className="housekeeping-stats">

          <div className="housekeeping-stat-card">
            <div className="stat-icon">
              <i className="bi bi-list-check"></i>
            </div>

            <div>
              <span>Total Tasks</span>
              <strong>{totalTasks}</strong>
            </div>
          </div>

          <div className="housekeeping-stat-card">
            <div className="stat-icon clean">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Clean</span>
              <strong>{cleanTasks}</strong>
            </div>
          </div>

          <div className="housekeeping-stat-card">
            <div className="stat-icon dirty">
              <i className="bi bi-exclamation-circle"></i>
            </div>

            <div>
              <span>Dirty</span>
              <strong>{dirtyTasks}</strong>
            </div>
          </div>

          <div className="housekeeping-stat-card">
            <div className="stat-icon progress">
              <i className="bi bi-arrow-repeat"></i>
            </div>

            <div>
              <span>In Progress</span>
              <strong>{inProgressTasks}</strong>
            </div>
          </div>

        </div>

        {/* ADD TASK */}

        {showForm && (
          <form
            className="housekeeping-form-card"
            onSubmit={addTask}
          >

            <div className="form-card-header">
              <h3>
                Add Housekeeping Task
              </h3>

              <p>
                Create a new room cleaning task
              </p>
            </div>

            <div className="housekeeping-form-grid">

              <div className="housekeeping-form-group">
                <label>Room</label>

                <select
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Room
                  </option>

                  {hotelRooms.map((room) => {
                    const roomNumber =
                      room.roomNumber ??
                      room.number ??
                      room.id;

                    return (
                      <option
                        key={room.id}
                        value={roomNumber}
                      >
                        Room {roomNumber}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="housekeeping-form-group">
                <label>Assigned To</label>

                <select
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Staff
                  </option>

                  {hotelStaff.map((member) => (
                    <option
                      key={member.id}
                      value={member.name}
                    >
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="housekeeping-form-group">
                <label>Task</label>

                <select
                  name="task"
                  value={formData.task}
                  onChange={handleChange}
                >
                  <option value="Room Cleaning">
                    Room Cleaning
                  </option>

                  <option value="Deep Cleaning">
                    Deep Cleaning
                  </option>

                  <option value="Bathroom Cleaning">
                    Bathroom Cleaning
                  </option>

                  <option value="Laundry">
                    Laundry
                  </option>

                  <option value="Inspection">
                    Inspection
                  </option>
                </select>
              </div>

              <div className="housekeeping-form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Dirty">
                    Dirty
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Clean">
                    Clean
                  </option>
                </select>
              </div>

              <div className="housekeeping-form-group">
                <label>Priority</label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Normal">
                    Normal
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Urgent">
                    Urgent
                  </option>
                </select>
              </div>

            </div>

            <div className="housekeeping-form-actions">

              <button
                type="button"
                className="cancel-task-btn"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-task-btn"
              >
                <i className="bi bi-check-lg"></i>
                Add Task
              </button>

            </div>

          </form>
        )}

        {/* QUICK LINKS */}

        <div className="housekeeping-quick-links">

          <Link
            to="/housekeeping/cleaning-schedule"
            className="housekeeping-link-card"
          >
            <div className="quick-link-icon">
              <i className="bi bi-calendar3"></i>
            </div>

            <div className="quick-link-content">
              <h3>Cleaning Schedule</h3>

              <p>
                View and manage daily room cleaning schedules
              </p>
            </div>

            <i className="bi bi-chevron-right quick-link-arrow"></i>
          </Link>

          <Link
            to="/housekeeping/room-inspection"
            className="housekeeping-link-card"
          >
            <div className="quick-link-icon">
              <i className="bi bi-clipboard-check"></i>
            </div>

            <div className="quick-link-content">
              <h3>Room Inspection</h3>

              <p>
                Inspect rooms and check cleanliness standards
              </p>
            </div>

            <i className="bi bi-chevron-right quick-link-arrow"></i>
          </Link>

          <Link
            to="/housekeeping/staff-management"
            className="housekeeping-link-card"
          >
            <div className="quick-link-icon">
              <i className="bi bi-people"></i>
            </div>

            <div className="quick-link-content">
              <h3>Staff Management</h3>

              <p>
                Manage housekeeping staff, shifts and assignments
              </p>
            </div>

            <i className="bi bi-chevron-right quick-link-arrow"></i>
          </Link>

        </div>

        {/* TASK TABLE */}

        <div className="housekeeping-table-card">

          <div className="housekeeping-table-header">

            <div>
              <h3>
                Today's Housekeeping Tasks
              </h3>

              <p>
                Monitor room cleaning and housekeeping activities
              </p>
            </div>

            <span className="task-count">
              {totalTasks} Tasks
            </span>

          </div>

          {hotelTasks.length === 0 ? (
            <div className="housekeeping-empty">

              <i className="bi bi-inbox"></i>

              <h4>
                No housekeeping tasks
              </h4>

              <p>
                Add a new task to get started.
              </p>

            </div>
          ) : (
            <div className="housekeeping-table-wrapper">

              <table className="housekeeping-table">

                <thead>
                  <tr>
                    <th>Task ID this </th>
                    <th>Room</th>
                    <th>Task</th>
                    <th>Assigned To</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {hotelTasks.map((task) => (
                    <tr key={task.id}>

                      <td>
                        <span className="task-id">
                          {task.id}
                        </span>
                      </td>

                      <td>
                        <strong>
                          Room {task.room}
                        </strong>
                      </td>

                      <td>
                        {task.task}
                      </td>

                      <td>
                        {task.assignedTo ||
                          "Unassigned"}
                      </td>

                      <td>

                        <span
                          className={`priority-badge ${String(
                            task.priority ||
                              "Normal"
                          ).toLowerCase()}`}
                        >
                          {task.priority ||
                            "Normal"}
                        </span>

                      </td>

                      <td>

                        <select
                          className={`task-status-select ${String(
                            task.status
                          )
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                          value={task.status}
                          onChange={(e) =>
                            updateTaskStatus(
                              task.id,
                              e.target.value
                            )
                          }
                        >

                          <option value="Dirty">
                            Dirty
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Clean">
                            Clean
                          </option>

                        </select>

                      </td>

                      <td>
                        {task.date}
                      </td>

                      <td>

                        <button
                          type="button"
                          className="housekeeping-delete-btn"
                          onClick={() =>
                            deleteTask(
                              task.id
                            )
                          }
                          title="Delete task"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </MainLayout>
  );
}

export default Housekeeping;