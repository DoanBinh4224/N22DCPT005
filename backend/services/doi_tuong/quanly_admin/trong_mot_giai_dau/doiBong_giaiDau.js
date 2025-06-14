const btnLuuThayDoi = document.getElementById("button_luu");
const btnTaiLaiTrang = document.getElementById("button_taiLaiTrang");


const maDoiBong = document.getElementById("maDoiBong");
const maGiaiDau = document.getElementById("maGiaiDau");
const tenDoiBong = document.getElementById("tenDoiBong");

const hinhAnh = document.getElementById("logo");
const inputFile = document.getElementById("logoFile");

const form = document.getElementById("inputForm");
const quocGia = document.getElementById("quocGia");






document.addEventListener("DOMContentLoaded", function () {

    loadDanhSachDoiBong();
    loadDanhSachGiaiDau();
    viewTbody();
    btnLuuThayDoi.addEventListener("click", handleLuuThayDoi);
    btnTaiLaiTrang.addEventListener("click", handleTaiLaiTrang);
  
});

// Hiển thị danh sách cầu thủ trong giải đấu
async function viewTbody() {
    const data = await hamChung.layDanhSach("doi_bong_giai_dau");
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    const rows = await Promise.all(data.map(async item => {
        // const hinh_anh = await hamChung.getImage(item.hinh_anh);
        // console.log(item.hinh_anh);
        let hinh_anh;
        const row = document.createElement("tr");
        // C:\Users\vanti\Desktop\quan_ly_tran_dau\frontend\public\images\cat-2.png

        if (item.logo === null) {
            hinh_anh = "/frontend/public/images/cat-2.png";
        } else {
            hinh_anh = await hamChung.getImage(item.logo);

        }
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_giai_dau}</td>
            <td style="text-align: center;">${item.ma_doi_bong}</td>
            <td style="text-align: center;">${item.ten_doi_bong}</td>
            <td style="text-align: center;">${item.quoc_gia}</td>
            <td style="text-align: center;"><img src="${hinh_anh}" alt="Logo" width="50"></td>
            <td style="text-align: center;"><button class="edit-btn btn btn-warning btn-sm">Sửa</button></td>
            <td style="text-align: center;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    }));

    button_sua(data);
    button_xoa(data);
}

// Thêm/Sửa cầu thủ trong giải đấu
async function handleLuuThayDoi(event) {
    event.preventDefault();

    const form = document.getElementById("inputForm");
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    let id_Hinh_anh_thay = "";
    if (inputFile.value === "")
        id_Hinh_anh_thay = hinhAnh.value;
    else {
        id_Hinh_anh_thay = inputFile.files[0].name; // Lấy tệp đầu tiên (nếu có)
    }
    id_Hinh_anh_thay = hamChung.doiKhoangTrangThanhGachDuoi(id_Hinh_anh_thay);
    console.log(id_Hinh_anh_thay);

    let formData = {
        ma_doi_bong: maDoiBong.value,
        ma_giai_dau: maGiaiDau.value,
        ten_doi_bong: tenDoiBong.value,
        quoc_gia: quocGia.value,
        logo: id_Hinh_anh_thay
    };
    // th đang chỉnh sửa
    if (maDoiBong.disabled && maGiaiDau.disabled) {
        await hamChung.sua(formData, "doi_bong_giai_dau");
        alert("Sửa thành công!");
    } else
    // th đang thêm mới
    {
        await hamChung.them(formData, "doi_bong_giai_dau");
        alert("Thêm thành công!");
    }
    // console.log(formData);
    // viewTbody();
    if (inputFile.value != "") {
        await hamChung.uploadImage(inputFile.files[0]);
    }
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
            const item = data[index];

            maGiaiDau.value = item.ma_giai_dau;
            maDoiBong.value = item.ma_doi_bong;
            tenDoiBong.value = item.ten_doi_bong;
            quocGia.value = item.quoc_gia;
            logo.value = item.logo;
            // Ngăn không cho thay đổi

            maGiaiDau.setAttribute("disabled", true);
            maDoiBong.setAttribute("disabled", true);
        });
    });
}

// Xử lý nút "Xóa"
function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            if (confirm(`Bạn có chắc chắn muốn xóa doi bong ${data[index].ma_doi_bong} khỏi giải đấu?`)) {
                const formData = {
                    ma_doi_bong: data[index].ma_doi_bong,
                    ma_giai_dau: data[index].ma_giai_dau
                };
                await hamChung.xoa(formData, "doi_bong_giai_dau");
                viewTbody();
            }
        });
    });
}



async function loadDanhSachDoiBong() {
    const selectElement = document.getElementById("maDoiBong");
    selectElement.innerHTML = '<option value="">-- Chọn Đội Bóng --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("doi_bong");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_doi_bong;
        option.textContent = `${item.ma_doi_bong} - ${item.ten_doi_bong}`;
        selectElement.appendChild(option);
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
