const btnLuuThayDoi = document.getElementById("button_luu");
const btnTaiLaiTrang = document.getElementById("button_taiLaiTrang");
const btn_xemTD_sap_dien_ra = document.getElementById("button_xemTD_sap_dien_ra");

const maGiaiDau = document.getElementById("maGiaiDau");
const maDoiBong = document.getElementById("maDoiBong");
const trangThai = document.getElementById("trangThai");
const lyDoTuChoi = document.getElementById("lyDoTuChoi");



// Lấy các phần tử

const popupOverlay = document.getElementById("popupOverlay");
const closePopup = document.getElementById("closePopup");



document.addEventListener("DOMContentLoaded", function () {
    loadDanhSachGiaiDau_chon();
    viewTbody();
    btnLuuThayDoi.addEventListener("click", handleLuuThayDoi);
    btnTaiLaiTrang.addEventListener("click", handleTaiLaiTrang);
    btn_xemTD_sap_dien_ra.addEventListener("click", handle_view_GiaiDau);
});

async function viewTbody() {
    const data = await hamChung.layDanhSach("dang_ky_tham_gia_giai");
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_giai_dau}</td>
            <td style="text-align: center;">${item.ma_doi_bong}</td>
            <td style="text-align: center;">${item.thoi_gian_dang_ky}</td>
            <td style="text-align: center;">${item.trang_thai}</td>
            <td style="text-align: center;">${item.ly_do_tu_choi || ""}</td>
            <td style="text-align: center;"><button class="edit-btn btn btn-warning btn-sm">Sửa</button></td>
            <td style="text-align: center;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    button_sua(data);
    button_xoa(data);
}

async function handleLuuThayDoi(event) {
    event.preventDefault();
    const form = document.getElementById("inputForm");

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = {
        ma_giai_dau: maGiaiDau.value,
        ma_doi_bong: maDoiBong.value,
        trang_thai: trangThai.value,
        ly_do_tu_choi: lyDoTuChoi.value || null
    };

    // Kiểm tra tồn tại: nếu đã có thì sửa, chưa có thì thêm mới
    const data = await hamChung.layDanhSach("dang_ky_tham_gia_giai");
    const daTonTai = data.some(
        item => item.ma_giai_dau === formData.ma_giai_dau && item.ma_doi_bong === formData.ma_doi_bong
    );

    if (daTonTai) {
        await hamChung.sua(formData, "dang_ky_tham_gia_giai");
        alert("Sửa thành công!");
    } else {
        await hamChung.them(formData, "dang_ky_tham_gia_giai");
        alert("Thêm thành công!");
    }

    viewTbody();
}

function handleTaiLaiTrang(event) {
    event.preventDefault();
    location.reload();
}

function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const item = data[index];
            maGiaiDau.value = item.ma_giai_dau;
            maDoiBong.value = item.ma_doi_bong;
            trangThai.value = item.trang_thai;
            lyDoTuChoi.value = item.ly_do_tu_choi || "";

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
}

function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            const item = data[index];
            if (confirm(`Bạn có chắc chắn muốn xóa đăng ký của đội "${item.ma_doi_bong}" tại giải "${item.ma_giai_dau}"?`)) {
                await hamChung.xoa({
                    ma_giai_dau: item.ma_giai_dau,
                    ma_doi_bong: item.ma_doi_bong
                }, "dang_ky_tham_gia_giai");
                viewTbody();
            }
        });
    });
}

function handle_view_GiaiDau(event) {
    console.log("tien");
    event.preventDefault();

    // Hiển thị bảng popupOverlay
    document.getElementById("popupOverlay").classList.remove("hidden");
    // Sự kiện khi nhấn nút "Đóng" trong bảng
    document.getElementById("closePopup").addEventListener("click", function () {
        // Ẩn bảng khi nhấn nút "Đóng"
        document.getElementById("popupOverlay").classList.add("hidden");
    });

    viewTbody_chon("All", "All");
    // (Tùy chọn) Hiển thị dữ liệu cho bảng (nếu có)
    // Gọi hàm viewTbody để lấy dữ liệu và hiển thị trong bảng
    document.getElementById("maGiaiDau_chon").addEventListener("change", function () {
        // Ẩn bảng khi nhấn nút "Đóng"
        console.log(document.getElementById("maGiaiDau_chon").value);
        viewTbody_chon(document.getElementById("maGiaiDau_chon").value, document.getElementById("trangThai_chon").value);
        // console.log(trangThaiDuyet.value);

    });
    document.getElementById("trangThai_chon").addEventListener("change", function () {
        // Ẩn bảng khi nhấn nút "Đóng"
        console.log(document.getElementById("maGiaiDau_chon").value);
        viewTbody_chon(document.getElementById("maGiaiDau_chon").value, document.getElementById("trangThai_chon").value);
        // console.log(trangThaiDuyet.value);

    });
    // document.getElementById("button_duyet_tat_ca").addEventListener("click", async function () {
    //     // Ẩn bảng khi nhấn nút "Đóng"
    //     console.log("click");
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
    //         console.log(data[i]);

    //     }


    // });
    document.getElementById("button_duyet_tat_ca").addEventListener("click", function (e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định nếu cần
        document.getElementById("confirmModal").classList.remove("hidden");
    });

    document.getElementById("confirmYes").addEventListener("click", async function () {
        document.getElementById("confirmModal").classList.add("hidden");
        // Thêm hành động duyệt tất cả ở đây
        const ma_GiaiDau_chon = document.getElementById("maGiaiDau_chon").value;
        const trangThai_chon = document.getElementById("trangThai_chon").value;
        // const 
        const data_dangKyThamGiaGiai = await hamChung.layDanhSach("dang_ky_tham_gia_giai");
        let data = data_dangKyThamGiaGiai;

        if (ma_GiaiDau_chon !== "All") {
            data = data.filter(item => item.ma_giai_dau === ma_GiaiDau_chon);
        }

        if (trangThai_chon !== "All") {
            data = data.filter(item => item.trang_thai === trangThai_chon);
        }
        data = data.filter(item => item.trang_thai === "Chờ duyệt");
        for (let i = 0; i < data.length; i++) {
            //  console.log(data[i]);
            const formData = {
                "ma_doi_bong": data[i].ma_doi_bong,
                "ma_giai_dau": data[i].ma_giai_dau,
                "trang_thai": "Đã duyệt"
            };
            hamChung.sua(formData, "dang_ky_tham_gia_giai");
            console.log(formData);
            // GỌI LẠI HÀM SAU KHI CẬP NHẬT DỮ LIỆU
            await viewTbody_chon(ma_GiaiDau_chon, trangThai_chon);
        }
        await viewTbody_chon(ma_GiaiDau_chon, trangThai_chon);

        alert("Đã duyệt tất cả!");
    });

    document.getElementById("confirmNo").addEventListener("click", function () {
        document.getElementById("confirmModal").classList.add("hidden");
    });




}

async function viewTbody_chon(maGiaiDau, trangThai_chon) {
    console.log(maGiaiDau);
    console.log(trangThai_chon);
    const data_dangKyThamGiaGiai = await hamChung.layDanhSach("dang_ky_tham_gia_giai");
    let data = data_dangKyThamGiaGiai;

    if (maGiaiDau !== "All") {
        data = data.filter(item => item.ma_giai_dau === maGiaiDau);
    }

    if (trangThai_chon !== "All") {
        data = data.filter(item => item.trang_thai === trangThai_chon);
    }


    const tableBody = document.getElementById("dataTable_chon");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_giai_dau}</td>
            <td style="text-align: center;">${item.ma_doi_bong}</td>
            <td style="text-align: center;">${item.thoi_gian_dang_ky}</td>
            <td style="text-align: center;">${item.ly_do_tu_choi || ""}</td>
            <td style="text-align: center;">
                <select class="status-select form-control form-control-sm">
                    <option value="Chờ duyệt" ${item.trang_thai === 'Chờ duyệt' ? 'selected' : ''} style="background-color: #f0ad4e; color: white;">Chờ duyệt</option>
                    <option value="Đã duyệt" ${item.trang_thai === 'Đã duyệt' ? 'selected' : ''} style="background-color: #5bc0de; color: white;">Đã duyệt</option>
                    <option value="Từ chối" ${item.trang_thai === 'Từ chối' ? 'selected' : ''} style="background-color: #d9534f; color: white;">Từ chối</option>
                </select>
            </td>
            <td style="text-align: center;"><button class="xem_doi btn btn-warning btn-sm">Xem Đội</button></td>
        `;
        tableBody.appendChild(row);

        // Lắng nghe sự kiện change của select
        const select = row.querySelector('.status-select');
        const options = select.querySelectorAll('option');

        // Hàm thay đổi màu nền của select khi thay đổi giá trị
        select.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const selectedColor = selectedOption.style.backgroundColor;
            e.target.style.backgroundColor = selectedColor;
            // Cập nhật giá trị trang_thai khi người dùng thay đổi
            const newTrangThai = e.target.value;
            const maDoiBong = row.querySelector('td:nth-child(2)').textContent; // Lấy mã đội bóng (có thể thay đổi tuỳ theo cấu trúc dữ liệu)

            console.log(`Trạng thái đã thay đổi: ${newTrangThai} cho đội bóng: ${maDoiBong}`);
            const formData = {
                "ma_doi_bong": item.ma_doi_bong,
                "ma_giai_dau": item.ma_giai_dau,
                "trang_thai": newTrangThai
            };
            hamChung.sua(formData, "dang_ky_tham_gia_giai");
            console.log(formData);

        });

        // Đặt màu nền ban đầu của select khi trang thái đã chọn
        const selectedOption = Array.from(options).find(option => option.selected);
        if (selectedOption) {
            select.style.backgroundColor = selectedOption.style.backgroundColor;
        }
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
