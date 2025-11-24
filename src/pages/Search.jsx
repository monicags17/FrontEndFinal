import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItemCard from "@/components/ItemCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon } from "lucide-react";
import { itemsAPI } from "@/lib/api";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: itemsAPI.getAll
  });
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || item.category === activeTab;
    return matchesSearch && matchesTab;
  });
  return <div className="min-h-screen flex flex-col"><Header /><main className="flex-1 py-8"><div className="container"><div className="mb-8"><h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Search Items
            </h1><p className="text-muted-foreground">
              Find lost or found items from the UNKLAB community
            </p></div><div className="mb-8"><div className="flex gap-2 max-w-2xl"><Input
    placeholder="Search by title, description, or location..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="flex-1"
  /><Button className="bg-gradient-primary"><SearchIcon className="h-4 w-4" /></Button></div></div><Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8"><TabsList><TabsTrigger value="all">All Items</TabsTrigger><TabsTrigger value="lost">Lost</TabsTrigger><TabsTrigger value="found">Found</TabsTrigger></TabsList><TabsContent value={activeTab} className="mt-6">{isLoading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1, 2, 3].map((i) => <div key={i} className="h-96 bg-muted animate-pulse rounded-xl" />)}</div> : filteredItems.length === 0 ? <div className="text-center py-12"><p className="text-muted-foreground text-lg">
                    No items found. Try a different search term.
                  </p></div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">{filteredItems.map((item) => <ItemCard key={item.id} item={item} />)}</div>}</TabsContent></Tabs></div></main><Footer /></div>;
};
var stdin_default = Search;
export {
  stdin_default as default
};
