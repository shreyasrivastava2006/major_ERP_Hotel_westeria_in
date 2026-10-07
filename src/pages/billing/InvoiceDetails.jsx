import { useNavigate } from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'

import { useHotel } from '../../context/HotelContext'

import './InvoiceDetails.css'

function InvoiceDetails() {
  const navigate = useNavigate()
  const { selectedHotel } = useHotel()

  const invoice = {
    number: 'INV-1001',
    date: '2026-09-10',

    guest: {
      name: 'Rahul Sharma',
      email: 'rahul@gmail.com',
      phone: '+91 98765 43210',
      room: '101',
      checkIn: '2026-09-08',
      checkOut: '2026-09-10'
    },

    items: [
      {
        name: 'Deluxe Room',
        quantity: 2,
        price: 7000,
        total: 14000
      },
      {
        name: 'Restaurant',
        quantity: 1,
        price: 2500,
        total: 2500
      },
      {
        name: 'Laundry',
        quantity: 1,
        price: 500,
        total: 500
      }
    ],

    subtotal: 17000,
    tax: 1500,
    total: 18500,
    paymentMethod: 'Card',
    paymentStatus: 'Paid'
  }

  return (
    <MainLayout>

      <div className="invoice-details-page">

        <Breadcrumb
          items={[
            'Billing',
            'Invoices',
            'Invoice Details'
          ]}
        />

        <div className="invoice-details-header">

          <PageHeader
            title="Invoice Details"
            subtitle={
              selectedHotel
                ? `Invoice details for ${selectedHotel.name}`
                : 'View complete billing and payment information'
            }
          />

          <button
            type="button"
            className="invoice-details-back"
            onClick={() => navigate('/billing/invoices')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Invoices
          </button>

        </div>

        {/* SELECTED PROPERTY */}

        {selectedHotel && (
          <div className="invoice-hotel-bar">

            <div className="invoice-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="invoice-hotel-info">

              <span>
                SELECTED PROPERTY
              </span>

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

        {/* INVOICE */}

        <div className="invoice-details-card">

          {/* TOP */}

          <div className="invoice-top">

            <div className="invoice-brand">

              <div className="invoice-logo">
                WI
              </div>

              <div>

                <h2>
                  Wisteria In
                </h2>

                <p>
                  Hospitality Beyond Stay
                </p>

              </div>

            </div>

            <div className="invoice-title-box">

              <span>
                INVOICE
              </span>

              <strong>
                #{invoice.number}
              </strong>

              <small>
                Date: {invoice.date}
              </small>

            </div>

          </div>

          {/* GUEST INFORMATION */}

          <div className="invoice-info-grid">

            <div className="invoice-info-section">

              <h3>
                Guest Information
              </h3>

              <div className="invoice-info-row">
                <span>Name</span>

                <strong>
                  {invoice.guest.name}
                </strong>
              </div>

              <div className="invoice-info-row">
                <span>Email</span>

                <strong>
                  {invoice.guest.email}
                </strong>
              </div>

              <div className="invoice-info-row">
                <span>Phone</span>

                <strong>
                  {invoice.guest.phone}
                </strong>
              </div>

            </div>

            <div className="invoice-info-section">

              <h3>
                Stay Information
              </h3>

              <div className="invoice-info-row">
                <span>Room</span>

                <strong>
                  Room {invoice.guest.room}
                </strong>
              </div>

              <div className="invoice-info-row">
                <span>Check In</span>

                <strong>
                  {invoice.guest.checkIn}
                </strong>
              </div>

              <div className="invoice-info-row">
                <span>Check Out</span>

                <strong>
                  {invoice.guest.checkOut}
                </strong>
              </div>

            </div>

          </div>

          {/* ITEMS */}

          <div className="invoice-items-section">

            <h3>
              Billing Items
            </h3>

            <div className="invoice-items-wrapper">

              <table className="invoice-items">

                <thead>

                  <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>

                </thead>

                <tbody>

                  {invoice.items.map((item, index) => (

                    <tr key={index}>

                      <td>
                        {item.name}
                      </td>

                      <td>
                        {item.quantity}
                      </td>

                      <td>
                        ₹{item.price.toLocaleString('en-IN')}
                      </td>

                      <td>
                        ₹{item.total.toLocaleString('en-IN')}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* TOTAL */}

          <div className="invoice-bottom">

            <div className="payment-info-box">

              <h3>
                Payment Information
              </h3>

              <div>

                <span>
                  Payment Method
                </span>

                <strong>
                  {invoice.paymentMethod}
                </strong>

              </div>

              <div>

                <span>
                  Payment Status
                </span>

                <strong className="paid">

                  <i className="bi bi-check-circle"></i>

                  {invoice.paymentStatus}

                </strong>

              </div>

            </div>

            <div className="invoice-total-box">

              <div>

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{invoice.subtotal.toLocaleString('en-IN')}
                </strong>

              </div>

              <div>

                <span>
                  Tax
                </span>

                <strong>
                  ₹{invoice.tax.toLocaleString('en-IN')}
                </strong>

              </div>

              <div className="grand-total">

                <span>
                  Grand Total
                </span>

                <strong>
                  ₹{invoice.total.toLocaleString('en-IN')}
                </strong>

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <div className="invoice-footer">

            <div>

              <i className="bi bi-check-circle"></i>

              Payment received successfully

            </div>

            <p>
              Thank you for choosing Wisteria In.
              We hope to welcome you again.
            </p>

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default InvoiceDetails