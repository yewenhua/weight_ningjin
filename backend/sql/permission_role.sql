-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2021-09-25 09:33:36
-- 服务器版本： 10.3.16-MariaDB
-- PHP 版本： 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `sis`
--

-- --------------------------------------------------------

--
-- 表的结构 `permission_role`
--

CREATE TABLE `permission_role` (
  `id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `permission_role`
--

INSERT INTO `permission_role` (`id`, `permission_id`, `role_id`, `created_at`, `updated_at`) VALUES
(3, 1, 3, NULL, NULL),
(4, 2, 3, NULL, NULL),
(5, 4, 3, NULL, NULL),
(6, 2, 2, NULL, NULL),
(7, 7, 2, NULL, NULL),
(8, 10, 2, NULL, NULL),
(9, 13, 2, NULL, NULL),
(10, 4, 1, NULL, NULL),
(11, 7, 1, NULL, NULL),
(12, 9, 1, NULL, NULL),
(13, 13, 1, NULL, NULL),
(14, 1, 1, NULL, NULL),
(15, 2, 1, NULL, NULL),
(16, 5, 1, NULL, NULL),
(17, 8, 1, NULL, NULL),
(18, 10, 1, NULL, NULL),
(19, 11, 1, NULL, NULL),
(20, 12, 1, NULL, NULL),
(21, 14, 1, NULL, NULL),
(22, 15, 1, NULL, NULL),
(23, 16, 1, NULL, NULL),
(24, 12, 3, NULL, NULL),
(25, 1, 2, NULL, NULL),
(26, 4, 2, NULL, NULL),
(27, 17, 1, NULL, NULL),
(28, 18, 1, NULL, NULL),
(29, 19, 1, NULL, NULL),
(30, 20, 1, NULL, NULL),
(31, 21, 1, NULL, NULL),
(32, 22, 1, NULL, NULL),
(33, 23, 1, NULL, NULL),
(34, 24, 1, NULL, NULL),
(35, 25, 1, NULL, NULL),
(36, 26, 1, NULL, NULL),
(37, 27, 1, NULL, NULL),
(38, 28, 1, NULL, NULL),
(39, 29, 1, NULL, NULL),
(40, 30, 1, NULL, NULL),
(41, 31, 1, NULL, NULL),
(42, 32, 1, NULL, NULL),
(43, 33, 1, NULL, NULL),
(44, 34, 1, NULL, NULL),
(45, 17, 4, NULL, NULL),
(46, 18, 4, NULL, NULL),
(47, 26, 4, NULL, NULL),
(48, 28, 4, NULL, NULL),
(51, 31, 4, NULL, NULL),
(52, 34, 4, NULL, NULL),
(53, 35, 1, '2018-08-11 07:34:23', '2018-08-11 07:34:23'),
(54, 36, 1, '2018-08-11 07:34:43', '2018-08-11 07:34:43'),
(55, 37, 1, '2018-08-14 02:25:22', '2018-08-14 02:25:22'),
(56, 27, 4, '2018-08-17 01:05:02', '2018-08-17 01:05:02'),
(57, 17, 5, '2018-08-17 01:06:03', '2018-08-17 01:06:03'),
(58, 18, 5, '2018-08-17 01:06:03', '2018-08-17 01:06:03'),
(59, 26, 5, '2018-08-17 01:06:03', '2018-08-17 01:06:03'),
(62, 31, 5, '2018-08-17 01:06:03', '2018-08-17 01:06:03'),
(63, 34, 5, '2018-08-17 01:06:03', '2018-08-17 01:06:03'),
(65, 17, 3, '2018-08-28 06:50:30', '2018-08-28 06:50:30'),
(66, 18, 3, '2018-08-28 06:50:30', '2018-08-28 06:50:30'),
(67, 28, 3, '2018-08-28 06:50:31', '2018-08-28 06:50:31'),
(68, 31, 3, '2018-08-28 06:50:31', '2018-08-28 06:50:31'),
(69, 32, 3, '2018-08-28 06:50:31', '2018-08-28 06:50:31'),
(70, 33, 3, '2018-08-28 06:50:31', '2018-08-28 06:50:31'),
(71, 34, 3, '2018-08-28 06:50:31', '2018-08-28 06:50:31'),
(83, 35, 4, '2018-08-29 07:51:20', '2018-08-29 07:51:20'),
(85, 17, 6, '2018-08-30 06:50:17', '2018-08-30 06:50:17'),
(86, 18, 6, '2018-08-30 06:50:17', '2018-08-30 06:50:17'),
(87, 27, 6, '2018-08-30 06:50:17', '2018-08-30 06:50:17'),
(88, 28, 6, '2018-08-30 06:50:17', '2018-08-30 06:50:17'),
(89, 31, 6, '2018-08-30 06:50:17', '2018-08-30 06:50:17'),
(90, 26, 6, '2018-08-30 07:08:23', '2018-08-30 07:08:23'),
(92, 17, 2, '2018-09-03 02:45:00', '2018-09-03 02:45:00'),
(93, 18, 2, '2018-09-03 02:45:00', '2018-09-03 02:45:00'),
(94, 26, 2, '2018-09-03 02:45:00', '2018-09-03 02:45:00'),
(95, 27, 2, '2018-09-03 02:45:00', '2018-09-03 02:45:00'),
(96, 28, 2, '2018-09-03 02:45:00', '2018-09-03 02:45:00'),
(98, 31, 2, '2018-09-03 02:45:00', '2018-09-03 02:45:00'),
(100, 38, 4, '2018-09-03 07:51:24', '2018-09-03 07:51:24'),
(101, 27, 3, '2018-09-07 08:13:17', '2018-09-07 08:13:17'),
(102, 29, 3, '2018-09-07 08:13:17', '2018-09-07 08:13:17'),
(103, 14, 2, '2018-09-07 08:16:40', '2018-09-07 08:16:40'),
(104, 15, 2, '2018-09-07 08:16:40', '2018-09-07 08:16:40'),
(105, 16, 2, '2018-09-07 08:16:40', '2018-09-07 08:16:40'),
(106, 32, 2, '2018-09-07 08:16:40', '2018-09-07 08:16:40'),
(107, 37, 2, '2018-09-07 08:16:40', '2018-09-07 08:16:40'),
(108, 38, 2, '2018-09-07 08:16:40', '2018-09-07 08:16:40'),
(109, 30, 2, '2018-09-08 06:27:24', '2018-09-08 06:27:24'),
(110, 35, 2, '2018-09-08 06:27:24', '2018-09-08 06:27:24'),
(113, 17, 7, '2018-09-19 08:38:29', '2018-09-19 08:38:29'),
(114, 18, 7, '2018-09-19 08:38:29', '2018-09-19 08:38:29'),
(115, 27, 7, '2018-09-19 08:38:29', '2018-09-19 08:38:29'),
(116, 28, 7, '2018-09-19 08:38:29', '2018-09-19 08:38:29'),
(117, 29, 7, '2018-09-19 08:38:29', '2018-09-19 08:38:29'),
(118, 30, 7, '2018-09-19 08:38:29', '2018-09-19 08:38:29'),
(119, 31, 7, '2018-09-19 08:38:29', '2018-09-19 08:38:29'),
(120, 32, 7, '2018-09-19 08:38:29', '2018-09-19 08:38:29'),
(122, 26, 7, '2018-09-19 08:42:33', '2018-09-19 08:42:33'),
(123, 35, 7, '2018-09-19 08:42:33', '2018-09-19 08:42:33'),
(124, 28, 5, '2018-09-19 10:59:57', '2018-09-19 10:59:57'),
(125, 27, 5, '2018-09-19 11:02:08', '2018-09-19 11:02:08'),
(126, 29, 4, '2018-10-09 07:16:23', '2018-10-09 07:16:23'),
(127, 37, 7, '2018-10-09 23:16:13', '2018-10-09 23:16:13'),
(128, 38, 7, '2018-10-09 23:16:13', '2018-10-09 23:16:13'),
(129, 37, 4, '2019-04-19 06:45:05', '2019-04-19 06:45:05'),
(130, 39, 1, '2019-04-19 07:03:22', '2019-04-19 07:03:22'),
(131, 40, 1, '2019-04-22 05:11:53', '2019-04-22 05:11:53'),
(132, 41, 1, '2019-04-24 02:28:32', '2019-04-24 02:28:32'),
(133, 42, 1, '2019-05-08 09:21:05', '2019-05-08 09:21:05'),
(134, 33, 2, '2020-03-13 09:04:09', '2020-03-13 09:04:09'),
(135, 34, 2, '2020-03-13 09:04:09', '2020-03-13 09:04:09'),
(136, 36, 2, '2020-03-13 09:04:09', '2020-03-13 09:04:09'),
(138, 41, 2, '2020-03-13 09:04:09', '2020-03-13 09:04:09'),
(139, 45, 2, '2020-03-14 07:41:33', '2020-03-14 07:41:33'),
(143, 49, 2, '2020-03-14 07:41:33', '2020-03-14 07:41:33'),
(145, 51, 2, '2020-03-14 07:41:33', '2020-03-14 07:41:33'),
(146, 52, 2, '2020-03-14 07:41:33', '2020-03-14 07:41:33'),
(147, 53, 2, '2020-03-14 07:41:33', '2020-03-14 07:41:33'),
(148, 54, 2, '2020-03-14 07:41:33', '2020-03-14 07:41:33'),
(149, 55, 2, '2020-03-14 07:41:33', '2020-03-14 07:41:33'),
(150, 56, 2, '2020-03-14 07:41:33', '2020-03-14 07:41:33'),
(151, 57, 2, '2020-03-14 07:41:33', '2020-03-14 07:41:33'),
(152, 109, 10, '2020-05-18 07:57:37', '2020-05-18 07:57:37'),
(153, 110, 10, '2020-05-18 07:57:37', '2020-05-18 07:57:37'),
(154, 111, 10, '2020-05-18 07:57:37', '2020-05-18 07:57:37'),
(155, 114, 10, '2020-05-18 07:57:37', '2020-05-18 07:57:37'),
(156, 1, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(157, 2, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(158, 3, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(159, 4, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(160, 5, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(161, 29, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(162, 38, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(163, 39, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(164, 40, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(165, 41, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(166, 42, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(167, 43, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(168, 44, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(169, 45, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(170, 46, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(171, 47, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(172, 48, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(173, 49, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(174, 50, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(175, 51, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(176, 52, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(177, 53, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(178, 54, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(179, 55, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(180, 56, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(181, 57, 10, '2020-05-18 07:58:47', '2020-05-18 07:58:47'),
(199, 115, 10, '2020-05-18 08:40:27', '2020-05-18 08:40:27'),
(200, 3, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(201, 5, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(202, 6, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(203, 8, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(204, 9, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(205, 68, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(206, 69, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(207, 70, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(208, 71, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(209, 72, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(210, 73, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(211, 74, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(212, 75, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(213, 76, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(214, 77, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(215, 78, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(216, 79, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(217, 80, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(218, 81, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(219, 82, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(220, 83, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(221, 84, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(222, 85, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(223, 86, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(224, 87, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(225, 88, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(226, 89, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(227, 90, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(228, 91, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(229, 92, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(230, 93, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(231, 94, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(232, 95, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(233, 96, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(234, 97, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(235, 98, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(236, 99, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(237, 100, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(238, 101, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(239, 102, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(240, 103, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(241, 104, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(242, 105, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(243, 106, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(244, 107, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(245, 108, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(246, 109, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(247, 110, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(248, 111, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(249, 112, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(250, 113, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(251, 114, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(252, 115, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(253, 117, 2, '2020-06-11 01:34:52', '2020-06-11 01:34:52'),
(254, 118, 2, '2020-06-18 08:12:30', '2020-06-18 08:12:30'),
(255, 119, 2, '2020-06-18 08:12:30', '2020-06-18 08:12:30'),
(256, 120, 2, '2020-06-18 08:12:30', '2020-06-18 08:12:30'),
(257, 121, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(258, 122, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(259, 123, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(260, 124, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(261, 126, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(262, 127, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(263, 128, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(264, 129, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(265, 130, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(266, 131, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(267, 132, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(268, 133, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(269, 134, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(270, 135, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(271, 136, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(272, 137, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(273, 138, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(274, 139, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(275, 140, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(276, 141, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(277, 142, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(278, 143, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(279, 144, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(280, 145, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(281, 146, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(282, 147, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(283, 148, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(284, 149, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(285, 150, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(286, 151, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(287, 152, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(288, 153, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(289, 154, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(290, 155, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(291, 156, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(292, 157, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(293, 158, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(294, 159, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(295, 160, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(296, 161, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(297, 162, 2, '2020-07-11 07:36:31', '2020-07-11 07:36:31'),
(298, 163, 2, '2020-07-23 03:27:05', '2020-07-23 03:27:05'),
(299, 164, 2, '2020-07-23 03:27:05', '2020-07-23 03:27:05'),
(300, 165, 2, '2020-07-23 03:27:05', '2020-07-23 03:27:05'),
(301, 167, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(302, 200, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(303, 201, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(304, 202, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(305, 203, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(306, 204, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(307, 205, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(308, 206, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(309, 207, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(310, 209, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(311, 210, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(312, 211, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(313, 212, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(314, 213, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(315, 214, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(316, 215, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(317, 216, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(318, 217, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(319, 218, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(320, 219, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(321, 220, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(322, 221, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(323, 222, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(324, 223, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(325, 224, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(326, 225, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(327, 226, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(328, 227, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(329, 228, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(330, 229, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(331, 230, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(332, 231, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(333, 232, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(334, 233, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(335, 234, 2, '2021-02-26 03:26:46', '2021-02-26 03:26:46'),
(336, 29, 2, '2021-02-26 03:41:13', '2021-02-26 03:41:13'),
(337, 39, 2, '2021-02-26 03:41:13', '2021-02-26 03:41:13'),
(338, 40, 2, '2021-02-26 03:41:13', '2021-02-26 03:41:13'),
(339, 42, 2, '2021-02-26 03:41:13', '2021-02-26 03:41:13'),
(340, 43, 2, '2021-02-26 03:41:13', '2021-02-26 03:41:13'),
(341, 44, 2, '2021-02-26 03:41:13', '2021-02-26 03:41:13'),
(342, 46, 2, '2021-02-26 03:41:13', '2021-02-26 03:41:13'),
(343, 47, 2, '2021-02-26 03:41:13', '2021-02-26 03:41:13'),
(344, 48, 2, '2021-02-26 03:41:13', '2021-02-26 03:41:13'),
(345, 50, 2, '2021-02-26 03:41:13', '2021-02-26 03:41:13'),
(346, 235, 2, '2021-02-26 03:55:43', '2021-02-26 03:55:43'),
(347, 236, 2, '2021-02-26 03:55:43', '2021-02-26 03:55:43'),
(348, 237, 2, '2021-02-26 03:55:43', '2021-02-26 03:55:43'),
(349, 238, 2, '2021-02-26 03:55:43', '2021-02-26 03:55:43'),
(350, 239, 2, '2021-02-26 03:55:43', '2021-02-26 03:55:43'),
(351, 240, 2, '2021-02-26 05:19:10', '2021-02-26 05:19:10'),
(352, 241, 2, '2021-02-26 05:19:10', '2021-02-26 05:19:10'),
(353, 242, 2, '2021-02-26 05:19:10', '2021-02-26 05:19:10'),
(354, 243, 2, '2021-02-26 05:19:10', '2021-02-26 05:19:10'),
(355, 244, 2, '2021-02-26 05:19:10', '2021-02-26 05:19:10'),
(356, 245, 2, '2021-02-26 05:19:10', '2021-02-26 05:19:10'),
(357, 246, 2, '2021-02-26 05:19:10', '2021-02-26 05:19:10'),
(358, 247, 2, '2021-02-26 05:19:10', '2021-02-26 05:19:10'),
(359, 248, 2, '2021-02-26 05:19:10', '2021-02-26 05:19:10'),
(360, 249, 2, '2021-02-26 05:59:30', '2021-02-26 05:59:30'),
(361, 250, 2, '2021-02-26 05:59:30', '2021-02-26 05:59:30'),
(362, 251, 2, '2021-02-26 05:59:30', '2021-02-26 05:59:30'),
(363, 252, 2, '2021-02-26 05:59:30', '2021-02-26 05:59:30'),
(364, 253, 2, '2021-02-26 05:59:30', '2021-02-26 05:59:30'),
(365, 254, 2, '2021-02-26 05:59:30', '2021-02-26 05:59:30'),
(366, 255, 2, '2021-02-26 05:59:30', '2021-02-26 05:59:30'),
(367, 256, 2, '2021-02-26 05:59:30', '2021-02-26 05:59:30'),
(368, 257, 2, '2021-04-12 02:56:55', '2021-04-12 02:56:55'),
(369, 258, 2, '2021-04-12 02:56:55', '2021-04-12 02:56:55'),
(370, 259, 2, '2021-04-12 02:56:55', '2021-04-12 02:56:55'),
(371, 260, 2, '2021-04-12 02:56:55', '2021-04-12 02:56:55'),
(372, 261, 2, '2021-04-12 03:42:15', '2021-04-12 03:42:15'),
(373, 28, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(374, 35, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(375, 36, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(376, 37, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(377, 84, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(378, 85, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(379, 86, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(380, 87, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(381, 88, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(382, 89, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(383, 90, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(384, 91, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(385, 92, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(386, 93, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(387, 94, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(389, 96, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(390, 99, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(391, 100, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(392, 112, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(393, 113, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(394, 117, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(395, 119, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(396, 121, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(397, 122, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(398, 123, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(399, 124, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(400, 126, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(401, 131, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(402, 132, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(403, 133, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(404, 134, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(405, 135, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(406, 136, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(407, 137, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(408, 138, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(409, 139, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(410, 140, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(411, 141, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(412, 142, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(413, 143, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(414, 144, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(415, 145, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(416, 146, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(417, 147, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(418, 148, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(419, 149, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(420, 150, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(421, 151, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(422, 152, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(423, 153, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(424, 154, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(425, 155, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(426, 156, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(427, 161, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(428, 162, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(429, 163, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(430, 164, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(432, 200, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(433, 201, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(434, 202, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(435, 203, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(436, 204, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(437, 205, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(438, 206, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(439, 207, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(440, 209, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(441, 210, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(442, 211, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(443, 212, 10, '2021-09-07 08:08:16', '2021-09-07 08:08:16'),
(444, 213, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(445, 214, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(446, 215, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(448, 217, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(450, 219, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(451, 220, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(452, 221, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(453, 222, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(454, 223, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(455, 224, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(456, 225, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(457, 226, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(458, 227, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(459, 228, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(460, 229, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(461, 230, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(462, 231, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(463, 232, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(464, 233, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(465, 234, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(466, 235, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(467, 236, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(468, 237, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(469, 238, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(470, 239, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(471, 240, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(472, 241, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(474, 243, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(476, 245, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(477, 246, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(478, 247, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(479, 248, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(480, 249, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(481, 250, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(482, 251, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(483, 252, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(484, 253, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(485, 254, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(486, 255, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(487, 256, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(488, 257, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(489, 258, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(490, 259, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(491, 260, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(492, 261, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(493, 262, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(494, 263, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(495, 264, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(496, 265, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(497, 266, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(498, 267, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(499, 268, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(500, 269, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(501, 270, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(502, 271, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(503, 272, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(504, 273, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(505, 274, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(506, 275, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(507, 276, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(508, 277, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(509, 278, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(510, 279, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(511, 280, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(512, 281, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(513, 282, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(514, 283, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(515, 284, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(516, 285, 10, '2021-09-07 08:08:17', '2021-09-07 08:08:17'),
(517, 286, 10, '2021-09-08 02:45:48', '2021-09-08 02:45:48'),
(518, 287, 10, '2021-09-08 02:49:58', '2021-09-08 02:49:58'),
(519, 288, 10, '2021-09-08 06:30:15', '2021-09-08 06:30:15'),
(521, 95, 10, '2021-09-16 09:11:24', '2021-09-16 09:11:24'),
(522, 216, 10, '2021-09-16 09:11:24', '2021-09-16 09:11:24'),
(523, 290, 10, '2021-09-16 09:11:24', '2021-09-16 09:11:24'),
(524, 291, 10, '2021-09-16 09:11:24', '2021-09-16 09:11:24'),
(525, 292, 10, '2021-09-17 02:24:43', '2021-09-17 02:24:43'),
(526, 293, 10, '2021-09-17 02:24:43', '2021-09-17 02:24:43');

--
-- 转储表的索引
--

--
-- 表的索引 `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `permission_role`
--
ALTER TABLE `permission_role`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=527;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;