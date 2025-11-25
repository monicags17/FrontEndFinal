import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItemForm from "@/components/ItemForm";
import { itemsAPI } from "@/lib/api";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const LostAndFound = () => {
  const queryClient = useQueryClient();
  const [formKey, setFormKey] = useState(0);

  const createMutation = useMutation({
    mutationFn: (data) => itemsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Item reported successfully!");
      setFormKey((prev) => prev + 1); // Reset form by changing key
    },
    onError: () => {
      toast.error("Failed to report item. Please try again.");
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 pt-24">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Report Lost or Found Item
            </h1>
            <p className="text-muted-foreground">
              Help reunite items with their owners by reporting what you've lost or found
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>
                Please provide as much information as possible to help identify the item
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ItemForm
                key={formKey}
                onSubmit={(data) => {
                  const userStr = localStorage.getItem("user");
                  let userId = null;
                  if (userStr) {
                    try {
                      const user = JSON.parse(userStr);
                      userId = user.id;
                    } catch (e) {
                      console.error("Failed to parse user from local storage", e);
                    }
                  }
                  createMutation.mutate({ ...data, userId });
                }}
                isLoading={createMutation.isPending}
              />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};
var stdin_default = LostAndFound;
export {
  stdin_default as default
};
