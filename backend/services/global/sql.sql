CREATE TABLE vai_tro (
    ma_vai_tro INT PRIMARY KEY,
    ten_vai_tro VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE tai_khoan (
    tai_khoan VARCHAR(255) PRIMARY KEY,
    mat_khau VARCHAR(255) NOT NULL,
    trang_thai ENUM('Hoạt động', 'Bị khóa') DEFAULT 'Hoạt động',
    ma_vai_tro INT NOT NULL,
    FOREIGN KEY (ma_vai_tro) REFERENCES vai_tro(ma_vai_tro)
);

CREATE TABLE nguoi_dung (
    ma_nguoi_dung VARCHAR(255) PRIMARY KEY,
    tai_khoan VARCHAR(255) UNIQUE,
    ho_ten VARCHAR(255) NOT NULL,
    gioi_tinh ENUM('nam', 'nữ'),
    email VARCHAR(255) UNIQUE NOT NULL,
    so_dien_thoai VARCHAR(20) NOT NULL,
    ngay_tao TIMESTAMP NULL,
    FOREIGN KEY (tai_khoan) REFERENCES tai_khoan(tai_khoan)
);

CREATE TABLE giai_dau (
    ma_giai_dau VARCHAR(255) PRIMARY KEY,
    ten_giai_dau VARCHAR(255) NOT NULL,
    mo_ta TEXT,
    ngay_bat_dau DATE NOT NULL,
    ngay_ket_thuc DATE NOT NULL,
    gioi_tinh ENUM('nam', 'nữ'),
    ten_to_chuc VARCHAR(255) NOT NULL
);

CREATE TABLE doi_bong (
    ma_doi_bong VARCHAR(255) PRIMARY KEY,
    ten_doi_bong VARCHAR(255) NOT NULL,
    quoc_gia VARCHAR(255) NOT NULL,
    ma_gioi_tinh ENUM('nam', 'nữ'),
    logo VARCHAR(255),
    ma_ql_doi_bong VARCHAR(255),
    FOREIGN KEY (ma_ql_doi_bong) REFERENCES nguoi_dung(ma_nguoi_dung)
);

CREATE TABLE vi_tri_cau_thu (
    ma_vi_tri VARCHAR(255) PRIMARY KEY,
    ten_vi_tri VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE cau_thu (
    ma_cau_thu VARCHAR(255) PRIMARY KEY,
    ho_ten VARCHAR(255) NOT NULL,
    ngay_sinh DATE NOT NULL,
    so_ao INT NOT NULL,
    hinh_anh VARCHAR(255),
    ma_gioi_tinh ENUM('nam', 'nữ'),
    ma_vi_tri VARCHAR(255) NOT NULL,
    ma_doi_bong VARCHAR(255),
    FOREIGN KEY (ma_vi_tri) REFERENCES vi_tri_cau_thu(ma_vi_tri),
    FOREIGN KEY (ma_doi_bong) REFERENCES doi_bong(ma_doi_bong)
);

CREATE TABLE cau_thu_giai_dau (
    ma_cau_thu VARCHAR(255),
    ma_giai_dau VARCHAR(255),
    ma_doi_bong VARCHAR(255),
    ho_ten VARCHAR(255) NOT NULL,
    so_ao INT NOT NULL,
    ma_vi_tri VARCHAR(255),
    PRIMARY KEY (ma_cau_thu, ma_giai_dau),
    FOREIGN KEY (ma_cau_thu) REFERENCES cau_thu(ma_cau_thu),
    FOREIGN KEY (ma_giai_dau) REFERENCES giai_dau(ma_giai_dau),
    FOREIGN KEY (ma_doi_bong) REFERENCES doi_bong(ma_doi_bong),
    FOREIGN KEY (ma_vi_tri) REFERENCES vi_tri_cau_thu(ma_vi_tri)
);

CREATE TABLE doi_bong_giai_dau (
    ma_doi_bong VARCHAR(255),
    ma_giai_dau VARCHAR(255),
    ten_doi_bong VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    quoc_gia VARCHAR(255) NOT NULL,
    PRIMARY KEY (ma_doi_bong, ma_giai_dau),
    FOREIGN KEY (ma_doi_bong) REFERENCES doi_bong(ma_doi_bong),
    FOREIGN KEY (ma_giai_dau) REFERENCES giai_dau(ma_giai_dau)
);

CREATE TABLE trong_tai (
    ma_trong_tai VARCHAR(255) PRIMARY KEY,
    ho_ten VARCHAR(255) NOT NULL,
    ngay_sinh DATE NOT NULL,
    hinh_anh VARCHAR(255),
    ma_gioi_tinh ENUM('nam', 'nữ')
);

CREATE TABLE loai_trong_tai (
    ma_loai_trong_tai VARCHAR(255) PRIMARY KEY,
    ten_loai_trong_tai VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE vong_dau (
    ma_vong_dau VARCHAR(255) PRIMARY KEY,
    ten_vong VARCHAR(50) UNIQUE NOT NULL,
    mo_ta TEXT
);

CREATE TABLE san_van_dong (
    ma_san VARCHAR(255) PRIMARY KEY,
    ten_san VARCHAR(255) NOT NULL UNIQUE,
    dia_chi TEXT NOT NULL,
    suc_chua INT NOT NULL,
    mo_ta TEXT
);

CREATE TABLE tran_dau (
    ma_tran_dau VARCHAR(255) PRIMARY KEY,
    ma_giai_dau VARCHAR(255),
    ma_doi_1 VARCHAR(255),
    ma_doi_2 VARCHAR(255),
    ngay_dien_ra DATE NOT NULL,
    gio_dien_ra TIME NOT NULL,
    ma_san VARCHAR(255) NOT NULL,
    trang_thai ENUM('Chưa diễn ra', 'Đang diễn ra', 'Hoàn tất', 'Hủy') DEFAULT 'Chưa diễn ra',
    ma_vong_dau VARCHAR(255),
    FOREIGN KEY (ma_giai_dau) REFERENCES giai_dau(ma_giai_dau),
    FOREIGN KEY (ma_doi_1) REFERENCES doi_bong(ma_doi_bong),
    FOREIGN KEY (ma_doi_2) REFERENCES doi_bong(ma_doi_bong),
    FOREIGN KEY (ma_san) REFERENCES san_van_dong(ma_san),
    FOREIGN KEY (ma_vong_dau) REFERENCES vong_dau(ma_vong_dau)
);

CREATE TABLE ket_qua_tran_dau (
    ma_tran_dau VARCHAR(255) UNIQUE,
    so_ban_doi_1 INT DEFAULT 0,
    so_ban_doi_2 INT DEFAULT 0,
    ma_doi_thang VARCHAR(255),
    ghi_chu VARCHAR(255),
    FOREIGN KEY (ma_tran_dau) REFERENCES tran_dau(ma_tran_dau),
    FOREIGN KEY (ma_doi_thang) REFERENCES doi_bong(ma_doi_bong)
);

CREATE TABLE bang_dau (
    ma_bang_dau VARCHAR(255) PRIMARY KEY,
    ten_bang_dau VARCHAR(50) UNIQUE NOT NULL,
    ma_giai_dau VARCHAR(255),
    FOREIGN KEY (ma_giai_dau) REFERENCES giai_dau(ma_giai_dau)
);

CREATE TABLE bang_xep_hang_vong_loai (
    ma_doi_bong VARCHAR(255),
    ma_bang_dau VARCHAR(255),
    diem INT DEFAULT 0,
    so_tran_thang INT DEFAULT 0,
    so_tran_hoa INT DEFAULT 0,
    so_tran_thua INT DEFAULT 0,
    ban_thang INT DEFAULT 0,
    ban_thua INT DEFAULT 0,
    PRIMARY KEY (ma_doi_bong, ma_bang_dau),
    FOREIGN KEY (ma_doi_bong) REFERENCES doi_bong(ma_doi_bong),
    FOREIGN KEY (ma_bang_dau) REFERENCES bang_dau(ma_bang_dau)
);

CREATE TABLE dang_ky_tham_gia_giai (
    ma_giai_dau VARCHAR(255) NOT NULL,
    ma_doi_bong VARCHAR(255) NOT NULL,
    thoi_gian_dang_ky TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    trang_thai ENUM('Chờ duyệt', 'Đã duyệt', 'Từ chối') DEFAULT 'Chờ duyệt',
    ly_do_tu_choi TEXT,
    FOREIGN KEY (ma_giai_dau) REFERENCES giai_dau(ma_giai_dau),
    FOREIGN KEY (ma_doi_bong) REFERENCES doi_bong(ma_doi_bong)
);

CREATE TABLE trong_tai_tran_dau (
    ma_tran_dau VARCHAR(255),
    ma_trong_tai VARCHAR(255),
    ma_loai_trong_tai VARCHAR(255),
    PRIMARY KEY (ma_tran_dau, ma_trong_tai),
    FOREIGN KEY (ma_tran_dau) REFERENCES tran_dau(ma_tran_dau),
    FOREIGN KEY (ma_trong_tai) REFERENCES trong_tai(ma_trong_tai),
    FOREIGN KEY (ma_loai_trong_tai) REFERENCES loai_trong_tai(ma_loai_trong_tai)
);
