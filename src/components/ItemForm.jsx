import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, MapPin } from "lucide-react";

const ItemForm = ({ onSubmit, initialData, isLoading }) => {
    const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || "");

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: initialData || {
            title: "",
            description: "",
            category: "lost",
            location: "",
            date: new Date().toISOString().split('T')[0],
            imageUrl: "",
            contactName: "",
            contactEmail: "",
            contactPhone: "",
            status: "active",
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onFormSubmit = (data) => {
        onSubmit({
            ...data,
            imageUrl: imagePreview || data.imageUrl,
        });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label>Category</Label>
                <RadioGroup defaultValue={initialData?.category || "lost"} {...register("category")}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lost" id="lost" />
                        <Label htmlFor="lost">Lost Item</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="found" id="found" />
                        <Label htmlFor="found">Found Item</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="space-y-2">
                <Label htmlFor="title">Item Title *</Label>
                <Input
                    id="title"
                    placeholder="e.g., Blue Backpack"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                    id="description"
                    placeholder="Describe the item in detail..."
                    rows={4}
                    {...register("description", { required: "Description is required" })}
                />
                {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="location"
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
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    type="date"
                    {...register("date", { required: "Date is required" })}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Item Photo (Optional)</Label>
                <div className="flex items-center gap-4">
                    <Input
                        id="image"
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
                <Input
                    type="hidden"
                    {...register("imageUrl")}
                    value={imagePreview}
                />
            </div>

            <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Contact Information</h3>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="contactName">Your Name *</Label>
                        <Input
                            id="contactName"
                            placeholder="Full name"
                            {...register("contactName", { required: "Name is required" })}
                        />
                        {errors.contactName && (
                            <p className="text-sm text-destructive">{errors.contactName.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contactEmail">Email *</Label>
                        <Input
                            id="contactEmail"
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
                        <Label htmlFor="contactPhone">Phone Number *</Label>
                        <Input
                            id="contactPhone"
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

            <Button
                type="submit"
                className="w-full bg-gradient-primary"
                disabled={isLoading}
            >
                {isLoading ? "Submitting..." : "Submit Report"}
            </Button>
        </form>
    );
};

export default ItemForm;
