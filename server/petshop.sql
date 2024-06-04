-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2024 at 07:54 PM
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
  `addtocartproductID` int(11) NOT NULL,
  `clientID` int(11) NOT NULL,
  `clientusername` varchar(225) NOT NULL,
  `addtocartproductname` varchar(225) NOT NULL,
  `addtocartproductsize` text NOT NULL,
  `addtocartproductquantity` int(11) NOT NULL,
  `addtocartproducttotalprice` int(11) NOT NULL,
  `addtocartdate` datetime NOT NULL DEFAULT current_timestamp(),
  `clientaddress` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addtocartproduct`
--

INSERT INTO `addtocartproduct` (`addtocartproductID`, `clientID`, `clientusername`, `addtocartproductname`, `addtocartproductsize`, `addtocartproductquantity`, `addtocartproducttotalprice`, `addtocartdate`, `clientaddress`) VALUES
(1, 0, '', '', '', 0, 0, '2024-06-05 00:30:49', ''),
(2, 0, '', '', '', 0, 0, '2024-06-05 00:31:18', ''),
(3, 11, 'warren', 'Pedegree', 'M', 1, 100, '2024-06-05 00:32:06', 'brgy puypuy'),
(4, 11, 'warren', 'Pedegree', 'M', 1, 100, '2024-06-05 00:33:04', 'brgy puypuy'),
(5, 11, 'warren', 'Tick Free', 'L', 2, 200, '2024-06-05 00:56:11', 'brgy puypuy'),
(6, 11, 'warren', 'Tick Free', 'L', 1, 100, '2024-06-05 00:58:12', 'brgy puypuy'),
(7, 11, 'warren', 'Tick Free', 'L', 1, 100, '2024-06-05 01:20:37', 'brgy puypuy'),
(8, 11, 'warren', 'Pedegree', 'M', 1, 100, '2024-06-05 01:23:39', 'brgy puypuy'),
(9, 9, 'manolo', 'Tick Free', 'L', 2, 200, '2024-06-05 01:29:06', 'brgy san isidro'),
(10, 9, 'manolo', 'sample', 'M', 1, 5, '2024-06-05 01:43:02', 'brgy san isidro');

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
(35, 'Pedegree', 'M', 96, 100, 'sample description', 'Dog Food', '2024-06-04 15:12:24', 'pedegree.jpg_20240604091224'),
(36, 'Tick Free', 'L', 148, 100, 'sample description', 'Flea/Tick Control', '2024-06-04 15:13:48', 'tickfree.jpg_20240604091348'),
(38, 'sample', 'M', 5, 5, 'sample', 'Dog Food', '2024-06-05 01:37:18', 'drink.jpg_20240604193718');

-- --------------------------------------------------------

--
-- Table structure for table `buyproduct`
--

CREATE TABLE `buyproduct` (
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

INSERT INTO `buyproduct` (`buyproductID`, `clientID`, `clientusername`, `productname`, `productsize`, `productquantity`, `producttotalprice`, `clientaddress`, `orderdate`, `orderstatus`) VALUES
(3, 2, 'real', 'pedegree', 'M', 2, 800, '', '2024-06-02 10:29:12', 'not recieve'),
(4, 2, 'real', 'fgfg', 'XS', 2, 10, '', '2024-06-02 10:29:12', 'not recieve'),
(51, 9, 'manolo', 'Tick Free', 'M', 2, 140, 'brgy san isidro', '2024-06-02 20:32:49', 'not recieve'),
(52, 9, 'manolo', 'Pedegree', 'M', 1, 150, 'brgy san isidro', '2024-06-02 20:37:09', 'not recieve'),
(53, 9, 'manolo', 'Pedegree', 'M', 1, 150, 'brgy san isidro', '2024-06-02 20:37:28', 'not recieve'),
(54, 10, 'warren', 'Pedegree', 'M', 1, 150, 'brgy puypuy', '2024-06-02 20:39:29', 'recieve'),
(55, 10, 'warren', 'Tick Free', 'M', 1, 70, 'brgy puypuy', '2024-06-02 20:39:32', 'not recieve'),
(63, 11, 'warren', 'Pedegree', 'M', 1, 100, 'brgy puypuy', '2024-06-04 23:41:35', 'not recieve'),
(64, 11, 'warren', 'Pedegree', 'M', 3, 300, 'brgy puypuy', '2024-06-04 23:51:36', 'not recieve'),
(65, 11, 'warren', 'Tick Free', 'L', 2, 200, 'brgy puypuy', '2024-06-04 23:51:51', 'not recieve');

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
(9, 'manolo', 'manolo123', 'brgy san isidro', '2024-06-02 20:22:15', 'tickfree.jpg_20240602142215'),
(11, 'warren', 'warren123', 'brgy puypuy', '2024-06-02 20:56:07', 'drink.jpg_20240602145607');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addtocartproduct`
--
ALTER TABLE `addtocartproduct`
  ADD PRIMARY KEY (`addtocartproductID`);

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
  ADD PRIMARY KEY (`buyproductID`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`clientID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addtocartproduct`
--
ALTER TABLE `addtocartproduct`
  MODIFY `addtocartproductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `adminproduct`
--
ALTER TABLE `adminproduct`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `buyproduct`
--
ALTER TABLE `buyproduct`
  MODIFY `buyproductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `clientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
