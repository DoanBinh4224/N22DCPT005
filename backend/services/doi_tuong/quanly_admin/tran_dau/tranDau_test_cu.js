const btnLuuThayDoi = document.getElementById("button_luu");
const btnTaiLaiTrang = document.getElementById("button_taiLaiTrang");
const button_xepLich = document.getElementById("button_xepLich");

const maTranDau = document.getElementById("maTranDau");
const maGiaiDau = document.getElementById("maGiaiDau");
const maDoi1 = document.getElementById("maDoi1");
const maDoi2 = document.getElementById("maDoi2");
const ngayDienRa = document.getElementById("ngayDienRa");
const gioDienRa = document.getElementById("gioDienRa");
const sanVanDong = document.getElementById("sanVanDong");
// const maTrongTai = document.getElementById("maTrongTai");
const button_xem_ds_trongTai = document.getElementById("button_xem_ds_trongTai");

const trangThai = document.getElementById("trangThai");
const maVongDau = document.getElementById("maVongDau");
const link = "http://localhost:5000/";



// INSERT INTO dang_ky_tham_gia_giai (ma_giai_dau, ma_doi_bong, thoi_gian_dang_ky, trang_thai)
// VALUES
// ('gd_0001', 'db_0001', '2025-04-25', 'Đã duyệt'),
// ('gd_0001', 'db_0002', '2025-04-25', 'Đã duyệt'),
// ('gd_0001', 'DB01', '2025-04-25', 'Đã duyệt'),
// ('gd_0001', 'DB02', '2025-04-25', 'Đã duyệt'),
// ('gd_0001', 'DB03', '2025-04-25', 'Đã duyệt'),
// ('gd_0001', 'DB04', '2025-04-25', 'Đã duyệt'),
// ('gd_0001', 'DB05', '2025-04-25', 'Đã duyệt'),
// ('gd_0001', 'DB06', '2025-04-25', 'Đã duyệt'),
// ('gd_0001', 'DB07', '2025-04-25', 'Đã duyệt'),
// ('gd_0001', 'DB08', '2025-04-25', 'Đã duyệt');


document.addEventListener("DOMContentLoaded", async function () {
    loadDanhSachGiaiDau();
    loadDanhSachDoiBong_maDoi1();
    loadDanhSachDoiBong_maDoi2();
    // loadDanhSachTrongTai();
    loadDanhSachVongDau();
    loadDanhSachSanVanDong();
    loadDanhSach_hinhThuc_xepTranDau();
    const data = await hamChung.layDanhSach("tran_dau");
    console.log(data);
    viewTbody(data);
    // hiện thị danh sách trận đấu có kq
    // Gọi danh sách các trận đấu và kết quả trận đấu
    const dsTranDau = await hamChung.layDanhSach("tran_dau");
    const dsKetQua = await hamChung.layDanhSach("ket_qua_tran_dau");

    document.getElementById("button_co_kq").addEventListener("click", async function () {


        // Lọc các trận đấu có kết quả
        const dsTranDauCoKQ = dsTranDau.filter(tranDau =>
            dsKetQua.some(kq => kq.ma_tran_dau === tranDau.ma_tran_dau)
        );

        // Gọi hàm hiển thị danh sách trận đấu có kết quả
        viewTbody(dsTranDauCoKQ);
    });

    // Xử lý sự kiện khi nhấn nút "Trận đấu chưa kết quả"
    document.getElementById("button_chua_kq").addEventListener("click", async function () {

        // Tìm các mã trận đấu chưa có trong bảng kết quả
        const dsTranDauChuaKQ = dsTranDau
            .filter(tranDau =>
                !dsKetQua.some(kq => kq.ma_tran_dau === tranDau.ma_tran_dau)
            )

        console.log(dsTranDauChuaKQ);
        // Gọi hàm hiển thị danh sách trận đấu chưa có kết quả
        viewTbody(dsTranDauChuaKQ);
    });


    btnLuuThayDoi.addEventListener("click", handleLuuThayDoi);
    btnTaiLaiTrang.addEventListener("click", handleTaiLaiTrang);
    button_xepLich.addEventListener("click", handleXepLich);
    button_xem_ds_trongTai.addEventListener("click", handleXemDanhSachTrongTai)
});

// Hiển thị danh sách trận đấu
async function layKetQua(ma_tran_dau) {
    const data_kqTranDau = await hamChung.layDanhSach("ket_qua_tran_dau");

    const tranDau = data_kqTranDau.find(data => data.ma_tran_dau === ma_tran_dau);
    let stringKetQua = "--";

    if (!tranDau) {
        console.log("Không tìm thấy trận đấu với mã:", ma_tran_dau);
        return stringKetQua;
    }
    // nếu có trận đấu thì
    const data = await hamChung.layThongTinTheo_ID("ket_qua_tran_dau", ma_tran_dau);
    console.log(ma_tran_dau);
    const data_doiThang = await hamChung.layThongTinTheo_ID("doi_bong", data.ma_doi_thang);
    if (data != null) {

        stringKetQua = data_doiThang.ten_doi_bong + " " + data.so_ban_doi_1 + ":" + data.so_ban_doi_2;
    }
    console.log(stringKetQua);
    return stringKetQua;

}
async function viewTbody(data) {
    //console.log("ma_tran_dau:New " + await hamChung.taoID_theoBang("tran_dau"));
    if (data == null || data.length === 0) {
        data = await hamChung.layDanhSach("tran_dau");
    }
    const tableBody = document.getElementById("dataTable");
    console.log("tien tien tien tien");
    console.log(data);
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
            <td style="text-align: center;">${item.ma_san}</td>
            <td style="text-align: center;"><button class="xemTrongTai-btn btn btn-warning btn-sm">Xem ds</button></td>
            <td style="text-align: center;">${item.trang_thai}</td>
            <td style="text-align: center;">${item.ma_vong_dau}</td>
            <td style="text-align: center;">${ketQua}</td>
            <td style="text-align: center;"><button class="edit-btn btn btn-warning btn-sm">Sửa thông tin</button></td>
            <td style="text-align: center;"><button class="edit-kq-btn btn btn-warning btn-sm">Sửa kết quả </button></td>
            <td style="text-align: center;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    }
    button_xemDs_table();
    button_sua(data);
    button_sua_ket_qua();
    button_xoa(data);
}


// Thêm/Sửa trận đấu
async function handleLuuThayDoi(event) {
    event.preventDefault();

    const form = document.getElementById("inputForm");
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    let formData = {};
    if (maTranDau.value === "") {
        formData = {
            ma_tran_dau: await hamChung.taoID_theoBang("tran_dau"),
            ma_giai_dau: maGiaiDau.value,
            ma_doi_1: maDoi1.value,
            ma_doi_2: maDoi2.value,
            ngay_dien_ra: ngayDienRa.value,
            gio_dien_ra: gioDienRa.value,
            ma_san: sanVanDong.value,
            // ma_trong_tai: maTrongTai.value,
            trang_thai: trangThai.value,
            ma_vong_dau: maVongDau.value
        };
        await hamChung.them(formData, "tran_dau");
        alert("Thêm thành công!");
    } else {
        formData = {
            ma_tran_dau: maTranDau.value,
            ma_giai_dau: maGiaiDau.value,
            ma_doi_1: maDoi1.value,
            ma_doi_2: maDoi2.value,
            ngay_dien_ra: ngayDienRa.value,
            gio_dien_ra: gioDienRa.value,
            ma_san: sanVanDong.value,
            // ma_trong_tai: maTrongTai.value,
            trang_thai: trangThai.value,
            ma_vong_dau: maVongDau.value
        };
        await hamChung.sua(formData, "tran_dau");
        alert("Sửa thành công!");
    }
    console.log(formData);

    viewTbody();
}

// Xử lý tải lại trang
function handleTaiLaiTrang(event) {
    event.preventDefault();
    location.reload();
}

// Xử lý nút "Sửa"
function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            console.log("Sửa thông tin trận đấu");
            const item = data[index];
            maTranDau.value = item.ma_tran_dau;
            maGiaiDau.value = item.ma_giai_dau;
            maDoi1.value = item.ma_doi_1;
            maDoi2.value = item.ma_doi_2;
            ngayDienRa.value = item.ngay_dien_ra;
            gioDienRa.value = item.gio_dien_ra;
            sanVanDong.value = item.ma_san;
            // maTrongTai.value = item.ma_trong_tai;
            trangThai.value = item.trang_thai;
            maVongDau.value = item.ma_vong_dau;

            // Scroll lên đầu trang
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });
}

function handleXemDanhSachTrongTai(event) {
    event.preventDefault();
    console.log("Chưa làm này chưa làm này ");

}
// function handleXepLich(event) {
//     event.preventDefault();
//     console.log("Xếp lịch");

// }
// Xử lý nút "Xóa"
function button_xemDs_table() {
    document.querySelectorAll(".xemTrongTai-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const tranDauId = btn.closest("tr").children[0].textContent;
            console.log(tranDauId);
            const dataTrongTai = await hamChung.layDanhSach("trong_tai_tran_dau");
            const dsTrongTaiCuaTranDau = dataTrongTai.filter(item => item.ma_tran_dau === tranDauId);
            console.log(dsTrongTaiCuaTranDau);
            const modal = document.getElementById("modalKetQua");
            modal.style.display = "block";
            const tt_chinh = document.getElementById("tt_chinh");
            const tt_phu = document.getElementById("tt_phu");
            const tt_ban = document.getElementById("tt_ban");
            const tt_var = document.getElementById("tt_var");
            const btnLuuKetQua = document.getElementById("bt_luu_tt");
            const btnHuyThayDoi = document.getElementById("bt_huy_luu_tt");
            loadDanhSachTrongTai("tt_chinh");
            loadDanhSachTrongTai("tt_phu");
            loadDanhSachTrongTai("tt_ban");
            loadDanhSachTrongTai("tt_var");
            console.log(tranDauId);
            btnHuyThayDoi.addEventListener("click", () => {
                console.log("tienbloc");
                modal.style.display = "none"; // Đóng modal khi nhấn nút hủy
            });
            btnLuuKetQua.addEventListener("click", () => {
                console.log("Lưu trọng tài");

            });

        });
    });
}
function button_sua_ket_qua() {
    document.querySelectorAll(".edit-kq-btn").forEach((btn) => {

        btn.addEventListener("click", async () => {
            const tranDauId = btn.closest("tr").children[0].textContent;
            const btnLuuKetQua = document.getElementById("bt_luuKQ");
            const btnHuyThayDoi = document.getElementById("bt_huyThayDoi");
            const item = await hamChung.layThongTinTheo_ID("tran_dau", tranDauId);

            const modal = document.getElementById("modalKetQua");

            const soBanDoi1 = document.getElementById("soBanDoi1");
            const soBanDoi2 = document.getElementById("soBanDoi2");
            const doiThang = document.getElementById("doiThang");
            const ghiChu = document.getElementById("ghiChu");
            const optionDoi1 = document.getElementById("optionDoi1");
            const optionDoi2 = document.getElementById("optionDoi2");


            const doi1 = await hamChung.layThongTinTheo_ID("doi_bong", item.ma_doi_1);
            const doi2 = await hamChung.layThongTinTheo_ID("doi_bong", item.ma_doi_2);

            let ghiChuText = "";

            // const layDanhSach_kqTranDau = await hamChung.layDanhSach("ket_qua_tran_dau");
            // const tonTai = layDanhSach_kqTranDau.some(kq => kq.ma_tran_dau === tranDauId);
            // if (tonTai) {
            //     console.log("Trận đấu đã có kết quả, tiến hành sửa");
            //    ghiChuText = (await hamChung.layThongTinTheo_ID("ket_qua_tran_dau", tranDauId)).ghi_chu;
            // } 

            // console.log(tranDauId);
            // const kq_tranDau = await hamChung.layThongTinTheo_ID("ket_qua_tran_dau", tranDauId);
            // console.log(kq_tranDau);

            // Reset kết quả
            soBanDoi1.value = 0;
            soBanDoi2.value = 0;
            doiThang.value = "";
            ghiChu.value = ghiChuText; // Gán giá trị ghi chú nếu có
            // if(kq_tranDau != null){
            //     console.log(kq_tranDau);
            // }   
            // Gán dữ liệu vào các option đội thắng
            optionDoi1.value = item.ma_doi_1;
            optionDoi1.textContent = `${doi1.ma_doi_bong} - ${doi1.ten_doi_bong}`;

            optionDoi2.value = item.ma_doi_2;
            optionDoi2.textContent = `${doi2.ma_doi_bong} - ${doi2.ten_doi_bong}`;


            // Hiển thị modal
            modal.style.display = "block";
            console.log(doiThang.value);
            btnLuuKetQua.addEventListener("click", async () => {
                // Kiểm tra hợp lệ
                if (doiThang.value === "") {
                    alert("Vui lòng chọn đội thắng!");
                    return;
                }
                const formData = {
                    ma_tran_dau: tranDauId,
                    so_ban_doi_1: soBanDoi1.value,
                    so_ban_doi_2: soBanDoi2.value,
                    ma_doi_thang: doiThang.value,
                    ghi_chu: ghiChu.value
                };

                //  await hamChung.them(formData, "ket_qua_tran_dau");
                alert("Lưu kết quả thành công!");
                modal.style.display = "none"; // Đóng modal sau khi lưu
                console.log(formData);
                // await hamChung.sua(formData, "ket_qua_tran_dau");
                // nếu ID trận đấu chứa tôn tại trong bảng kêts quả thì là thêm 
                const ketQuaTranDau = await hamChung.layDanhSach("ket_qua_tran_dau");
                const tonTai = ketQuaTranDau.some(item => item.ma_tran_dau === tranDauId);

                if (tonTai) {
                    console.log("Trận đấu đã có kết quả, tiến hành sửa");
                    await hamChung.sua(formData, "ket_qua_tran_dau");
                } else {
                    console.log("Chưa có kết quả, tiến hành thêm");
                    await hamChung.them(formData, "ket_qua_tran_dau");
                }
                viewTbody();
            });
            btnHuyThayDoi.addEventListener("click", () => {
                modal.style.display = "none"; // Đóng modal khi nhấn nút hủy
            });
        });
    });
    // button_luu_sua_ket_qua();
}


// Xử lý nút "Xóa"
function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            if (confirm(`Bạn có chắc chắn muốn xóa trận đấu ${data[index].ma_tran_dau}?`)) {
                const formData = { ma_tran_dau: data[index].ma_tran_dau };
                await hamChung.xoa(formData, "tran_dau");
                viewTbody();
            }
        });
    });
}

async function loadDanhSachGiaiDau() {
    const selectElement = document.getElementById("maGiaiDau");
    selectElement.innerHTML = '<option value="">-- Chọn Mã Giải Đấu --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("giai_dau");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_giai_dau;
        option.textContent = `${item.ma_giai_dau} - ${item.ten_giai_dau}`;
        selectElement.appendChild(option);
    });
}
async function loadDanhSachDoiBong_maDoi1() {
    const selectElement = document.getElementById("maDoi1");
    selectElement.innerHTML = '<option value="">-- Chọn Đội 1 --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("doi_bong");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_doi_bong;
        option.textContent = `${item.ma_doi_bong} - ${item.ten_doi_bong}`;
        selectElement.appendChild(option);
    });
}
async function loadDanhSachDoiBong_maDoi2() {
    const selectElement = document.getElementById("maDoi2");
    selectElement.innerHTML = '<option value="">-- Chọn Đội 2 --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("doi_bong");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_doi_bong;
        option.textContent = `${item.ma_doi_bong} - ${item.ten_doi_bong}`;
        selectElement.appendChild(option);
    });
}
// async function loadDanhSachTrongTai() {
//     const selectElement = document.getElementById("maTrongTai");
//     selectElement.innerHTML = '<option value="">-- Chọn Trọng Tài --</option>'; // Reset danh sách
//     const data = await hamChung.layDanhSach("trong_tai");
//     data.forEach(item => {
//         const option = document.createElement("option");
//         option.value = item.ma_trong_tai;
//         option.textContent = `${item.ma_trong_tai} - ${item.ho_ten}`;
//         selectElement.appendChild(option);
//     });
// }
async function loadDanhSachVongDau() {
    const selectElement = document.getElementById("maVongDau");
    selectElement.innerHTML = '<option value="">-- Chọn Vòng Đấu --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("vong_dau");
    console.log(data);
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_vong_dau;
        option.textContent = `${item.ma_vong_dau} - ${item.ten_vong}`;
        selectElement.appendChild(option);
    });
}



async function loadDanhSachSanVanDong() {
    const selectElement = document.getElementById("sanVanDong");
    selectElement.innerHTML = '<option value="">-- Chọn Sân Vận Động --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("san_van_dong");
    console.log(data);
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_san;
        option.textContent = `${item.ma_san} - ${item.ten_san}`;
        selectElement.appendChild(option);
    });
}
async function loadDanhSachTrongTai(id) {
    const selectElement = document.getElementById(id);
    console.log(id);
    selectElement.innerHTML = '<option value="">-- Chọn--</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("loai_trong_tai");
    // console.log(data);
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_loai_trong_tai;
        option.textContent = `${item.ma_loai_trong_tai} - ${item.ten_loai_trong_tai}`;
        selectElement.appendChild(option);
    });
}
/////////////////////////////////////////

function handleXepLich(event) {
    loadDanhSachGiaiDau_chon();


    console.log("tien");
    event.preventDefault();
    // const trangThaiDuyet = document.getElementById("trangThai_chon");
    // Hiển thị bảng popupOverlay
    document.getElementById("popupOverlay").classList.remove("hidden");
    // Sự kiện khi nhấn nút "Đóng" trong bảng
    document.getElementById("closePopup").addEventListener("click", function () {
        // Ẩn bảng khi nhấn nút "Đóng"
        document.getElementById("popupOverlay").classList.add("hidden");
    });

    // viewTbody_chon("All", "All");



    // (Tùy chọn) Hiển thị dữ liệu cho bảng (nếu có)
    // Gọi hàm viewTbody để lấy dữ liệu và hiển thị trong bảng
    document.getElementById("maGiaiDau_chon").addEventListener("change", function () {
        // Ẩn bảng khi nhấn nút "Đóng"
        console.log(document.getElementById("maGiaiDau_chon").value);

        // viewTbody_chon(document.getElementById("maGiaiDau_chon").value, document.getElementById("trangThai_chon").value);
        // // console.log(trangThaiDuyet.value);
        loadDanhSachGiaiVongDau_chon(maGiaiDau);

        document.getElementById("maVongDau_chon").addEventListener("change", async function () {
            // Ẩn bảng khi nhấn nút "Đóng"
            console.log(document.getElementById("maGiaiDau_chon").value);
            console.log(document.getElementById("maVongDau_chon").value);
            const maGiaiDau_chon = document.getElementById("maGiaiDau_chon");
            const maVongDau_chon = document.getElementById("maVongDau_chon");
            const data_dang_ky_tham_gia_giai = await hamChung.layDanhSach("dang_ky_tham_gia_giai");

            console.log(data_dang_ky_tham_gia_giai);
            const danhSachLoc = data_dang_ky_tham_gia_giai.filter(item => item.ma_giai_dau === maGiaiDau_chon.value);
            console.log(danhSachLoc);

            const list_maDoiBongKhongLap = [...new Set(danhSachLoc.map(item => item.ma_doi_bong))];
            // console.log(danhSachLoc);
            console.log("danh sách đội bóng có trận đấu thuộc giải đấu đó");

            console.log(list_maDoiBongKhongLap);

            const tesstt = await tinhDiem_vongLoai_(list_maDoiBongKhongLap, maGiaiDau_chon.value, maVongDau_chon.value);



            viewTbody_chon(tesstt);

            // // console.log(trangThaiDuyet.value);


        });

    });

    document.getElementById("button_tao_tran").addEventListener("click", function (e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định nếu cần
        const selectedTeams = getSelectedCheckboxes();
        const maGiaiDau_chon = document.getElementById("maGiaiDau_chon");
        const maVongDau_chon = document.getElementById("maVongDau_chon");
        const chon_hinhThuc_tao_tran = document.getElementById("chon_hinhThuc_tao_tran");
        console.log(selectedTeams); // In ra mảng các đội bóng đã chọn
        console.log(maGiaiDau_chon.value); // In ra mảng các đội bóng đã chọn
        console.log(maVongDau_chon.value); // In ra mảng các đội bóng đã chọn
        console.log(chon_hinhThuc_tao_tran.value); // In ra mảng các đội bóng đã chọn

        if (selectedTeams.length > 0 && chon_hinhThuc_tao_tran.value != null) {
            let url;
            let form;
            if (chon_hinhThuc_tao_tran.value === "chia-bang") {
                url = "http://127.0.0.1:5000/api/chia-bang";
                form = {
                    teams: selectedTeams,
                    so_bang: 2,
                    random: true
                };
            }
            else if (chon_hinhThuc_tao_tran.value === "loai-truc-tiep") {
                url = "http://127.0.0.1:5000/api/loai-truc-tiep";
                form = {
                    teams: selectedTeams
                };
            }
            else if (chon_hinhThuc_tao_tran.value === "vong-tron") {
                url = "http://127.0.0.1:5000/api/vong-tron";
                form = {
                    teams: selectedTeams,
                    randomize: false
                };
            }
            callAll_taoTranDau(url, form).then(data => {
                console.log("Kết quả chia bảng:", data);
            });
        }



    });




    document.getElementById("button_chon_tat_ca").addEventListener("click", function (e) {
        const checkboxes = document.querySelectorAll('.checkbox-chon');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true; // Đánh dấu tất cả các checkbox là checked
        });
    });

    // document.getElementById("confirmYes").addEventListener("click", async function () {
    //     document.getElementById("confirmModal").classList.add("hidden");
    //     // Thêm hành động duyệt tất cả ở đây
    //     const ma_GiaiDau_chon = document.getElementById("maGiaiDau_chon").value;
    //     const trangThai_chon = document.getElementById("trangThai_chon").value;
    //     // const 
    //     const data_dangKyThamGiaGiai = await hamChung.layDanhSach("dang_ky_tham_gia_giai");
    //     let data = data_dangKyThamGiaGiai;

    //     if (ma_GiaiDau_chon !== "All") {
    //         data = data.filter(item => item.ma_giai_dau === ma_GiaiDau_chon);
    //     }

    //     if (trangThai_chon !== "All") {
    //         data = data.filter(item => item.trang_thai === trangThai_chon);
    //     }
    //     data = data.filter(item => item.trang_thai === "Chờ duyệt");
    //     for (let i = 0; i < data.length; i++) {
    //         //  console.log(data[i]);
    //         const formData = {
    //             "ma_doi_bong": data[i].ma_doi_bong,
    //             "ma_giai_dau": data[i].ma_giai_dau,
    //             "trang_thai": "Đã duyệt"
    //         };
    //         hamChung.sua(formData, "dang_ky_tham_gia_giai");
    //         console.log(formData);
    //         // GỌI LẠI HÀM SAU KHI CẬP NHẬT DỮ LIỆU
    //         await viewTbody_chon(ma_GiaiDau_chon, trangThai_chon);
    //     }
    //     await viewTbody_chon(ma_GiaiDau_chon, trangThai_chon);

    //     alert("Đã duyệt tất cả!");
    // });

    // document.getElementById("confirmNo").addEventListener("click", function () {
    //     document.getElementById("confirmModal").classList.add("hidden");
    // });




}

async function viewTbody_chon(data) {
    const tableBody = document.getElementById("dataTable_chon").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; // Xóa dữ liệu hiện tại

    // Lặp qua dữ liệu và tạo các dòng cho bảng
    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">
                <input type="checkbox" class="checkbox-chon" value="${item.ma_doi_bong}">
            </td>
            <td style="text-align: center;">${item.hang}</td>
            <td style="text-align: center;">${item.ma_doi_bong}</td>
            <td style="text-align: center;">${item.so_tran_thang}</td>
        `;
        tableBody.appendChild(row);
    });
}



async function loadDanhSachGiaiDau_chon() {
    const selectElement = document.getElementById("maGiaiDau_chon");
    selectElement.innerHTML = '<option value="All">Tất Cả</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("giai_dau");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_giai_dau;
        option.textContent = `${item.ma_giai_dau} - ${item.ten_giai_dau}`;
        selectElement.appendChild(option);
    });
}
async function loadDanhSachGiaiVongDau_chon(maGiaiDau) {
    const selectElement = document.getElementById("maVongDau_chon");
    selectElement.innerHTML = '<option value="All">Tất Cả</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("vong_dau");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_vong_dau;
        option.textContent = `${item.ma_vong_dau} - ${item.ten_vong}`;
        selectElement.appendChild(option);
    });
}

async function loadDanhSach_hinhThuc_xepTranDau() {
    const selectElement = document.getElementById("chon_hinhThuc_tao_tran");
    selectElement.innerHTML = ''; // Reset danh sách

    const data_tao = await getHinhThucTaoDoi();
    if (!data_tao) return;

    // 🧠 Lưu vào sessionStorage
    sessionStorage.setItem("hinh_thuc_tao_tran", JSON.stringify(data_tao));

    // 🧩 Giả sử mỗi item là { key: "/api/chia-bang", value: "chia-bang" }
    Object.entries(data_tao).forEach(([ten, duong_dan]) => {
        const option = document.createElement("option");
        option.value = ten;
        option.textContent = `${duong_dan.ten} - ${duong_dan.url}`;
        // console.log(da)
        selectElement.appendChild(option);
    });
}

async function getHinhThucTaoDoi() {
    try {
        const response = await fetch("http://localhost:5000/api");
        const data = await response.json();
        console.log("Kết quả:", data);
        return data;
    } catch (error) {
        console.error("Lỗi gọi API:", error);
        return null;
    }
}

async function tinhDiem_vongLoai_(list_maDoiBong, maGiaiDau, maVongDau) {

    const data_tranDau = await hamChung.layDanhSach("tran_dau");
    const data_kqTranDau = await hamChung.layDanhSach("ket_qua_tran_dau");
    // Lọc ra các trận đấu theo điều kiện
    // Lọc ra các trận đấu thuộc giải đang chọn
    console.log(maGiaiDau);
    let data_tranDau_thuoc_vongDaugiaiDau = data_tranDau.filter(tran =>
        tran.ma_giai_dau === maGiaiDau &&
        tran.ma_vong_dau === maVongDau
    );
    if (maVongDau === "All") {
        data_tranDau_thuoc_vongDaugiaiDau = data_tranDau.filter(tran =>
            tran.ma_giai_dau === maGiaiDau
        );
    }
    console.log(data_tranDau_thuoc_vongDaugiaiDau);
    console.log("Danh sách đội bóng tham gia vòng_giải đó:", list_maDoiBong);

    let data_kqtranDau_thuoc_vongDaugiaiDau = [];

    for (const tran of data_tranDau_thuoc_vongDaugiaiDau) {
        const kq = await hamChung.layThongTinTheo_ID("ket_qua_tran_dau", tran.ma_tran_dau);
        console.log(kq);
        if (kq) {
            data_kqtranDau_thuoc_vongDaugiaiDau.push(kq);
        }
    }
    console.log(data_kqtranDau_thuoc_vongDaugiaiDau);
    let soTranThang = {};

    for (const maDoi of list_maDoiBong) {
        soTranThang[maDoi] = data_kqtranDau_thuoc_vongDaugiaiDau.filter(
            kq => kq.ma_doi_thang === maDoi
        ).length;
    }

    console.log("Số trận thắng của từng đội:", soTranThang);
    const sapXepTranThang = sapXepTranThangTheoDiem(soTranThang);
    console.log("sắp xêp", sapXepTranThang);
    return sapXepTranThang;
}

function sapXepTranThangTheoDiem(soTranThang) {
    // Chuyển object thành mảng và sắp xếp theo số trận thắng (giảm dần)
    const danhSachXepHang = Object.entries(soTranThang)
        .sort((a, b) => b[1] - a[1])  // Sắp xếp theo số trận thắng (decreasing)
        .map(([maDoi, soThang], index) => ({
            hang: index + 1,
            ma_doi_bong: maDoi,
            so_tran_thang: soThang
        }));

    return danhSachXepHang;
}

function getSelectedCheckboxes() {
    const checkboxes = document.querySelectorAll('.checkbox-chon'); // Lấy tất cả các checkbox
    const selectedTeams = [];

    // Lặp qua tất cả checkbox và kiểm tra xem cái nào được chọn
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) { // Nếu checkbox được chọn
            selectedTeams.push(checkbox.value); // Thêm giá trị vào mảng
        }
    });

    return selectedTeams; // Trả về mảng chứa các giá trị của các checkbox đã chọn
}
async function callAll_taoTranDau(url, form) {
    console.log(url);
    console.log(form);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        // Nếu muốn trả ra dữ liệu JSON đã parse:
        const data = await response.json();
        return data;

        // Nếu bạn muốn trả raw Response:
        // return response;

    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return { error: "Gọi API thất bại" };
    }
}
