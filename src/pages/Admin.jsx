import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItemCard from "@/components/ItemCard";
import ItemForm from "@/components/ItemForm";
import UserEditDialog from "@/components/UserEditDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { itemsAPI, contactsAPI, usersAPI } from "@/lib/api";
import { toast } from "sonner";
import { format } from "date-fns";
import { Trash2, Eye, Ban, CheckCircle, Edit, UserX } from "lucide-react";
const Admin = () => {
  const queryClient = useQueryClient();
  const [selectedTab, setSelectedTab] = useState("items");
  const [editingItem, setEditingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Get current logged in user
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const { data: items = [] } = useQuery({
    queryKey: ["items"],
    queryFn: itemsAPI.getAll
  });
  const { data: contacts = [] } = useQuery({
    queryKey: ["contacts"],
    queryFn: contactsAPI.getAll
  });
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: usersAPI.getAll
  });
  const deleteItemMutation = useMutation({
    mutationFn: itemsAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Item deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete item");
    }
  });

  const updateItemMutation = useMutation({
    mutationFn: (data) => itemsAPI.update(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Item updated successfully");
      setIsDialogOpen(false);
      setEditingItem(null);
    },
    onError: () => {
      toast.error("Failed to update item");
    }
  });

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };
  const deleteContactMutation = useMutation({
    mutationFn: contactsAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete contact");
    }
  });
  const markAsReadMutation = useMutation({
    mutationFn: (id) => contactsAPI.update(id, { status: "read" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    }
  });

  const updateUserStatusMutation = useMutation({
    mutationFn: ({ userId, status }) => usersAPI.updateStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update user status");
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ userId, userData }) => usersAPI.update(userId, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
      setIsUserDialogOpen(false);
      setEditingUser(null);
    },
    onError: () => {
      toast.error("Failed to update user");
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: usersAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeletingUser(null);
    },
    onError: () => {
      toast.error("Failed to delete user");
    }
  });

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsUserDialogOpen(true);
  };

  const handleDeleteUser = (user) => {
    setDeletingUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (deletingUser) {
      deleteUserMutation.mutate(deletingUser.id);
    }
  };
  return <div className="min-h-screen flex flex-col"><Header /><main className="flex-1 py-8 pt-24"><div className="container"><div className="mb-8"><h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
    Admin Dashboard
  </h1><p className="text-muted-foreground">
      Manage items and contact messages
    </p></div><Tabs value={selectedTab} onValueChange={setSelectedTab}><TabsList><TabsTrigger value="items">Items Management</TabsTrigger><TabsTrigger value="contacts">
      Contact Messages
      {contacts.filter((c) => c.status === "unread").length > 0 && <Badge variant="destructive" className="ml-2">{contacts.filter((c) => c.status === "unread").length}</Badge>}</TabsTrigger><TabsTrigger value="users">User Management</TabsTrigger></TabsList><TabsContent value="items" className="mt-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{items.map((item) => <ItemCard
        key={item.id}
        item={item}
        showActions
        onDelete={(id) => deleteItemMutation.mutate(id)}
        onEdit={handleEdit}
      />)}</div>{items.length === 0 && <div className="text-center py-12"><p className="text-muted-foreground">No items found</p></div>}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Item</DialogTitle>
            </DialogHeader>
            {editingItem && (
              <ItemForm
                initialData={editingItem}
                onSubmit={updateItemMutation.mutate}
                isLoading={updateItemMutation.isPending}
              />
            )}
          </DialogContent>
        </Dialog>
      </TabsContent><TabsContent value="contacts" className="mt-6"><div className="space-y-4">{contacts.map((contact) => <Card key={contact.id}><CardHeader><div className="flex items-start justify-between"><div><div className="flex items-center gap-2"><CardTitle>{contact.subject}</CardTitle>{contact.status === "unread" && <Badge variant="destructive">New</Badge>}</div><CardDescription>
        From: {contact.name} ({contact.email})
      </CardDescription><p className="text-sm text-muted-foreground mt-1">{format(new Date(contact.date), "PPpp")}</p></div><div className="flex gap-2">{contact.status === "unread" && <Button
        variant="outline"
        size="icon"
        onClick={() => markAsReadMutation.mutate(contact.id)}
      ><Eye className="h-4 w-4" /></Button>}<Button
        variant="destructive"
        size="icon"
        onClick={() => deleteContactMutation.mutate(contact.id)}
      ><Trash2 className="h-4 w-4" /></Button></div></div></CardHeader><CardContent><p className="text-sm whitespace-pre-wrap">{contact.message}</p></CardContent></Card>)}</div>{contacts.length === 0 && <div className="text-center py-12"><p className="text-muted-foreground">No contact messages</p></div>}</TabsContent>

      <TabsContent value="users" className="mt-6">
        <div className="space-y-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>{user.name}</CardTitle>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                      <Badge variant={user.status === "active" ? "outline" : "destructive"}>
                        {user.status}
                      </Badge>
                    </div>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {user.id !== currentUser.id ? (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditUser(user)}
                          title="Edit user"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteUser(user)}
                          title="Delete user"
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                        {user.role !== "admin" && (
                          user.status === "active" ? (
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateUserStatusMutation.mutate({ userId: user.id, status: "blocked" })}
                              title="Block user"
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateUserStatusMutation.mutate({ userId: user.id, status: "active" })}
                              title="Unblock user"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )
                        )}
                      </>
                    ) : (
                      <Badge variant="secondary">Current User</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No users found</p>
          </div>
        )}
      </TabsContent>
    </Tabs>

    {/* User Edit Dialog */}
    {editingUser && (
      <UserEditDialog
        user={editingUser}
        open={isUserDialogOpen}
        onOpenChange={setIsUserDialogOpen}
        onSubmit={(userData) => updateUserMutation.mutate({ userId: editingUser.id, userData })}
        isLoading={updateUserMutation.isPending}
      />
    )}

    {/* User Delete Confirmation Dialog */}
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the user account for <strong>{deletingUser?.name}</strong> ({deletingUser?.email}).
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmDeleteUser}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div></main><Footer /></div>;
};
var stdin_default = Admin;
export {
  stdin_default as default
};
