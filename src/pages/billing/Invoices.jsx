import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'

import { useHotel } from '../../context/HotelContext'

import './Invoices.css'

function Invoices() {
  const navigate = useNavigate()
  const { selectedHotel } = useHotel()

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoice: 'INV-1001',
      guest: 'Rahul Sharma',
      room: '101',
      date: '2026-09-10',
      amount: 18500,
      payment: 'Card',
      status: 'Paid',
    },
    {
      id: 2,
      invoice: 'INV-1002',
      guest: 'Priya Singh',
      room: '205',
      date: '2026-09-11',
      amount: 12800,
      payment: 'UPI',
      status: 'Pending',
    },
    {
      id: 3,
      invoice: 'INV-1003',
      guest: 'Aman Verma',
      room: '302',
      date: '2026-09-12',
      amount: 21400,
      payment: 'Cash',
      status: 'Paid',
    },
    {
      id: 4,
      invoice: 'INV-1004',
      guest: 'Neha Kapoor',
      room: '204',
      date: '2026-09-13',
      amount: 9200,
      payment: 'UPI',
      status: 'Pending',
    },
    {
      id: 5,
      invoice: 'INV-1005',
      guest: 'Vikash Yadav',
      room: '110',
      date: '2026-09-14',
      amount: 15600,
      payment: 'Card',
      status: 'Paid',
    },
  ])

  const [search, setSearch] = useState('')

  const updateStatus = (id, status) => {
    setInvoices((previous) =>
      previous.map((invoice) =>
        invoice.id === id
          ? { ...invoice, status }
          : invoice
      )
    )
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const value = search.toLowerCase().trim()

    return (
      invoice.invoice.toLowerCase().includes(value) ||
      invoice.guest.toLowerCase().includes(value) ||
      invoice.room.toLowerCase().includes(value) ||
      invoice.payment.toLowerCase().includes(value) ||
      invoice.status.toLowerCase().includes(value)
    )
  })

  const paidCount = invoices.filter(
    (item) => item.status === 'Paid'
  ).length

  const pendingCount = invoices.filter(
    (item) => item.status === 'Pending'
  ).length

  const totalAmount = invoices.reduce(
    (total, item) => total + item.amount,
    0
  )

  return (
    <MainLayout>
      <div className="invoices-page">

        <Breadcrumb items={['Billing', 'Invoices']} />

        <div className="invoices-header">
          <PageHeader
            title="Invoices"
            subtitle={
              selectedHotel
                ? `Manage invoices for ${selectedHotel.name}`
                : 'View and manage all guest invoices'
            }
          />

          <button
            type="button"
            className="invoices-back-btn"
            onClick={() => navigate('/billing')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Billing
          </button>
        </div>

        {selectedHotel && (
          <div className="invoices-hotel-bar">
            <div className="invoices-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="invoices-hotel-info">
              <span>SELECTED PROPERTY</span>

              <strong>{selectedHotel.name}</strong>

              <small>
                {selectedHotel.code} • {selectedHotel.category} •{' '}
                {selectedHotel.address.city},{' '}
                {selectedHotel.address.state}
              </small>
            </div>
          </div>
        )}

        <div className="invoices-stats">

          <div className="invoice-stat-card">
            <div className="invoice-stat-icon">
              <i className="bi bi-receipt"></i>
            </div>

            <div>
              <span>Total Invoices</span>
              <h2>{invoices.length}</h2>
              <small>All invoices</small>
            </div>
          </div>

          <div className="invoice-stat-card">
            <div className="invoice-stat-icon success">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Paid Invoices</span>
              <h2>{paidCount}</h2>
              <small>Successfully paid</small>
            </div>
          </div>

          <div className="invoice-stat-card">
            <div className="invoice-stat-icon warning">
              <i className="bi bi-clock"></i>
            </div>

            <div>
              <span>Pending Invoices</span>
              <h2>{pendingCount}</h2>
              <small>Awaiting payment</small>
            </div>
          </div>

          <div className="invoice-stat-card">
            <div className="invoice-stat-icon info">
              <i className="bi bi-currency-rupee"></i>
            </div>

            <div>
              <span>Total Amount</span>
              <h2>
                ₹{totalAmount.toLocaleString('en-IN')}
              </h2>
              <small>Invoice value</small>
            </div>
          </div>

        </div>

        <div className="invoices-card">

          <div className="invoices-card-header">

            <div>
              <h2>All Invoices</h2>
              <p>Manage guest invoices and payment status</p>
            </div>

            <div className="invoices-search">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search invoice, guest or room..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

          <div className="invoices-result">
            Showing {filteredInvoices.length} of {invoices.length} invoices
          </div>

          <div className="invoices-table-wrapper">

            <table className="invoices-table">

              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((item) => (

                    <tr key={item.id}>

                      <td>
                        <strong className="invoice-number">
                          #{item.invoice}
                        </strong>
                      </td>

                      <td>
                        <div className="invoice-guest">
                          <span>
                            {item.guest.charAt(0)}
                          </span>

                          {item.guest}
                        </div>
                      </td>

                      <td>Room {item.room}</td>

                      <td>{item.date}</td>

                      <td>
                        <strong>
                          ₹{item.amount.toLocaleString('en-IN')}
                        </strong>
                      </td>

                      <td>
                        <span className="payment-method">

                          <i
                            className={
                              item.payment === 'Card'
                                ? 'bi bi-credit-card'
                                : item.payment === 'UPI'
                                  ? 'bi bi-phone'
                                  : 'bi bi-cash'
                            }
                          ></i>

                          {item.payment}

                        </span>
                      </td>

                      <td>

                        <select
                          className={`invoice-status ${item.status.toLowerCase()}`}
                          value={item.status}
                          onChange={(e) =>
                            updateStatus(
                              item.id,
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
                          className="invoice-view-btn"
                          onClick={() =>
                            navigate('/billing/invoice-details')
                          }
                          aria-label={`View ${item.invoice}`}
                        >
                          <i className="bi bi-eye"></i>
                        </button>

                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>
                    <td
                      colSpan="8"
                      className="invoices-empty"
                    >
                      <i className="bi bi-search"></i>

                      <strong>
                        No invoices found
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

export default Invoices