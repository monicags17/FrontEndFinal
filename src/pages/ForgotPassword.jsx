import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { passwordResetAPI } from "@/lib/api";
import { sendPasswordResetEmail, isEmailConfigured } from "@/lib/emailService";
import { toast } from "sonner";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const resetMutation = useMutation({
        mutationFn: async (email) => {
            const result = await passwordResetAPI.requestReset(email);

            // If email exists and EmailJS is configured, send email
            if (result.success && result.token && isEmailConfigured()) {
                try {
                    await sendPasswordResetEmail(result.email, result.userName, result.token);
                } catch (emailError) {
                    console.error("Failed to send email:", emailError);
                    // Continue anyway - token is saved in database
                }
            }

            // If EmailJS not configured, show token in console for testing
            if (result.token && !isEmailConfigured()) {
                console.log("=".repeat(60));
                console.log("PASSWORD RESET TOKEN (for testing):");
                console.log(`Token: ${result.token}`);
                console.log(`Reset Link: ${window.location.origin}/reset-password/${result.token}`);
                console.log("=".repeat(60));
                toast.info("Check console for reset link (EmailJS not configured)");
            }

            return result;
        },
        onSuccess: () => {
            setIsSuccess(true);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to process request. Please try again.");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        resetMutation.mutate(email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Card className="w-full max-w-md glass-card">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/login")}
                            className="h-8 w-8"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <CardTitle className="text-2xl">Forgot Password</CardTitle>
                    </div>
                    <CardDescription>
                        {isSuccess
                            ? "Check your email for reset instructions"
                            : "Enter your email address and we'll send you a link to reset your password"
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSuccess ? (
                        <div className="space-y-4">
                            <Alert className="border-green-200 bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">
                                    If an account exists with the email <strong>{email}</strong>, you will receive a password reset link shortly.
                                </AlertDescription>
                            </Alert>

                            {!isEmailConfigured() && (
                                <Alert className="border-yellow-200 bg-yellow-50">
                                    <AlertDescription className="text-yellow-800">
                                        <strong>Development Mode:</strong> EmailJS is not configured. Check the browser console for the reset link.
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Didn't receive the email? Check your spam folder or try again.
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        setIsSuccess(false);
                                        setEmail("");
                                    }}
                                >
                                    Try Another Email
                                </Button>
                            </div>

                            <Button
                                variant="default"
                                className="w-full"
                                onClick={() => navigate("/login")}
                            >
                                Back to Login
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your.email@student.unklab.ac.id"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        disabled={resetMutation.isPending}
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={resetMutation.isPending}
                            >
                                {resetMutation.isPending ? "Sending..." : "Send Reset Link"}
                            </Button>

                            <div className="text-center">
                                <Button
                                    type="button"
                                    variant="link"
                                    onClick={() => navigate("/login")}
                                    className="text-sm"
                                >
                                    Back to Login
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPassword;
