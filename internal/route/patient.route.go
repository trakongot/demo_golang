package routers

import (
	controllers "ic_web/internal/controller"
	repositories "ic_web/internal/repository"
	"ic_web/internal/services"

	"github.com/gin-gonic/gin"
)

func PatientRoutes(r *gin.Engine) {

	patientRepo := repositories.NewPatientRepository()

	patientService := services.NewPatientService(patientRepo)

	patientController := controllers.NewPatientController(patientService)

	api := r.Group("/api/v1/")
	{
		patients := api.Group("/patients")
		{
			// Lấy thông tin bệnh nhân theo ID
			patients.GET("/:id", patientController.GetPatientsByCINumber)

			// Tạo mới một bệnh nhân
			patients.POST("/", patientController.CreatePatient)
		}
	}
}
