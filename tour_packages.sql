-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Bulan Mei 2024 pada 14.41
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pweb_async`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tour_packages`
--

CREATE TABLE `tour_packages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `tour_packages`
--

INSERT INTO `tour_packages` (`id`, `name`, `price`, `description`) VALUES
(1, 'Paket Agrowisata', 25000, 'Nikmati pesona alam dan keaslian pedesaan dengan Paket Agrowisata kami! Terlibat langsung dalam aktivitas pertanian, belajar menanam dan memanen, serta nikmati hasil segar langsung dari kebun. Pengalaman pedesaan yang sempurna untuk segala usia!'),
(2, 'Paket Outbond', 30000, 'Temukan semangat tim dengan Paket Outbond kami! Nikmati kegiatan alam terbuka yang membangun kerja sama dan kepercayaan, lengkap dengan permainan, petualangan, dan latihan kepemimpinan. Ideal untuk perusahaan atau sekolah yang mencari pengalaman luar bias'),
(3, 'Paket permainan tradisioanal', 20000, 'Rasakan keseruan Permainan Tradisional! Paket ini membawa congklak, egrang, layang-layang, dan lainnya, sempurna untuk mengajarkan kekayaan budaya. Ideal untuk sekolah, komunitas, dan acara keluarga yang ingin bermain sambil belajar.');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tour_packages`
--
ALTER TABLE `tour_packages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tour_packages`
--
ALTER TABLE `tour_packages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
