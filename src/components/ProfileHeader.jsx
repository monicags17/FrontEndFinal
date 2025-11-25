import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Shield, Calendar } from "lucide-react";
import { format } from "date-fns";

const ProfileHeader = ({ user }) => {
    // Get initials from name
    const getInitials = (name) => {
        if (!name) return "U";
        const parts = name.split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Generate gradient color based on name
    const getGradientColor = (name) => {
        if (!name) return "from-blue-500 to-purple-500";
        const colors = [
            "from-blue-500 to-purple-500",
            "from-purple-500 to-pink-500",
            "from-pink-500 to-rose-500",
            "from-rose-500 to-orange-500",
            "from-orange-500 to-yellow-500",
            "from-green-500 to-teal-500",
            "from-teal-500 to-cyan-500",
            "from-cyan-500 to-blue-500",
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <Card className="glass-card border-white/20">
            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Avatar */}
                    <Avatar className="h-24 w-24">
                        {user.profilePicture ? (
                            <AvatarImage src={user.profilePicture} alt={user.name} className="object-cover" />
                        ) : (
                            <AvatarFallback className={`bg-gradient-to-br ${getGradientColor(user.name)} text-white text-2xl font-bold`}>
                                {getInitials(user.name)}
                            </AvatarFallback>
                        )}
                    </Avatar>

                    {/* User Info */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                            <h2 className="text-2xl font-bold">{user.name}</h2>
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                                    {user.role === "admin" ? (
                                        <>
                                            <Shield className="h-3 w-3 mr-1" />
                                            Admin
                                        </>
                                    ) : (
                                        <>
                                            <User className="h-3 w-3 mr-1" />
                                            User
                                        </>
                                    )}
                                </Badge>
                                <Badge variant={user.status === "active" ? "outline" : "destructive"}>
                                    {user.status}
                                </Badge>
                            </div>
                        </div>

                        <p className="text-muted-foreground mb-3">{user.email}</p>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                            <Calendar className="h-4 w-4" />
                            <span>Member since {user.id ? format(new Date(), "MMMM yyyy") : "Unknown"}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfileHeader;
