import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";
import { Lock } from "lucide-react";

const ChangePasswordForm = ({ onSubmit, isLoading }) => {
    const [newPassword, setNewPassword] = useState("");
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const watchNewPassword = watch("newPassword", "");

    const validatePassword = (password) => {
        if (password.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
        if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
        if (!/[0-9]/.test(password)) return "Password must contain at least one number";
        return true;
    };

    return (
        <Card className="glass-card border-white/20">
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                    Update your password to keep your account secure
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="currentPassword"
                                type="password"
                                {...register("currentPassword", {
                                    required: "Current password is required"
                                })}
                                placeholder="Enter current password"
                                className="pl-10"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.currentPassword && (
                            <p className="text-sm text-destructive">{errors.currentPassword.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="newPassword"
                                type="password"
                                {...register("newPassword", {
                                    required: "New password is required",
                                    validate: validatePassword
                                })}
                                placeholder="Enter new password"
                                className="pl-10"
                                disabled={isLoading}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        {errors.newPassword && (
                            <p className="text-sm text-destructive">{errors.newPassword.message}</p>
                        )}
                        <PasswordStrengthIndicator password={watchNewPassword} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="confirmPassword"
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === watchNewPassword || "Passwords do not match"
                                })}
                                placeholder="Confirm new password"
                                className="pl-10"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button type="submit" disabled={isLoading} className="flex-1">
                            {isLoading ? "Changing Password..." : "Change Password"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ChangePasswordForm;
