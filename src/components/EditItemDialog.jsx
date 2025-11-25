import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Upload, MapPin } from "lucide-react";

const EditItemDialog = ({ open, onOpenChange, item, onSubmit, isLoading }) => {
    const [imagePreview, setImagePreview] = useState("");

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            title: "",
            description: "",
            category: "lost",
            location: "",
            date: "",
            imageUrl: "",
            contactName: "",
            contactEmail: "",
            contactPhone: "",
            status: "active",
        },
    });

    // Reset form when item changes
    useEffect(() => {
        if (item) {
            reset({
                title: item.title,
                description: item.description,
                category: item.category,
                location: item.location,
                date: item.date,
                imageUrl: item.imageUrl,
                contactName: item.contactName,
                contactEmail: item.contactEmail,
                contactPhone: item.contactPhone,
                status: item.status,
            });
            setImagePreview(item.imageUrl || "");
        }
    }, [item, reset]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setValue("imageUrl", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onFormSubmit = (data) => {
        onSubmit({
            ...data,
            id: item.id,
            userId: item.userId,
            imageUrl: imagePreview || data.imageUrl,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Item</DialogTitle>
                    <DialogDescription>
                        Make changes to your item details here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label>Category</Label>
                        <RadioGroup
                            defaultValue={item?.category || "lost"}
                            onValueChange={(val) => setValue("category", val)}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="lost" id="edit-lost" />
                                <Label htmlFor="edit-lost">Lost Item</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="found" id="edit-found" />
                                <Label htmlFor="edit-found">Found Item</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-title">Item Title *</Label>
                        <Input
                            id="edit-title"
                            placeholder="e.g., Blue Backpack"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-description">Description *</Label>
                        <Textarea
                            id="edit-description"
                            placeholder="Describe the item in detail..."
                            rows={4}
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-location">Location *</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="edit-location"
                                placeholder="e.g., Library Building, 2nd Floor"
                                className="pl-10"
                                {...register("location", { required: "Location is required" })}
                            />
                        </div>
                        {errors.location && (
                            <p className="text-sm text-destructive">{errors.location.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-date">Date</Label>
                        <Input
                            id="edit-date"
                            type="date"
                            {...register("date", { required: "Date is required" })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-image">Item Photo (Optional)</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="edit-image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="flex-1"
                            />
                            <Button type="button" variant="outline" size="icon">
                                <Upload className="h-4 w-4" />
                            </Button>
                        </div>
                        {imagePreview && (
                            <div className="mt-2">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="h-32 w-32 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="font-semibold mb-4">Contact Information</h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-contactName">Your Name *</Label>
                                <Input
                                    id="edit-contactName"
                                    placeholder="Full name"
                                    {...register("contactName", { required: "Name is required" })}
                                />
                                {errors.contactName && (
                                    <p className="text-sm text-destructive">{errors.contactName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-contactEmail">Email *</Label>
                                <Input
                                    id="edit-contactEmail"
                                    type="email"
                                    placeholder="your.email@student.unklab.ac.id"
                                    {...register("contactEmail", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                                {errors.contactEmail && (
                                    <p className="text-sm text-destructive">{errors.contactEmail.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-contactPhone">Phone Number *</Label>
                                <Input
                                    id="edit-contactPhone"
                                    type="tel"
                                    placeholder="08xxxxxxxxxx"
                                    {...register("contactPhone", { required: "Phone number is required" })}
                                />
                                {errors.contactPhone && (
                                    <p className="text-sm text-destructive">{errors.contactPhone.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditItemDialog;
