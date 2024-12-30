export interface User {
  id: number | null;
  chip_authen: string | null;
  verify_sod: string | null;
  date_of_birth: string | null; // ISO 8601 format (e.g., "1990-05-15")
  expiry_date: string | null; // ISO 8601 format
  gender: string | null;
  id_code: string | null;
  issue_date: string | null; // ISO 8601 format
  nationality: string | null;
  old_id_code: string | null;
  origin_place: string | null;
  full_name: string | null; // "full_name" in Go has been renamed
  personal_identification: string | null;
  race: string | null; // Changed from "ethnicity_name" to "race"
  religion: string | null;
  residence_place: string | null; // Changed from "permanent_address" to "residence_place"
  mother_name: string | null;
  father_name: string | null;
  wife_name: string | null;
  human_name: string | null;
  profile_image_url: string | null;
  created_at: string | null; // Optional, ISO 8601 format
  updated_at: string | null; // Optional, ISO 8601 format
}
