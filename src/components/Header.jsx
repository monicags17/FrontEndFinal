import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Home, FileText, Mail, Package, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated");
        const role = localStorage.getItem("userRole");
        setIsAuthenticated(authStatus === "true");
        setUserRole(role || "");
    }, [location.pathname]); // Re-check on route change

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        setIsAuthenticated(false);
        setUserRole("");
        toast.success("Logged out successfully");
        navigate("/");
    };

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/search", label: "Search" },
        { path: "/lost-and-found", label: "Report" },
        { path: "/contact", label: "Contact" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-6 transition-all duration-300">
            <div className="container max-w-5xl mx-auto">
                <div className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5 rounded-full px-6 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
                        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-1.5 rounded-lg">
                            <Package className="h-4 w-4" />
                        </div>
                        <span>UNKLAB</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    location.pathname === link.path
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Action */}
                    <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <>
                                {userRole === "admin" && (
                                    <Link
                                        to="/admin"
                                        className="text-sm font-medium text-gray-500 hover:text-gray-900 px-3"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="text-gray-500 hover:text-destructive"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <Link to="/login">
                                <Button size="sm" className="bg-gradient-primary rounded-full px-6">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
