'use client';
import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { User } from '../types/user.type';

interface SocketContextType {
  socket: React.MutableRefObject<WebSocket | null>;
  sendMessage: (message: object) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);
// Helper function to convert date from dd/mm/yyyy to yyyy-mm-dd
function convertDateToISO(date: string | null): string | null {
  if (!date) return null;
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
}

const processData = (data): User => {
  return {
    id: data.id || null,
    chip_authen: data.chip_authen || null,
    verify_sod: data.verify_sod || null,
    date_of_birth: convertDateToISO(data.dateOfBirth) || null,
    expiry_date: convertDateToISO(data.expiryDate) || null,
    gender: data.gender || null,
    id_code: data.idCode || null,
    issue_date: convertDateToISO(data.issueDate) || null,
    nationality: data.nationality || null,
    old_id_code: data.oldIdCode || null,
    origin_place: data.originPlace || null,
    full_name: data.personName || null,
    personal_identification: data.personalIdentification || null,
    race: data.race || null,
    religion: data.religion || null,
    residence_place: data.residencePlace || null,
    mother_name: data.motherName || null,
    father_name: data.fatherName || null,
    wife_name: data.wifeName || null,
    human_name: data.humanName || null,
    profile_image_url: data.profileImageURL || null,
    created_at: data.createdAt || null,
    updated_at: data.updatedAt || null,
  };
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<WebSocket | null>(null);
  const { user, setUser } = useUser();
  useEffect(() => {
    socketRef.current = new WebSocket('ws://192.168.1.116:8000');

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
    };

    socketRef.current.onmessage = (event) => {
      let data;
      if (event.data.includes('Đã kết nối!')) {
        console.log('Connection message received:', event.data);
        return;
      }

      try {
        data = JSON.parse(event.data);
        console.log('Message from server:', data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return;
      }
      if (data.id === '2') {
        setUser((prevUser) => ({
          ...prevUser,
          ...processData(data.data),
        }));
      } else if (data.id === '4') {
        setUser((prevUser) => ({
          ...prevUser,
          profile_image_url: data.data.img_data,
        }));
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    return () => {
      socketRef.current?.close();
      console.log('WebSocket closed');
    };
  }, []);

  useEffect(() => {
    if (user.id_code && user.profile_image_url) {
      console.log('Updated user:', user);

      const createUser = async () => {
        try {
          const response = await axios.post(
            'http://localhost:8080/api/v1/patients',
            user,
          );

          console.log('User created successfully:', response.data);
        } catch (error) {
          console.error('Error creating user:', error);
        }
      };

      createUser();
    }
  }, [user]);

  const sendMessage = (message: object) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
      console.log('Message sent:', message);
    } else {
      console.error('WebSocket is not open.');
    }
  };

  return (
    <SocketContext.Provider value={{ socket: socketRef, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

const defaultUser: User = {
  id: null,
  chip_authen: null,
  verify_sod: null,
  date_of_birth: null,
  expiry_date: null,
  gender: null,
  id_code: null,
  issue_date: null,
  nationality: null,
  old_id_code: null,
  origin_place: null,
  full_name: null,
  personal_identification: null,
  race: null,
  religion: null,
  residence_place: null,
  mother_name: null,
  father_name: null,
  wife_name: null,
  human_name: null,
  profile_image_url: null,
  created_at: null,
  updated_at: null,
};

// Tạo Provider
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUser);

  // Hàm xóa thông tin user (đặt lại về trạng thái mặc định)
  const clearUser = () => setUser(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook để sử dụng UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
