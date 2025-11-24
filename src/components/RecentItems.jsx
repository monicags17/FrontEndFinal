import { useQuery } from "@tanstack/react-query";
import { itemsAPI } from "@/lib/api";
import ItemCard from "./ItemCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const RecentItems = () => {
    const { data: items = [], isLoading } = useQuery({
        queryKey: ['items'],
        queryFn: itemsAPI.getAll,
    });

    const recentItems = items.slice(0, 4);

    if (isLoading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-[3/4] bg-gray-200 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-gray-50/50">
            <div className="container">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Left Vertical Title */}
                    <div className="md:w-12 hidden md:flex flex-col items-center justify-center">
                        <div className="rotate-180 [writing-mode:vertical-lr] text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                            Latest Discoveries
                        </div>
                        <div className="h-24 w-px bg-gray-200 mt-4" />
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Items</h2>
                                <p className="text-gray-500">Browse the latest reported lost and found items.</p>
                            </div>
                            <Link
                                to="/search"
                                className="hidden md:flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors"
                            >
                                View All <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        {recentItems.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-500">No items yet. Be the first to report!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {recentItems.map((item) => (
                                    <ItemCard key={item.id} item={item} />
                                ))}
                            </div>
                        )}

                        <div className="mt-8 text-center md:hidden">
                            <Link
                                to="/search"
                                className="inline-flex items-center gap-2 text-sm font-bold text-purple-600"
                            >
                                View All Items <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecentItems;
