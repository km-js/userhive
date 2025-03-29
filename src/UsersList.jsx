import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  Hexagon,
  Search,
  Edit,
  Trash2,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  LogOut,
  MoreHorizontal,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@//components/ui/dropdown-menu";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [actionError, setActionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmUser, setDeleteConfirmUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // Load from storage first (if available)
    const loadFromStorage = () => {
      const storedUsers = localStorage.getItem("users");
      const storedTotalPages = localStorage.getItem("totalPages");

      if (storedUsers && storedTotalPages) {
        setUsers(JSON.parse(storedUsers));
        setTotalPages(parseInt(storedTotalPages));
        return true;
      }
      return false;
    };

    const fetchUsers = async () => {
      // Try to load from storage first
      if (loadFromStorage()) {
        // Still fetch in the background to get fresh data
        fetchFromApi(false);
        return;
      }

      // If not in storage, show loading and fetch
      fetchFromApi(true);
    };

    const fetchFromApi = async (showLoading) => {
      if (showLoading) setLoading(true);
      try {
        const response = await fetch(
          `https://reqres.in/api/users?page=${currentPage}`
        );
        const data = await response.json();
        if (response.ok) {
          setUsers(data.data);
          setTotalPages(data.total_pages);
          setError("");

          // Store in both localStorage and sessionStorage
          localStorage.setItem("users", JSON.stringify(data.data));
          localStorage.setItem("totalPages", data.total_pages.toString());
          sessionStorage.setItem("users", JSON.stringify(data.data));
          sessionStorage.setItem("totalPages", data.total_pages.toString());
        } else {
          setError("Failed to fetch users");
        }
      } catch (err) {
        setError("An error occurred while fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setActionError("");
    try {
      const response = await fetch(
        `https://reqres.in/api/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: editingUser.first_name,
            last_name: editingUser.last_name,
            email: editingUser.email,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        const updatedUsers = users.map((user) =>
          user.id === editingUser.id ? { ...user, ...editingUser } : user
        );

        setUsers(updatedUsers);
        setEditingUser(null);

        // Update storage
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        sessionStorage.setItem("users", JSON.stringify(updatedUsers));
      } else {
        setActionError(data.error || "Failed to update user");
      }
    } catch (err) {
      setActionError("An error occurred while updating user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (userId) => {
    setIsSubmitting(true);
    setActionError("");
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const filteredUsers = users.filter((user) => user.id !== userId);
        setUsers(filteredUsers);

        // Update storage
        localStorage.setItem("users", JSON.stringify(filteredUsers));
        sessionStorage.setItem("users", JSON.stringify(filteredUsers));
      } else {
        setActionError("Failed to delete user");
      }
    } catch (err) {
      setActionError("An error occurred while deleting user");
    } finally {
      setIsSubmitting(false);
      setDeleteConfirmUser(null);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* Navbar */}
      <nav className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800 px-4 py-3 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-6 w-6 text-violet-500 fill-violet-950" />
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-500 text-transparent bg-clip-text">
              UserHive
            </span>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-1 w-full container mx-auto p-4 sm:p-6">
        <Card className="w-full border-0 bg-slate-900/50 backdrop-blur-md border border-slate-800 shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-white">
              User Management
            </CardTitle>
            <CardDescription className="text-center text-slate-400">
              Manage your users and their information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500 w-full"
                />
              </div>
            </div>

            {/* Error display */}
            {error && (
              <Alert className="mb-6 bg-red-900/50 border-red-800 text-red-200">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 text-violet-500 animate-spin" />
                <span className="ml-2 text-slate-400">Loading users...</span>
              </div>
            )}

            {/* No results */}
            {!loading && filteredUsers.length === 0 && (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                  <Users className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  No users found
                </h3>
                <p className="text-slate-400">
                  Try adjusting your search or go to another page
                </p>
              </div>
            )}

            {/* Users table */}
            {!loading && filteredUsers.length > 0 && (
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="min-w-full divide-y divide-slate-800">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900/30 divide-y divide-slate-800">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-3">
                              <div className="relative">
                                {user.avatar ? (
                                  <div className="absolute inset-0 rounded-full shadow-inner ring-2 ring-violet-500/30"></div>
                                ) : null}
                                <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gradient-to-br from-violet-500/20 to-indigo-600/20 flex items-center justify-center border border-violet-500/20">
                                  {user.avatar ? (
                                    <img
                                      src={user.avatar}
                                      alt={`${user.first_name} ${user.last_name}`}
                                      className="h-10 w-10 object-cover"
                                    />
                                  ) : (
                                    <span className="text-sm font-medium text-slate-200">
                                      {getInitials(
                                        user.first_name,
                                        user.last_name
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                {user.first_name} {user.last_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {user.email && (
                            <div className="text-sm text-slate-400">
                              {user.email}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-40 bg-slate-900 border-slate-800 text-slate-200"
                            >
                              <DropdownMenuItem
                                onClick={() => setEditingUser(user)}
                                className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800"
                              >
                                <Edit className="mr-2 h-4 w-4 text-violet-400" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setDeleteConfirmUser(user)}
                                className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800 text-red-400"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {!loading && filteredUsers.length > 0 && (
              <div className="flex justify-center items-center space-x-4 mt-6">
                <Button
                  onClick={handlePrevious}
                  disabled={currentPage === 1 || isSubmitting}
                  variant="outline"
                  className={
                    currentPage === 1
                      ? "bg-slate-800/30 text-slate-500 cursor-not-allowed"
                      : "bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700"
                  }
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <span className="text-sm text-slate-400">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={handleNext}
                  disabled={currentPage === totalPages || isSubmitting}
                  variant="outline"
                  className={
                    currentPage === totalPages
                      ? "bg-slate-800/30 text-slate-500 cursor-not-allowed"
                      : "bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700"
                  }
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <Card className="w-full max-w-md border-0 bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl">
            <CardHeader className="space-y-1 border-b border-slate-800">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <Edit className="h-5 w-5 mr-2 text-violet-400" />
                  Edit User
                </CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => setEditingUser(null)}
                  className="text-slate-400 hover:text-white hover:bg-slate-800/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <form onSubmit={handleEditSubmit}>
              <CardContent className="pt-6">
                {/* User Avatar Preview */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center">
                      {editingUser.avatar ? (
                        <img
                          src={editingUser.avatar}
                          alt={`${editingUser.first_name} ${editingUser.last_name}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-medium text-slate-200">
                          {getInitials(
                            editingUser.first_name,
                            editingUser.last_name
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-slate-300"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={editingUser.first_name}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        first_name: e.target.value,
                      })
                    }
                    className="mt-1 bg-slate-800/50 border-slate-700 text-white focus:border-violet-500 focus:ring-violet-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-slate-300"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={editingUser.last_name}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        last_name: e.target.value,
                      })
                    }
                    className="mt-1 bg-slate-800/50 border-slate-700 text-white focus:border-violet-500 focus:ring-violet-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-300"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={editingUser.email || ""}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    className="mt-1 bg-slate-800/50 border-slate-700 text-white focus:border-violet-500 focus:ring-violet-500"
                    required
                  />
                </div>

                {actionError && (
                  <Alert className="mb-4 bg-red-900/50 border-red-800 text-red-200">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <AlertDescription>{actionError}</AlertDescription>
                  </Alert>
                )}
              </CardContent>

              <CardFooter className="flex justify-between border-t border-slate-800 pt-4">
                <Button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  variant="outline"
                  className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <Card className="w-full max-w-md border-0 bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl">
            <CardHeader className="space-y-1 border-b border-slate-800">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
                  Confirm Deletion
                </CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => setDeleteConfirmUser(null)}
                  className="text-slate-400 hover:text-white hover:bg-slate-800/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/20 flex items-center justify-center">
                  {deleteConfirmUser.avatar ? (
                    <img
                      src={deleteConfirmUser.avatar}
                      alt={`${deleteConfirmUser.first_name} ${deleteConfirmUser.last_name}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium text-slate-200">
                      {getInitials(
                        deleteConfirmUser.first_name,
                        deleteConfirmUser.last_name
                      )}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">
                    {deleteConfirmUser.first_name} {deleteConfirmUser.last_name}
                  </p>
                  {deleteConfirmUser.email && (
                    <p className="text-slate-400 text-sm">
                      {deleteConfirmUser.email}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-slate-300 text-center mb-2">
                Are you sure you want to delete this user?
              </p>
              <p className="text-slate-400 text-sm text-center">
                This action cannot be undone.
              </p>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-slate-800 pt-4">
              <Button
                type="button"
                onClick={() => setDeleteConfirmUser(null)}
                variant="outline"
                className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(deleteConfirmUser.id)}
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete User
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}

export default UsersList;
