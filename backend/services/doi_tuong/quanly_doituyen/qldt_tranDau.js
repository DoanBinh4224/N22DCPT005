

document.addEventListener("DOMContentLoaded", async function () {
    console.log("Đã vào trang qldt_dangKyGiaiDau");
    console.log(DoiTuyen.getDoiTuyen_dangChon());
    console.log(GlobalStore.getUsername());
    
   


    const data_tranDau = await hamChung.layDanhSach("tran_dau");

    // Lấy danh sách trận đấu mà ma_doi_1 hoặc ma_doi_2 === DoiTuyen.getDoiTuyen_dangChon()
    const doiTuyenDangChon = DoiTuyen.getDoiTuyen_dangChon();
    const danhSachTranDau_theoDoiTuyen = data_tranDau.filter(tranDau => 
      tranDau.ma_doi_1 === doiTuyenDangChon || tranDau.ma_doi_2 === doiTuyenDangChon
    );
    
    // Danh sách trận đấu đã lọc
    console.log(danhSachTranDau_theoDoiTuyen);


    console.log(data_tranDau);
    viewTbody(danhSachTranDau_theoDoiTuyen);
    // hiện thị danh sách trận đấu có kq
    // Gọi danh sách các trận đấu và kết quả trận đấu
    const dsTranDau = await hamChung.layDanhSach("tran_dau");
    const dsKetQua = await hamChung.layDanhSach("ket_qua_tran_dau");

    document.getElementById("button_ALL_tranDau").addEventListener("click", async function () {
        location.reload();
    });

    // Xử lý sự kiện khi nhấn nút "Trận đấu chưa kết quả"
    document.getElementById("button_chua_da").addEventListener("click", async function () {

        // Lọc các trận đấu chưa có kết quả
        const dsTranDauChuaKQ = danhSachTranDau_theoDoiTuyen.filter(tranDau =>
            !dsKetQua.some(kq => kq.ma_tran_dau === tranDau.ma_tran_dau)
        );

        // Gọi hàm hiển thị danh sách trận đấu chưa có kết quả
        viewTbody(dsTranDauChuaKQ);
    });


    // btnLuuThayDoi.addEventListener("click", handleLuuThayDoi);
    // btnTaiLaiTrang.addEventListener("click", handleTaiLaiTrang);
});

// Hiển thị danh sách trận đấu
async function layKetQua(ma_tran_dau) {
    const data = await hamChung.layThongTinTheo_ID("ket_qua_tran_dau", ma_tran_dau);
    let stringKetQua = "--";
    if (data != null) {

        stringKetQua = data.ma_doi_thang + " " + data.so_ban_doi_1 + ":" + data.so_ban_doi_2;
    }

    return stringKetQua;

}
async function viewTbody(data) {
    //console.log("ma_tran_dau:New " + await hamChung.taoID_theoBang("tran_dau"));
    if(data == null || data.length === 0) {
        data = await hamChung.layDanhSach("tran_dau");
    }
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const ketQua = await layKetQua(item.ma_tran_dau);
        console.log(ketQua);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_tran_dau}</td>
            <td style="text-align: center;">${item.ma_giai_dau}</td>
            <td style="text-align: center;">${item.ma_doi_1}</td>
            <td style="text-align: center;">${item.ma_doi_2}</td>
            <td style="text-align: center;">${item.ngay_dien_ra}</td>
            <td style="text-align: center;">${item.gio_dien_ra}</td>
            <td style="text-align: center;">${item.san_van_dong}</td>
            <td style="text-align: center;">${item.ma_trong_tai}</td>
            <td style="text-align: center;">${item.trang_thai}</td>
            <td style="text-align: center;">${item.ma_vong_dau}</td>
            <td style="text-align: center;">${ketQua}</td>
        `;
        tableBody.appendChild(row);
    }

 
}


