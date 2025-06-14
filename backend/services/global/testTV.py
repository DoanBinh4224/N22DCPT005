# import itertools
# import sys
# import random  # Sử dụng module random để xáo trộn danh sách

# sys.stdout.reconfigure(encoding='utf-8')

# # Danh sách các đội bóng
# danh_sach_doi = ["Đội A", "Đội B", "Đội C", "Đội D", "Đội E", "Đội F", "Đội G", "Đội H", "Đội T"]

# # Hàm xếp lịch thi đấu vòng tròn (mỗi đội gặp tất cả các đội còn lại)
# def xep_lich_vong_tron(danh_sach_doi):
#     cac_tran_dau = list(itertools.combinations(danh_sach_doi, 2))
#     print("\n📅 Xếp lịch thi đấu vòng tròn (mỗi đội đều gặp nhau):")
#     for so_tran, tran in enumerate(cac_tran_dau, start=1):
#         print(f"Trận đấu {so_tran}: {tran[0]} 🆚 {tran[1]}")
#     return cac_tran_dau

# # Hàm xếp lịch thi đấu loại trực tiếp (1 vòng duy nhất)
# def xep_lich_loai_truc_tiep(danh_sach_doi):
#     print("\n📅 Xếp lịch thi đấu loại trực tiếp (1 vòng):")

#     ds_xao_tron = danh_sach_doi.copy()
#     random.shuffle(ds_xao_tron)

#     # Trường hợp số đội là số lẻ
#     if len(ds_xao_tron) % 2 != 0:
#         doi_duoc_mien = ds_xao_tron.pop()
#         print(f"\n⚠️ Số đội lẻ, {doi_duoc_mien} được miễn thi đấu vòng này.\n")

#     cac_cuoc_dau = []

#     # Ghép cặp đội
#     for i in range(0, len(ds_xao_tron), 2):
#         tran = (ds_xao_tron[i], ds_xao_tron[i+1])
#         cac_cuoc_dau.append(tran)
#         print(f"Trận đấu {i//2 + 1}: {tran[0]} 🆚 {tran[1]}")

#     return cac_cuoc_dau

# # Hàm chia bảng
# def chia_thanh_bang(danh_sach_doi, so_bang, ngau_nhien=0):
#     if ngau_nhien == 1:
#         danh_sach_doi = danh_sach_doi.copy()
#         random.shuffle(danh_sach_doi)

#     tong_doi = len(danh_sach_doi)
#     doi_moi_bang = tong_doi // so_bang
#     du = tong_doi % so_bang

#     danh_sach_bang = []
#     start = 0

#     for i in range(so_bang):
#         so_doi_trong_bang = doi_moi_bang + (1 if i == so_bang - 1 and du != 0 else 0)
#         bang = danh_sach_doi[start:start + so_doi_trong_bang]
#         danh_sach_bang.append(bang)
#         start += so_doi_trong_bang

#     print(f"\n📦 Chia {len(danh_sach_doi)} đội thành {so_bang} bảng:")
#     for i, bang in enumerate(danh_sach_bang, start=1):
#         print(f"🔹 Bảng {chr(64 + i)}: {', '.join(bang)}")

#     return danh_sach_bang

# # In danh sách đội bóng ban đầu
# print("📋 Danh sách đội bóng ban đầu:", danh_sach_doi)

# # Thực hiện chia bảng, xếp lịch
# chia_thanh_bang(danh_sach_doi, 4, ngau_nhien=1)
# xep_lich_vong_tron(danh_sach_doi)
# xep_lich_loai_truc_tiep(danh_sach_doi)
