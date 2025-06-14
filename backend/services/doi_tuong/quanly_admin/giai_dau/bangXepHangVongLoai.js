document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

async function viewTbody() {
    const data = await hamChung.layDanhSach("bang_xep_hang_vong_loai");
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_doi_bong}</td>
            <td style="text-align: center;">${item.ma_bang_dau}</td>
            <td style="text-align: center;">${item.diem}</td>
            <td style="text-align: center;">${item.so_tran_thang}</td>
            <td style="text-align: center;">${item.so_tran_hoa}</td>
            <td style="text-align: center;">${item.so_tran_thua}</td>
            <td style="text-align: center;">${item.ban_thang}</td>
            <td style="text-align: center;">${item.ban_thua}</td>
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
            document.getElementById("maDoiBong").value = item.ma_doi_bong;
            document.getElementById("maBangDau").value = item.ma_bang_dau;
            document.getElementById("diem").value = item.diem;
            document.getElementById("soTranThang").value = item.so_tran_thang;
            document.getElementById("soTranHoa").value = item.so_tran_hoa;
            document.getElementById("soTranThua").value = item.so_tran_thua;
            document.getElementById("banThang").value = item.ban_thang;
            document.getElementById("banThua").value = item.ban_thua;
        });
    });
}

function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            if (confirm(`Bạn có chắc chắn muốn xóa đội bóng "${data[index].ma_doi_bong}"?`)) {
                await hamChung.xoa("doi_bong_trong_bang", data[index].ma_doi_bong);
                viewTbody();
            }
        });
    });
}
