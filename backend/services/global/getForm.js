const getForm = {
    // Đặt giá trị vào localStorage
    getFormD_don_dat_ban(id, nguoi_dung_id, nha_hang_id, thoi_gian_khach_den, trang_thai, thoi_gian_tao_don) {
        return getFormD_don_dat_ban(id, nguoi_dung_id, nha_hang_id, thoi_gian_khach_den, trang_thai, thoi_gian_tao_don);
    }





};

function getFormD_don_dat_ban(id, nguoi_dung_id, nha_hang_id, thoi_gian_khach_den, trang_thai, thoi_gian_tao_don) {
    return {
        id: id,
        nguoi_dung_id: nguoi_dung_id,
        nha_hang_id: nha_hang_id,
        thoi_gian_khach_den: thoi_gian_khach_den,
        trang_thai: trang_thai,
        thoi_gian_tao_don: thoi_gian_tao_don
    };
}

// Gắn vào window để có thể truy cập ở mọi nơi
window.getForm = getForm;
