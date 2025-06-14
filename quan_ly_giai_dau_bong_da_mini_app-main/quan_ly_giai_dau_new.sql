-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 20, 2025 lúc 11:36 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quan_ly_giai_dau_new`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bang_dau`
--

CREATE TABLE `bang_dau` (
  `ma_bang_dau` varchar(255) NOT NULL,
  `ten_bang_dau` varchar(50) NOT NULL,
  `ma_giai_dau` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `bang_dau`
--

INSERT INTO `bang_dau` (`ma_bang_dau`, `ten_bang_dau`, `ma_giai_dau`) VALUES
('bd_0001', 'bảng c cho aa', 'gd_0001'),
('bd_0002', '111d1', 'gd_0001'),
('bd_0003', '111d', 'gd_0001'),
('bd_0004', 'Bảng 4', 'gd_0001'),
('BD01', 'Bảng A - GD01', 'GD01'),
('BD02', 'Bảng B - GD01', 'GD01'),
('BD03', 'Bảng C - GD01', 'GD01'),
('BD04', 'Bảng A - GD02', 'GD02'),
('BD05', 'Bảng B - GD02', 'GD02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bang_xep_hang_vong_loai`
--

CREATE TABLE `bang_xep_hang_vong_loai` (
  `ma_doi_bong` varchar(255) NOT NULL,
  `ma_bang_dau` varchar(255) NOT NULL,
  `diem` int(11) DEFAULT 0,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `bang_xep_hang_vong_loai`
--

INSERT INTO `bang_xep_hang_vong_loai` (`ma_doi_bong`, `ma_bang_dau`, `diem`, `ghi_chu`) VALUES
('DB01', 'bd_0001', 1, NULL),
('DB01', 'BD01', 10, NULL),
('DB02', 'bd_0001', 1, NULL),
('DB02', 'BD01', 100, NULL),
('DB02', 'BD02', 110, NULL),
('DB02', 'BD03', 5, NULL),
('DB03', 'bd_0001', 14, NULL),
('DB03', 'bd_0002', 102, NULL),
('DB06', 'bd_0001', 1, NULL),
('DB06', 'bd_0002', 1, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cau_thu`
--

CREATE TABLE `cau_thu` (
  `ma_cau_thu` varchar(255) NOT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `ngay_sinh` date NOT NULL,
  `so_ao` int(11) NOT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `gioi_tinh` enum('nam','nữ') DEFAULT NULL,
  `ma_vi_tri` varchar(255) NOT NULL,
  `ma_doi_bong` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `cau_thu`
--

INSERT INTO `cau_thu` (`ma_cau_thu`, `ho_ten`, `ngay_sinh`, `so_ao`, `hinh_anh`, `gioi_tinh`, `ma_vi_tri`, `ma_doi_bong`) VALUES
('ct_0001', 'lê văn tiến11', '2002-12-18', 8, 'Screenshot_2024-06-07_101114.png', 'nam', 'RWB', 'db_0003'),
('ct_0002', 'lê văn tiến', '2025-04-02', 111, 'Screenshot_2025-01-11_214856.png', 'nam', 'RWB', 'db_0003'),
('ct_0003', 'ttttt', '2025-04-18', 3, 'Screenshot_2025-01-11_214856.png', 'nam', 'RB', 'db_0003'),
('ct_0004', 'lê văn tiến111', '2025-04-15', 6, 'z6418754535921_35d72cad7c7e34a996a2b45591bc61bf.jpg', 'nữ', 'GK', 'db_0003'),
('CT01', 'Nguyễn Văn Quyết', '1990-06-20', 10, 'Screenshot_2025-01-11_214856.png', 'nam', 'ST', 'db_0003'),
('CT02', 'Đỗ Hùng Dũng', '1993-09-08', 16, 'Screenshot_2025-01-11_214856.png', 'nam', 'CM', 'db_0003'),
('CT03', 'Quế Ngọc Hải', '1993-05-15', 3, NULL, 'nam', 'CB', 'db_0003'),
('CT04', 'Bùi Tiến Dũng', '1995-10-02', 4, '4c968875-2e95-466d-b5e3-bd57901f8f71.jpg', 'nam', 'CB', 'db_0003'),
('CT05', 'Nguyễn Công Phượng', '1995-01-21', 10, 'Screenshot_2025-01-11_214856.png', 'nam', 'CF', 'db_0003'),
('CT06', 'Phan Văn Đức', '1996-04-11', 20, 'Screenshot_2025-01-11_214856.png', 'nam', 'LW', 'db_0003'),
('CT07', 'Văn Thanh', '1996-07-14', 17, '222.jpg', 'nam', 'RB', 'db_0003'),
('CT08', 'Đặng Văn Lâm', '1993-08-13', 1, '44.png', 'nam', 'GK', 'db_0003'),
('CT09', 'Hà Đức Chinh', '1997-09-22', 9, '3333.png', 'nam', 'ST', 'db_0003'),
('CT10', 'Nguyễn Hoàng Đức', '1998-06-11', 14, '19_3.png', 'nam', 'CM', 'db_0003');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cau_thu_giai_dau`
--

CREATE TABLE `cau_thu_giai_dau` (
  `ma_cau_thu` varchar(255) NOT NULL,
  `ma_giai_dau` varchar(255) NOT NULL,
  `ma_doi_bong` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `so_ao` int(11) NOT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_vi_tri` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `cau_thu_giai_dau`
--

INSERT INTO `cau_thu_giai_dau` (`ma_cau_thu`, `ma_giai_dau`, `ma_doi_bong`, `ho_ten`, `so_ao`, `hinh_anh`, `ma_vi_tri`) VALUES
('ct_0001', 'gd_0003', 'db_0003', 'lê văn tiến11', 8, 'Screenshot_2024-06-07_101114.png', 'RWB'),
('ct_0001', 'GD01', 'db_0003', 'lê văn tiến11', 8, 'Screenshot_2024-06-07_101114.png', 'RWB'),
('ct_0002', 'gd_0003', 'db_0003', 'lê văn tiến', 111, 'Screenshot_2025-01-11_214856.png', 'RWB'),
('ct_0002', 'GD01', 'db_0003', 'lê văn tiến', 111, 'Screenshot_2025-01-11_214856.png', 'RWB'),
('ct_0003', 'gd_0003', 'db_0003', 'ttttt', 3, 'Screenshot_2025-01-11_214856.png', 'RB'),
('ct_0004', 'gd_0003', 'db_0003', 'lê văn tiến111', 6, 'z6418754535921_35d72cad7c7e34a996a2b45591bc61bf.jpg', 'GK'),
('ct_0004', 'GD01', 'db_0003', 'lê văn tiến111', 6, 'z6418754535921_35d72cad7c7e34a996a2b45591bc61bf.jpg', 'GK'),
('CT01', 'gd_0003', 'db_0003', 'Nguyễn Văn Quyết', 10, 'Screenshot_2025-01-11_214856.png', 'ST'),
('CT02', 'gd_0003', 'db_0003', 'Đỗ Hùng Dũng', 16, 'Screenshot_2025-01-11_214856.png', 'CM'),
('CT03', 'gd_0003', 'db_0003', 'Quế Ngọc Hải', 3, NULL, 'CB'),
('CT04', 'gd_0003', 'db_0003', 'Bùi Tiến Dũng', 4, '4c968875-2e95-466d-b5e3-bd57901f8f71.jpg', 'CB'),
('CT05', 'gd_0003', 'db_0003', 'Nguyễn Công Phượng', 10, 'Screenshot_2025-01-11_214856.png', 'CF'),
('CT06', 'gd_0003', 'db_0003', 'Phan Văn Đức', 20, 'Screenshot_2025-01-11_214856.png', 'LW'),
('CT07', 'gd_0003', 'db_0003', 'Văn Thanh', 17, '222.jpg', 'RB'),
('CT08', 'gd_0003', 'db_0003', 'Đặng Văn Lâm', 1, '44.png', 'GK'),
('CT09', 'gd_0003', 'db_0003', 'Hà Đức Chinh', 9, '3333.png', 'ST'),
('CT10', 'gd_0003', 'db_0003', 'Nguyễn Hoàng Đức', 14, '19_3.png', 'CM');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dang_ky_tham_gia_giai`
--

CREATE TABLE `dang_ky_tham_gia_giai` (
  `ma_giai_dau` varchar(255) NOT NULL,
  `ma_doi_bong` varchar(255) NOT NULL,
  `thoi_gian_dang_ky` timestamp NOT NULL DEFAULT current_timestamp(),
  `trang_thai` enum('Chờ duyệt','Đã duyệt','Từ chối') DEFAULT 'Chờ duyệt',
  `ly_do_tu_choi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `dang_ky_tham_gia_giai`
--

INSERT INTO `dang_ky_tham_gia_giai` (`ma_giai_dau`, `ma_doi_bong`, `thoi_gian_dang_ky`, `trang_thai`, `ly_do_tu_choi`) VALUES
('gd_0001', 'db_0001', '2025-04-24 17:00:00', 'Từ chối', 'tttt'),
('gd_0001', 'db_0002', '2025-04-24 17:00:00', 'Đã duyệt', 'không thích'),
('gd_0001', 'DB01', '2025-04-24 17:00:00', 'Từ chối', 'thích không'),
('gd_0001', 'DB02', '2025-04-24 17:00:00', 'Đã duyệt', 'không không'),
('gd_0001', 'DB03', '2025-04-24 17:00:00', 'Đã duyệt', NULL),
('gd_0001', 'DB04', '2025-04-24 17:00:00', 'Từ chối', NULL),
('gd_0001', 'DB05', '2025-04-24 17:00:00', 'Đã duyệt', NULL),
('gd_0001', 'DB06', '2025-04-24 17:00:00', 'Đã duyệt', NULL),
('gd_0001', 'DB07', '2025-04-24 17:00:00', 'Đã duyệt', NULL),
('gd_0001', 'DB08', '2025-04-24 17:00:00', 'Từ chối', NULL),
('gd_0002', 'DB03', '2025-04-25 01:26:38', 'Chờ duyệt', NULL),
('gd_0003', 'db_0003', '2025-04-25 01:48:21', 'Đã duyệt', NULL),
('GD01', 'db_0001', '2025-04-24 17:00:00', 'Đã duyệt', NULL),
('GD01', 'db_0002', '2025-04-24 17:00:00', 'Đã duyệt', NULL),
('GD01', 'db_0003', '2025-05-08 04:15:18', 'Đã duyệt', NULL),
('GD01', 'DB01', '2025-04-24 17:00:00', 'Đã duyệt', NULL),
('GD01', 'DB02', '2025-04-24 17:00:00', 'Đã duyệt', NULL),
('GD01', 'DB03', '2025-04-24 17:00:00', 'Đã duyệt', NULL),
('GD01', 'DB04', '2025-04-24 17:00:00', 'Đã duyệt', NULL),
('GD01', 'DB05', '2025-04-24 17:00:00', 'Chờ duyệt', NULL),
('GD01', 'DB06', '2025-04-24 17:00:00', 'Đã duyệt', NULL),
('GD01', 'DB07', '2025-04-24 17:00:00', 'Chờ duyệt', NULL),
('GD01', 'DB08', '2025-04-24 17:00:00', 'Chờ duyệt', NULL),
('GD02', 'db_0003', '2025-05-20 07:15:20', 'Chờ duyệt', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doi_bong`
--

CREATE TABLE `doi_bong` (
  `ma_doi_bong` varchar(255) NOT NULL,
  `ten_doi_bong` varchar(255) NOT NULL,
  `quoc_gia` varchar(255) NOT NULL,
  `gioi_tinh` enum('nam','nữ') DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `ma_ql_doi_bong` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `doi_bong`
--

INSERT INTO `doi_bong` (`ma_doi_bong`, `ten_doi_bong`, `quoc_gia`, `gioi_tinh`, `logo`, `ma_ql_doi_bong`) VALUES
('db_0001', 'TP.HCM FC1', 'Việt Nam', 'nữ', '7e238089a2201e9c336d698b96425f53.jpg', 'ND002'),
('db_0002', 'TP.HCM FC2', 'Việt Nam', 'nam', '', 'ND002'),
('db_0003', 'Lê văn tiến', 'lê văn tiến', 'nữ', '', 'ND002'),
('DB01', 'Hà Nội FC', 'Việt Nam', 'nam', 'z6418754535921_35d72cad7c7e34a996a2b45591bc61bf.jpg', 'ND003'),
('DB02', 'TP.HCM FC3', 'Việt Nam', 'nam', 'Screenshot_2025-03-25_100427.png', 'ND002'),
('DB03', 'Hoàng Anh Gia Lai', 'Việt Nam', 'nam', '111.png', 'ND002'),
('DB04', 'Sông Lam Nghệ An', 'Việt Nam', 'nam', '/logos/slna.png', 'ND002'),
('DB05', 'Bình Định FC', 'Việt Nam', 'nam', '/logos/binhdinh.png', NULL),
('DB06', 'Công An Hà Nội', 'Việt Nam', 'nam', '/logos/conganhanoi.png', NULL),
('DB07', 'Đà Nẵng FC', 'Việt Nam', 'nam', '/logos/danangfc.png', NULL),
('DB08', 'Bình Dương FC', 'Việt Nam', 'nam', '/logos/binhduongfc.png', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doi_bong_giai_dau`
--

CREATE TABLE `doi_bong_giai_dau` (
  `ma_doi_bong` varchar(255) NOT NULL,
  `ma_giai_dau` varchar(255) NOT NULL,
  `ten_doi_bong` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `quoc_gia` varchar(255) NOT NULL,
  `ma_bang_dau` varchar(255) DEFAULT NULL,
  `hat_giong` enum('co','khong') NOT NULL DEFAULT 'khong'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `doi_bong_giai_dau`
--

INSERT INTO `doi_bong_giai_dau` (`ma_doi_bong`, `ma_giai_dau`, `ten_doi_bong`, `logo`, `quoc_gia`, `ma_bang_dau`, `hat_giong`) VALUES
('db_0001', 'GD01', 'sdfsdf', NULL, 'vdsfdsfd', 'BD01', 'co'),
('db_0002', 'GD01', 'sdfsdf', NULL, 'vdsfdsfd', 'BD01', 'co'),
('DB01', 'GD01', 'đội bóng 1', 'Screenshot_2025-04-18_094328.png', 'VN', 'BD02', 'co'),
('DB01', 'GD02', 'đội bóng 1', 'Screenshot_2025-04-18_094929.png', 'VN_number_1', NULL, 'khong'),
('DB02', 'GD01', 'tiến 1', NULL, 'vvv', 'BD03', 'co'),
('DB02', 'GD02', 'dfsddsfdfsfssdfsdsdf', NULL, 'sdfds', NULL, 'khong'),
('DB03', 'GD01', 'sdfsfsdf', '', 'vvv', 'BD01', 'co'),
('DB04', 'GD01', 'sdfsdf', NULL, 'vdsfdsfd', 'BD01', 'khong'),
('DB05', 'GD01', 'sdfsdf', NULL, 'vdsfdsfd', 'BD02', 'khong'),
('DB06', 'GD01', 'todfdsfds', NULL, 'vn', 'BD02', 'khong'),
('DB08', 'GD01', 'sdfsdf', NULL, 'vdsfdsfd', 'BD03', 'khong');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giai_dau`
--

CREATE TABLE `giai_dau` (
  `ma_giai_dau` varchar(255) NOT NULL,
  `ten_giai_dau` varchar(255) NOT NULL,
  `mo_ta` text DEFAULT NULL,
  `ngay_bat_dau` date NOT NULL,
  `ngay_ket_thuc` date NOT NULL,
  `ngay_ket_thuc_dang_ky_giai` date NOT NULL,
  `gioi_tinh` enum('nam','nữ') DEFAULT NULL,
  `ten_to_chuc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `giai_dau`
--

INSERT INTO `giai_dau` (`ma_giai_dau`, `ten_giai_dau`, `mo_ta`, `ngay_bat_dau`, `ngay_ket_thuc`, `ngay_ket_thuc_dang_ky_giai`, `gioi_tinh`, `ten_to_chuc`) VALUES
('gd_0001', 'AFF333', 'gdhh', '2000-01-01', '2002-02-02', '2002-02-02', 'nam', 'VFF'),
('gd_0002', 'dsf', 'dsfsf', '2025-04-16', '2025-05-02', '2025-05-02', 'nam', 'dfsdf'),
('gd_0003', 'dsfsdfsdf', 'dsfsf', '2025-04-16', '2025-05-02', '2025-05-02', 'nam', 'dfsdf'),
('gd_0004', 'Giải Vô Địch Quốc Giadfsdf', 'sdfsdf', '2025-04-10', '2025-04-01', '2025-04-01', 'nam', 'sdfsdfds'),
('gd_0005', 'bóng đá hhhhhh', 'ttttt', '2025-04-17', '2025-04-20', '2025-04-20', 'nam', 'lớp d22 new'),
('GD01', 'Giải Đấu Toàn Quốc', 'Giải đấu cấp quốc gia', '2025-05-01', '2025-12-01', '2025-12-01', 'nam', 'VFF'),
('GD02', 'Giải Trẻ Toàn Quốc', 'Giải đấu cho lứa trẻ', '2025-06-01', '2025-11-01', '2025-11-01', 'nữ', 'VFF');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ket_qua_tran_dau`
--

CREATE TABLE `ket_qua_tran_dau` (
  `ma_tran_dau` varchar(255) DEFAULT NULL,
  `so_ban_doi_1` int(11) DEFAULT 0,
  `so_ban_doi_2` int(11) DEFAULT 0,
  `ma_doi_thang` varchar(255) DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `ket_qua_tran_dau`
--

INSERT INTO `ket_qua_tran_dau` (`ma_tran_dau`, `so_ban_doi_1`, `so_ban_doi_2`, `ma_doi_thang`, `ghi_chu`) VALUES
('td_0001', 1, 1, 'DB01', ''),
('td_0002', 1, 3, 'DB01', 'df '),
('td_0003', 1, 0, 'DB01', 'dsfsdfdsfdsfdsfdsfd long'),
('td_0004', 0, 2, 'DB04', 'tdsfsdss'),
('td_0008', 6, 5, 'db_0002', ''),
('td_0007', 1, 3, 'DB05', ''),
('td_0005', 6, 5, 'db_0002', ''),
('td_0014', 2, 2, NULL, 'sdfsdf');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loai_trong_tai`
--

CREATE TABLE `loai_trong_tai` (
  `ma_loai_trong_tai` varchar(255) NOT NULL,
  `ten_loai_trong_tai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `loai_trong_tai`
--

INSERT INTO `loai_trong_tai` (`ma_loai_trong_tai`, `ten_loai_trong_tai`) VALUES
('LT03', 'Trọng tài bàn'),
('LT01', 'Trọng tài chính'),
('LT02', 'Trọng tài phụ'),
('LT04', 'Trọng tài VAR');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoi_dung`
--

CREATE TABLE `nguoi_dung` (
  `ma_nguoi_dung` varchar(255) NOT NULL,
  `tai_khoan` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `gioi_tinh` enum('nam','nữ') DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `so_dien_thoai` varchar(20) NOT NULL,
  `ngay_tao` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoi_dung`
--

INSERT INTO `nguoi_dung` (`ma_nguoi_dung`, `tai_khoan`, `ho_ten`, `gioi_tinh`, `email`, `so_dien_thoai`, `ngay_tao`) VALUES
('nd_0001', NULL, 'dfs', 'nam', 'shaikhanas@gmai.com', '0912345678', '2025-04-02 10:00:00'),
('nd_40005', NULL, 'sdgg', 'nam', 'tranth1ib@example.com', '0912345678', '2025-04-01 10:00:00'),
('nd_40006', NULL, 'lê văn tiến', 'nữ', 'tranth1fffib@example.com', '0912345678', '2025-04-03 10:00:00'),
('nd_40007', NULL, 'lê văn tiến', 'nữ', 'tranth11fffib@example.com', '0912345678', '2025-04-03 10:00:00'),
('nd_40008', NULL, 'lê văn tiến', 'nam', 'trant111hib@example.com', '0912345678', '2025-04-04 10:00:00'),
('nd_40009', NULL, 'Nguyễn Trọng Tài', 'nữ', 'vinhlatgakaka@gmail.com', '0912345678', '2025-04-14 10:00:00'),
('nd_40010', NULL, 'lê văn tiến', 'nam', 'trant11hib@example.com', '0912345678', '2025-05-01 10:00:00'),
('ND001', 'admin', 'Nguyễn Văn Ahhhg', 'nữ', 'admin@email.com', '0987654321', '2025-03-22 10:00:00'),
('ND002', 'user01', 'Trần Thị B', 'nữ', 'vantienn20dccn064@gmail.com', '0912345678', '2025-03-22 10:00:00'),
('ND003', 'ql_doi1', 'Lê Văn C', 'nam', 'ql01@email.com', '0933222111', '2025-03-22 06:53:18'),
('tt', NULL, 'trodsf', 'nam', '', '0967891234', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `san_van_dong`
--

CREATE TABLE `san_van_dong` (
  `ma_san` varchar(255) NOT NULL,
  `ten_san` varchar(255) NOT NULL,
  `dia_chi` text NOT NULL,
  `suc_chua` int(11) NOT NULL,
  `mo_ta` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `san_van_dong`
--

INSERT INTO `san_van_dong` (`ma_san`, `ten_san`, `dia_chi`, `suc_chua`, `mo_ta`) VALUES
('SVD001', 'Sân Mỹ Đình', 'Hà Nội', 40000, 'Sân vận động lớn nhất Việt Nam'),
('SVD002', 'Sân Thống Nhất', 'TP. HCM', 25000, 'Sân vận động nổi tiếng ở TP. HCM'),
('SVD003', 'Sân Hòa Xuân', 'Đà Nẵng', 30000, 'Sân vận động tại Đà Nẵng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `tai_khoan` varchar(255) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `trang_thai` enum('Hoạt động','Bị khóa') DEFAULT 'Hoạt động',
  `ma_vai_tro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan`
--

INSERT INTO `tai_khoan` (`tai_khoan`, `mat_khau`, `trang_thai`, `ma_vai_tro`) VALUES
('1111', '1111111111111111111111111', 'Hoạt động', 1),
('admin', '1', 'Hoạt động', 1),
('ql_doi1', '1', 'Hoạt động', 2),
('user01', '1', 'Hoạt động', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tran_dau`
--

CREATE TABLE `tran_dau` (
  `ma_tran_dau` varchar(255) NOT NULL,
  `ma_giai_dau` varchar(255) DEFAULT NULL,
  `ma_doi_1` varchar(255) DEFAULT NULL,
  `ma_doi_2` varchar(255) DEFAULT NULL,
  `ngay_dien_ra` date NOT NULL,
  `gio_dien_ra` time NOT NULL,
  `ma_san` varchar(255) DEFAULT NULL,
  `trang_thai` enum('Chưa diễn ra','Đang diễn ra','Hoàn tất','Hủy') DEFAULT 'Chưa diễn ra',
  `ma_vong_dau` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `tran_dau`
--

INSERT INTO `tran_dau` (`ma_tran_dau`, `ma_giai_dau`, `ma_doi_1`, `ma_doi_2`, `ngay_dien_ra`, `gio_dien_ra`, `ma_san`, `trang_thai`, `ma_vong_dau`) VALUES
('td_0001', 'GD01', 'DB02', 'DB01', '2025-04-17', '21:57:00', 'SVD003', 'Hoàn tất', 'V2'),
('td_0002', 'GD01', 'DB03', 'DB05', '2025-04-17', '21:57:00', 'SVD001', 'Hoàn tất', 'V1'),
('td_0003', 'GD01', 'DB01', 'DB05', '2025-04-10', '17:15:00', 'SVD001', 'Hoàn tất', 'V1'),
('td_0004', 'gd_0001', 'DB01', 'DB04', '2025-04-08', '17:28:00', 'SVD001', 'Hoàn tất', 'V1'),
('td_0005', 'gd_0002', 'db_0002', 'db_0002', '2025-04-17', '19:46:00', 'SVD001', 'Hoàn tất', 'V1'),
('td_0007', 'gd_0004', 'DB05', 'db_0002', '2025-04-17', '19:46:00', 'SVD001', 'Hoàn tất', 'V1'),
('td_0008', 'gd_0004', 'db_0002', 'db_0002', '2025-04-09', '19:46:00', 'SVD001', 'Hoàn tất', 'V1'),
('td_0009', 'gd_0001', 'db_0001', 'db_0002', '2025-04-09', '19:47:00', 'SVD002', 'Hoàn tất', 'V1'),
('td_0010', 'gd_0001', 'db_0001', 'db_0002', '2025-04-09', '19:47:00', 'SVD002', 'Hoàn tất', 'V1'),
('td_0011', 'GD01', 'db_0002', 'DB01', '2025-05-20', '09:30:00', 'SVD001', 'Chưa diễn ra', 'V4'),
('td_0012', 'GD01', 'DB04', 'DB05', '2025-05-20', '09:30:00', 'SVD003', 'Chưa diễn ra', 'V4'),
('td_0013', 'GD01', 'DB06', 'DB08', '2025-05-20', '11:30:00', 'SVD001', 'Chưa diễn ra', 'V4'),
('td_0014', 'GD01', 'DB02', 'DB03', '2025-05-20', '09:30:00', 'SVD002', 'Chưa diễn ra', 'V4');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trong_tai`
--

CREATE TABLE `trong_tai` (
  `ma_trong_tai` varchar(255) NOT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `ngay_sinh` date NOT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `gioi_tinh` enum('nam','nữ') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `trong_tai`
--

INSERT INTO `trong_tai` (`ma_trong_tai`, `ho_ten`, `ngay_sinh`, `hinh_anh`, `gioi_tinh`) VALUES
('TT01', 'Nguyễn Văn tiến', '1985-05-15', '111.png', 'nữ'),
('TT02', 'Trần Thị B', '1990-08-20', 'tran_thi_b.jpg', 'nữ'),
('TT03', 'Lê Minh C', '1987-11-10', 'le_minh_c.jpg', 'nam'),
('TT04', 'Phạm Thị D', '1992-03-12', 'pham_thi_d.jpg', 'nữ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trong_tai_tran_dau`
--

CREATE TABLE `trong_tai_tran_dau` (
  `ma_tran_dau` varchar(255) NOT NULL,
  `ma_trong_tai` varchar(255) NOT NULL,
  `ma_loai_trong_tai` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `trong_tai_tran_dau`
--

INSERT INTO `trong_tai_tran_dau` (`ma_tran_dau`, `ma_trong_tai`, `ma_loai_trong_tai`) VALUES
('td_0001', 'TT01', 'LT01'),
('td_0007', 'TT02', 'LT01'),
('td_0001', 'TT03', 'LT02'),
('td_0001', 'TT04', 'LT03'),
('td_0001', 'TT02', 'LT04'),
('td_0009', 'TT03', 'LT04');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vai_tro`
--

CREATE TABLE `vai_tro` (
  `ma_vai_tro` int(11) NOT NULL,
  `ten_vai_tro` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `vai_tro`
--

INSERT INTO `vai_tro` (`ma_vai_tro`, `ten_vai_tro`) VALUES
(1, 'Admin'),
(3, 'Người Dùng'),
(2, 'Quản lý đội bóng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vi_tri_cau_thu`
--

CREATE TABLE `vi_tri_cau_thu` (
  `ma_vi_tri` varchar(255) NOT NULL,
  `ten_vi_tri` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `vi_tri_cau_thu`
--

INSERT INTO `vi_tri_cau_thu` (`ma_vi_tri`, `ten_vi_tri`) VALUES
('vtct_0001', 'DD'),
('RWB', 'Hậu vệ cánh phải'),
('LWB', 'Hậu vệ cánh trái'),
('RB', 'Hậu vệ phải'),
('LB', 'Hậu vệ trái'),
('vtct_0002', 'Hậu vệ tráighfghgf'),
('CF', 'Hộ công'),
('GK', 'Thủ môn'),
('RW', 'Tiền đạo cánh phải'),
('LW', 'Tiền đạo cánh trái'),
('ST', 'Tiền đạo cắm'),
('RM', 'Tiền vệ cánh phải'),
('LM', 'Tiền vệ cánh trái'),
('CDM', 'Tiền vệ phòng ngự'),
('CAM', 'Tiền vệ tấn công'),
('CM', 'Tiền vệ trung tâm'),
('CB', 'Trung vệ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vong_dau`
--

CREATE TABLE `vong_dau` (
  `ma_vong_dau` varchar(255) NOT NULL,
  `ten_vong` varchar(50) NOT NULL,
  `mo_ta` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `vong_dau`
--

INSERT INTO `vong_dau` (`ma_vong_dau`, `ten_vong`, `mo_ta`) VALUES
('V1', 'Vòng bảng', 'Giai đoạn vòng bảng của giải đấu'),
('V2', 'Tứ kết', 'Vòng tứ kết của giải đấu'),
('V3', 'Bán kết', 'Vòng bán kết của giải đấu'),
('V4', 'Chung kết', 'Trận chung kết của giải đấu');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bang_dau`
--
ALTER TABLE `bang_dau`
  ADD PRIMARY KEY (`ma_bang_dau`),
  ADD UNIQUE KEY `ten_bang_dau` (`ten_bang_dau`),
  ADD KEY `ma_giai_dau` (`ma_giai_dau`);

--
-- Chỉ mục cho bảng `bang_xep_hang_vong_loai`
--
ALTER TABLE `bang_xep_hang_vong_loai`
  ADD PRIMARY KEY (`ma_doi_bong`,`ma_bang_dau`),
  ADD KEY `ma_bang_dau` (`ma_bang_dau`);

--
-- Chỉ mục cho bảng `cau_thu`
--
ALTER TABLE `cau_thu`
  ADD PRIMARY KEY (`ma_cau_thu`),
  ADD KEY `ma_vi_tri` (`ma_vi_tri`),
  ADD KEY `ma_doi_bong` (`ma_doi_bong`);

--
-- Chỉ mục cho bảng `cau_thu_giai_dau`
--
ALTER TABLE `cau_thu_giai_dau`
  ADD PRIMARY KEY (`ma_cau_thu`,`ma_giai_dau`),
  ADD KEY `ma_giai_dau` (`ma_giai_dau`),
  ADD KEY `ma_doi_bong` (`ma_doi_bong`),
  ADD KEY `ma_vi_tri` (`ma_vi_tri`);

--
-- Chỉ mục cho bảng `dang_ky_tham_gia_giai`
--
ALTER TABLE `dang_ky_tham_gia_giai`
  ADD PRIMARY KEY (`ma_giai_dau`,`ma_doi_bong`),
  ADD KEY `ma_doi_bong` (`ma_doi_bong`);

--
-- Chỉ mục cho bảng `doi_bong`
--
ALTER TABLE `doi_bong`
  ADD PRIMARY KEY (`ma_doi_bong`),
  ADD KEY `ma_ql_doi_bong` (`ma_ql_doi_bong`);

--
-- Chỉ mục cho bảng `doi_bong_giai_dau`
--
ALTER TABLE `doi_bong_giai_dau`
  ADD PRIMARY KEY (`ma_doi_bong`,`ma_giai_dau`),
  ADD KEY `ma_giai_dau` (`ma_giai_dau`),
  ADD KEY `ma_bang_dau` (`ma_bang_dau`);

--
-- Chỉ mục cho bảng `giai_dau`
--
ALTER TABLE `giai_dau`
  ADD PRIMARY KEY (`ma_giai_dau`);

--
-- Chỉ mục cho bảng `ket_qua_tran_dau`
--
ALTER TABLE `ket_qua_tran_dau`
  ADD UNIQUE KEY `ma_tran_dau` (`ma_tran_dau`),
  ADD KEY `ma_doi_thang` (`ma_doi_thang`);

--
-- Chỉ mục cho bảng `loai_trong_tai`
--
ALTER TABLE `loai_trong_tai`
  ADD PRIMARY KEY (`ma_loai_trong_tai`),
  ADD UNIQUE KEY `ten_loai_trong_tai` (`ten_loai_trong_tai`);

--
-- Chỉ mục cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD PRIMARY KEY (`ma_nguoi_dung`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `tai_khoan` (`tai_khoan`);

--
-- Chỉ mục cho bảng `san_van_dong`
--
ALTER TABLE `san_van_dong`
  ADD PRIMARY KEY (`ma_san`),
  ADD UNIQUE KEY `ten_san` (`ten_san`);

--
-- Chỉ mục cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`tai_khoan`),
  ADD KEY `ma_vai_tro` (`ma_vai_tro`);

--
-- Chỉ mục cho bảng `tran_dau`
--
ALTER TABLE `tran_dau`
  ADD PRIMARY KEY (`ma_tran_dau`),
  ADD KEY `ma_giai_dau` (`ma_giai_dau`),
  ADD KEY `ma_doi_1` (`ma_doi_1`),
  ADD KEY `ma_doi_2` (`ma_doi_2`),
  ADD KEY `ma_san` (`ma_san`),
  ADD KEY `ma_vong_dau` (`ma_vong_dau`);

--
-- Chỉ mục cho bảng `trong_tai`
--
ALTER TABLE `trong_tai`
  ADD PRIMARY KEY (`ma_trong_tai`);

--
-- Chỉ mục cho bảng `trong_tai_tran_dau`
--
ALTER TABLE `trong_tai_tran_dau`
  ADD PRIMARY KEY (`ma_tran_dau`,`ma_trong_tai`),
  ADD KEY `ma_trong_tai` (`ma_trong_tai`),
  ADD KEY `ma_loai_trong_tai` (`ma_loai_trong_tai`);

--
-- Chỉ mục cho bảng `vai_tro`
--
ALTER TABLE `vai_tro`
  ADD PRIMARY KEY (`ma_vai_tro`),
  ADD UNIQUE KEY `ten_vai_tro` (`ten_vai_tro`);

--
-- Chỉ mục cho bảng `vi_tri_cau_thu`
--
ALTER TABLE `vi_tri_cau_thu`
  ADD PRIMARY KEY (`ma_vi_tri`),
  ADD UNIQUE KEY `ten_vi_tri` (`ten_vi_tri`);

--
-- Chỉ mục cho bảng `vong_dau`
--
ALTER TABLE `vong_dau`
  ADD PRIMARY KEY (`ma_vong_dau`),
  ADD UNIQUE KEY `ten_vong` (`ten_vong`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bang_dau`
--
ALTER TABLE `bang_dau`
  ADD CONSTRAINT `bang_dau_ibfk_1` FOREIGN KEY (`ma_giai_dau`) REFERENCES `giai_dau` (`ma_giai_dau`);

--
-- Các ràng buộc cho bảng `bang_xep_hang_vong_loai`
--
ALTER TABLE `bang_xep_hang_vong_loai`
  ADD CONSTRAINT `bang_xep_hang_vong_loai_ibfk_1` FOREIGN KEY (`ma_doi_bong`) REFERENCES `doi_bong` (`ma_doi_bong`),
  ADD CONSTRAINT `bang_xep_hang_vong_loai_ibfk_2` FOREIGN KEY (`ma_bang_dau`) REFERENCES `bang_dau` (`ma_bang_dau`);

--
-- Các ràng buộc cho bảng `cau_thu`
--
ALTER TABLE `cau_thu`
  ADD CONSTRAINT `cau_thu_ibfk_1` FOREIGN KEY (`ma_vi_tri`) REFERENCES `vi_tri_cau_thu` (`ma_vi_tri`),
  ADD CONSTRAINT `cau_thu_ibfk_2` FOREIGN KEY (`ma_doi_bong`) REFERENCES `doi_bong` (`ma_doi_bong`);

--
-- Các ràng buộc cho bảng `cau_thu_giai_dau`
--
ALTER TABLE `cau_thu_giai_dau`
  ADD CONSTRAINT `cau_thu_giai_dau_ibfk_1` FOREIGN KEY (`ma_cau_thu`) REFERENCES `cau_thu` (`ma_cau_thu`),
  ADD CONSTRAINT `cau_thu_giai_dau_ibfk_2` FOREIGN KEY (`ma_giai_dau`) REFERENCES `giai_dau` (`ma_giai_dau`),
  ADD CONSTRAINT `cau_thu_giai_dau_ibfk_3` FOREIGN KEY (`ma_doi_bong`) REFERENCES `doi_bong` (`ma_doi_bong`),
  ADD CONSTRAINT `cau_thu_giai_dau_ibfk_4` FOREIGN KEY (`ma_vi_tri`) REFERENCES `vi_tri_cau_thu` (`ma_vi_tri`);

--
-- Các ràng buộc cho bảng `dang_ky_tham_gia_giai`
--
ALTER TABLE `dang_ky_tham_gia_giai`
  ADD CONSTRAINT `dang_ky_tham_gia_giai_ibfk_1` FOREIGN KEY (`ma_giai_dau`) REFERENCES `giai_dau` (`ma_giai_dau`),
  ADD CONSTRAINT `dang_ky_tham_gia_giai_ibfk_2` FOREIGN KEY (`ma_doi_bong`) REFERENCES `doi_bong` (`ma_doi_bong`);

--
-- Các ràng buộc cho bảng `doi_bong`
--
ALTER TABLE `doi_bong`
  ADD CONSTRAINT `doi_bong_ibfk_1` FOREIGN KEY (`ma_ql_doi_bong`) REFERENCES `nguoi_dung` (`ma_nguoi_dung`);

--
-- Các ràng buộc cho bảng `doi_bong_giai_dau`
--
ALTER TABLE `doi_bong_giai_dau`
  ADD CONSTRAINT `doi_bong_giai_dau_ibfk_1` FOREIGN KEY (`ma_doi_bong`) REFERENCES `doi_bong` (`ma_doi_bong`),
  ADD CONSTRAINT `doi_bong_giai_dau_ibfk_2` FOREIGN KEY (`ma_giai_dau`) REFERENCES `giai_dau` (`ma_giai_dau`),
  ADD CONSTRAINT `doi_bong_giai_dau_ibfk_3` FOREIGN KEY (`ma_bang_dau`) REFERENCES `bang_dau` (`ma_bang_dau`);

--
-- Các ràng buộc cho bảng `ket_qua_tran_dau`
--
ALTER TABLE `ket_qua_tran_dau`
  ADD CONSTRAINT `ket_qua_tran_dau_ibfk_1` FOREIGN KEY (`ma_tran_dau`) REFERENCES `tran_dau` (`ma_tran_dau`),
  ADD CONSTRAINT `ket_qua_tran_dau_ibfk_2` FOREIGN KEY (`ma_doi_thang`) REFERENCES `doi_bong` (`ma_doi_bong`);

--
-- Các ràng buộc cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD CONSTRAINT `nguoi_dung_ibfk_1` FOREIGN KEY (`tai_khoan`) REFERENCES `tai_khoan` (`tai_khoan`);

--
-- Các ràng buộc cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD CONSTRAINT `tai_khoan_ibfk_1` FOREIGN KEY (`ma_vai_tro`) REFERENCES `vai_tro` (`ma_vai_tro`);

--
-- Các ràng buộc cho bảng `tran_dau`
--
ALTER TABLE `tran_dau`
  ADD CONSTRAINT `tran_dau_ibfk_1` FOREIGN KEY (`ma_giai_dau`) REFERENCES `giai_dau` (`ma_giai_dau`),
  ADD CONSTRAINT `tran_dau_ibfk_2` FOREIGN KEY (`ma_doi_1`) REFERENCES `doi_bong` (`ma_doi_bong`),
  ADD CONSTRAINT `tran_dau_ibfk_3` FOREIGN KEY (`ma_doi_2`) REFERENCES `doi_bong` (`ma_doi_bong`),
  ADD CONSTRAINT `tran_dau_ibfk_4` FOREIGN KEY (`ma_san`) REFERENCES `san_van_dong` (`ma_san`),
  ADD CONSTRAINT `tran_dau_ibfk_5` FOREIGN KEY (`ma_vong_dau`) REFERENCES `vong_dau` (`ma_vong_dau`);

--
-- Các ràng buộc cho bảng `trong_tai_tran_dau`
--
ALTER TABLE `trong_tai_tran_dau`
  ADD CONSTRAINT `trong_tai_tran_dau_ibfk_1` FOREIGN KEY (`ma_tran_dau`) REFERENCES `tran_dau` (`ma_tran_dau`),
  ADD CONSTRAINT `trong_tai_tran_dau_ibfk_2` FOREIGN KEY (`ma_trong_tai`) REFERENCES `trong_tai` (`ma_trong_tai`),
  ADD CONSTRAINT `trong_tai_tran_dau_ibfk_3` FOREIGN KEY (`ma_loai_trong_tai`) REFERENCES `loai_trong_tai` (`ma_loai_trong_tai`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
