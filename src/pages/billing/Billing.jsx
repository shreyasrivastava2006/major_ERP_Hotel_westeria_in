import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'

import { useHotel } from '../../context/HotelContext'

import './Billing.css'

function Billing() {
  const navigate = useNavigate()
  const { selectedHotel } = useHotel()

  const [bills, setBills] = useState([
    {
      id: 1,
      invoice: 'INV-1001',
      guest: 'Rahul Sharma',
      room: '101',
      date: '2026-09-10',
      amount: 18500,
      status: 'Paid'
    },
    {
      id: 2,
      invoice: 'INV-1002',
      guest: 'Priya Singh',
      room: '205',
      date: '2026-09-11',
      amount: 12800,
      status: 'Pending'
    },
    {
      id: 3,
      invoice: 'INV-1003',
      guest: 'Aman Verma',
      room: '302',
      date: '2026-09-12',
      amount: 21400,
      status: 'Paid'
    },
    {
      id: 4,
      invoice: 'INV-1004',
      guest: 'Neha Kapoor',
      room: '204',
      date: '2026-09-13',
      amount: 9200,
      status: 'Pending'
    },
    {
      id: 5,
      invoice: 'INV-1005',
      guest: 'Vikash Yadav',
      room: '110',
      date: '2026-09-14',
      amount: 15600,
      status: 'Paid'
    }
  ])

  const [search, setSearch] = useState('')

  const updateStatus = (id, status) => {
    setBills((previous) =>
      previous.map((bill) =>
        bill.id === id
          ? { ...bill, status }
          : bill
      )
    )
  }

  const filteredBills = bills.filter((bill) => {
    const value = search.toLowerCase().trim()

    return (
      bill.invoice.toLowerCase().includes(value) ||
      bill.guest.toLowerCase().includes(value) ||
      bill.room.toLowerCase().includes(value) ||
      bill.status.toLowerCase().includes(value)
    )
  })

  const totalAmount = bills.reduce(
    (total, bill) => total + bill.amount,
    0
  )

  const paidAmount = bills
    .filter((bill) => bill.status === 'Paid')
    .reduce((total, bill) => total + bill.amount, 0)

  const pendingAmount = bills
    .filter((bill) => bill.status === 'Pending')
    .reduce((total, bill) => total + bill.amount, 0)

  return (
    <MainLayout>
      <div className="billing-page">

        <Breadcrumb items={['Billing']} />

        <div className="billing-header">
          <PageHeader
            title="Billing"
            subtitle={
              selectedHotel
                ? `Manage billing for ${selectedHotel.name}`
                : 'Manage hotel invoices, payments and guest billing'
            }
          />
        </div>

        {/* SELECTED PROPERTY */}

        {selectedHotel && (
          <div className="billing-hotel-bar">

            <div className="billing-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="billing-hotel-info">
              <span>SELECTED PROPERTY</span>

              <strong>
                {selectedHotel.name}
              </strong>

              <small>
                {selectedHotel.code} • {selectedHotel.category} •{' '}
                {selectedHotel.address.city},{' '}
                {selectedHotel.address.state}
              </small>
            </div>

          </div>
        )}

        {/* STATS */}

        <div className="billing-stats">

          <div className="billing-stat-card">

            <div className="billing-stat-icon">
              <i className="bi bi-receipt"></i>
            </div>

            <div>
              <span>Total Billing</span>

              <h2>
                ₹{totalAmount.toLocaleString('en-IN')}
              </h2>

              <small>All invoices</small>
            </div>

          </div>

          <div className="billing-stat-card">

            <div className="billing-stat-icon success">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Paid Amount</span>

              <h2>
                ₹{paidAmount.toLocaleString('en-IN')}
              </h2>

              <small>Received payments</small>
            </div>

          </div>

          <div className="billing-stat-card">

            <div className="billing-stat-icon warning">
              <i className="bi bi-clock-history"></i>
            </div>

            <div>
              <span>Pending Amount</span>

              <h2>
                ₹{pendingAmount.toLocaleString('en-IN')}
              </h2>

              <small>Awaiting payment</small>
            </div>

          </div>

          <div className="billing-stat-card">

            <div className="billing-stat-icon info">
              <i className="bi bi-file-earmark-text"></i>
            </div>

            <div>
              <span>Total Invoices</span>

              <h2>{bills.length}</h2>

              <small>Generated invoices</small>
            </div>

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="billing-actions-card">

          <div className="billing-section-title">
            <h2>Quick Actions</h2>
            <p>Access billing management sections</p>
          </div>

          <div className="billing-action-grid">

            <button
              type="button"
              onClick={() => navigate('/billing/invoices')}
              className="billing-action-btn"
            >
              <i className="bi bi-receipt"></i>

              <span>
                <strong>Invoices</strong>
                <small>View all invoices</small>
              </span>

              <i className="bi bi-chevron-right"></i>
            </button>

            <button
              type="button"
              onClick={() => navigate('/billing/payments')}
              className="billing-action-btn"
            >
              <i className="bi bi-credit-card"></i>

              <span>
                <strong>Payments</strong>
                <small>Manage payments</small>
              </span>

              <i className="bi bi-chevron-right"></i>
            </button>

            <button
              type="button"
              onClick={() => navigate('/billing/invoice-details')}
              className="billing-action-btn"
            >
              <i className="bi bi-file-text"></i>

              <span>
                <strong>Invoice Details</strong>
                <small>View invoice information</small>
              </span>

              <i className="bi bi-chevron-right"></i>
            </button>

          </div>

        </div>

        {/* RECENT BILLS */}

        <div className="billing-table-card">

          <div className="billing-table-header">

            <div>
              <h2>Recent Bills</h2>

              <p>
                Recently generated guest invoices
              </p>
            </div>

            <div className="billing-search">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search invoice, guest or room..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}

            </div>

          </div>

          <div className="billing-result">
            Showing {filteredBills.length} of {bills.length} invoices
          </div>

          <div className="billing-table-wrapper">

            <table className="billing-table">

              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredBills.length > 0 ? (

                  filteredBills.map((bill) => (

                    <tr key={bill.id}>

                      <td>
                        <strong className="billing-invoice">
                          #{bill.invoice}
                        </strong>
                      </td>

                      <td>

                        <div className="billing-guest">

                          <span>
                            {bill.guest.charAt(0)}
                          </span>

                          {bill.guest}

                        </div>

                      </td>

                      <td>
                        Room {bill.room}
                      </td>

                      <td>
                        {bill.date}
                      </td>

                      <td>

                        <strong className="billing-amount">
                          ₹{bill.amount.toLocaleString('en-IN')}
                        </strong>

                      </td>

                      <td>

                        <select
                          className={`billing-status ${bill.status.toLowerCase()}`}
                          value={bill.status}
                          onChange={(e) =>
                            updateStatus(
                              bill.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="Paid">
                            Paid
                          </option>

                          <option value="Pending">
                            Pending
                          </option>
                        </select>

                      </td>

                      <td>

                        <button
                          type="button"
                          className="billing-view-btn"
                          onClick={() =>
                            navigate('/billing/invoice-details')
                          }
                          title="View Invoice"
                        >
                          <i className="bi bi-eye"></i>
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="billing-empty"
                    >
                      <i className="bi bi-search"></i>

                      <strong>
                        No bills found
                      </strong>

                      <span>
                        Try another search.
                      </span>
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </MainLayout>
  )
}

export default Billing