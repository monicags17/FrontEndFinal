import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileStats from "@/components/ProfileStats";
import EditProfileForm from "@/components/EditProfileForm";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usersAPI, itemsAPI } from "@/lib/api";
import { toast } from "sonner";
import { User, Edit, Shield, Info } from "lucide-react";

const Profile = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [selectedTab, setSelectedTab] = useState("overview");

    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currentUser.id;

    // Redirect if not logged in
    useEffect(() => {
        if (!userId) {
            toast.error("Please login to view your profile");
            navigate("/login");
        }
    }, [userId, navigate]);

    // Fetch user profile
    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ["profile", userId],
        queryFn: () => usersAPI.getProfile(userId),
        enabled: !!userId,
    });

    // Fetch all items for statistics
    const { data: items = [] } = useQuery({
        queryKey: ["items"],
        queryFn: itemsAPI.getAll,
    });

    // Update profile mutation
    const updateProfileMutation = useMutation({
        mutationFn: (profileData) => usersAPI.updateProfile(userId, profileData),
        onSuccess: (updatedUser) => {
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });

            // Update localStorage
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const newUser = { ...storedUser, ...updatedUser };
            localStorage.setItem('user', JSON.stringify(newUser));
            localStorage.setItem('userName', updatedUser.name);
            localStorage.setItem('userEmail', updatedUser.email);

            toast.success("Profile updated successfully");
            setSelectedTab("overview");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update profile");
        }
    });

    // Change password mutation
    const changePasswordMutation = useMutation({
        mutationFn: ({ currentPassword, newPassword }) =>
            usersAPI.changePassword(userId, currentPassword, newPassword),
        onSuccess: () => {
            toast.success("Password changed successfully");
            setSelectedTab("overview");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to change password");
        }
    });

    const handleProfileUpdate = (data) => {
        updateProfileMutation.mutate(data);
    };

    const handlePasswordChange = (data) => {
        changePasswordMutation.mutate({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        });
    };

    if (userLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading profile...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 py-8 pt-24">
                <div className="container max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                            My Profile
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your account settings and preferences
                        </p>
                    </div>

                    {/* Profile Header */}
                    <div className="mb-6">
                        <ProfileHeader user={user} />
                    </div>

                    {/* Tabs */}
                    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
                            <TabsTrigger value="overview" className="gap-2">
                                <Info className="h-4 w-4" />
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="edit" className="gap-2">
                                <Edit className="h-4 w-4" />
                                Edit Profile
                            </TabsTrigger>
                            <TabsTrigger value="security" className="gap-2">
                                <Shield className="h-4 w-4" />
                                Security
                            </TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="mt-6 space-y-6">
                            <ProfileStats userId={user.email} items={items} />

                            <Card className="glass-card border-white/20">
                                <CardHeader>
                                    <CardTitle>Account Information</CardTitle>
                                    <CardDescription>Your account details and status</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                            <p className="text-base font-medium">{user.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                                            <p className="text-base font-medium">{user.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Role</p>
                                            <p className="text-base font-medium capitalize">{user.role}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                                            <p className="text-base font-medium capitalize">{user.status}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Edit Profile Tab */}
                        <TabsContent value="edit" className="mt-6">
                            <EditProfileForm
                                user={user}
                                onSubmit={handleProfileUpdate}
                                isLoading={updateProfileMutation.isPending}
                            />
                        </TabsContent>

                        {/* Security Tab */}
                        <TabsContent value="security" className="mt-6">
                            <ChangePasswordForm
                                onSubmit={handlePasswordChange}
                                isLoading={changePasswordMutation.isPending}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
