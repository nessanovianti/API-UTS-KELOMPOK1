INSERT INTO kategori (nama_kategori, deskripsi) VALUES
('Alat Tulis', 'Perlengkapan pulpen, pensil, penghapus, dan spidol harian'),
('Kertas & Buku', 'Kertas HVS berbagai ukuran, buku tulis campus, dan sticky notes'),
('Kantor & Arsip', 'Stapler, map plastik, binder, dan perlengkapan pengarsipan dokumen');

INSERT INTO produk (kategori_id, kode_produk, nama_produk, harga, stok) VALUES
(1, 'ATK-001', 'Pulpen Gel Hitam 0.5mm (1 Pak)', 24000, 35),
(2, 'ATK-002', 'Kertas HVS A4 80gsm (1 Rim)', 54000, 20),
(2, 'ATK-003', 'Buku Tulis Campus 58 Lbr (1 Pak)', 42000, 25),
(3, 'ATK-004', 'Stapler HD-10 + Isi (1 Set)', 17500, 40),
(2, 'ATK-005', 'Sticky Notes Warna 3x3 (1 Pad)', 11000, 60),
(3, 'ATK-006', 'Map Plastik Kancing Folio (1 Lusin)', 29000, 18);