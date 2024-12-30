package services

import (
	models "ic_web/internal/model"
	repositories "ic_web/internal/repository"
)

type PatientService struct {
	PatientRepository *repositories.PatientRepository
}

func NewPatientService(patientRepo *repositories.PatientRepository) *PatientService {
	return &PatientService{
		PatientRepository: patientRepo,
	}
}

func (s *PatientService) GetPatientsByCINumber(ci_number string) ([]*models.Patient, error) {
	patients, err := s.PatientRepository.GetPatientsByCINumber(ci_number)
	if err != nil {
		return nil, err
	}
	return patients, nil
}

func (s *PatientService) CreatePatient(patient *models.Patient) (int64, error) {
	idPatient, err := s.PatientRepository.CreatePatient(patient)
	if err != nil {
		return 0, err
	}
	return idPatient, nil
}

func (s *PatientService) CheckPatientExistsByCINumber(ci_number string) (bool, error) {
	patients, err := s.PatientRepository.GetPatientsByCINumber(ci_number)
	if err != nil {
		return false, err
	}

	if len(patients) > 0 {
		return true, nil
	}
	return false, nil
}
