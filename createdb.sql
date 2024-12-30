CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chip_authen VARCHAR(255) DEFAULT NULL,
    verify_sod VARCHAR(255) DEFAULT NULL,
    date_of_birth DATE,
    expiry_date DATE,
    gender ENUM('Nam', 'Nữ', 'Khác') NOT NULL,
    id_code VARCHAR(20) NOT NULL,
    issue_date DATE,
    nationality VARCHAR(100) DEFAULT NULL,
    old_id_code VARCHAR(20) DEFAULT NULL,
    origin_place VARCHAR(255) DEFAULT NULL,
    full_name VARCHAR(255) DEFAULT NULL,  
    personal_identification TEXT,
    race VARCHAR(100) DEFAULT NULL,
    religion VARCHAR(100) DEFAULT NULL,
    residence_place VARCHAR(255) DEFAULT NULL,
    mother_name VARCHAR(255) DEFAULT NULL,
    father_name VARCHAR(255) DEFAULT NULL,
    wife_name VARCHAR(255) DEFAULT NULL,
    human_name VARCHAR(255) DEFAULT NULL,
    profile_image_url VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO patients (chip_authen, verify_sod, date_of_birth, expiry_date, gender, id_code, issue_date, nationality, old_id_code, origin_place, full_name, personal_identification, race, religion, residence_place, mother_name, father_name, wife_name, human_name, profile_image_url, created_at, updated_at)
VALUES
  ('CHIP001', 'SOD001', '1990-05-15', '2030-05-15', 'Nam', 'ID001', '2010-01-01', 'Việt Nam', 'OLD001', 'Hà Nội',  'Nguyễn Văn A', 'Some identification info', 'Kinh', 'Phật giáo', 'Hà Nội', 'Nguyễn Thị B', 'Nguyễn Văn C', 'Trần Thị D', 'Nguyễn Tiến E', 'https://th.bing.com/th/id/OIP.GdFGrbgANEw_0rY3QlaOKgHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', NOW(), NOW()),
  ('CHIP002', 'SOD002', '1985-08-20', '2025-08-20', 'Nữ', 'ID002', '2015-02-15', 'Việt Nam', 'OLD002', 'Đà Nẵng', 'Trần Thị B', 'Some identification info', 'Kinh', 'Công giáo', 'Đà Nẵng', 'Trần Thị F', 'Trần Văn G', 'Nguyễn Thị H', 'Trần Tiến I', 'https://th.bing.com/th/id/OIP.GdFGrbgANEw_0rY3QlaOKgHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', NOW(), NOW()),
  ('CHIP003', 'SOD003', '2000-12-10', '2040-12-10', 'Khác', 'ID003', '2020-05-25', 'Việt Nam', 'OLD003', 'Hồ Chí Minh', 'Lê Thị C', 'Some identification info', 'Kinh', 'Hòa Hảo', 'Hồ Chí Minh', 'Lê Thị J', 'Lê Văn K', 'Phan Thị L', 'Lê Tiến M', 'https://th.bing.com/th/id/OIP.GdFGrbgANEw_0rY3QlaOKgHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', NOW(), NOW());
