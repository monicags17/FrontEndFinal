import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const WavySection = () => {
    return (
        <section className="relative py-24 bg-cover bg-center overflow-hidden">
            {/* Background Image (Grass) */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/src/assets/hero-bg.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    filter: 'brightness(0.9)'
                }}
            />

            {/* Wavy White Shape */}
            <div className="relative z-10 container">
                <div className="bg-[#fcfbf7] rounded-[3rem] p-8 md:p-16 max-w-4xl mx-auto text-center shadow-xl relative">
                    {/* Decorative Wavy Edges (Simulated with CSS mask or just rounded corners for now) */}

                    <h2 className="text-2xl md:text-3xl font-bold text-[#2d2a26] mb-6 leading-snug">
                        Greenery in your home is more than just decoration;
                        it's a breath of life within your living space.
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        (Placeholder text from design) - Replacing with: <br />
                        Losing an item can be stressful. Our platform helps connect lost items with their owners efficiently and securely within the Universitas Klabat campus.
                    </p>

                    <Link
                        to="/about"
                        className="inline-flex items-center gap-2 bg-[#dcefdc] text-[#265926] px-6 py-3 rounded-full font-bold hover:bg-[#ccebcc] transition-colors"
                    >
                        Learn more about us <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default WavySection;
