const btnLuuThayDoi = document.getElementById("button_luu");
const btnTaiLaiTrang = document.getElementById("button_taiLaiTrang");

const maCauThu = document.getElementById("maCauThu");
const maDoiBong = document.getElementById("maDoiBong");
const maGiaiDau = document.getElementById("maGiaiDau");

const hoTen = document.getElementById("hoTen");
const soAo = document.getElementById("soAo");
const viTri = document.getElementById("maViTri");
const hinhAnh = document.getElementById("hinhAnh");
const inputFile = document.getElementById("hinhAnhFile");
const form = document.getElementById("inputForm");


document.addEventListener("DOMContentLoaded", function () {
    loadDanhSachCauThu();
    loadDanhSachDoiBong();
    loadDanhSachGiaiDau();
    loadDanhSachViTri();
    viewTbody();
    btnLuuThayDoi.addEventListener("click", handleLuuThayDoi);
    btnTaiLaiTrang.addEventListener("click", handleTaiLaiTrang);
});

// Hiển thị danh sách cầu thủ trong giải đấu
async function viewTbody() {
    const data = await hamChung.layDanhSach("cau_thu_giai_dau");
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    const rows = await Promise.all(data.map(async item => {
        let hinh_anh;
        const row = document.createElement("tr");
        // C:\Users\vanti\Desktop\quan_ly_tran_dau\frontend\public\images\cat-2.png

        if (item.hinh_anh === null) {
            hinh_anh = "/frontend/public/images/cat-2.png";
        } else {
            hinh_anh = await hamChung.getImage(item.hinh_anh);
        }
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_cau_thu}</td>
            <td style="text-align: center;">${item.ma_doi_bong}</td>
            <td style="text-align: center;">${item.ma_giai_dau}</td>
            <td style="text-align: center;">${item.ho_ten}</td>
            <td style="text-align: center;"><img src="${hinh_anh}" alt="Hình ảnh" width="50"></td>
            <td style="text-align: center;">${item.so_ao}</td>
            <td style="text-align: center;">${item.ma_vi_tri}</td>
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
    // nếu có hình ảnh mới thì lấy tên hình ảnh đó ra 
    if (inputFile.value === "")
        id_Hinh_anh_thay = hinhAnh.value;
    else {
        id_Hinh_anh_thay = inputFile.files[0].name; // Lấy tệp đầu tiên (nếu có)
    }
    id_Hinh_anh_thay = hamChung.doiKhoangTrangThanhGachDuoi(id_Hinh_anh_thay);

    let formData = {
        ma_cau_thu: maCauThu.value,
        ma_doi_bong: maDoiBong.value,
        ma_giai_dau: maGiaiDau.value,
        ho_ten: hoTen.value,
        so_ao: soAo.value,
        ma_vi_tri: viTri.value,
        hinh_anh: id_Hinh_anh_thay
    };
    // th đang chỉnh sửa
    if (maCauThu.disabled && maGiaiDau.disabled) {
        await hamChung.sua(formData, "cau_thu_giai_dau");
        alert("Sửa thành công!");
    } else
    // th đang thêm mới
    {
        await hamChung.them(formData, "cau_thu_giai_dau");
        alert("Thêm thành công!");
    }
    console.log(formData);
    if (inputFile.value != "") {
        await hamChung.uploadImage(inputFile.files[0]);
    }
   // viewTbody();
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
            maCauThu.value = item.ma_cau_thu;
            maDoiBong.value = item.ma_doi_bong;
            maGiaiDau.value = item.ma_giai_dau;
            hoTen.value = item.ho_ten;
            soAo.value = item.so_ao;
            viTri.value = item.ma_vi_tri;
            hinhAnh.value = item.hinh_anh;
            // Ngăn không cho thay đổi
            maCauThu.setAttribute("disabled", true);
            maGiaiDau.setAttribute("disabled", true);
        });
    });
}

// Xử lý nút "Xóa"
function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            if (confirm(`Bạn có chắc chắn muốn xóa cầu thủ ${data[index].ma_cau_thu} khỏi giải đấu?`)) {
                const formData = {
                    ma_cau_thu: data[index].ma_cau_thu,
                    ma_giai_dau: data[index].ma_giai_dau
                };
                await hamChung.xoa(formData, "cau_thu_giai_dau");
                viewTbody();
            }
        });
    });
}





async function loadDanhSachCauThu() {
    const selectElement = document.getElementById("maCauThu");
    selectElement.innerHTML = '<option value="">-- Chọn cầu thủ --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("cau_thu");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_cau_thu;
        option.textContent = `${item.ma_cau_thu} - ${item.ho_ten}`;
        selectElement.appendChild(option);
    });
}
async function loadDanhSachDoiBong() {
    const selectElement = document.getElementById("maDoiBong");
    selectElement.innerHTML = '<option value="">-- Chọn Đội Bong --</option>'; // Reset danh sách
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

async function loadDanhSachViTri() {
    const selectElement = document.getElementById("maViTri");
    selectElement.innerHTML = '<option value="">-- Chọn Vị Trí --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("vi_tri_cau_thu");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_vi_tri;
        option.textContent = `${item.ma_vi_tri} - ${item.ten_vi_tri}`;
        selectElement.appendChild(option);
    });
}