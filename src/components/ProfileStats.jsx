import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, Clock, Calendar } from "lucide-react";

const ProfileStats = ({ userId, items = [] }) => {
    // Calculate statistics
    const userItems = items.filter(item => item.contactEmail === userId || item.userId === userId);
    const totalItems = userItems.length;
    const activeItems = userItems.filter(item => item.status === "active").length;
    const foundItems = userItems.filter(item => item.category === "found").length;
    const lostItems = userItems.filter(item => item.category === "lost").length;

    const stats = [
        {
            title: "Total Items",
            value: totalItems,
            icon: Package,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: "Active Items",
            value: activeItems,
            icon: Clock,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            title: "Items Found",
            value: foundItems,
            icon: CheckCircle,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            title: "Items Lost",
            value: lostItems,
            icon: Calendar,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Card key={index} className="glass-card border-white/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <div className={`${stat.bgColor} p-2 rounded-lg`}>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default ProfileStats;
