import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";
import { passwordResetAPI } from "@/lib/api";
import { toast } from "sonner";
import { Lock, AlertCircle, Loader2 } from "lucide-react";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [tokenValid, setTokenValid] = useState(null);
    const [validationMessage, setValidationMessage] = useState("");
    const [isValidating, setIsValidating] = useState(true);

    // Validate token on mount
    useEffect(() => {
        const validateToken = async () => {
            try {
                const result = await passwordResetAPI.validateToken(token);
                setTokenValid(result.valid);
                if (!result.valid) {
                    setValidationMessage(result.message);
                }
            } catch (error) {
                setTokenValid(false);
                setValidationMessage("Failed to validate reset token");
            } finally {
                setIsValidating(false);
            }
        };

        if (token) {
            validateToken();
        } else {
            setTokenValid(false);
            setValidationMessage("No reset token provided");
            setIsValidating(false);
        }
    }, [token]);

    const resetMutation = useMutation({
        mutationFn: async ({ token, password }) => {
            return await passwordResetAPI.resetPassword(token, password);
        },
        onSuccess: () => {
            toast.success("Password reset successful! Please login with your new password.");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to reset password. Please try again.");
        }
    });

    const validatePassword = () => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/[0-9]/.test(password)) {
            return "Password must contain at least one number";
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate password strength
        const passwordError = validatePassword();
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        resetMutation.mutate({ token, password });
    };

    if (isValidating) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <Card className="w-full max-w-md glass-card">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">Validating reset token...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!tokenValid) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <Card className="w-full max-w-md glass-card">
                    <CardHeader>
                        <CardTitle className="text-2xl">Invalid Reset Link</CardTitle>
                        <CardDescription>
                            This password reset link is invalid or has expired
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{validationMessage}</AlertDescription>
                        </Alert>

                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Password reset links expire after 30 minutes and can only be used once.
                            </p>
                            <Button
                                variant="default"
                                className="w-full"
                                onClick={() => navigate("/forgot-password")}
                            >
                                Request New Reset Link
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => navigate("/login")}
                            >
                                Back to Login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Card className="w-full max-w-md glass-card">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset Your Password</CardTitle>
                    <CardDescription>
                        Enter your new password below
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                    disabled={resetMutation.isPending}
                                    required
                                />
                            </div>
                            <PasswordStrengthIndicator password={password} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10"
                                    disabled={resetMutation.isPending}
                                    required
                                />
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-sm text-red-500">Passwords do not match</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={resetMutation.isPending || password !== confirmPassword}
                        >
                            {resetMutation.isPending ? "Resetting Password..." : "Reset Password"}
                        </Button>

                        <div className="text-center">
                            <Button
                                type="button"
                                variant="link"
                                onClick={() => navigate("/login")}
                                className="text-sm"
                                disabled={resetMutation.isPending}
                            >
                                Back to Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPassword;
