import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './StockHistory.css'

function StockHistory() {
  const navigate = useNavigate()

  const [history] = useState([
    {
      id: 1,
      date: '14 Sep 2026',
      item: 'Bath Towels',
      type: 'Stock In',
      quantity: 50,
      unit: 'Pieces',
      reference: 'PO-1001',
      user: 'Admin'
    },
    {
      id: 2,
      date: '13 Sep 2026',
      item: 'Shampoo',
      type: 'Stock Out',
      quantity: 15,
      unit: 'Bottles',
      reference: 'REQ-204',
      user: 'Housekeeping'
    },
    {
      id: 3,
      date: '12 Sep 2026',
      item: 'Coffee Powder',
      type: 'Stock In',
      quantity: 25,
      unit: 'Kg',
      reference: 'PO-1002',
      user: 'Manager'
    },
    {
      id: 4,
      date: '11 Sep 2026',
      item: 'Bed Sheets',
      type: 'Stock Out',
      quantity: 10,
      unit: 'Pieces',
      reference: 'REQ-201',
      user: 'Housekeeping'
    },
    {
      id: 5,
      date: '10 Sep 2026',
      item: 'Mineral Water',
      type: 'Stock Out',
      quantity: 40,
      unit: 'Bottles',
      reference: 'REQ-198',
      user: 'Restaurant'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [transactionFilter, setTransactionFilter] =
    useState('All Transactions')
  const [itemFilter, setItemFilter] =
    useState('All Items')

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTransaction =
      transactionFilter === 'All Transactions' ||
      item.type === transactionFilter

    const matchesItem =
      itemFilter === 'All Items' ||
      item.item === itemFilter

    return (
      matchesSearch &&
      matchesTransaction &&
      matchesItem
    )
  })

  const stockInCount = history.filter(
    (item) => item.type === 'Stock In'
  ).length

  const stockOutCount = history.filter(
    (item) => item.type === 'Stock Out'
  ).length

  return (
    <MainLayout>

      <div className="stock-history-page">

        <Breadcrumb
          items={['Inventory', 'Stock History']}
        />

        <div className="stock-history-header">

          <PageHeader
            title="Stock History"
            subtitle="Track all inventory stock movements"
          />

          <button
            type="button"
            onClick={() => navigate('/inventory')}
            className="back-stock-btn"
          >
            <i className="bi bi-arrow-left"></i>
            Back to Inventory
          </button>

        </div>

        {/* SUMMARY */}

        <div className="stock-summary">

          <div>
            <span>Total Transactions</span>
            <strong>{history.length}</strong>
          </div>

          <div>
            <span>Stock In</span>
            <strong>{stockInCount}</strong>
          </div>

          <div>
            <span>Stock Out</span>
            <strong>{stockOutCount}</strong>
          </div>

        </div>

        {/* HISTORY CARD */}

        <div className="stock-history-card">

          <div className="stock-filter-bar">

            <div className="stock-search">

              <i className="bi bi-search"></i>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search stock history..."
              />

            </div>

            <select
              value={transactionFilter}
              onChange={(e) =>
                setTransactionFilter(e.target.value)
              }
            >
              <option>All Transactions</option>
              <option>Stock In</option>
              <option>Stock Out</option>
            </select>

            <select
              value={itemFilter}
              onChange={(e) =>
                setItemFilter(e.target.value)
              }
            >
              <option>All Items</option>
              <option>Bath Towels</option>
              <option>Shampoo</option>
              <option>Coffee Powder</option>
              <option>Bed Sheets</option>
              <option>Mineral Water</option>
            </select>

          </div>

          <div className="stock-table-wrapper">

            <table className="stock-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Transaction</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Reference</th>
                  <th>Updated By</th>
                </tr>
              </thead>

              <tbody>

                {filteredHistory.length === 0 ? (

                  <tr>
                    <td
                      colSpan="7"
                      className="stock-empty"
                    >
                      <i className="bi bi-clock-history"></i>
                      <strong>No stock history found</strong>
                      <span>
                        Try changing your search or filters.
                      </span>
                    </td>
                  </tr>

                ) : (

                  filteredHistory.map((item) => (

                    <tr key={item.id}>

                      <td>{item.date}</td>

                      <td>
                        <strong>{item.item}</strong>
                      </td>

                      <td>

                        <span
                          className={`transaction-badge ${
                            item.type === 'Stock In'
                              ? 'stock-in'
                              : 'stock-out'
                          }`}
                        >

                          <i
                            className={
                              item.type === 'Stock In'
                                ? 'bi bi-arrow-down-left'
                                : 'bi bi-arrow-up-right'
                            }
                          ></i>

                          {item.type}

                        </span>

                      </td>

                      <td>
                        <strong>{item.quantity}</strong>
                      </td>

                      <td>{item.unit}</td>

                      <td>{item.reference}</td>

                      <td>{item.user}</td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default StockHistory