import { useNavigate } from 'react-router-dom'
import logo from '../assets/image1.png'
import './Welcome.css'

function Welcome() {
  const navigate = useNavigate()

  return (
    <div
      className="welcome-page"
      style={{ backgroundImage: `url(${logo})` }}
    >
      <div className="welcome-overlay"></div>

      <button
        className="welcome-next-btn"
        onClick={() => navigate('/home')}
      >
        NEXT
        <i className="bi bi-arrow-right"></i>
      </button>
    </div>
  )
}

export default Welcome