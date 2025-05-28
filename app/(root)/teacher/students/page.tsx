"use client";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import {
  Users,
  School,
  Search,
  CheckCircle,
  Loader2,
  GraduationCap,
  BookOpen,
  Sparkles,
  Filter,
  ArrowRight,
  UserCheck,
  X,
  Building,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function UsersList() {
  const { user: currentUser } = useUser();
  const router = useRouter();
  const users = useQuery(api.users.getAllUsers);
  const assignPlan = useMutation(api.users.assignInstitutionPlan);
  const logAssignment = useMutation(api.assignments.logAssignment);

  const [selectedUserId, setSelectedUserId] = useState<Id<"users"> | null>(
    null
  );
  const [schoolName, setSchoolName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "teacher" | "student">(
    "all"
  );
  const [isAssigning, setIsAssigning] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Filter users based on search query and role filter
  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleAssign = async () => {
    if (!selectedUserId || !schoolName || !currentUser) {
      setMessage({
        type: "error",
        text: "Please select a user and enter a school name",
      });
      setTimeout(() => setMessage(null), 5000);
      return;
    }

    setIsAssigning(true);
    setMessage(null);

    try {
      // Find the selected user details
      const selectedUser = users?.find((user) => user._id === selectedUserId);
      if (!selectedUser) {
        throw new Error("Selected user not found");
      }

      // Assign the plan - this will handle authentication and role checking
      await assignPlan({
        userId: selectedUserId,
        schoolName,
      });

      // Log the assignment for activity tracking
      await logAssignment({
        assignedToUserId: selectedUserId,
        assignedToUserName: selectedUser.name,
        assignedToUserEmail: selectedUser.email,
        schoolName,
        assignedByUserId: currentUser.id,
        assignedByUserName: currentUser.fullName || "Unknown User",
      });

      setMessage({
        type: "success",
        text: `Institution plan for ${schoolName} has been assigned successfully to ${selectedUser.name}`,
      });

      // Reset form
      setSelectedUserId(null);
      setSchoolName("");
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsAssigning(false);
    }
  };

  const clearSelectedUser = () => {
    setSelectedUserId(null);
  };

  const selectedUser = users?.find((user) => user._id === selectedUserId);
  const teacherCount =
    users?.filter((user) => user.role === "teacher").length || 0;
  const studentCount =
    users?.filter((user) => user.role === "student").length || 0;

  const handleGoBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 via-zinc-800 to-zinc-950 text-zinc-100 relative'>
      {/* Additional gradient overlay for more depth */}
      <div className='absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent via-blue-500/5 to-purple-500/5 pointer-events-none' />
      <div className='absolute top-6 left-6 z-10'>
        <button
          onClick={handleGoBack}
          className='flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 shadow-sm border border-zinc-200 dark:border-zinc-700'
          aria-label='Go back'>
          <ArrowLeft className='w-5 h-5 text-zinc-600 dark:text-zinc-400' />
        </button>
      </div>
      {/* Header Section */}
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10' />
        <div className='relative container mx-auto px-6 py-12'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-4'>
              <Sparkles className='w-4 h-4' />
              Admin Dashboard
            </div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-4'>
              User Management
            </h1>
            <p className='text-zinc-400 text-lg max-w-2xl mx-auto'>
              Manage users and assign institution plans with ease. Select users
              and assign them to schools seamlessly.
            </p>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            <div className='bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 hover:bg-zinc-900/70 transition-all duration-300'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-emerald-500/20 rounded-xl'>
                  <Users className='w-6 h-6 text-emerald-400' />
                </div>
                <div>
                  <p className='text-2xl font-bold text-white'>
                    {users?.length || 0}
                  </p>
                  <p className='text-zinc-400 text-sm'>Total Users</p>
                </div>
              </div>
            </div>

            <div className='bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 hover:bg-zinc-900/70 transition-all duration-300'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-blue-500/20 rounded-xl'>
                  <GraduationCap className='w-6 h-6 text-blue-400' />
                </div>
                <div>
                  <p className='text-2xl font-bold text-white'>
                    {teacherCount}
                  </p>
                  <p className='text-zinc-400 text-sm'>Teachers</p>
                </div>
              </div>
            </div>

            <div className='bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 hover:bg-zinc-900/70 transition-all duration-300'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-purple-500/20 rounded-xl'>
                  <BookOpen className='w-6 h-6 text-purple-400' />
                </div>
                <div>
                  <p className='text-2xl font-bold text-white'>
                    {studentCount}
                  </p>
                  <p className='text-zinc-400 text-sm'>Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative container mx-auto px-6 pb-12'>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
          {/* Users List Section */}
          <div className='xl:col-span-2'>
            <div className='bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl'>
              <div className='p-6 border-b border-zinc-800/50'>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-emerald-500/20 rounded-lg'>
                      <Users className='h-5 w-5 text-emerald-400' />
                    </div>
                    <div>
                      <h2 className='text-xl font-semibold text-white'>
                        Select User
                      </h2>
                      <p className='text-zinc-400 text-sm'>
                        Choose a user to assign an institution plan
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-sm font-medium'>
                      {filteredUsers?.length || 0} users
                    </div>
                  </div>
                </div>

                {/* Search and Filter - INCREASED SEARCH SIZE */}
                <div className='flex flex-col sm:flex-row gap-4'>
                  <div className='relative flex-1'>
                    <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500' />
                    <input
                      type='text'
                      placeholder='Search by name, email, or role...'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className='w-full pl-12 pr-4 py-3.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 text-base'
                    />
                  </div>
                  <div className='relative'>
                    <Filter className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500' />
                    <select
                      value={roleFilter}
                      onChange={(e) =>
                        setRoleFilter(
                          e.target.value as "all" | "teacher" | "student"
                        )
                      }
                      className='pl-10 pr-8 py-3.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 appearance-none cursor-pointer'>
                      <option value='all'>All Roles</option>
                      <option value='teacher'>Teachers</option>
                      <option value='student'>Students</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='p-6'>
                {!users ? (
                  <div className='flex justify-center items-center py-16'>
                    <div className='text-center'>
                      <Loader2 className='h-12 w-12 text-emerald-500 animate-spin mx-auto mb-4' />
                      <p className='text-zinc-400'>Loading users...</p>
                    </div>
                  </div>
                ) : filteredUsers?.length === 0 ? (
                  <div className='text-center py-16 text-zinc-400'>
                    <div className='bg-zinc-800/50 p-6 rounded-2xl inline-block mb-4'>
                      <Users className='h-12 w-12 mx-auto text-zinc-600' />
                    </div>
                    <p className='text-lg font-medium mb-2'>No users found</p>
                    <p className='text-sm'>
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                ) : (
                  <div className='space-y-3'>
                    {filteredUsers?.map((user) => (
                      <div
                        key={user._id.toString()}
                        className={`group p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                          selectedUserId === user._id
                            ? "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border-emerald-500/50 shadow-lg shadow-emerald-500/20"
                            : "bg-zinc-800/30 border-zinc-700/50 hover:bg-zinc-800/50 hover:border-zinc-600/50"
                        }`}
                        onClick={() => setSelectedUserId(user._id)}>
                        <div className='flex items-center gap-4'>
                          <div className='relative'>
                            <div
                              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                selectedUserId === user._id
                                  ? "border-emerald-400 bg-emerald-500/20"
                                  : "border-zinc-600 group-hover:border-zinc-500"
                              }`}>
                              {selectedUserId === user._id ? (
                                <CheckCircle className='w-6 h-6 text-emerald-400' />
                              ) : user.role === "teacher" ? (
                                <GraduationCap className='w-6 h-6 text-blue-400' />
                              ) : (
                                <BookOpen className='w-6 h-6 text-purple-400' />
                              )}
                            </div>
                            {selectedUserId === user._id && (
                              <div className='absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center'>
                                <div className='w-2 h-2 bg-white rounded-full' />
                              </div>
                            )}
                          </div>

                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-3 mb-1'>
                              <h3 className='font-semibold text-white truncate'>
                                {user.name}
                              </h3>
                              <div
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                  user.role === "teacher"
                                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                    : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                }`}>
                                {user.role}
                              </div>
                            </div>
                            {user.email && (
                              <p className='text-sm text-zinc-400 truncate'>
                                {user.email}
                              </p>
                            )}
                          </div>

                          <ArrowRight
                            className={`w-5 h-5 transition-all duration-300 ${
                              selectedUserId === user._id
                                ? "text-emerald-400 translate-x-1"
                                : "text-zinc-600 group-hover:text-zinc-400"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Assignment Form Section */}
          <div className='xl:col-span-1'>
            <div className='bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl sticky top-6'>
              <div className='p-6 border-b border-zinc-800/50'>
                <div className='flex items-center gap-3 mb-2'>
                  <div className='p-2 bg-emerald-500/20 rounded-lg'>
                    <School className='h-5 w-5 text-emerald-400' />
                  </div>
                  <div>
                    <h2 className='text-xl font-semibold text-white'>
                      Assign Plan
                    </h2>
                    <p className='text-zinc-400 text-sm'>
                      Configure institution assignment
                    </p>
                  </div>
                </div>
              </div>

              <div className='p-6 space-y-6'>
                {/* Selected User Display with Remove Button */}
                {selectedUser ? (
                  <div className='p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 relative'>
                    {/* Remove User Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearSelectedUser();
                      }}
                      className='absolute top-3 right-3 p-1.5 rounded-full bg-zinc-800/70 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors'
                      aria-label='Remove selected user'>
                      <X className='w-4 h-4' />
                    </button>

                    <div className='flex items-center gap-3 mb-3'>
                      <div className='w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center'>
                        <UserCheck className='w-5 h-5 text-emerald-400' />
                      </div>
                      <div>
                        <p className='font-semibold text-white'>
                          Selected User
                        </p>
                        <p className='text-xs text-emerald-400'>
                          Ready for assignment
                        </p>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <div className='font-medium text-zinc-200'>
                        {selectedUser.name}
                      </div>
                      <div className='flex items-center gap-2'>
                        <div
                          className={`px-2 py-1 rounded-md text-xs font-medium ${
                            selectedUser.role === "teacher"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                              : "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                          }`}>
                          {selectedUser.role}
                        </div>
                      </div>
                      {selectedUser.email && (
                        <div className='text-sm text-zinc-400'>
                          {selectedUser.email}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className='p-6 rounded-xl bg-zinc-800/30 border border-zinc-800 text-center'>
                    <div className='w-12 h-12 rounded-full bg-zinc-700/50 flex items-center justify-center mx-auto mb-3'>
                      <Users className='w-6 h-6 text-zinc-500' />
                    </div>
                    <p className='text-zinc-500 text-sm font-medium'>
                      No user selected
                    </p>
                    <p className='text-zinc-600 text-xs mt-1'>
                      Choose a user from the list
                    </p>
                  </div>
                )}

                {/* School Name Input - BALANCED SIZE */}
                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <Building className='w-4 h-4 text-emerald-400' />
                    <label
                      htmlFor='schoolName'
                      className='text-sm font-semibold text-zinc-300'>
                      Institution Name
                    </label>
                  </div>
                  <div className='relative'>
                    <input
                      id='schoolName'
                      type='text'
                      placeholder='Enter school or institution name'
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className='w-full px-4 py-2 bg-zinc-800/70 border border-zinc-700/70 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500/70 transition-all duration-200'
                    />
                    <School className='absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500' />
                  </div>
                </div>

                {/* Message Display */}
                {message && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium border ${
                      message.type === "success"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}>
                    {message.text}
                  </div>
                )}

                <button
                  onClick={handleAssign}
                  disabled={!selectedUserId || !schoolName || isAssigning}
                  className='w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-zinc-700 disabled:to-zinc-700 disabled:text-zinc-500 text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 disabled:shadow-none transform hover:scale-[1.02] disabled:hover:scale-100'>
                  {isAssigning ? (
                    <>
                      <Loader2 className='h-5 w-5 animate-spin' />
                      Assigning Plan...
                    </>
                  ) : (
                    <>
                      <School className='h-5 w-5' />
                      Assign Institution Plan
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
