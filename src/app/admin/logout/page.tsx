"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        router.push('/login');
    };

    const handleCancel = () => {
        router.back(); 
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                        Are you sure you want to logout?
                    </h2>
                    <p className="text-gray-600">
                        You will be redirected to the login page.
                    </p>
                </div>
                
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;