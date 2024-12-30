'use client';
import { User } from '@/app/types/user.type';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

const UserList = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = async (keyword: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/patients/${keyword}`,
        { validateStatus: (status) => status < 500 },
      );

      if (response.status === 404) {
        setError('Không tìm thấy. Vui lòng kiểm tra lại căn cước.');
        setUser(null);
        return;
      }

      if (response.data[0]) {
        setUser(response.data[0]);
        setError(null);
        console.log(user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setError('Vui lòng nhập từ khóa để tìm kiếm.');
      setUser(null);
      return;
    }
    fetchUser(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mt-8">
          <Link href="/user/register">
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
              Đăng ký hồ sơ mới
            </button>
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center my-8 text-gray-900">
          Tra cứu hồ sơ
        </h1>

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <div className="flex gap-2 items-center w-full sm:w-2/3 md:w-1/2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo số CMND..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
            />
            <button
              onClick={handleSearch}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md transform hover:scale-105"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-center mb-4 font-semibold">
            {error}
          </div>
        )}

        {/* Displaying user */}
        {loading ? (
          <div className="flex justify-center items-center text-lg text-gray-700">
            Đang tải...
          </div>
        ) : user ? (
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="text-xl font-semibold text-gray-800 mb-2">
              {user.full_name}
            </div>
            <div className="text-sm text-gray-500">Số CMND: {user.id_code}</div>
            <div className="text-sm text-gray-500">
              Ngày sinh: {user.date_of_birth}
            </div>
            <div className="mt-4 text-right">
              <Link href={`/user/${user.id_code}`}>
                <button className="text-gray-500 hover:text-gray-600 transition-all duration-300 font-medium">
                  Chi tiết
                </button>
              </Link>
            </div>
          </div>
        ) : (
          !error && (
            <div className="text-center text-gray-500">
              Vui lòng nhập đúng căn cước công dân.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserList;
