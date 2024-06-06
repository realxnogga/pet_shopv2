-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2024 at 06:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `petshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `addtocartproduct`
--

CREATE TABLE `addtocartproduct` (
  `addtocartprimarykey` int(11) NOT NULL,
  `addtocartproductID` int(11) NOT NULL,
  `clientID` int(11) NOT NULL,
  `clientusername` varchar(225) NOT NULL,
  `addtocartproductname` varchar(225) NOT NULL,
  `addtocartproductsize` text NOT NULL,
  `addtocartproductstock` int(11) NOT NULL,
  `addtocartproductprice` int(11) NOT NULL,
  `addtocartproductdescription` varchar(225) NOT NULL,
  `addtocartproductcategory` text NOT NULL,
  `addtocartproductcreationdate` datetime NOT NULL DEFAULT current_timestamp(),
  `addtocartproductimage` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addtocartproduct`
--

INSERT INTO `addtocartproduct` (`addtocartprimarykey`, `addtocartproductID`, `clientID`, `clientusername`, `addtocartproductname`, `addtocartproductsize`, `addtocartproductstock`, `addtocartproductprice`, `addtocartproductdescription`, `addtocartproductcategory`, `addtocartproductcreationdate`, `addtocartproductimage`) VALUES
(1, 36, 12, 'warren', 'Tick Free', 'L', 130, 100, 'sample description', 'Flea/Tick Control', '2024-06-05 19:32:40', 'tickfree.jpg_20240604091348'),
(2, 42, 12, 'warren', 'Pedegree', 'XL', 184, 200, 'sample', 'Dog Food', '2024-06-05 19:32:46', 'pedegree.jpg_20240606105216'),
(11, 42, 12, 'warren', 'Pedegree', 'XL', 181, 200, 'sample', 'Dog Food', '2024-06-06 16:50:44', 'pedegree.jpg_20240606105216'),
(12, 49, 14, 'manolo', 'Ascorbic Acid', 'L', 210, 90, 'sample description', 'Vitamins/Supplements', '2024-06-06 18:36:23', 'ascorbicacid.jpg_20240606105819'),
(13, 47, 12, 'warren', 'Alpo', 'M', 239, 240, 'sample description', 'Dog Food', '2024-06-06 22:11:27', 'alpo.webp_20240606105312'),
(14, 36, 12, 'warren', 'Tick Free', 'L', 124, 100, 'sample description', 'Flea/Tick Control', '2024-06-07 00:01:06', 'tickfree.jpg_20240604091348');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminID` int(11) NOT NULL,
  `username` varchar(225) NOT NULL DEFAULT 'admin',
  `password` varchar(225) NOT NULL DEFAULT 'admin123'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminID`, `username`, `password`) VALUES
(1, 'admin', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `adminproduct`
--

CREATE TABLE `adminproduct` (
  `productID` int(11) NOT NULL,
  `productname` varchar(225) NOT NULL,
  `productsize` text NOT NULL,
  `productstock` int(11) NOT NULL,
  `productprice` int(11) NOT NULL,
  `productdescription` varchar(225) NOT NULL,
  `productcategory` text NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp(),
  `productimage` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adminproduct`
--

INSERT INTO `adminproduct` (`productID`, `productname`, `productsize`, `productstock`, `productprice`, `productdescription`, `productcategory`, `creationdate`, `productimage`) VALUES
(36, 'Tick Free', 'L', 122, 100, 'sample description', 'Flea/Tick Control', '2024-06-04 15:13:48', 'tickfree.jpg_20240604091348'),
(42, 'Pedegree', 'XL', 179, 200, 'sample', 'Dog Food', '2024-06-05 19:30:42', 'pedegree.jpg_20240606105216'),
(47, 'Alpo', 'M', 237, 240, 'sample description', 'Dog Food', '2024-06-06 16:53:12', 'alpo.webp_20240606105312'),
(48, 'Bearing', 'M', 200, 210, 'sample description', 'Flea/Tick Control', '2024-06-06 16:56:24', 'bearing.jpg_20240606105634'),
(49, 'Ascorbic Acid', 'L', 207, 90, 'sample description', 'Vitamins/Supplements', '2024-06-06 16:58:19', 'ascorbicacid.jpg_20240606105819');

-- --------------------------------------------------------

--
-- Table structure for table `buyproduct`
--

CREATE TABLE `buyproduct` (
  `buyproductprimarykey` int(11) NOT NULL,
  `buyproductID` int(11) NOT NULL,
  `clientID` int(11) NOT NULL,
  `clientusername` varchar(225) NOT NULL,
  `productname` varchar(225) NOT NULL,
  `productsize` text NOT NULL,
  `productquantity` int(11) NOT NULL,
  `producttotalprice` int(11) NOT NULL,
  `clientaddress` varchar(225) NOT NULL,
  `orderdate` datetime NOT NULL DEFAULT current_timestamp(),
  `orderstatus` text NOT NULL DEFAULT 'not recieve'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buyproduct`
--

INSERT INTO `buyproduct` (`buyproductprimarykey`, `buyproductID`, `clientID`, `clientusername`, `productname`, `productsize`, `productquantity`, `producttotalprice`, `clientaddress`, `orderdate`, `orderstatus`) VALUES
(1, 36, 12, 'warren', 'Tick Free', 'L', 1, 100, 'brgy san isidro', '2024-06-05 19:32:26', 'recieve'),
(2, 42, 12, 'warren', 'Pedegree', 'XL', 5, 1000, 'brgy san isidro', '2024-06-05 19:32:34', 'not recieve'),
(3, 42, 12, 'warren', 'Pedegree', 'XL', 2, 400, 'brgy san isidro', '2024-06-05 19:33:09', 'recieve'),
(5, 42, 12, 'warren', 'Pedegree', 'XL', 1, 200, 'brgy san isidro', '2024-06-06 16:13:59', 'not recieve'),
(6, 36, 12, 'warren', 'Tick Free', 'L', 1, 100, 'brgy san isidro', '2024-06-06 16:35:57', 'not recieve'),
(7, 49, 14, 'manolo', 'Ascorbic Acid', 'L', 3, 270, 'brgy maitim', '2024-06-06 18:36:33', 'recieve'),
(8, 49, 14, 'manolo', 'Ascorbic Acid', 'L', 1, 90, 'brgy maitim', '2024-06-06 18:36:54', 'not recieve'),
(9, 49, 14, 'manolo', 'Ascorbic Acid', 'L', 2, 180, 'brgy maitim', '2024-06-06 18:37:35', 'not recieve'),
(13, 42, 12, 'warren', 'Pedegree', 'XL', 1, 200, 'brgy san isidro', '2024-06-06 18:43:00', 'not recieve'),
(14, 47, 12, 'warren', 'Alpo', 'M', 1, 240, 'brgy san isidro', '2024-06-06 21:44:59', 'recieve'),
(15, 47, 12, 'warren', 'Alpo', 'M', 2, 480, 'brgy san isidro', '2024-06-06 22:11:32', 'recieve'),
(16, 36, 12, 'warren', 'Tick Free', 'L', 1, 100, 'brgy san isidro', '2024-06-07 00:00:59', 'not recieve'),
(17, 36, 12, 'warren', 'Tick Free', 'L', 2, 200, 'brgy san isidro', '2024-06-07 00:01:10', 'not recieve');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `clientID` int(11) NOT NULL,
  `clientusername` text NOT NULL,
  `clientpassword` varchar(225) NOT NULL,
  `clientaddress` varchar(225) NOT NULL,
  `joindate` datetime NOT NULL DEFAULT current_timestamp(),
  `clientprofile` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`clientID`, `clientusername`, `clientpassword`, `clientaddress`, `joindate`, `clientprofile`) VALUES
(12, 'warren', 'warren123', 'brgy san isidro', '2024-06-05 18:51:49', 'drink.jpg_20240605125149'),
(14, 'manolo', 'manolo123', 'brgy maitim', '2024-06-06 18:35:42', 'drink2.jpg_20240606123542');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `ratingprimarykey` int(11) NOT NULL,
  `ratingproductID` int(11) NOT NULL,
  `productname` varchar(225) NOT NULL,
  `productsize` text NOT NULL,
  `commenter` varchar(225) NOT NULL,
  `star` int(11) NOT NULL,
  `comment` varchar(225) NOT NULL,
  `commentdate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`ratingprimarykey`, `ratingproductID`, `productname`, `productsize`, `commenter`, `star`, `comment`, `commentdate`) VALUES
(1, 36, 'Tick Free', 'L', 'warren', 5, '', '2024-06-06 22:59:35'),
(2, 42, 'Pedegree', 'XL', 'warren', 2, '', '2024-06-06 22:59:35'),
(3, 47, 'Alpo', 'M', 'warren', 3, 'fdgdfg', '2024-06-06 22:59:35'),
(4, 49, 'Ascorbic Acid', 'L', 'manolo', 5, 'fghfgh', '2024-06-06 22:59:35'),
(5, 47, 'Alpo', 'M', 'warren', 3, 'ghfgh', '2024-06-06 22:59:35'),
(6, 47, 'Alpo', 'M', 'warren', 2, '', '2024-06-06 22:59:35'),
(7, 36, 'Tick Free', 'L', 'warren', 3, 'ghfgh', '2024-06-06 22:59:35'),
(8, 42, 'Pedegree', 'XL', 'warren', 2, 'gfhfgh', '2024-06-06 23:02:05'),
(9, 36, 'Tick Free', 'L', 'warren', 1, 'fghfgh', '2024-06-06 23:10:41'),
(10, 36, 'Tick Free', 'L', 'warren', 4, 'fghfgh', '2024-06-06 23:14:52'),
(11, 47, 'Alpo', 'M', 'warren', 1, 'rggfh', '2024-06-06 23:31:40'),
(12, 47, 'Alpo', 'M', 'warren', 3, 'gfgh', '2024-06-06 23:44:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addtocartproduct`
--
ALTER TABLE `addtocartproduct`
  ADD PRIMARY KEY (`addtocartprimarykey`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminID`);

--
-- Indexes for table `adminproduct`
--
ALTER TABLE `adminproduct`
  ADD PRIMARY KEY (`productID`);

--
-- Indexes for table `buyproduct`
--
ALTER TABLE `buyproduct`
  ADD PRIMARY KEY (`buyproductprimarykey`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`clientID`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`ratingprimarykey`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addtocartproduct`
--
ALTER TABLE `addtocartproduct`
  MODIFY `addtocartprimarykey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `adminproduct`
--
ALTER TABLE `adminproduct`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `buyproduct`
--
ALTER TABLE `buyproduct`
  MODIFY `buyproductprimarykey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `clientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `ratingprimarykey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
