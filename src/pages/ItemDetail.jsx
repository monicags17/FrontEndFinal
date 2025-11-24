import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { itemsAPI } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, User, Mail, Phone } from "lucide-react";
import { format } from "date-fns";

const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: item, isLoading, isError } = useQuery({
        queryKey: ["item", id],
        queryFn: () => itemsAPI.getById(id),
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 container py-8 flex items-center justify-center">
                    <div className="animate-pulse text-xl text-muted-foreground">Loading item details...</div>
                </main>
                <Footer />
            </div>
        );
    }

    if (isError || !item) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 container py-8 flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold text-destructive">Item not found</h1>
                    <Button onClick={() => navigate(-1)} variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                    </Button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-[-1]">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] animate-blob" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[100px] animate-blob animation-delay-2000" />
            </div>

            <Header />

            <main className="flex-1 container pt-32 pb-8">
                <Button
                    onClick={() => navigate("/")}
                    variant="ghost"
                    className="mb-6 hover:bg-white/20 relative z-10"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Image */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/20 shadow-glass bg-white/10 backdrop-blur-sm">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md border shadow-sm ${item.category === 'lost'
                                    ? 'bg-red-500/20 text-red-700 border-red-200/50'
                                    : 'bg-emerald-500/20 text-emerald-700 border-emerald-200/50'
                                    }`}>
                                    {item.category === 'lost' ? 'Lost Item' : 'Found Item'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                {item.title}
                            </h1>

                            <div className="flex flex-wrap gap-4 text-muted-foreground">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/30 border border-white/20 backdrop-blur-sm">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span>{item.location}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/30 border border-white/20 backdrop-blur-sm">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span>{format(new Date(item.date), "MMMM d, yyyy")}</span>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg text-muted-foreground bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-sm">
                            <p>{item.description}</p>
                        </div>

                        {/* Contact Information Card */}
                        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-glass">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Name</p>
                                        <p className="font-medium">{item.contactName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <a href={`mailto:${item.contactEmail}`} className="font-medium hover:text-primary transition-colors">
                                            {item.contactEmail}
                                        </a>
                                    </div>
                                </div>

                                {item.contactPhone && (
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Phone</p>
                                            <a href={`tel:${item.contactPhone}`} className="font-medium hover:text-primary transition-colors">
                                                {item.contactPhone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button
                                className="w-full mt-6 bg-gradient-primary shadow-lg hover:shadow-xl transition-all duration-300"
                                onClick={() => window.location.href = `mailto:${item.contactEmail}?subject=Regarding: ${item.title}&body=Hi ${item.contactName}, I saw your post about ${item.title} on Klabat Connect.`}
                            >
                                Contact Now
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ItemDetail;
