import { useQuery } from "@tanstack/react-query";
import { itemsAPI } from "@/lib/api";
import { Package, CheckCircle, Search as SearchIcon } from "lucide-react";

const Statistics = () => {
    const { data: items = [] } = useQuery({
        queryKey: ['items'],
        queryFn: itemsAPI.getAll,
    });

    const stats = [
        {
            icon: Package,
            label: "Total Items",
            value: items.length,
            color: "text-primary",
        },
        {
            icon: SearchIcon,
            label: "Lost Items",
            value: items.filter(item => item.category === 'lost').length,
            color: "text-secondary",
        },
        {
            icon: CheckCircle,
            label: "Found Items",
            value: items.filter(item => item.category === 'found').length,
            color: "text-accent",
        },
    ];

    return (
        <section className="py-12 bg-muted/30">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg bg-gradient-primary`}>
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
