import { User } from '@/app/types/user.type';
import Image from 'next/image';

export const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="mr-4">
          <Image
            src={`http://localhost:8080/imgs/${user.profile_image_url}`}
            alt="Your Image"
            width={150}
            height={300}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">{user.full_name}</p>
          <p className="text-sm text-gray-500">
            {user.gender} | {user.nationality}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <p className="font-semibold">ID:</p>
          <p>{user.id}</p>
        </div>
        <div>
          <p className="font-semibold">CI Number:</p>
          <p>{user.id_code}</p>
        </div>
        <div>
          <p className="font-semibold">Date of Birth:</p>
          <p>{user.date_of_birth}</p>
        </div>
        <div>
          <p className="font-semibold">Hometown:</p>
          <p>{user.religion}</p>
        </div>
        <div>
          <p className="font-semibold">Issued Date:</p>
          <p>{user.issue_date}</p>
        </div>
        <div>
          <p className="font-semibold">Expiration Date:</p>
          <p>{user.expiry_date}</p>
        </div>
        <div>
          <p className="font-semibold">Old CC Number:</p>
          <p>{user.old_id_code}</p>
        </div>
        <div>
          <p className="font-semibold">Ethnicity:</p>
          <p>{user.race}</p>
        </div>
        <div>
          <p className="font-semibold">Religion:</p>
          <p>{user.residence_place}</p>
        </div>
        <div>
          <p className="font-semibold">Personal Identification:</p>
          <p>{user.personal_identification}</p>
        </div>
        <div>
          <p className="font-semibold">Permanent Address:</p>
          <p>{user.race}</p>
        </div>
        <div>
          <p className="font-semibold">Father Name:</p>
          <p>{user.father_name}</p>
        </div>
        <div>
          <p className="font-semibold">Mother Name:</p>
          <p>{user.mother_name}</p>
        </div>
        <div>
          <p className="font-semibold">Spouse Name:</p>
          <p>{user.wife_name || user.human_name}</p>
        </div>
      </div>
    </div>
  );
};
