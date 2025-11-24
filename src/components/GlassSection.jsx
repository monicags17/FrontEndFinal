import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Clock, Users } from "lucide-react";

const GlassSection = () => {
    const stats = [
        { icon: Clock, label: "Fast Recovery", value: "24h" },
        { icon: Users, label: "Active Students", value: "2k+" },
        { icon: ShieldCheck, label: "Secure Process", value: "100%" },
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 z-0" />

            <div className="container relative z-10">
                <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2rem] p-8 md:p-16 shadow-xl shadow-indigo-500/5">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                A smarter way to manage <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                                    lost belongings
                                </span>
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Our platform leverages the power of the community to ensure lost items find their way back home.
                                With real-time updates and a secure verification process, we make recovery simple.
                            </p>

                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 text-purple-700 font-bold hover:gap-3 transition-all"
                            >
                                Learn more about our process <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white/60 flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                                    <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                        <div className="text-sm text-gray-500">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlassSection;
