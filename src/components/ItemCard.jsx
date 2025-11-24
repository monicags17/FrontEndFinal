import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ArrowRight, Trash2, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const ItemCard = ({ item, onEdit, onDelete, showActions = false }) => {
    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 border border-gray-100">
            {/* Image Section */}
            <div className="aspect-square overflow-hidden bg-gray-50 relative">
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                        <span className="text-5xl">📦</span>
                    </div>
                )}

                {/* Glass Badge */}
                <div className="absolute top-3 right-3">
                    <div className={`backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border ${item.category === 'lost'
                        ? 'bg-red-500/10 border-red-500/20 text-red-600'
                        : 'bg-green-500/10 border-green-500/20 text-green-600'
                        }`}>
                        {item.category === 'lost' ? 'Lost' : 'Found'}
                    </div>
                </div>

                {/* Overlay Action */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link to={`/items/${item.id}`}>
                        <Button className="rounded-full bg-white text-black hover:bg-gray-100">
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">
                        {item.title}
                    </h3>
                    <Link to={`/items/${item.id}`}>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </Link>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="line-clamp-1 max-w-[80px]">{item.location}</span>
                    </div>
                    <div className="w-px h-3 bg-gray-200" />
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(item.date), 'MMM dd')}</span>
                    </div>
                </div>
            </div>

            {showActions && (
                <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/90 backdrop-blur shadow-sm hover:bg-white"
                        onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 rounded-full shadow-sm"
                        onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ItemCard;
