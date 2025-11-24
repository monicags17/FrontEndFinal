import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Package } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-6">
                            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-2 rounded-lg">
                                <Package className="h-5 w-5" />
                            </div>
                            <span>UNKLAB</span>
                        </Link>
                        <p className="text-gray-500 leading-relaxed max-w-sm">
                            Empowering the Universitas Klabat community with a modern, secure, and efficient way to recover lost belongings.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-6">Navigation</h3>
                        <div className="flex flex-col gap-3">
                            <Link to="/" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">Home</Link>
                            <Link to="/search" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">Search</Link>
                            <Link to="/lost-and-found" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">Report Item</Link>
                            <Link to="/contact" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">Contact</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-6">Contact</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3 text-sm text-gray-500">
                                <MapPin className="h-5 w-5 text-purple-600 shrink-0" />
                                <span>Universitas Klabat<br />Airmadidi, Sulawesi Utara</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <Mail className="h-5 w-5 text-purple-600 shrink-0" />
                                <span>lostandfound@unklab.ac.id</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <div>© 2024 Universitas Klabat. All rights reserved.</div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
