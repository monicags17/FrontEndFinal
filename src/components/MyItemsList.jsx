import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { itemsAPI } from "@/lib/api";
import { toast } from "sonner";
import { Edit, Trash2, CheckCircle, XCircle, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import EditItemDialog from "./EditItemDialog";

const MyItemsList = ({ items = [], userId, userEmail }) => {
    const queryClient = useQueryClient();
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);

    // Filter items belonging to current user
    const myItems = items.filter(item =>
        item.userId === userId || item.contactEmail === userEmail
    );

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => itemsAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
            toast.success("Item deleted successfully");
            setDeletingItem(null);
        },
        onError: (error) => {
            toast.error("Failed to delete item");
        }
    });

    // Update status mutation
    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }) => itemsAPI.update(id, { status }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
            toast.success(`Item marked as ${variables.status}`);
        },
        onError: () => {
            toast.error("Failed to update status");
        }
    });

    // Edit item mutation
    const editMutation = useMutation({
        mutationFn: (data) => itemsAPI.update(data.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
            toast.success("Item updated successfully");
            setEditingItem(null);
        },
        onError: () => {
            toast.error("Failed to update item");
        }
    });

    const handleDelete = () => {
        if (deletingItem) {
            deleteMutation.mutate(deletingItem.id);
        }
    };

    const toggleStatus = (item) => {
        const newStatus = item.status === "active" ? "resolved" : "active";
        updateStatusMutation.mutate({ id: item.id, status: newStatus });
    };

    if (myItems.length === 0) {
        return (
            <div className="text-center py-12 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                <p className="text-muted-foreground text-lg">You haven't posted any items yet.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myItems.map((item) => (
                    <Card key={item.id} className="glass-card border-white/20 flex flex-col overflow-hidden group">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <Badge variant={item.category === "lost" ? "destructive" : "default"}>
                                    {item.category === "lost" ? "Lost" : "Found"}
                                </Badge>
                                <Badge variant={item.status === "active" ? "outline" : "secondary"} className="bg-white/80 backdrop-blur-sm">
                                    {item.status === "active" ? "Active" : "Resolved"}
                                </Badge>
                            </div>
                        </div>

                        <CardHeader className="pb-2">
                            <CardTitle className="line-clamp-1 text-lg">{item.title}</CardTitle>
                        </CardHeader>

                        <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="line-clamp-1">{item.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span>{format(new Date(item.date), "MMM d, yyyy")}</span>
                            </div>
                        </CardContent>

                        <CardFooter className="pt-2 border-t border-white/10 flex justify-between gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={item.status === "active" ? "text-green-600 hover:text-green-700 hover:bg-green-50" : "text-amber-600 hover:text-amber-700 hover:bg-amber-50"}
                                onClick={() => toggleStatus(item)}
                            >
                                {item.status === "active" ? (
                                    <>
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Resolve
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Reactivate
                                    </>
                                )}
                            </Button>

                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" onClick={() => setEditingItem(item)}>
                                    <Edit className="h-4 w-4 text-blue-500" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => setDeletingItem(item)}>
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Edit Dialog */}
            <EditItemDialog
                open={!!editingItem}
                onOpenChange={(open) => !open && setEditingItem(null)}
                item={editingItem}
                onSubmit={editMutation.mutate}
                isLoading={editMutation.isPending}
            />

            {/* Delete Confirmation */}
            <AlertDialog open={!!deletingItem} onOpenChange={(open) => !open && setDeletingItem(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the item "{deletingItem?.title}" from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default MyItemsList;
