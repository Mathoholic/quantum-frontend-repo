"use client";

import React, { useState, useEffect, useRef } from "react";
import { Edit, Trash2, X, Loader } from "lucide-react";
import Swal from "sweetalert2";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface IMember {
  uuid: string;
  memberName: string;
  memberRole: string;
  memberEmail: string;
  memberMobile: string;
  memberId: string;
  memberDesination: string;
  description: string;
  profilePic: string | null;
  order: string;
  userImageFile: File | null;
}

const Members = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [members, setMembers] = useState<IMember[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<IMember | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState("");
  const [loader, setLoaderFlag] = useState<boolean>(false);
  const [isLoading, setGenerateLoader] = useState<boolean>(false);
  const [memberIDPresent, setMemberIDPresent] = useState<boolean>(false);
  const [newMemberData, setNewMemberData] = useState<IMember>({
    uuid: "",
    memberName: "",
    memberRole: "",
    memberEmail: "",
    memberMobile: "",
    memberId: "",
    memberDesination: "",
    description: "",
    profilePic: "",
    order: "",
    userImageFile: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoaderFlag(true);
    const payload = {
      offset: 1,
      pageSize: 10000,
    };

    try {
      const response = await fetch(
        // `https://api.quantumkids.in/team/get?offset=${payload.offset}&pageSize=${payload.pageSize}`,
        `https://api.quantumkids.in/team`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
        setLoaderFlag(false);
      }

      const data = await response.json();
      setMemberIDPresent(false);
      const mappedData = data.map((item: IMember) => ({
        uuid: item.uuid,
        memberName: item.memberName,
        memberRole: item.memberRole,
        memberEmail: item.memberEmail,
        memberMobile: item.memberMobile,
        memberId: item.memberId,
        memberDesination: item.memberDesination,  
        description: item.description,
        profilePic: item.profilePic,
        order: item.order,
      }));
      setMembers(mappedData);
      setLoaderFlag(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoaderFlag(false);
      setMemberIDPresent(false);
    }
  };

  // const handleEdit = (member: IMember) => {
  //   setEditFormData(member);
  //   setIsEditModalOpen(true);
  // };

  const handleDelete = async (memberId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await fetch(`https://api.quantumkids.in/team/delete?memberId=${memberId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        fetchData();
      } catch (error) {
        console.error("Failed to delete member:", error);
      } finally {
        Swal.fire("Deleted!", "Your Member has been deleted.", "success");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // if (editFormData) {
    //   setEditFormData({ ...editFormData, [name]: value });
    // } else {
    setNewMemberData({ ...newMemberData, [name]: value });
    console.log(newMemberData);
    // }
  };
  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editFormData) {
      setEditFormData({
        uuid: editFormData.uuid,
        memberName: editFormData.memberName,
        memberRole: editFormData.memberRole,
        memberEmail: editFormData.memberEmail,
        memberMobile: editFormData.memberMobile,
        memberId: editFormData.memberId,
        memberDesination: editFormData.memberDesination,
        description: editFormData.description,
        profilePic: editFormData.profilePic,
        order: editFormData.order,
        userImageFile: editFormData.userImageFile,
        [name]: value,
      });
    }
    if (name === "memberId" && value) {
      setDisableBtn(false);
    }
    if (name === "memberId" && !value) {
      setDisableBtn(true);
    }
  };
  const handleEdit = (member: any) => {
    setEditFormData(member);
    setIsEditModalOpen(true);
  };
  const handleUpdate = async (id: string) => {
    if (!editFormData) return;
    setGenerateLoader(true);
    const formData = new FormData();
    formData.append("memberName", editFormData.memberName);
    formData.append("memberRole", editFormData.memberRole);
    formData.append("memberEmail", editFormData.memberEmail);
    formData.append("memberMobile", editFormData.memberMobile);
    formData.append("memberId", editFormData.memberId);
    formData.append("memberDesination", editFormData.memberDesination);
    formData.append("description", editFormData.description);
    formData.append("order", editFormData.order);

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append("profilePic", file);
    } else if (imageFile) {
      formData.append("profilePic", imageFile);
    }

    try {
      const response = await fetch(`https://api.quantumkids.in/team/edit/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update member");
      }

      setIsEditModalOpen(false);
      setGenerateLoader(false);
      fetchData();
    } catch (error) {
      console.error("Failed to update member:", error);
      setGenerateLoader(false);
    }
  };

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    setGenerateLoader(true);
    setMemberIDPresent(false);
    if (!newMemberData.memberEmail) errors.memberEmail = "Email is required";
    if (!newMemberData.memberMobile) errors.memberMobile = "Mobile is required";
    if (!newMemberData.memberId) errors.memberId = "ID is required";
    if (!newMemberData.memberName) errors.memberName = "Name is required";
    if (!newMemberData.memberRole) errors.memberRole = "Role is required";
    if (!newMemberData.memberDesination)
      errors.memberDesination = "Designation is required";
    if (!newMemberData.order) errors.order = "Order is required";
    if (!newMemberData.description)
      errors.description = "Description is required";
    // if (!imageFile && !newMemberData.userImageFile) errors.userImageFile = 'Profile picture is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const [emailExists, setEmailExists] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false);
  const addNewMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    let profilePicPath = "";
    const formData = new FormData();
    formData.append("memberName", newMemberData.memberName);
    formData.append("memberRole", newMemberData.memberRole);
    formData.append("memberEmail", newMemberData.memberEmail);
    formData.append("memberMobile", newMemberData.memberMobile);
    formData.append("memberId", newMemberData.memberId);
    formData.append("memberDesination", newMemberData.memberDesination);
    formData.append("description", newMemberData.description);
    formData.append("order", newMemberData.order);
    //here check if email , mobile , is present or not if not then return and show erro in these fiel that fields are mandatory
    if (newMemberData?.memberId) {
      try {
        const response = await fetch(
          `https://api.quantumkids.in/team/member/${newMemberData.memberId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data?.data?.memberId === newMemberData.memberId) {
          setMemberIDPresent(true);
          setGenerateLoader(false);
          return;
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setMemberIDPresent(false);
        setGenerateLoader(false);
        
      }
    }
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append("profilePic", file);
      setImageFile(file);
    }
    try {
      const response = await fetch(`https://api.quantumkids.in/team/add`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to add new member");
      }
      const data = await response.json();
      if (data?.error) {
        const errorMessage = data.error;
        const emailRegex = /Duplicate entry '(.*?)' for key/;
        const match = emailRegex.exec(errorMessage);
        if (match && match[1] === newMemberData.memberEmail) {
          setEmailExists(true);
        } else if (match && match[1] === newMemberData.memberMobile) {
          setPhoneExists(true);
        } else {
          Swal.fire("Error!", "Failed to add new member", "error");
        }
      }
      if (data?.data?.uuid) {
        Swal.fire("Success!", "Member added successfully", "success");
        setNewMemberData({
          uuid: "",
          memberName: "",
          memberRole: "",
          memberEmail: "",
          memberMobile: "",
          memberId: "",
          memberDesination: "",
          description: "",
          profilePic: "",
          order: "",
          userImageFile: null,
        });
        setGenerateLoader(false);
        setIsAddModalOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error("Failed to add new member:", error);
      setGenerateLoader(false);
    }
  };
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div className="flex justify-end p-6 bg-slate-50">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-all duration-200 flex items-center gap-2"
        >
          <span className="font-medium">Add Member</span>
        </button>
      </div>

      <div className="p-6 bg-slate-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loader && (
            <div className="flex justify-center items-center h-screen">
              <Loader className="animate-spin text-blue-600" />
            </div>
          )}
          {members?.length === 0 && !loader && (
            <p className="text-gray-600 text-center font-medium">No members found</p>
          )}
          {members?.map((member) => (
            <div
              key={member.uuid}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Header Section */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={member.profilePic ?? undefined}
                      className="w-16 h-16 rounded-lg object-cover border-2 border-gray-50"
                      style={{ objectFit: "cover" }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {member.memberName}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {member.memberDesination}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(member.memberId)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6 space-y-3">
                <div className="grid grid-cols-2">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Role</p>
                      <p className="font-medium text-gray-900">{member.memberRole}</p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500 mb-1">ID</p>
                    <p className="font-medium text-gray-900">{member.memberId}</p>
                     
                    </div>
                    <div>
                    <p className="text-sm text-gray-500 mb-1">Order</p>
                    <p className="font-medium text-gray-900">{member.order}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{member.memberEmail}</p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-medium text-gray-900">{member.memberMobile}</p>
                     
                    </div>
                  </div>
                </div>
                
                <div className="pt-3">
        <p className="text-sm text-gray-500 mb-1">Description</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p 
                className="text-gray-900 line-clamp-2 hover:cursor-help"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {member.description}
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-md p-2">
            <p className="text-sm bg-gray-100 p-4 rounded-lg shadow-md text-gray-700">
              {member.description}
            </p>

            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && editFormData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Edit Member</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                    <img
                      src={editFormData.profilePic ?? undefined}
                      alt={editFormData.memberName}
                      className="member-image mb-2 inline-block"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="memberName"
                      value={editFormData.memberName}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      name="memberRole"
                      value={editFormData.memberRole}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="memberEmail"
                      value={editFormData.memberEmail}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile
                    </label>
                    <input
                      type="text"
                      name="memberMobile"
                      value={editFormData.memberMobile}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID
                    </label>
                    <input
                      type="text"
                      name="memberId"
                      value={editFormData.memberId}
                      onChange={handleEditInputChange}
                      disabled={true}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="memberDesination"
                      value={editFormData.memberDesination}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order
                    </label>
                    <input
                      name="order"
                      value={editFormData.order}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border rounded-md"
                      rows={9}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdate(editFormData.memberId)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                   <span>{isLoading ? <span className="loader mr-2 bg-white"></span> : "Update"}</span>
                   {isLoading && <span className="loader-text">Updating...</span>}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Add New Member</h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={addNewMember}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Member Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="w-full p-2 border rounded-md"
                      />
                      {/* {formErrors.userImageFile && <p className="text-red-600">{formErrors.userImageFile}</p>} */}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="memberName"
                        value={newMemberData.memberName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                      {formErrors.memberName && (
                        <p className="text-red-600">{formErrors.memberName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        name="memberRole"
                        value={newMemberData.memberRole}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                      {formErrors.memberRole && (
                        <p className="text-red-600">{formErrors.memberRole}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="memberEmail"
                        value={newMemberData.memberEmail}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                      {emailExists && (
                        <p className="text-red-600">Email already exists</p>
                      )}
                      {formErrors.memberEmail && (
                        <p className="text-red-600">{formErrors.memberEmail}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile
                      </label>
                      <input
                        type="text"
                        name="memberMobile"
                        value={newMemberData.memberMobile}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                      {phoneExists && (
                        <p className="text-red-600">Mobile already exists</p>
                      )}
                      {formErrors.memberMobile && (
                        <p className="text-red-600">
                          {formErrors.memberMobile}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID
                      </label>
                      <input
                        type="text"
                        name="memberId"
                        value={newMemberData.memberId}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                      {formErrors.memberId && (
                        <p className="text-red-600">{formErrors.memberId}</p>
                      )}
                      {memberIDPresent && (
                        <p className="text-red-500">
                          Member ID already present
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Designation
                      </label>
                      <input
                        type="text"
                        name="memberDesination"
                        value={newMemberData.memberDesination}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                      {formErrors.memberDesination && (
                        <p className="text-red-600">
                          {formErrors.memberDesination}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order
                      </label>
                      <input
                        name="order"
                        value={newMemberData.order}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                      {formErrors.order && (
                        <p className="text-red-600">{formErrors.order}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={newMemberData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        rows={5}
                      />
                      {formErrors.description && (
                        <p className="text-red-600">{formErrors.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    // disabled={memberIDPresent}
                  >
                    <span>{isLoading ? <span className="loader mr-2 bg-white"></span> : "Add"}</span>
                    {isLoading && <span className="loader-text">Adding...</span>} 
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Members;
