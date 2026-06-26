-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2026 at 10:36 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `logistics_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `experience` int(11) NOT NULL,
  `license_number` varchar(100) NOT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  `account_number` varchar(50) DEFAULT NULL,
  `ifsc_code` varchar(20) DEFAULT NULL,
  `bank_branch` varchar(100) DEFAULT NULL,
  `aadhar_card` varchar(20) DEFAULT NULL,
  `pan_card` varchar(20) DEFAULT NULL,
  `medical_report` varchar(255) DEFAULT NULL,
  `police_verification` varchar(255) DEFAULT NULL,
  `license_file_path` varchar(255) DEFAULT NULL,
  `police_file_path` varchar(255) DEFAULT NULL,
  `bank_file_path` varchar(255) DEFAULT NULL,
  `medical_file_path` varchar(255) DEFAULT NULL,
  `aadhar_file_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `full_name`, `email`, `phone`, `password`, `dob`, `experience`, `license_number`, `bank_name`, `account_number`, `ifsc_code`, `bank_branch`, `aadhar_card`, `pan_card`, `medical_report`, `police_verification`, `license_file_path`, `police_file_path`, `bank_file_path`, `medical_file_path`, `aadhar_file_path`, `created_at`) VALUES
(4, 'ayush jain', 'ayush@gmail.com', '7894561230', 'ayush@gmail.com', NULL, 9, 'RJ-06-2026-0012', 'airtel', '7894561230', '7894561230', 'airtel', '9638527410', 'abcd4908l', 'Approved', 'Approved', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782371146564-aa.jfif', NULL, NULL, NULL, NULL, '2026-06-25 07:05:46'),
(5, 'krish dixit', 'krish@gmail.com', '9001111442', 'krish@gmail.com', '1998-06-18', 1, 'RJ-06-2026-0016', 'airtel', '9001111442', '9001111442', 'jaipur', '75321468077', 'abcd12345l', 'Approved', 'Approved', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782375332464-aa.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782375332464-images.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782375332464-bank.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782375332464-medical.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782375332464-addhar.jfif', '2026-06-25 08:15:32'),
(6, 'kamlesh', 'kamlesh@gmail.com', '9090604010', 'kamlesh@gmail.com', '1978-06-09', 15, 'RJ-06-2026-0023', 'kotak', '909090905060', 'SBIN0001234', 'jaipur', '852963741035', 'xcxdcsdfsgv32154564v', 'Approved', 'Approved', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782377681175-aa.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782377681175-images.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782377681175-bank.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782377681175-medical.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782377681175-addhar.jfif', '2026-06-25 08:54:41'),
(7, 'anurag', 'anurag.sharma@gmail.com', '7891050002', 'anurag.sharma@gmail.com', '1970-09-09', 20, 'RJ06-2022020', 'sbi', '123154541612318421698751', 'SBIN0001255', 'jaipur', '2971-8974-1318', '15456465', 'Approved', 'Approved', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782381252736-aa.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782381252736-images.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782381252736-bank.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782381252736-medical.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782381252736-addhar.jfif', '2026-06-25 09:54:12'),
(8, 'yash', 'yash@gmail.com', '8305517777', 'yash@gmail.com', '1975-07-17', 9, 'RJ-06-2026-0542', 'union', '741085209630', 'inoin06060', 'jaipur', '2971-8974-1318', '15456465', 'Approved', 'Approved', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782382113401-aa.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782382113401-images.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782382113401-bank.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782382113401-medical.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782382113401-addhar.jfif', '2026-06-25 10:08:33'),
(9, 'Aman', 'aman@gmail.com', '8945612370', 'aman@gmail.com', '1999-01-03', 3, 'RJ06-2022001', 'sbi', 'ama@gmail.com', 'SBIN0001234', 'jaipur', 'ama@gmail.com', '15456465', 'Approved', 'Approved', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782458006455-aa.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782458006455-images.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782458006455-medical.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782458006455-bank.jfif', 'https://my-fleet-bucket.s3.amazonaws.com/drivers/1782458006455-addhar.jfif', '2026-06-26 07:13:26');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `vehicle_id` varchar(100) NOT NULL,
  `type` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `year` varchar(4) NOT NULL,
  `license_plate` varchar(50) NOT NULL,
  `puc_certificate_number` varchar(100) NOT NULL,
  `puc_expiry_date` date DEFAULT NULL,
  `upload_puc_document_copy_file_path` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `vehicle_id`, `type`, `company_name`, `year`, `license_plate`, `puc_certificate_number`, `puc_expiry_date`, `upload_puc_document_copy_file_path`, `notes`, `created_at`) VALUES
(1, 'TRK001', 'mini', 'KAMLESH', '2022', 'PUR', '13153jnl', NULL, NULL, 's', '2026-06-26 06:52:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
