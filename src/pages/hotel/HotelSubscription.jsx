import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './HotelSubscription.css'

function HotelSubscription() {
  const navigate = useNavigate()

  const [currentPlan, setCurrentPlan] = useState('Professional')
  const [billingCycle, setBillingCycle] = useState('Monthly')
  const [saved, setSaved] = useState(false)

  const plans = [
    {
      name: 'Basic',
      price: 999,
      description: 'For small hotels getting started',
      features: [
        'Up to 25 Rooms',
        'Room Management',
        'Guest Management',
        'Reservations',
        'Basic Reports'
      ]
    },
    {
      name: 'Professional',
      price: 2499,
      description: 'For growing hotels and properties',
      features: [
        'Up to 100 Rooms',
        'All Basic Features',
        'Front Office',
        'Housekeeping',
        'Restaurant Management',
        'Billing & Payments',
        'Inventory Management',
        'Advanced Reports'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 4999,
      description: 'For large hotel operations',
      features: [
        'Unlimited Rooms',
        'All Professional Features',
        'Advanced Staff Management',
        'Maintenance Management',
        'Role & Permissions',
        'Priority Support',
        'Advanced Analytics',
        'Multi-property Support'
      ]
    }
  ]

  const handlePlanSelect = (planName) => {
    setCurrentPlan(planName)
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <MainLayout>
      <div className="hotel-subscription-page">

        <Breadcrumb
          items={['Hotel', 'Subscription']}
        />

        {/* Header */}
        <div className="hotel-subscription-header">

          <PageHeader
            title="Hotel Subscription"
            subtitle="Manage your Wisteria In subscription plan and billing"
          />

          <button
            type="button"
            className="hotel-subscription-back-btn"
            onClick={() => navigate('/hotel/settings')}
          >
            <i className="bi bi-arrow-left"></i>
            Hotel Settings
          </button>

        </div>

        {/* Current Subscription */}
        <div className="hotel-subscription-current">

          <div className="hotel-subscription-current-left">

            <div className="hotel-subscription-current-icon">
              <i className="bi bi-stars"></i>
            </div>

            <div>
              <span className="hotel-subscription-label">
                CURRENT PLAN
              </span>

              <h2>{currentPlan}</h2>

              <p>
                Your hotel is currently using the {currentPlan} plan.
              </p>
            </div>

          </div>

          <div className="hotel-subscription-current-right">

            <span className="hotel-subscription-active">
              <i className="bi bi-check-circle-fill"></i>
              Active
            </span>

            <span className="hotel-subscription-renewal">
              <i className="bi bi-calendar-check"></i>
              Renews on 28 Oct 2026
            </span>

          </div>

        </div>

        {/* Billing Cycle */}
        <div className="hotel-subscription-billing">

          <div>
            <h3>Choose Billing Cycle</h3>
            <p>Select how you want to manage your subscription</p>
          </div>

          <div className="hotel-subscription-cycle">

            <button
              type="button"
              className={billingCycle === 'Monthly' ? 'active' : ''}
              onClick={() => setBillingCycle('Monthly')}
            >
              Monthly
            </button>

            <button
              type="button"
              className={billingCycle === 'Yearly' ? 'active' : ''}
              onClick={() => setBillingCycle('Yearly')}
            >
              Yearly
              <span>Save 20%</span>
            </button>

          </div>

        </div>

        {/* Plans */}
        <div className="hotel-subscription-plans">

          {plans.map((plan) => {

            const yearlyPrice = Math.round(plan.price * 12 * 0.8)

            return (
              <div
                key={plan.name}
                className={`hotel-subscription-plan ${
                  currentPlan === plan.name ? 'selected' : ''
                }`}
              >

                {plan.popular && (
                  <div className="hotel-subscription-popular">
                    MOST POPULAR
                  </div>
                )}

                <div className="hotel-subscription-plan-header">

                  <div className="hotel-subscription-plan-icon">
                    <i
                      className={
                        plan.name === 'Basic'
                          ? 'bi bi-box'
                          : plan.name === 'Professional'
                            ? 'bi bi-gem'
                            : 'bi bi-building-check'
                      }
                    ></i>
                  </div>

                  <h3>{plan.name}</h3>

                  <p>{plan.description}</p>

                </div>

                <div className="hotel-subscription-price">

                  <strong>
                    ₹
                    {billingCycle === 'Monthly'
                      ? plan.price.toLocaleString('en-IN')
                      : yearlyPrice.toLocaleString('en-IN')}
                  </strong>

                  <span>
                    /{billingCycle === 'Monthly' ? 'month' : 'year'}
                  </span>

                </div>

                <div className="hotel-subscription-divider"></div>

                <div className="hotel-subscription-features">

                  <span className="hotel-subscription-feature-title">
                    Includes:
                  </span>

                  {plan.features.map((feature) => (
                    <div
                      className="hotel-subscription-feature"
                      key={feature}
                    >
                      <i className="bi bi-check-circle-fill"></i>
                      <span>{feature}</span>
                    </div>
                  ))}

                </div>

                <button
                  type="button"
                  className={
                    currentPlan === plan.name
                      ? 'hotel-subscription-plan-btn current'
                      : 'hotel-subscription-plan-btn'
                  }
                  onClick={() => handlePlanSelect(plan.name)}
                >
                  {currentPlan === plan.name ? (
                    <>
                      <i className="bi bi-check-lg"></i>
                      Current Plan
                    </>
                  ) : (
                    <>
                      <i className="bi bi-arrow-up-circle"></i>
                      Choose Plan
                    </>
                  )}
                </button>

              </div>
            )
          })}

        </div>

        {/* Subscription Information */}
        <div className="hotel-subscription-info">

          <div className="hotel-subscription-info-header">

            <div className="hotel-subscription-info-icon">
              <i className="bi bi-info-circle"></i>
            </div>

            <div>
              <h2>Subscription Information</h2>
              <p>Details about your current subscription</p>
            </div>

          </div>

          <div className="hotel-subscription-info-grid">

            <div>
              <span>Current Plan</span>
              <strong>{currentPlan}</strong>
            </div>

            <div>
              <span>Billing Cycle</span>
              <strong>{billingCycle}</strong>
            </div>

            <div>
              <span>Subscription Status</span>
              <strong className="subscription-status">
                Active
              </strong>
            </div>

            <div>
              <span>Next Billing Date</span>
              <strong>28 Oct 2026</strong>
            </div>

          </div>

        </div>

        {/* Actions */}
        <div className="hotel-subscription-actions">

          {saved && (
            <div className="hotel-subscription-success">
              <i className="bi bi-check-circle-fill"></i>
              Subscription settings saved successfully
            </div>
          )}

          <button
            type="button"
            className="hotel-subscription-cancel"
            onClick={() => navigate('/hotel/settings')}
          >
            Cancel
          </button>

          <button
            type="button"
            className="hotel-subscription-save"
            onClick={handleSave}
          >
            <i className="bi bi-check-lg"></i>
            Save Subscription
          </button>

        </div>

      </div>
    </MainLayout>
  )
}

export default HotelSubscription