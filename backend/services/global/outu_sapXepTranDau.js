// lich_thi_dau.js - Tạo lịch thi đấu tự động

function taoLichThiDau({
    doi_bong,
    the_thuc,
    so_luot_dau = 1,
    ngay_bat_dau,
    tran_moi_ngay = 2,
    san_thi_dau = [],
    khung_gio = ["15:00", "17:00"]
  }) {
    switch (the_thuc) {
      case "round_robin":
        return taoLichVongTron(doi_bong, so_luot_dau, ngay_bat_dau, tran_moi_ngay, san_thi_dau, khung_gio);
      case "knockout":
        return taoLichLoaiTrucTiep(doi_bong, ngay_bat_dau, tran_moi_ngay, san_thi_dau, khung_gio);
      case "group_stage":
        return taoLichVongBang(doi_bong, ngay_bat_dau, tran_moi_ngay, san_thi_dau, khung_gio);
      default:
        throw new Error("Thể thức không hỗ trợ");
    }
  }
  
  function taoLichVongTron(doi_bong, so_luot_dau, ngay_bat_dau, tran_moi_ngay, san_thi_dau, khung_gio) {
    const so_le = doi_bong.length % 2 !== 0;
    if (so_le) doi_bong.push({ id: "bye", ten: "Nghỉ" });
    const n = doi_bong.length;
    const tong_vong = (n - 1) * so_luot_dau;
    const lich = [];
  
    const ngay = new Date(ngay_bat_dau);
    let tran_id = 1;
  
    for (let vong = 0; vong < tong_vong; vong++) {
      for (let i = 0; i < n / 2; i++) {
        const doi_nha = doi_bong[i];
        const doi_khach = doi_bong[n - 1 - i];
        if (doi_nha.id !== "bye" && doi_khach.id !== "bye") {
          const san = san_thi_dau[(tran_id - 1) % san_thi_dau.length] || null;
          const gio = khung_gio[(tran_id - 1) % khung_gio.length];
          lich.push({
            tran_id: tran_id++,
            doi_nha: doi_nha.ten,
            doi_khach: doi_khach.ten,
            vong: vong + 1,
            ngay: ngay.toISOString().split("T")[0],
            gio,
            san
          });
        }
        if (tran_id % tran_moi_ngay === 1) {
          ngay.setDate(ngay.getDate() + 1);
        }
      }
      doi_bong.splice(1, 0, doi_bong.pop());
    }
  
    return lich;
  }
  
  function taoLichLoaiTrucTiep(doi_bong, ngay_bat_dau, tran_moi_ngay, san_thi_dau, khung_gio) {
    const lich = [];
    const ngay = new Date(ngay_bat_dau);
    let tran_id = 1;
    let vong = 1;
    let dsDoiHienTai = [...doi_bong];
  
    while (dsDoiHienTai.length > 1) {
      const doiVongTiep = [];
      for (let i = 0; i < dsDoiHienTai.length; i += 2) {
        const doi_nha = dsDoiHienTai[i];
        const doi_khach = dsDoiHienTai[i + 1] || { id: "bye", ten: "Nghỉ" };
        const san = san_thi_dau[(tran_id - 1) % san_thi_dau.length] || null;
        const gio = khung_gio[(tran_id - 1) % khung_gio.length];
        lich.push({
          tran_id: tran_id++,
          doi_nha: doi_nha.ten,
          doi_khach: doi_khach.ten,
          vong,
          ngay: ngay.toISOString().split("T")[0],
          gio,
          san
        });
        if (doi_khach.id !== "bye") {
          doiVongTiep.push({ id: `W${tran_id - 1}`, ten: `Thắng trận ${doi_nha.ten} vs ${doi_khach.ten}` });
        } else {
          doiVongTiep.push(doi_nha);
        }
        if (tran_id % tran_moi_ngay === 1) {
          ngay.setDate(ngay.getDate() + 1);
        }
      }
      dsDoiHienTai = doiVongTiep;
      vong++;
    }
  
    return lich;
  }
  
  function taoLichVongBang(doi_bong, ngay_bat_dau, tran_moi_ngay, san_thi_dau, khung_gio) {
    return []; // Chưa làm
  }
  
  // ------------------------ DỮ LIỆU THỬ NGHIỆM ------------------------
  function inCacHinhThucThiDau() {
    const theThuc = [
      {
        ma: "round_robin",
        ten: "Vòng tròn (Round Robin)",
        mo_ta: "Mỗi đội sẽ thi đấu với tất cả các đội còn lại 1 hoặc 2 lượt (lượt đi/lượt về)."
      },
      {
        ma: "knockout",
        ten: "Loại trực tiếp (Knockout)",
        mo_ta: "Các đội đấu loại trực tiếp, đội thua bị loại, đội thắng đi tiếp vào vòng sau cho đến khi còn 1 đội vô địch."
      },
      {
        ma: "group_stage",
        ten: "Vòng bảng (Group Stage)",
        mo_ta: "Các đội được chia thành các bảng, thi đấu vòng tròn trong mỗi bảng. Đội đứng đầu bảng sẽ vào vòng tiếp theo. (Chưa hỗ trợ đầy đủ)"
      }
    ];
  
    console.log("📌 Các hình thức thi đấu hỗ trợ:");
    theThuc.forEach(ht => {
      console.log(`- ${ht.ten}`);
      console.log(`  + Mã: ${ht.ma}`);
      console.log(`  + Mô tả: ${ht.mo_ta}`);
    });
  }
  
  const dauVao = {
    doi_bong: [
      { id: 1, ten: "Đội A" },
      { id: 2, ten: "Đội B" },
      { id: 3, ten: "Đội C" },
      { id: 4, ten: "Đội D" }
    ],
    the_thuc: "round_robin",
    so_luot_dau: 1,
    ngay_bat_dau: "2025-05-01",
    tran_moi_ngay: 2,
    san_thi_dau: ["Sân A", "Sân B"],
    khung_gio: ["15:00", "17:00"]
  };
  
  const lichThiDau = taoLichThiDau(dauVao);
  console.log("✅ Lịch thi đấu tự động:");
  console.log(lichThiDau);
  inCacHinhThucThiDau();
