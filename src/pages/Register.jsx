import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, User, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { usersAPI } from "@/lib/api";

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            // Check if email already exists
            const emailExists = await usersAPI.checkEmail(formData.email);
            if (emailExists) {
                toast.error("Email already registered");
                setIsLoading(false);
                return;
            }

            // Register new user
            const newUser = await usersAPI.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            toast.success("Account created successfully! Please login.");
            navigate("/login");
        } catch (error) {
            toast.error(error.message || "Failed to create account");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-12">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-[-1]">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-blob" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px] animate-blob animation-delay-2000" />
            </div>

            <div className="w-full max-w-md px-4 relative z-10">
                <div className="mb-8 text-center">
                    <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl tracking-tight mb-2">
                        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-2 rounded-xl">
                            <Package className="h-6 w-6" />
                        </div>
                        <span>UNKLAB</span>
                    </Link>
                    <p className="text-muted-foreground">Join the Klabat Connect community</p>
                </div>

                <Card className="border-white/20 bg-white/40 backdrop-blur-md shadow-glass">
                    <CardHeader>
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>Enter your details to get started</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        className="pl-10 bg-white/50 border-white/20 focus:bg-white/80 transition-all"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
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
                                <Label htmlFor="password">Password</Label>
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
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 bg-white/50 border-white/20 focus:bg-white/80 transition-all"
                                        value={formData.confirmPassword}
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
                                {isLoading ? "Creating account..." : "Create Account"}
                                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-white/10 pt-6">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary font-medium hover:underline">
                                Login
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Register;
