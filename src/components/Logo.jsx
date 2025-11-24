import { Link } from "react-router-dom";
import { Package } from "lucide-react";

const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                <Package className="h-5 w-5 text-[#2d2a26]" />
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold text-white drop-shadow-md">
                    UNKLAB
                </span>
            </div>
        </Link>
    );
};

export default Logo;
