import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MessagingProvider } from "./contexts/MessagingContext";
import { ConnectionsProvider } from "./contexts/ConnectionsContext";
import MessageBar from "./components/MessageBar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LawyerProfile from "./pages/LawyerProfile";
import SearchLawyers from "./pages/SearchLawyers";
import Consults from "./pages/Consults";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const shouldShowMessageBar =
    pathname === "/dashboard" ||
    pathname === "/search" ||
    pathname === "/profile" ||
    pathname.startsWith("/lawyer");

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<LawyerProfile />} />
        <Route path="/lawyer/:id" element={<LawyerProfile />} />
        <Route path="/search" element={<SearchLawyers />} />
        <Route path="/consults" element={<Consults />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowMessageBar && <MessageBar />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ConnectionsProvider>
        <MessagingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </MessagingProvider>
      </ConnectionsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
