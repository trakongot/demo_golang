package controllers

import (
	models "ic_web/internal/model"
	"ic_web/internal/services"
	helpers "ic_web/internal/util"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type PatientController struct {
	PatientService *services.PatientService
}

func NewPatientController(patientService *services.PatientService) *PatientController {
	return &PatientController{
		PatientService: patientService,
	}
}

func (controller *PatientController) GetPatientsByCINumber(c *gin.Context) {
	ci_number := strings.TrimSpace(c.Param("id"))
	if ci_number == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Số CMND không được để trống"})
		return
	}

	patients, err := controller.PatientService.GetPatientsByCINumber(ci_number)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if len(patients) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "Không tìm thấy bệnh nhân nào"})
		return
	}

	c.JSON(http.StatusOK, patients)
}

func (controller *PatientController) CreatePatient(c *gin.Context) {
	var patient models.Patient

	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body", "details": err.Error()})
		return
	}

	if patient.IDCode == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "IDCode cannot be empty"})
		return
	}

	exists, err := controller.PatientService.CheckPatientExistsByCINumber(patient.IDCode)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error checking patient existence", "details": err.Error()})
		return
	}

	if exists {
		c.JSON(http.StatusConflict, gin.H{"error": "Patient with this IDCode already exists"})
		return
	}

	base64Data := patient.ProfileImageURL
	dirPath := "./internal/uploads/images"
	fileName, err := helpers.SaveImageFromBase64(base64Data, dirPath, patient.IDCode)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	patient.ProfileImageURL = fileName
	// fmt.Printf("Generated file path: %s/%s\n", dirPath, fileName)

	id, err := controller.PatientService.CreatePatient(&patient)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create patient", "details": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Patient created successfully", "patient_id": id})
}
