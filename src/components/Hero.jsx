import { Link } from "react-router-dom";
import { Search, Plus } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob" />
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-4000" />

            <div className="container relative z-10 text-center pt-20">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm text-sm font-medium text-gray-600 animate-fade-in">
                    Universitas Klabat Lost & Found System
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-gray-900 animate-fade-in">
                    LOST & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                        FOUND
                    </span>
                </h1>

                <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-2xl mx-auto font-light animate-fade-in">
                    The official platform to report and recover lost items within the campus.
                    Simple, fast, and secure.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
                    <Link
                        to="/search"
                        className="w-full sm:w-auto bg-gray-900 text-white rounded-full py-4 px-8 font-bold text-sm hover:bg-gray-800 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                    >
                        <Search className="h-4 w-4" />
                        Find Something
                    </Link>
                    <Link
                        to="/lost-and-found"
                        className="w-full sm:w-auto bg-white text-gray-900 border border-gray-200 rounded-full py-4 px-8 font-bold text-sm hover:bg-gray-50 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Plus className="h-4 w-4" />
                        Report Item
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
