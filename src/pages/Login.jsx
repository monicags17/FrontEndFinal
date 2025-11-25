import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { usersAPI } from "@/lib/api";

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [blockedError, setBlockedError] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const user = await usersAPI.login(formData.email, formData.password);

            // Check if user is blocked
            if (user.status === "blocked") {
                toast.error("Account Blocked", {
                    description: "Your account has been blocked. Please contact the administrator.",
                    action: {
                        label: "Contact Admin",
                        onClick: () => navigate("/contact"),
                    },
                });
                setBlockedError(true);
                setIsLoading(false);
                return;
            }

            // Store authentication data
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userName", user.name);
            localStorage.setItem("userRole", user.role);

            toast.success(`Welcome back, ${user.name}!`);

            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            toast.error(error.message || "Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-[-1]">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-blob" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px] animate-blob animation-delay-2000" />
            </div>

            <div className="w-full max-w-md px-4 relative z-10">
                <div className="mb-8 text-center">
                    <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl tracking-tight mb-2">
                        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-2 rounded-xl">
                            <Package className="h-6 w-6" />
                        </div>
                        <span>UNKLAB</span>
                    </Link>
                    <p className="text-muted-foreground">Welcome back to Klabat Connect</p>
                </div>

                <Card className="border-white/20 bg-white/40 backdrop-blur-md shadow-glass">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>Enter your email and password to access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="pl-10 bg-white/50 border-white/20 focus:bg-white/80 transition-all"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 bg-white/50 border-white/20 focus:bg-white/80 transition-all"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-primary shadow-lg hover:shadow-xl transition-all duration-300"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                            </Button>
                        </form>
                        {blockedError && (
                            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive flex items-center justify-between">
                                <span>Your account is blocked.</span>
                                <Link to="/contact" className="font-bold hover:underline">
                                    Contact Admin
                                </Link>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-white/10 pt-6">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Login;
