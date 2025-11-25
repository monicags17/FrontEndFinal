import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const ClaimItemDialog = ({ open, onOpenChange, item, currentUser, onSubmit, isLoading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            message: "",
            claimerName: currentUser?.name || "",
            claimerEmail: currentUser?.email || "",
            claimerPhone: "",
        },
    });

    const onFormSubmit = (data) => {
        onSubmit({
            ...data,
            itemId: item.id,
            itemTitle: item.title,
            claimerId: currentUser?.id,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Claim Item: {item?.title}</DialogTitle>
                    <DialogDescription>
                        Send a message to the owner to claim this item.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                            id="message"
                            placeholder="Describe why this item belongs to you (e.g., unique markings, contents)..."
                            rows={4}
                            {...register("message", { required: "Message is required" })}
                        />
                        {errors.message && (
                            <p className="text-sm text-destructive">{errors.message.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="claimerName">Your Name *</Label>
                        <Input
                            id="claimerName"
                            placeholder="Full name"
                            {...register("claimerName", { required: "Name is required" })}
                        />
                        {errors.claimerName && (
                            <p className="text-sm text-destructive">{errors.claimerName.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="claimerEmail">Your Email *</Label>
                        <Input
                            id="claimerEmail"
                            type="email"
                            placeholder="email@example.com"
                            {...register("claimerEmail", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.claimerEmail && (
                            <p className="text-sm text-destructive">{errors.claimerEmail.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="claimerPhone">Phone Number *</Label>
                        <Input
                            id="claimerPhone"
                            type="tel"
                            placeholder="08xxxxxxxxxx"
                            {...register("claimerPhone", { required: "Phone number is required" })}
                        />
                        {errors.claimerPhone && (
                            <p className="text-sm text-destructive">{errors.claimerPhone.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} className="bg-gradient-primary">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                "Send Claim"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ClaimItemDialog;
