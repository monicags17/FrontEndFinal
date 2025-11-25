import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, Camera } from "lucide-react";
import { toast } from "sonner";

const AvatarUpload = ({ currentImage, userName, onImageChange, onRemove }) => {
    const [preview, setPreview] = useState(currentImage || "");
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Get initials for fallback
    const getInitials = (name) => {
        if (!name) return "U";
        const parts = name.split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Get gradient color based on name
    const getGradientColor = (name) => {
        if (!name) return "from-blue-500 to-purple-500";
        const colors = [
            "from-blue-500 to-purple-500",
            "from-purple-500 to-pink-500",
            "from-pink-500 to-rose-500",
            "from-rose-500 to-orange-500",
            "from-orange-500 to-yellow-500",
            "from-green-500 to-teal-500",
            "from-teal-500 to-cyan-500",
            "from-cyan-500 to-blue-500",
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const validateFile = (file) => {
        // Check file type
        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (!validTypes.includes(file.type)) {
            toast.error("Please select an image file (JPG, PNG, or GIF)");
            return false;
        }

        // Check file size (2MB = 2,097,152 bytes)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            toast.error("Image size must be less than 2MB");
            return false;
        }

        return true;
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!validateFile(file)) {
            e.target.value = ""; // Reset input
            return;
        }

        setIsLoading(true);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setPreview(base64String);
            onImageChange(base64String);
            setIsLoading(false);
            toast.success("Image uploaded successfully");
        };

        reader.onerror = () => {
            toast.error("Failed to load image. Please try another file");
            setIsLoading(false);
            e.target.value = "";
        };

        reader.readAsDataURL(file);
    };

    const handleRemove = () => {
        setPreview("");
        onRemove();
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        toast.success("Profile picture removed");
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-6">
                {/* Avatar Preview */}
                <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                        {preview ? (
                            <AvatarImage src={preview} alt={userName} className="object-cover" />
                        ) : (
                            <AvatarFallback className={`bg-gradient-to-br ${getGradientColor(userName)} text-white text-3xl font-bold`}>
                                {getInitials(userName)}
                            </AvatarFallback>
                        )}
                    </Avatar>

                    {/* Camera Icon Overlay */}
                    <button
                        type="button"
                        onClick={handleUploadClick}
                        disabled={isLoading}
                        className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        <Camera className="h-4 w-4" />
                    </button>
                </div>

                {/* Upload Controls */}
                <div className="flex-1 space-y-3">
                    <div>
                        <h4 className="font-medium mb-1">Profile Picture</h4>
                        <p className="text-sm text-muted-foreground">
                            JPG, PNG or GIF. Max size 2MB.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/gif"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={isLoading}
                        />

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleUploadClick}
                            disabled={isLoading}
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            {preview ? "Change Picture" : "Upload Picture"}
                        </Button>

                        {preview && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleRemove}
                                disabled={isLoading}
                            >
                                <X className="h-4 w-4 mr-2" />
                                Remove
                            </Button>
                        )}
                    </div>

                    {isLoading && (
                        <p className="text-sm text-muted-foreground">Uploading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AvatarUpload;
