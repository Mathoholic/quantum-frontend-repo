"use client";

import React, { useState, useEffect } from "react";
import { Edit, Trash2, X } from "lucide-react";
import Swal from "sweetalert2";

interface IMember {
 
  uuid: string;
  memberName: string;
  memberRole: string;
  memberEmail: string;
  memberMobile: string;
  memberId: string;
  memberDesination: string;
  description: string;
  profilePic: string;
  order: string;
}

const Members = () => {
  const [members, setMembers] = useState<IMember[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<IMember | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [fileName , setFileName] = useState<string>("");
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
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const payload = {
      offset: 1,
      pageSize: 10000,
    };

    try {
      const response = await fetch(
        `http://localhost:3002/team/get?offset=${payload.offset}&pageSize=${payload.pageSize}`,
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

      const mappedData = data.data.data.map((item: any) => ({
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
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleEdit = (member: IMember) => {
    setEditFormData(member);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (memberId: string) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
    if (result.isConfirmed){
        try {
            await fetch(`http://localhost:3002/team/delete?memberId=${memberId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            fetchData();
          } catch (error) {
            console.error("Failed to delete member:", error);
          }
          finally{
            Swal.fire(
              'Deleted!',
              'Your Member has been deleted.',
              'success'
            )
          }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    debugger;
    const { name, value } = e.target;
    if (editFormData) {
      setEditFormData({ ...editFormData, [name]: value });
    } else {
      setNewMemberData({ ...newMemberData, [name]: value });
      console.log(newMemberData);
    }
  };

  const handleUpdate = async (id:string) => {
    if (!editFormData) return;
    debugger;
    try {
      await fetch(`http://localhost:3002/team/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });
      setIsEditModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to update member:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePic', file);
  
      try {
        const response = await fetch('http://localhost:3002/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
  
        const result = await response.json();
        const imagePath = result.path;
  
        // Set the uploaded image path in state
        setNewMemberData({ ...newMemberData, profilePic: imagePath });
        setFileName(imagePath);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  
  
  const addNewMember = async () => {
    debugger;
    try {
      await fetch(`http://localhost:3002/team/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMemberData),
      });
      setIsAddModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to add new member:", error);
    }
  };
  

  
  return (
    <>
    
      <div className="flex justify-end p-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Member
        </button>
      </div>

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.length === 0 && (
            <p className="text-gray-600 text-center">No members found</p>
          )}
          {members.map((member) => (
            <div
              key={member.uuid}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {member.memberName}
                  </h3>
                  <p className="text-gray-600">{member.memberDesination}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(member.memberId)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
              <img
                src={`http://localhost:3002${member.profilePic}`}
                alt={member.memberName}
                className="member-image"
              />
                <p className="text-gray-600">
                  <span className="font-medium">Role:</span> {member.memberRole}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span>{" "}
                  {member.memberEmail}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span>{" "}
                  {member.memberMobile}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">ID:</span> {member.memberId}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Description:</span>{" "}
                  {member.description}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Order:</span> {member.order}
                </p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e)}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      rows={3}
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
                  onClick={()=>handleUpdate(editFormData.memberId)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member Image
                    </label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
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
                      value={newMemberData.memberName}
                      onChange={handleInputChange}
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
                      value={newMemberData.memberRole}
                      onChange={handleInputChange}
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
                      value={newMemberData.memberEmail}
                      onChange={handleInputChange}
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
                      value={newMemberData.memberMobile}
                      onChange={handleInputChange}
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
                      value={newMemberData.memberId}
                      onChange={handleInputChange}
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
                      value={newMemberData.memberDesination}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
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
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={()=>{addNewMember()}}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Members;