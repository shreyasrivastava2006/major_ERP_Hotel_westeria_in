import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { HotelProvider } from "./context/HotelContext.jsx";
import { HotelDataProvider } from "./context/HotelDataContext.jsx";

function App() {
  return (
    <AuthProvider>
      <HotelDataProvider>
        <HotelProvider>
          <AppRoutes />
        </HotelProvider>
      </HotelDataProvider>
    </AuthProvider>
  );
}

export default App;