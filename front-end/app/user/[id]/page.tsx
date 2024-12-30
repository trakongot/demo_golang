'use client';
import { User } from '@/app/types/user.type';
import { UserCard } from '@/components/userCard';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/patients/${id}`,
        );
        setUser(response.data[0] as User);
        setError(null);
      } catch (error) {
        console.error('Error fetching user:', error);
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setError('Không tìm thấy thông tin người dùng.');
        } else {
          setError('Có lỗi xảy ra khi tải dữ liệu.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
        <div className="text-lg text-gray-700">Đang tải thông tin...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center flex-col h-screen w-screen bg-gray-100">
        <div className="text-red-500 text-xl font-semibold">{error}</div>
        <button
          onClick={() => router.back()}
          className="mt-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 shadow-md"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Thông Tin Người Dùng
        </h1>

        {user && <UserCard user={user} />}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
          >
            Quay lại
          </button>
          <button
            onClick={() => router.push('/user-search')}
            className="ml-4 px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
          >
            cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
