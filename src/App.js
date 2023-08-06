import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBooking from "./features/Booking/CreateBooking";
import Booking from "./features/Booking/Booking";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Booking />} />
          <Route path="/create" element={<CreateBooking />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
