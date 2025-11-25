import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contactsAPI } from "@/lib/api";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";
const ContactPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const createMutation = useMutation({
    mutationFn: (data) => contactsAPI.create(data),
    onSuccess: () => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.");
    }
  });
  const onSubmit = (data) => {
    createMutation.mutate({
      ...data,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      status: "unread"
    });
  };
  return <div className="min-h-screen flex flex-col"><Header /><main className="flex-1 py-8 pt-24"><div className="container max-w-5xl"><div className="mb-8"><h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
    Contact Us
  </h1><p className="text-muted-foreground">
      Have questions or need help? We're here to assist you
    </p></div><div className="grid md:grid-cols-2 gap-8"><Card><CardHeader><CardTitle>Send us a Message</CardTitle><CardDescription>
      Fill out the form and we'll get back to you as soon as possible
    </CardDescription></CardHeader><CardContent><form onSubmit={handleSubmit(onSubmit)} className="space-y-4"><div className="space-y-2"><Label htmlFor="name">Name *</Label><Input
      id="name"
      placeholder="Your full name"
      {...register("name", { required: "Name is required" })}
    />{errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}</div><div className="space-y-2"><Label htmlFor="email">Email *</Label><Input
      id="email"
      type="email"
      placeholder="your.email@student.unklab.ac.id"
      {...register("email", {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })}
    />{errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}</div><div className="space-y-2"><Label htmlFor="subject">Subject *</Label><Input
      id="subject"
      placeholder="What is this about?"
      {...register("subject", { required: "Subject is required" })}
    />{errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}</div><div className="space-y-2"><Label htmlFor="message">Message *</Label><Textarea
      id="message"
      placeholder="Your message..."
      rows={5}
      {...register("message", { required: "Message is required" })}
    />{errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}</div><Button
      type="submit"
      className="w-full bg-gradient-primary"
      disabled={createMutation.isPending}
    >{createMutation.isPending ? "Sending..." : "Send Message"}</Button></form></CardContent></Card><div className="space-y-6"><Card><CardHeader><CardTitle>Contact Information</CardTitle></CardHeader><CardContent className="space-y-4"><div className="flex items-start gap-3"><div className="p-2 rounded-lg bg-gradient-primary"><MapPin className="h-5 w-5 text-white" /></div><div><p className="font-medium">Address</p><p className="text-sm text-muted-foreground">
      Universitas Klabat<br />
      Airmadidi, North Sulawesi<br />
      Indonesia
    </p></div></div><div className="flex items-start gap-3"><div className="p-2 rounded-lg bg-gradient-primary"><Phone className="h-5 w-5 text-white" /></div><div><p className="font-medium">Phone</p><p className="text-sm text-muted-foreground">
      +62 812-3456-7890
    </p></div></div><div className="flex items-start gap-3"><div className="p-2 rounded-lg bg-gradient-primary"><Mail className="h-5 w-5 text-white" /></div><div><p className="font-medium">Email</p><p className="text-sm text-muted-foreground">
      lostandfound@unklab.ac.id
    </p></div></div></CardContent></Card><Card><CardHeader><CardTitle>Office Hours</CardTitle></CardHeader><CardContent><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Monday - Friday</span><span className="font-medium">8:00 AM - 5:00 PM</span></div><div className="flex justify-between"><span className="text-muted-foreground">Saturday</span><span className="font-medium">8:00 AM - 12:00 PM</span></div><div className="flex justify-between"><span className="text-muted-foreground">Sunday</span><span className="font-medium">Closed</span></div></div></CardContent></Card></div></div></div></main><Footer /></div>;
};
var stdin_default = ContactPage;
export {
  stdin_default as default
};
