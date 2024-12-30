package helpers

import (
	"encoding/base64"
	"fmt"
	"os"
	"strings"
)

func SaveImageFromBase64(base64Data, dirPath, idCode string) (string, error) {
	const base64Prefix = "data:image/jpeg;base64,"

	if base64Data == "" {
		return "", fmt.Errorf("ProfileImageURL cannot be empty")
	}

	// Loại bỏ prefix nếu có
	if strings.HasPrefix(base64Data, base64Prefix) {
		base64Data = base64Data[len(base64Prefix):]
	}

	// Giải mã base64
	data, err := base64.StdEncoding.DecodeString(base64Data)
	if err != nil {
		return "", fmt.Errorf("Failed to decode base64: %v", err)
	}

	// Tạo tên file từ IDCode
	fileName := fmt.Sprintf("%s.jpg", idCode)
	if fileName == ".jpg" {
		fileName = "default.jpg"
	}

	// Kiểm tra nếu file đã tồn tại, tạo tên file mới
	filePath := fmt.Sprintf("%s/%s", dirPath, fileName)
	_, err = os.Stat(filePath)
	if err == nil {
		i := 1
		for {
			newFileName := fmt.Sprintf("%s_%d.jpg", idCode, i)
			newFilePath := fmt.Sprintf("%s/%s", dirPath, newFileName)
			_, err := os.Stat(newFilePath)
			if os.IsNotExist(err) {
				fileName = newFileName
				filePath = newFilePath
				break
			}
			i++
		}
	}

	// Tạo thư mục nếu không tồn tại
	err = os.MkdirAll(dirPath, os.ModePerm)
	if err != nil {
		return "", fmt.Errorf("Failed to create directory: %v", err)
	}

	// Lưu file vào thư mục
	err = os.WriteFile(filePath, data, 0644)
	if err != nil {
		return "", fmt.Errorf("Failed to save file: %v", err)
	}

	return fileName, nil
}
