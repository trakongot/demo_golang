package models

type Patient struct {
	ID                     int    `json:"id"`
	FullName               string `json:"full_name"`
	ChipAuthen             string `json:"chip_authen"`
	VerifySOD              string `json:"verify_sod"`
	DateOfBirth            string `json:"date_of_birth"`
	ExpiryDate             string `json:"expiry_date"`
	Gender                 string `json:"gender"`
	IDCode                 string `json:"id_code"`
	IssueDate              string `json:"issue_date"`
	Nationality            string `json:"nationality"`
	OldIDCode              string `json:"old_id_code"`
	OriginPlace            string `json:"origin_place"`
	PersonalIdentification string `json:"personal_identification"`
	Race                   string `json:"race"`
	Religion               string `json:"religion"`
	ResidencePlace         string `json:"residence_place"`
	MotherName             string `json:"mother_name"`
	FatherName             string `json:"father_name"`
	WifeName               string `json:"wife_name"`
	HumanName              string `json:"human_name"`
	ProfileImageURL        string `json:"profile_image_url"`
	CreatedAt              string `json:"created_at"`
	UpdatedAt              string `json:"updated_at"`
}
