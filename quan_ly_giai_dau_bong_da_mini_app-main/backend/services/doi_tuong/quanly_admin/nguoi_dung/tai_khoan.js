document.addEventListener("DOMContentLoaded", async function () {



    // getImage(public_id) {
    //     return getImage(public_id)
    // },
    // updateImage(public_id, newImagePath) {
    //     return updateImage(public_id, newImagePath);
    // },
    // uploadImage(imagePath) {
    //     return uploadImage(imagePath);
    // },
    // deleteImage(public_id) {
    //     return deleteImage(public_id);
    // },



    // hamChung.getImage("84702b00-a35f-400c-b657-a377a9d70223");
    // // console.log(hamChung.uploadImage("C:/Users/vanti/Downloads/0cca92b8-76e0-4ce0-b1db-db0b38ff12a1.jpg"));
    // var data = hamChung.uploadImage("C:/Users/vanti/Downloads/0cca92b8-76e0-4ce0-b1db-db0b38ff12a1.jpg");
    // console.log(await data);
    viewTbody();
});

async function viewTbody() {
    const data = await hamChung.layDanhSach("tai_khoan");
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.tai_khoan}</td>
            <td style="text-align: center;">${item.mat_khau}</td>
            <td style="text-align: center;">${item.trang_thai}</td>
            <td style="text-align: center;">${item.ma_vai_tro}</td>
            <td style="text-align: center;"><button class="edit-btn btn btn-warning btn-sm">Sửa</button></td>
            <td style="text-align: center;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    button_sua(data);
    button_xoa(data);
}

function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const item = data[index];
            document.getElementById("taiKhoan").value = item.tai_khoan;
            document.getElementById("matKhau").value = item.mat_khau;
            document.getElementById("trangThai").value = item.trang_thai;
            document.getElementById("maVaiTro").value = item.ma_vai_tro;
        });
    });
}

function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa tài khoản ${data[index].tai_khoan}?`)) {
                data.splice(index, 1);
                viewTbody(); // Load lại danh sách sau khi xóa
            }
        });
    });
}
