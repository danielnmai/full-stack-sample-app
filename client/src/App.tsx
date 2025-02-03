import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { store } from "./app/store.ts";
import Header from "./components/Header.tsx";
import Home from "./components/Home.tsx";
import InvoiceList from "./components/InvoiceList.tsx";
import Login from "./components/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import "./index.css";
import { queryClient } from "./service/queryClient.ts";

function App() {
  return (
    <MantineProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/invoices" element={<InvoiceList />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </MantineProvider>
  );
}

export default App;
