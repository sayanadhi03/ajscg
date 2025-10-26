import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/Auth";
import Expense from "./pages/expense-tracker/Expense";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
