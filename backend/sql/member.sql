-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2021-09-25 09:39:46
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
-- 表的结构 `member`
--

CREATE TABLE `member` (
  `id` int(10) UNSIGNED NOT NULL,
  `unionid` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `consume_num` int(11) DEFAULT 0 COMMENT '总消费次数',
  `consume_money` decimal(10,4) DEFAULT 0.0000 COMMENT '总消费金额',
  `last_consume_time` datetime DEFAULT NULL COMMENT '上次消费时间',
  `is_vip` int(11) DEFAULT NULL COMMENT '是否会员',
  `card_no` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_distribute` int(11) DEFAULT NULL COMMENT '是否分销',
  `money` decimal(10,4) DEFAULT 0.0000 COMMENT '余额',
  `freezen_money` decimal(10,4) NOT NULL DEFAULT 0.0000 COMMENT '冻结余额',
  `total_income` decimal(10,4) DEFAULT 0.0000,
  `today_income` decimal(10,4) DEFAULT 0.0000,
  `point` int(11) DEFAULT 0 COMMENT '积分',
  `code` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `router` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` enum('koudai','core','gold') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vip_save_money` decimal(10,4) DEFAULT 0.0000,
  `channel` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `member`
--

INSERT INTO `member` (`id`, `unionid`, `password`, `username`, `mobile`, `consume_num`, `consume_money`, `last_consume_time`, `is_vip`, `card_no`, `is_distribute`, `money`, `freezen_money`, `total_income`, `today_income`, `point`, `code`, `parent_id`, `router`, `level`, `vip_save_money`, `channel`, `created_at`, `updated_at`, `deleted_at`) VALUES
(5, 'ogITH1H5G-CA7juySesllbSHMq2o', NULL, '耶耶耶', '15288552288', 53, '0.6300', '2019-11-19 11:29:33', 1, '14008043', 1, '0.0000', '15.0000', '85.0130', '0.0000', 10400, 'qG6yMY', NULL, '5', 'gold', '0.5500', NULL, NULL, '2019-11-19 17:01:01', NULL),
(6, 'ogITH1H9PEg-cNfzYcUGPtuXoFlw', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'ErKH4q', NULL, NULL, NULL, '0.0000', NULL, '2019-08-06 10:05:47', '2019-08-06 10:05:47', NULL),
(7, 'ogITH1GRACeRrn0J8nOM1igUWO-A', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, '9JVQFE', NULL, NULL, NULL, '0.0000', NULL, '2019-08-06 10:12:47', '2019-08-06 10:12:47', NULL),
(8, 'ogITH1B8Msmw56opg8usDzktNGdI', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'inTHwk', NULL, NULL, NULL, '0.0000', NULL, '2019-08-06 15:42:15', '2019-08-06 15:42:15', NULL),
(9, 'ogITH1ICVprKPkrcMBl_okazn9Z0', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'ayzwWI', NULL, NULL, NULL, '0.0000', NULL, '2019-08-06 16:16:10', '2019-08-06 16:16:10', NULL),
(10, 'ogITH1GMbMXulGdYHsYPp4eWdcIQ', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, '8T7WaB', NULL, NULL, NULL, '0.0000', NULL, '2019-08-06 16:38:26', '2019-08-06 16:38:26', NULL),
(11, 'ogITH1OZzgwCN33Fq9HFpJaV8kN0', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'MiVj7M', NULL, NULL, NULL, '0.0000', NULL, '2019-08-06 23:54:22', '2019-08-06 23:54:22', NULL),
(12, 'ogITH1D_-k3qVBdjl_Yg9GcTBhsU', NULL, 'wzx', '15088967777', 2, '0.0200', '2019-11-02 14:17:51', 1, '27180236', 1, '0.0000', '0.0000', '0.0000', '0.0000', 90, 'EX8yId', NULL, '12', 'gold', '0.0200', NULL, '2019-09-09 03:16:11', '2019-11-19 17:01:01', NULL),
(13, 'ogITH1Ie_aUlSjmMvnCW6OF2OENE', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, '8JXDTx', NULL, NULL, NULL, '0.0000', NULL, '2019-09-29 09:08:27', '2019-09-29 09:08:27', NULL),
(14, 'ogITH1DC2riUOINhBAbm1eHv5Fck', NULL, '周斌', '18814867625', 5, '0.1100', '2019-11-18 16:27:57', 1, '61210651', 1, '0.0010', '0.0000', '0.0010', '0.0000', 40, 'PA8xAG', NULL, '14', 'gold', '0.0600', NULL, '2019-09-29 09:08:51', '2019-11-19 17:01:01', NULL),
(15, 'ogITH1JtNCHwUSw1vXn6SllqorMw', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'hFM2rR', NULL, NULL, NULL, '0.0000', NULL, '2019-09-29 09:22:32', '2019-09-29 09:22:32', NULL),
(16, 'ogITH1JDVXXO3axB_pNNZjfw2Dso', NULL, '沈斌', '13402150720', 1, '0.1000', '2019-10-18 11:41:12', 1, '27570262', 1, '0.0000', '15.0000', '25.0000', '0.0000', 0, 'MgJI1B', NULL, '16', 'gold', '0.0000', NULL, '2019-10-02 04:47:59', '2019-11-19 17:01:01', NULL),
(17, 'ogITH1DFPN-kZUjV5c6BbHk9WRP8', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'SE1GR2', NULL, NULL, NULL, '0.0000', NULL, '2019-10-02 04:49:52', '2019-10-02 04:49:52', NULL),
(53, 'ogITH1HzCrqWa96EQzNVSOOfTgxx', NULL, NULL, NULL, 10, '0.2100', '2019-11-18 14:38:44', NULL, NULL, 1, '0.0000', '0.0000', '0.0000', '0.0000', 60, 'KOkOOu', 5, '5,53', 'gold', '0.0000', NULL, '2019-10-15 08:13:40', '2019-11-19 17:01:01', NULL),
(58, 'ogITH1AhChbd7ZawwJjpaT44KJqE', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'kIga0Q', NULL, NULL, NULL, '0.0000', NULL, '2019-10-20 13:00:30', '2019-10-20 13:00:30', NULL),
(76, 'ogITH1D97QEYYUgaGqVhRYBdYUjQ', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, '5hqNUN', NULL, NULL, NULL, '0.0000', NULL, '2019-10-23 03:28:28', '2019-10-23 03:28:28', NULL),
(77, 'ogITH1Jiv_WUqN01FFz8mQrKMufc', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'MiKf4U', NULL, NULL, NULL, '0.0000', NULL, '2019-10-23 03:56:34', '2019-10-23 03:56:34', NULL),
(84, 'ogITH1C3inp74GipRuA6NAhhDK5U', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'RlGklE', NULL, NULL, NULL, '0.0000', NULL, '2019-10-23 11:15:50', '2019-10-23 11:15:50', NULL),
(88, 'ogITH1MlP-jWNqVie-Jk2fwqApmA', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'Lt16Ac', NULL, NULL, NULL, '0.0000', NULL, '2019-10-24 07:31:13', '2019-10-24 07:31:13', NULL),
(89, 'ogITH1L4l37xEWodIIPEX691c-40', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'ZPYlQr', NULL, NULL, NULL, '0.0000', NULL, '2019-10-24 10:45:51', '2019-10-24 10:45:51', NULL),
(90, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'fh530O', NULL, NULL, NULL, '0.0000', NULL, '2019-10-25 09:28:18', '2019-10-25 09:28:18', NULL),
(91, 'ogITH1Bez2tbtkGyfVDw-Fhd7ZM0', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, 1, '0.0000', '5.0000', '5.0000', '0.0000', 0, 'kBW2Dy', 16, '16,91', 'gold', '0.0000', NULL, '2019-10-30 09:40:09', '2019-11-19 17:01:01', NULL),
(92, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 's19eEP', NULL, NULL, NULL, '0.0000', NULL, '2019-10-30 21:37:45', '2019-10-30 21:37:45', NULL),
(93, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'AYRBfj', NULL, NULL, NULL, '0.0000', NULL, '2019-10-31 02:30:47', '2019-10-31 02:30:47', NULL),
(94, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'RSZBs1', NULL, NULL, NULL, '0.0000', NULL, '2019-10-31 08:56:34', '2019-10-31 08:56:34', NULL),
(95, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'RUAhic', NULL, NULL, NULL, '0.0000', NULL, '2019-11-01 06:19:11', '2019-11-01 06:19:11', NULL),
(96, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'b0lCfd', NULL, NULL, NULL, '0.0000', NULL, '2019-11-02 06:49:02', '2019-11-02 06:49:02', NULL),
(97, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'yFVRFJ', NULL, NULL, NULL, '0.0000', NULL, '2019-11-05 02:25:26', '2019-11-05 02:25:26', NULL),
(98, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'nAiaPi', NULL, NULL, NULL, '0.0000', NULL, '2019-11-05 13:14:31', '2019-11-05 13:14:31', NULL),
(99, 'ogITH1PYUmXpSKjWep-kwcX-UO0I', NULL, NULL, NULL, 1, '0.0200', '2019-11-18 11:17:53', NULL, NULL, 1, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'WN8IEq', 16, '16,99', 'gold', '0.0000', NULL, '2019-11-05 14:39:32', '2019-11-19 17:01:01', NULL),
(100, 'ogITH1AS2GFMl8jgRq7VF65RIZoI', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'HRzcXm', NULL, NULL, NULL, '0.0000', NULL, '2019-11-05 14:39:59', '2019-11-05 14:39:59', NULL),
(101, 'ogITH1N165HQjFskIZgYG3859TNk', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'Lph0ag', NULL, NULL, NULL, '0.0000', NULL, '2019-11-05 14:49:15', '2019-11-05 14:49:15', NULL),
(102, 'ogITH1Lci63UPKGlI_ESL9YTab9o', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, '9UkZwo', NULL, NULL, NULL, '0.0000', NULL, '2019-11-05 14:50:59', '2019-11-05 14:50:59', NULL),
(103, 'ogITH1Mlewwi9gKI8v87980X_ke4', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'OwoT19', NULL, NULL, NULL, '0.0000', NULL, '2019-11-06 07:54:08', '2019-11-06 07:54:08', NULL),
(104, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'PY7Z3i', NULL, NULL, NULL, '0.0000', NULL, '2019-11-06 08:02:34', '2019-11-06 08:02:34', NULL),
(105, 'ogITH1L1sqPY8QFhff9XesWdCg_0', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, 1, '0.0000', '10.0000', '10.0000', '0.0000', 0, '4UiO4Q', 91, '16,91,105', 'gold', '0.0000', NULL, '2019-11-06 09:29:05', '2019-11-19 17:01:01', NULL),
(106, 'ogITH1LRJvd7-gz7Yrrk7CVS0vI4', NULL, NULL, NULL, 1, '0.0200', '2019-11-18 11:13:18', NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, '4IBJEw', NULL, NULL, NULL, '0.0000', NULL, '2019-11-06 09:31:34', '2019-11-19 06:07:02', NULL),
(107, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'WFpWUT', NULL, NULL, NULL, '0.0000', NULL, '2019-11-06 20:20:40', '2019-11-06 20:20:40', NULL),
(108, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'tmdS6P', NULL, NULL, NULL, '0.0000', NULL, '2019-11-07 00:07:20', '2019-11-07 00:07:20', NULL),
(109, 'ogITH1BbYqbC3_RJsUOXA-LifJzg', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'hXC8oH', NULL, NULL, NULL, '0.0000', NULL, '2019-11-07 03:47:28', '2019-11-07 03:47:28', NULL),
(110, 'ogITH1IY4aAiIiEizJ4QH8YEuhak', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'iKfRt0', NULL, NULL, NULL, '0.0000', NULL, '2019-11-08 04:19:06', '2019-11-08 04:19:06', NULL),
(111, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'P6F1xy', NULL, NULL, NULL, '0.0000', NULL, '2019-11-09 09:17:11', '2019-11-09 09:17:11', NULL),
(112, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'g5NXRi', NULL, NULL, NULL, '0.0000', NULL, '2019-11-09 09:28:48', '2019-11-09 09:28:48', NULL),
(113, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'tDrDAg', NULL, NULL, NULL, '0.0000', NULL, '2019-11-09 20:44:57', '2019-11-09 20:44:57', NULL),
(114, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'PtYHar', NULL, NULL, NULL, '0.0000', NULL, '2019-11-12 02:22:20', '2019-11-12 02:22:20', NULL),
(115, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'Cl7h1g', NULL, NULL, NULL, '0.0000', NULL, '2019-11-12 03:45:23', '2019-11-12 03:45:23', NULL),
(116, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'PoGPHf', NULL, NULL, NULL, '0.0000', NULL, '2019-11-12 06:06:05', '2019-11-12 06:06:05', NULL),
(117, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'FA5pdA', NULL, NULL, NULL, '0.0000', NULL, '2019-11-12 06:06:11', '2019-11-12 06:06:11', NULL),
(118, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'TpMexr', NULL, NULL, NULL, '0.0000', NULL, '2019-11-13 22:25:23', '2019-11-13 22:25:23', NULL),
(119, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'W3L2qe', NULL, NULL, NULL, '0.0000', NULL, '2019-11-14 08:03:44', '2019-11-14 08:03:44', NULL),
(120, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'xXfGyb', NULL, NULL, NULL, '0.0000', NULL, '2019-11-14 12:08:01', '2019-11-14 12:08:01', NULL),
(121, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, '2EXPPI', NULL, NULL, NULL, '0.0000', NULL, '2019-11-15 02:57:53', '2019-11-15 02:57:53', NULL),
(122, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'mj5U8e', NULL, NULL, NULL, '0.0000', NULL, '2019-11-15 06:20:29', '2019-11-15 06:20:29', NULL),
(123, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'j75guk', NULL, NULL, NULL, '0.0000', NULL, '2019-11-15 09:24:03', '2019-11-15 09:24:03', NULL),
(124, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'aF8MRx', NULL, NULL, NULL, '0.0000', NULL, '2019-11-15 10:54:10', '2019-11-15 10:54:10', NULL),
(125, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'IGpY40', NULL, NULL, NULL, '0.0000', NULL, '2019-11-15 17:44:27', '2019-11-15 17:44:27', NULL),
(126, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, '9KM0Zo', NULL, NULL, NULL, '0.0000', NULL, '2019-11-15 23:16:25', '2019-11-15 23:16:25', NULL),
(127, 'ogITH1D0WdJK2f19D0o8dlyUedUo', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'ySjCUz', NULL, NULL, NULL, '0.0000', NULL, '2019-11-16 01:36:59', '2019-11-16 01:36:59', NULL),
(128, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'iSATA0', NULL, NULL, NULL, '0.0000', NULL, '2019-11-16 03:32:54', '2019-11-16 03:32:54', NULL),
(129, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'xbrdBi', NULL, NULL, NULL, '0.0000', NULL, '2019-11-16 08:40:35', '2019-11-16 08:40:35', NULL),
(130, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, '3S8U1g', NULL, NULL, NULL, '0.0000', NULL, '2019-11-16 10:33:25', '2019-11-16 10:33:25', NULL),
(131, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, '4hdK71', NULL, NULL, NULL, '0.0000', NULL, '2019-11-17 13:28:30', '2019-11-17 13:28:30', NULL),
(132, 'ogITH1IfXdeWOcOXEhPPdrol1MAY', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, 1, '0.0000', '10.0000', '10.0000', '0.0000', 0, 'n7wcA1', 16, '16,132', 'gold', '0.0000', NULL, '2019-11-18 06:14:42', '2019-11-19 17:01:01', NULL),
(133, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'B9X0ii', NULL, NULL, NULL, '0.0000', NULL, '2019-11-18 06:28:02', '2019-11-18 06:28:02', NULL),
(134, 'ogITH1HzCrqWa96EQzNVSOOfTgxy', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, 1, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'fDyqiW', 5, '5,134', 'gold', '0.0000', NULL, '2019-11-18 08:21:50', '2019-11-19 17:01:01', NULL),
(138, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'GPtSY9', NULL, NULL, NULL, '0.0000', NULL, '2019-11-18 21:44:46', '2019-11-18 21:44:46', NULL),
(144, 'ogITH1HzCrqWa96EQzNVSOOfTgxk', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, 1, '0.0000', '10.0000', '10.0000', '0.0000', 0, 'tKRqw0', 5, '5,144', 'gold', '0.0000', NULL, '2019-11-19 02:17:21', '2019-11-19 17:01:01', NULL),
(145, NULL, NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'dcT6iC', NULL, NULL, NULL, '0.0000', NULL, '2020-03-06 01:43:14', '2020-03-06 01:43:14', NULL),
(146, 'ojTR4uDKySrO8Pu0Lbu1megT9FFU', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, 'AKQbPn', NULL, NULL, NULL, '0.0000', NULL, '2021-09-25 01:01:07', '2021-09-25 01:01:07', NULL),
(147, 'ojTR4uO-QMl19ijI7T-FDizWZXA8', NULL, NULL, NULL, 0, '0.0000', NULL, NULL, NULL, NULL, '0.0000', '0.0000', '0.0000', '0.0000', 0, '0wiA8w', NULL, NULL, NULL, '0.0000', NULL, '2021-09-25 01:24:14', '2021-09-25 01:24:14', NULL);

--
-- 转储表的索引
--

--
-- 表的索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `unionid` (`unionid`),
  ADD KEY `parent_code` (`parent_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;