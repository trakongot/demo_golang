package repositories

import (
	"database/sql"
	"fmt"
	"ic_web/internal/database"
	models "ic_web/internal/model"
)

type PatientRepository struct {
	DB *sql.DB
}

func NewPatientRepository() *PatientRepository {
	dbService := database.New()
	return &PatientRepository{DB: dbService.GetDB()}
}

func (repo *PatientRepository) GetPatientsByCINumber(ci_number string) ([]*models.Patient, error) {
	query := `
		SELECT 
			p.id,
			p.full_name,
			p.chip_authen,
			p.verify_sod,
			p.date_of_birth,
			p.gender,
			p.nationality,
			p.origin_place,
			p.issue_date,
			p.expiry_date ,
			p.id_code,
			p.old_id_code ,
			p.race ,
			p.religion,
			p.personal_identification,
			p.residence_place,
			p.father_name,
			p.mother_name,
			p.wife_name,
			p.profile_image_url,
			p.human_name  
		FROM 
			patients p
		WHERE 
			p.id_code = ?
	`

	rows, err := repo.DB.Query(query, ci_number)
	if err != nil {
		return nil, fmt.Errorf("error retrieving patients: %v", err)
	}
	defer rows.Close()

	var patients []*models.Patient
	for rows.Next() {
		patient := &models.Patient{}
		if err := rows.Scan(
			&patient.ID,
			&patient.FullName,
			&patient.ChipAuthen,
			&patient.VerifySOD,
			&patient.DateOfBirth,
			&patient.Gender,
			&patient.Nationality,
			&patient.OriginPlace,
			&patient.IssueDate,
			&patient.ExpiryDate,
			&patient.IDCode,
			&patient.OldIDCode,
			&patient.Race,
			&patient.Religion,
			&patient.PersonalIdentification,
			&patient.ResidencePlace,
			&patient.FatherName,
			&patient.MotherName,
			&patient.WifeName,
			&patient.ProfileImageURL,
			&patient.HumanName,
		); err != nil {
			return nil, fmt.Errorf("error scanning patient: %v", err)
		}
		patients = append(patients, patient)
	}

	if len(patients) == 0 {
		return nil, nil
	}

	return patients, nil
}

func (repo *PatientRepository) CreatePatient(patient *models.Patient) (int64, error) {
	query := `
		INSERT INTO patients (
			chip_authen, 
			verify_sod, 
			date_of_birth, 
			expiry_date, 
			gender, 

			id_code, 
			issue_date, 
			nationality, 
			old_id_code, 
			origin_place, 

			full_name, 
			personal_identification, 
			race, 
			religion, 
			residence_place, 

			mother_name, 
			father_name, 
			wife_name, 
			human_name, 
			profile_image_url, 

			created_at
		) VALUES (
			?, ?, ?, ?, ?,
			 ?, ?, ?, ?, ?,
			  ?, ?, ?, ?, ?,
			   ?, ?, ?, ?, ?, NOW()
		);
	`

	result, err := repo.DB.Exec(query,
		patient.ChipAuthen,
		patient.VerifySOD,
		patient.DateOfBirth,
		patient.ExpiryDate,
		patient.Gender,

		patient.IDCode,
		patient.IssueDate,
		patient.Nationality,
		patient.OldIDCode,
		patient.OriginPlace,

		patient.FullName,
		patient.PersonalIdentification,
		patient.Race,
		patient.Religion,
		patient.ResidencePlace,

		patient.MotherName,
		patient.FatherName,
		patient.WifeName,
		patient.HumanName,
		patient.ProfileImageURL,
	)

	if err != nil {
		return 0, fmt.Errorf("error creating patient: %v", err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, fmt.Errorf("error retrieving last insert ID: %v", err)
	}

	return id, nil
}
