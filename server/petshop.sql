-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2024 at 04:48 AM
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
  `addtocartproductcreationdate` date NOT NULL DEFAULT current_timestamp(),
  `addtocartproductimage` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addtocartproduct`
--

INSERT INTO `addtocartproduct` (`addtocartprimarykey`, `addtocartproductID`, `clientID`, `clientusername`, `addtocartproductname`, `addtocartproductsize`, `addtocartproductstock`, `addtocartproductprice`, `addtocartproductdescription`, `addtocartproductcategory`, `addtocartproductcreationdate`, `addtocartproductimage`) VALUES
(1, 42, 47, 'manolo', 'Pedegree', 'XL', 163, 200, 'Dog food is specifically formulated and intended for consumption by dogs and other related canines. Dogs are considered to be omnivores with a carnivorous bias.', 'Dog Food', '2024-07-30', 'pedegree.jpg_20240612173212'),
(2, 42, 47, 'manolo', 'Pedegree', 'XL', 163, 200, 'Dog food is specifically formulated and intended for consumption by dogs and other related canines. Dogs are considered to be omnivores with a carnivorous bias.', 'Dog Food', '2024-07-30', 'pedegree.jpg_20240612173212'),
(3, 47, 47, 'manolo', 'Alpo', 'M', 224, 240, 'sample description', 'Dog Food', '2024-07-30', 'alpo.webp_20240606105312'),
(4, 42, 47, 'manolo', 'Pedegree', 'XL', 163, 200, 'Dog food is specifically formulated and intended for consumption by dogs and other related canines. Dogs are considered to be omnivores with a carnivorous bias.', 'Dog Food', '2024-07-30', 'pedegree.jpg_20240612173212'),
(5, 47, 47, 'manolo', 'Alpo', 'M', 224, 240, 'sample description', 'Dog Food', '2024-07-30', 'alpo.webp_20240606105312'),
(6, 47, 47, 'manolo', 'Alpo', 'M', 224, 240, 'sample description', 'Dog Food', '2024-07-30', 'alpo.webp_20240606105312'),
(7, 42, 47, 'manolo', 'Pedegree', 'XL', 163, 200, 'Dog food is specifically formulated and intended for consumption by dogs and other related canines. Dogs are considered to be omnivores with a carnivorous bias.', 'Dog Food', '2024-07-30', 'pedegree.jpg_20240612173212'),
(8, 47, 47, 'manolo', 'Alpo', 'M', 224, 240, 'sample description', 'Dog Food', '2024-07-30', 'alpo.webp_20240606105312'),
(9, 42, 47, 'manolo', 'Pedegree', 'XL', 163, 200, 'Dog food is specifically formulated and intended for consumption by dogs and other related canines. Dogs are considered to be omnivores with a carnivorous bias.', 'Dog Food', '2024-07-30', 'pedegree.jpg_20240612173212'),
(10, 47, 47, 'manolo', 'Alpo', 'M', 224, 240, 'sample description', 'Dog Food', '2024-07-30', 'alpo.webp_20240606105312'),
(11, 47, 47, 'manolo', 'Alpo', 'M', 223, 240, 'sample description', 'Dog Food', '2024-07-30', 'alpo.webp_20240606105312'),
(12, 47, 47, 'manolo', 'Alpo', 'M', 223, 240, 'sample description', 'Dog Food', '2024-07-30', 'alpo.webp_20240606105312'),
(13, 47, 19, 'warren', 'Alpo', 'M', 221, 240, 'sample description', 'Dog Food', '2024-08-03', 'alpo.webp_20240606105312'),
(14, 47, 47, 'manolo', 'Alpo', 'M', 221, 240, 'sample description', 'Dog Food', '2024-08-03', 'alpo.webp_20240606105312'),
(15, 42, 47, 'manolo', 'Pedegree', 'XL', 161, 200, 'Dog food is specifically formulated and intended for consumption by dogs and other related canines. Dogs are considered to be omnivores with a carnivorous bias.', 'Dog Food', '2024-08-03', 'pedegree.jpg_20240612173212'),
(16, 47, 47, 'manolo', 'Alpo', 'M', 221, 240, 'sample description', 'Dog Food', '2024-08-03', 'alpo.webp_20240606105312'),
(17, 47, 47, 'manolo', 'Alpo', 'M', 221, 240, 'sample description', 'Dog Food', '2024-08-03', 'alpo.webp_20240606105312'),
(18, 42, 47, 'manolo', 'Pedegree', 'XL', 161, 200, 'Dog food is specifically formulated and intended for consumption by dogs and other related canines. Dogs are considered to be omnivores with a carnivorous bias.', 'Dog Food', '2024-08-03', 'pedegree.jpg_20240612173212'),
(19, 47, 19, 'warren', 'Alpo', 'M', 221, 240, 'sample description', 'Dog Food', '2024-08-12', 'alpo.webp_20240606105312'),
(20, 42, 19, 'warren', 'Pedegree', 'XL', 161, 200, 'Dog food is specifically formulated and intended for consumption by dogs and other related canines. Dogs are considered to be omnivores with a carnivorous bias.', 'Dog Food', '2024-08-12', 'pedegree.jpg_20240612173212'),
(21, 47, 19, 'warren', 'Alpo', 'M', 221, 240, 'sample description', 'Dog Food', '2024-08-12', 'alpo.webp_20240606105312');

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
  `creationdate` date NOT NULL DEFAULT current_timestamp(),
  `productimage` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adminproduct`
--

INSERT INTO `adminproduct` (`productID`, `productname`, `productsize`, `productstock`, `productprice`, `productdescription`, `productcategory`, `creationdate`, `productimage`) VALUES
(42, 'Pedegree', 'XL', 161, 200, 'Dog food is specifically formulated and intended for consumption by dogs and other related canines. Dogs are considered to be omnivores with a carnivorous bias.', 'Dog Food', '2024-06-05', 'pedegree.jpg_20240612173212'),
(47, 'Alpo', 'M', 221, 240, 'sample description', 'Dog Food', '2024-06-06', 'alpo.webp_20240606105312');

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
  `paymentmethod` text NOT NULL,
  `orderdate` date NOT NULL DEFAULT current_timestamp(),
  `orderstatus` text NOT NULL DEFAULT '\'not recieve\''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buyproduct`
--

INSERT INTO `buyproduct` (`buyproductprimarykey`, `buyproductID`, `clientID`, `clientusername`, `productname`, `productsize`, `productquantity`, `producttotalprice`, `clientaddress`, `paymentmethod`, `orderdate`, `orderstatus`) VALUES
(1, 42, 12, 'warren', 'Pedegree', 'XL', 1, 200, 'brgy san isidro', 'cod', '2024-07-03', 'recieve'),
(2, 42, 12, 'warren', 'Pedegree', 'XL', 2, 400, 'brgy san isidro', 'cod', '2024-07-03', 'recieve'),
(3, 47, 18, 'manolo', 'Alpo', 'M', 1, 240, 'san isidro', 'cod', '2024-07-03', 'recieve'),
(4, 42, 18, 'manolo', 'Pedegree', 'XL', 1, 200, 'san isidro', 'cod', '2024-07-03', 'recieve'),
(5, 47, 12, 'warren', 'Alpo', 'M', 1, 240, 'brgy san isidro', 'cod', '2024-07-03', 'recieve'),
(6, 42, 19, 'warren', 'Pedegree', 'XL', 1, 200, 'brgy san isidro', 'cod', '2024-07-13', 'not recieve'),
(7, 0, 0, '', '', '', 0, 0, '', '', '2024-07-13', 'not recieve'),
(8, 0, 0, '', '', '', 0, 0, '', '', '2024-07-13', 'not recieve'),
(9, 0, 0, '', '', '', 0, 0, '', '', '2024-07-13', 'not recieve'),
(10, 47, 19, 'warren', 'Alpo', 'M', 2, 480, 'brgy san isidro', 'cod', '2024-07-13', 'recieve'),
(11, 42, 19, 'warren', 'Pedegree', 'XL', 1, 200, 'brgy san isidro', '', '2024-07-28', 'not recieve'),
(12, 42, 19, 'warren', 'Pedegree', 'XL', 1, 200, 'brgy san isidro', 'cod', '2024-07-28', 'recieve'),
(13, 0, 0, '', '', '', 0, 0, '', '', '2024-07-29', 'not recieve'),
(14, 0, 0, '', '', '', 0, 0, '', '', '2024-07-29', 'not recieve'),
(15, 0, 0, '', '', '', 0, 0, '', '', '2024-07-29', 'not recieve'),
(16, 47, 47, 'manolo', 'Alpo', 'M', 1, 240, 'wwoekwodj', 'cod', '2024-07-29', 'recieve'),
(17, 42, 47, 'manolo', 'Pedegree', 'XL', 1, 200, 'wwoekwodj', 'cod', '2024-07-29', 'recieve'),
(18, 47, 47, 'manolo', 'Alpo', 'M', 1, 240, 'wwoekwodj', 'cod', '2024-07-29', 'recieve'),
(19, 47, 47, 'manolo', 'Alpo', 'M', 1, 240, 'wwoekwodj', 'cod', '2024-07-30', 'recieve'),
(20, 42, 47, 'manolo', 'Pedegree', 'XL', 1, 200, 'wwoekwodj', 'cod', '2024-07-30', 'recieve'),
(21, 47, 47, 'manolo', 'Alpo', 'M', 1, 240, 'wwoekwodj', 'cod', '2024-07-30', 'recieve'),
(22, 47, 47, 'manolo', 'Alpo', 'M', 1, 240, 'wwoekwodj', 'cod', '2024-07-30', 'recieve'),
(23, 42, 47, 'manolo', 'Pedegree', 'XL', 1, 200, 'wwoekwodj', 'cod', '2024-08-02', '\'not recieve\'');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `clientID` int(11) NOT NULL,
  `clientusername` text NOT NULL,
  `clientpassword` varchar(225) NOT NULL,
  `clientaddress` varchar(225) NOT NULL,
  `clientemail` varchar(225) NOT NULL,
  `joindate` date NOT NULL DEFAULT current_timestamp(),
  `clientprofile` varchar(225) NOT NULL,
  `clienttoken` varchar(225) NOT NULL DEFAULT 'default token'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`clientID`, `clientusername`, `clientpassword`, `clientaddress`, `clientemail`, `joindate`, `clientprofile`, `clienttoken`) VALUES
(19, 'warren', 'warren123', 'brgy san isidro', 'larioswarren5@gmail.com', '2024-07-10', 'drink.jpg_20240710040849', 'c53da7905e'),
(47, 'manolo', 'manolo123', 'wwoekwodj', 'manolo@gmail.com', '2024-07-28', 'drink1.jpg_20240728140537', 'default token');

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
  `commentdate` date NOT NULL DEFAULT current_timestamp(),
  `ratingpicture` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`ratingprimarykey`, `ratingproductID`, `productname`, `productsize`, `commenter`, `star`, `comment`, `commentdate`, `ratingpicture`) VALUES
(1, 42, 'Pedegree', 'XL', 'manolo', 1, 'sample', '2024-08-04', 'drink_20240804062153.jpg,drink1_20240804062153.jpg,drink2_20240804062153.jpg'),
(2, 42, 'Pedegree', 'XL', 'manolo', 5, 'nice product', '2024-08-04', 'food1_20240804065732.jpg,food3_20240804065732.jpg,food4_20240804065732.jpg,FOOD5_20240804065732.jpg'),
(3, 47, 'Alpo', 'M', 'manolo', 1, 'alpo comment', '2024-08-04', 'drink_20240804071421.jpg,drink1_20240804071421.jpg');

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
  MODIFY `addtocartprimarykey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `adminproduct`
--
ALTER TABLE `adminproduct`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `buyproduct`
--
ALTER TABLE `buyproduct`
  MODIFY `buyproductprimarykey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `clientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `ratingprimarykey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
