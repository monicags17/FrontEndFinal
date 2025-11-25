import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AvatarUpload from "@/components/AvatarUpload";
import { User, Mail } from "lucide-react";

const EditProfileForm = ({ user, onSubmit, isLoading }) => {
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
        }
    });

    const handleFormSubmit = (data) => {
        onSubmit({
            ...data,
            profilePicture: profilePicture
        });
    };

    return (
        <Card className="glass-card border-white/20">
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                    Update your personal information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    {/* Avatar Upload Section */}
                    <AvatarUpload
                        currentImage={profilePicture}
                        userName={user?.name}
                        onImageChange={(base64) => setProfilePicture(base64)}
                        onRemove={() => setProfilePicture("")}
                    />

                    <div className="border-t pt-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 3,
                                            message: "Name must be at least 3 characters"
                                        }
                                    })}
                                    placeholder="Your name"
                                    className="pl-10"
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    placeholder="your.email@example.com"
                                    className="pl-10"
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button type="submit" disabled={isLoading} className="flex-1">
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default EditProfileForm;
