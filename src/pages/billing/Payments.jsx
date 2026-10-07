import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'

import { useHotel } from '../../context/HotelContext'

import './Payments.css'

function Payments() {
  const navigate = useNavigate()
  const { selectedHotel } = useHotel()

  const [payments, setPayments] = useState([
    {
      id: 1,
      receipt: 'PAY-1001',
      invoice: 'INV-1001',
      guest: 'Rahul Sharma',
      date: '2026-09-10',
      amount: 18500,
      method: 'Card',
      status: 'Completed',
    },
    {
      id: 2,
      receipt: 'PAY-1002',
      invoice: 'INV-1002',
      guest: 'Priya Singh',
      date: '2026-09-11',
      amount: 12800,
      method: 'UPI',
      status: 'Pending',
    },
    {
      id: 3,
      receipt: 'PAY-1003',
      invoice: 'INV-1003',
      guest: 'Aman Verma',
      date: '2026-09-12',
      amount: 21400,
      method: 'Cash',
      status: 'Completed',
    },
    {
      id: 4,
      receipt: 'PAY-1004',
      invoice: 'INV-1004',
      guest: 'Neha Kapoor',
      date: '2026-09-13',
      amount: 9200,
      method: 'UPI',
      status: 'Pending',
    },
    {
      id: 5,
      receipt: 'PAY-1005',
      invoice: 'INV-1005',
      guest: 'Vikash Yadav',
      date: '2026-09-14',
      amount: 15600,
      method: 'Card',
      status: 'Completed',
    },
  ])

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const updateStatus = (id, status) => {
    setPayments((previous) =>
      previous.map((payment) =>
        payment.id === id
          ? { ...payment, status }
          : payment
      )
    )
  }

  const filteredPayments = payments.filter((payment) => {
    const value = search.toLowerCase().trim()

    const matchesSearch =
      payment.receipt.toLowerCase().includes(value) ||
      payment.invoice.toLowerCase().includes(value) ||
      payment.guest.toLowerCase().includes(value) ||
      payment.method.toLowerCase().includes(value) ||
      payment.status.toLowerCase().includes(value)

    const matchesStatus =
      statusFilter === 'All' ||
      payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const completedAmount = payments
    .filter((payment) => payment.status === 'Completed')
    .reduce(
      (total, payment) => total + payment.amount,
      0
    )

  const pendingAmount = payments
    .filter((payment) => payment.status === 'Pending')
    .reduce(
      (total, payment) => total + payment.amount,
      0
    )

  const totalAmount = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  )

  return (
    <MainLayout>
      <div className="payments-page">

        <Breadcrumb items={['Billing', 'Payments']} />

        <div className="payments-header">

          <PageHeader
            title="Payments"
            subtitle={
              selectedHotel
                ? `Manage payments for ${selectedHotel.name}`
                : 'Track and manage guest payment transactions'
            }
          />

          <button
            type="button"
            className="payments-back-btn"
            onClick={() => navigate('/billing')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Billing
          </button>

        </div>

        {selectedHotel && (
          <div className="payments-hotel-bar">

            <div className="payments-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="payments-hotel-info">
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

        <div className="payments-stats">

          <div className="payment-stat-card">

            <div className="payment-stat-icon">
              <i className="bi bi-credit-card"></i>
            </div>

            <div>
              <span>Total Payments</span>
              <h2>{payments.length}</h2>
              <small>Transactions</small>
            </div>

          </div>

          <div className="payment-stat-card">

            <div className="payment-stat-icon success">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Completed</span>
              <h2>
                ₹{completedAmount.toLocaleString('en-IN')}
              </h2>
              <small>Received amount</small>
            </div>

          </div>

          <div className="payment-stat-card">

            <div className="payment-stat-icon warning">
              <i className="bi bi-clock"></i>
            </div>

            <div>
              <span>Pending</span>
              <h2>
                ₹{pendingAmount.toLocaleString('en-IN')}
              </h2>
              <small>Awaiting payment</small>
            </div>

          </div>

          <div className="payment-stat-card">

            <div className="payment-stat-icon info">
              <i className="bi bi-wallet2"></i>
            </div>

            <div>
              <span>Total Value</span>
              <h2>
                ₹{totalAmount.toLocaleString('en-IN')}
              </h2>
              <small>All transactions</small>
            </div>

          </div>

        </div>

        <div className="payments-card">

          <div className="payments-card-header">

            <div>
              <h2>Payment Transactions</h2>
              <p>View all guest payment records</p>
            </div>

            <div className="payments-controls">

              <div className="payments-search">

                <i className="bi bi-search"></i>

                <input
                  type="text"
                  placeholder="Search payment or guest..."
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

              <select
                className="payments-filter"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Pending">
                  Pending
                </option>
              </select>

            </div>

          </div>

          <div className="payments-result">
            Showing {filteredPayments.length} of {payments.length} payments
          </div>

          <div className="payments-table-wrapper">

            <table className="payments-table">

              <thead>
                <tr>
                  <th>Receipt</th>
                  <th>Invoice</th>
                  <th>Guest</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (

                    <tr key={payment.id}>

                      <td>
                        <strong className="payment-receipt">
                          #{payment.receipt}
                        </strong>
                      </td>

                      <td>
                        {payment.invoice}
                      </td>

                      <td>
                        <div className="payment-guest">

                          <span>
                            {payment.guest.charAt(0)}
                          </span>

                          {payment.guest}

                        </div>
                      </td>

                      <td>
                        {payment.date}
                      </td>

                      <td>
                        <strong>
                          ₹{payment.amount.toLocaleString('en-IN')}
                        </strong>
                      </td>

                      <td>

                        <span className="payment-method">

                          <i
                            className={
                              payment.method === 'Card'
                                ? 'bi bi-credit-card'
                                : payment.method === 'UPI'
                                  ? 'bi bi-phone'
                                  : 'bi bi-cash'
                            }
                          ></i>

                          {payment.method}

                        </span>

                      </td>

                      <td>

                        <select
                          className={`payment-status ${payment.status.toLowerCase()}`}
                          value={payment.status}
                          onChange={(e) =>
                            updateStatus(
                              payment.id,
                              e.target.value
                            )
                          }
                        >

                          <option value="Completed">
                            Completed
                          </option>

                          <option value="Pending">
                            Pending
                          </option>

                        </select>

                      </td>

                      <td>

                        <button
                          type="button"
                          className="payment-view-btn"
                          onClick={() =>
                            navigate('/billing/invoice-details')
                          }
                          aria-label={`View ${payment.receipt}`}
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
                      className="payments-empty"
                    >

                      <i className="bi bi-credit-card"></i>

                      <strong>
                        No payments found
                      </strong>

                      <span>
                        Try changing your search or filter.
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

export default Payments