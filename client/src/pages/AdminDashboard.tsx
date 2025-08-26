import React, { useEffect, useMemo, useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type AdminUser = { _id: string; fullName: string; email: string; role: "user" | "admin"; createdAt?: string };
type AdminContent = {
  _id: string;
  title: string;
  author?: { fullName: string; email: string };
  status: "pending" | "approved" | "rejected";
  createdAt?: string;
};

const API_BASE = "http://localhost:5000";

const AdminDashboard: React.FC = () => {
  const { isLoggedIn, currentUser } = useContent();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [contents, setContents] = useState<AdminContent[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [search, setSearch] = useState("");

  const token = useMemo(() => localStorage.getItem("ghumda-token") || "", []);

  const isAdmin = isLoggedIn && currentUser?.role === "admin";

  useEffect(() => {
    if (!isAdmin) return;
    const fetchData = async () => {
      try {
        const [uRes, cRes] = await Promise.all([
          fetch(`${API_BASE}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/admin/content${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        const uData = await uRes.json();
        const cData = await cRes.json();
        if (!uRes.ok) throw new Error(uData?.message || "Failed to load users");
        if (!cRes.ok) throw new Error(cData?.message || "Failed to load content");
        setUsers(uData);
        setContents(cData);
      } catch (e) {
        const err = e as { message?: string };
        toast(err?.message || "Failed to load admin data");
      }
    };
    fetchData();
  }, [isAdmin, token, statusFilter]);

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card>
          <CardContent className="p-8">
            <p className="text-lg">Access denied. Admins only.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const setRole = async (id: string, role: "user" | "admin") => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${id}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to update role");
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role: data.role } : u)));
      toast("Role updated");
    } catch (e) {
      toast((e as { message?: string })?.message || "Failed to update role");
    }
  };

  const review = async (id: string, action: "approve" | "reject") => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/content/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to review content");
      setContents((prev) => prev.map((c) => (c._id === id ? { ...c, status: data.status } : c)));
      toast(action === "approve" ? "Content approved" : "Content rejected");
    } catch (e) {
      toast((e as { message?: string })?.message || "Failed to review content");
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content Review</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
              <CardContent className="text-3xl font-bold">{users.length}</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Pending Content</CardTitle></CardHeader>
              <CardContent className="text-3xl font-bold">{contents.filter(c => c.status === "pending").length}</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Approved Content</CardTitle></CardHeader>
              <CardContent className="text-3xl font-bold">{contents.filter(c => c.status === "approved").length}</CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <CardTitle>Users</CardTitle>
              <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full md:w-64" />
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="p-2">Name</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Role</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u._id} className="border-t">
                        <td className="p-2">{u.fullName}</td>
                        <td className="p-2">{u.email}</td>
                        <td className="p-2">
                          <Badge variant={u.role === "admin" ? "default" : "secondary"}>{u.role}</Badge>
                        </td>
                        <td className="p-2 space-x-2">
                          {u.role !== "admin" ? (
                            <Button size="sm" onClick={() => setRole(u._id, "admin")}>Promote</Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => setRole(u._id, "user")}>Demote</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <CardTitle>Content Review</CardTitle>
              <div className="flex gap-2">
                {(["all", "pending", "approved", "rejected"] as const).map((s) => (
                  <Button key={s} variant={statusFilter === s ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(s)}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="p-2">Title</th>
                      <th className="p-2">Author</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Submitted</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contents.map((c) => (
                      <tr key={c._id} className="border-t">
                        <td className="p-2">{c.title}</td>
                        <td className="p-2">{c.author?.fullName || ""}</td>
                        <td className="p-2">
                          <Badge variant={c.status === "approved" ? "default" : c.status === "pending" ? "secondary" : "destructive"}>{c.status}</Badge>
                        </td>
                        <td className="p-2">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ""}</td>
                        <td className="p-2 space-x-2">
                          <Button size="sm" variant="outline" onClick={() => review(c._id, "approve")} disabled={c.status === "approved"}>Approve</Button>
                          <Button size="sm" variant="destructive" onClick={() => review(c._id, "reject")} disabled={c.status === "rejected"}>Reject</Button>
                          <Button size="sm" onClick={() => window.open(`/content/${c._id}`, "_blank")}>Review</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;


