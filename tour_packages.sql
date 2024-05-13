-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Bulan Mei 2024 pada 17.27
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
(3, 'Paket permainan tradisioanal', 20000, 'Rasakan keseruan Permainan Tradisional! Paket ini membawa congklak, egrang, layang-layang, dan lainnya, sempurna untuk mengajarkan kekayaan budaya. Ideal untuk sekolah, komunitas, dan acara keluarga yang ingin bermain sambil belajar.'),
(4, 'Paket Eksplorasi Alam', 150000, 'Temukan keajaiban alam dengan Paket Eksplorasi Alam. Nikmati pengalaman mendalam menjelajahi alam bebas dengan panduan lokal yang berpengalaman, sempurna bagi mereka yang menyukai alam dan ingin mempelajari lebih lanjut tentang fotografi alam.'),
(5, 'Paket Kuliner Desa', 100000, 'Nikmati kekayaan kuliner desa dengan Paket Kuliner Desa. Belajar langsung cara membuat masakan tradisional dari ahli lokal, mencicipi berbagai hidangan autentik yang akan memanjakan selera Anda.'),
(6, 'Paket Petualangan Air', 200000, 'Paket Petualangan Air menawarkan serangkaian aktivitas air yang mendebarkan seperti rafting, kayaking, dan snorkeling. Sempurna untuk pencinta adrenalin yang ingin merasakan keseruan alam air.'),
(7, 'Paket Seni dan Kerajinan', 120000, 'Bergabunglah dengan kami di Paket Seni dan Kerajinan untuk belajar dan menciptakan karya seni serta kerajinan tangan bersama pengrajin lokal. Pengalaman kreatif yang memperkaya pengetahuan dan keterampilan Anda.'),
(8, 'Paket Sejarah Lokal', 130000, 'Jelajahi dan pelajari tentang sejarah lokal melalui Paket Sejarah Lokal. Kunjungi situs bersejarah dan dengarkan kisah-kisah menarik dari masa lalu melalui tur interaktif yang menarik.'),
(9, 'Paket Yoga dan Meditasi', 180000, 'Nikmati kedamaian dan keseimbangan melalui Paket Yoga dan Meditasi kami. Sesuaikan tubuh dan pikiran dengan alam melalui latihan yoga dan sesi meditasi di lingkungan yang tenang dan mendukung.'),
(10, 'Paket Camping Keluarga', 220000, 'Paket Camping Keluarga menawarkan pengalaman berkemah yang aman dan menyenangkan untuk semua usia. Nikmati alam dengan fasilitas lengkap dan berbagai kegiatan yang cocok untuk keluarga.'),
(11, 'Paket Fotografi Alam', 250000, 'Perkaya portofolio Anda dengan Paket Fotografi Alam. Belajar teknik fotografi profesional di alam bebas, mengabadikan momen indah alam dengan bimbingan fotografer berpengalaman.'),
(12, 'Paket Bintang', 170000, 'Paket Bintang mengajak Anda mengamati keindahan langit malam. Gunakan teleskop profesional dan dapatkan pengetahuan tentang astronomi melalui panduan expert kami.'),
(13, 'Paket Bersepeda Gunung', 160000, 'Jelajahi jalur menantang dengan Paket Bersepeda Gunung. Nikmati pengalaman bersepeda di jalur gunung yang spektakuler, cocok untuk para penggemar olahraga dan alam.');

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
