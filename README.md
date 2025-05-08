# PHÁT TRIỂN HỆ THỐNG QUẢN LÝ THƯ VIỆN

## Liên kết tài liệu
- **Theo dõi nội dung dự án:** [Google Docs](https://docs.google.com/document/d/17CZKOD-YFdx16GPvXHUuMHJjw8qlUeGsJx4DfgRcGIQ/edit?tab=t.0)
- **Theo dõi tiến độ công việc:** [Google Sheets](https://docs.google.com/spreadsheets/d/1J_zUMNDaU5mXdYQfzQQ3-wAvCEToZgkVauKrsrV6MBs/edit?gid=0#gid=0)

## Tiêu đề: Hệ thống quản lý thư viện hiện đại: Tự động hóa quy trình và nâng cao trải nghiệm người dùng

### 1. Giới thiệu
**Mục đích:** Xây dựng một hệ thống quản lý thư viện hiện đại, đáp ứng các nhu cầu quản lý, lưu trữ và phục vụ độc giả một cách hiệu quả. Hệ thống sẽ cung cấp các tính năng chính như quản lý sách, quản lý độc giả, mượn/trả sách, thống kê và báo cáo.

**Phạm vi:** Bao gồm các các quy trình nghiệp vụ chính liên quan đến hoạt động của thư viện, từ quản lý sách, độc giả đến các hoạt động mượn/trả sách và thống kê báo cáo.

### 2. Yêu cầu chức năng
- **Quản lý sách:** Thêm/ sửa/ xóa thông tin sách, phân loại sách theo thể loại, tác giả, nhà xuất bản,...
- **Quản lý độc giả:** Đăng ký thẻ độc giả, cập nhật thông tin độc giả, theo dõi hoạt động mượn/trả sách.
- **Mượn/Trả sách:** Cho mượn sách, thu hồi sách, tính phí/ tiền phạt.
- **Thống kê, báo cáo:** Thống kê số lượng sách mượn/ trả, thống kê doanh thu, báo cáo tình hình hoạt động thư viện.
- **Quản lý hệ thống:** Quản lý người dùng, phân quyền, cấu hình hệ thống.

### 3. Thiết kế quy trình
#### A. Quy trình Quản lý sách
- **Thêm/Sửa/Xóa sách:** Thủ thư cập nhật thông tin sách (tiêu đề, tác giả, số lượng).
- **Phân loại:** Tổ chức sách theo thể loại, tác giả, nhà xuất bản.
- **Theo dõi tồn kho:** Giám sát trạng thái sách (còn, đã mượn, hư hỏng).

#### B. Quy trình Quản lý độc giả
- **Đăng ký:** Thu thập thông tin người đọc (họ tên, liên hệ) và cấp thẻ thư viện.
- **Cập nhật hồ sơ:** Chỉnh sửa thông tin thành viên khi cần.
- **Theo dõi hoạt động:** Ghi nhận lịch sử mượn/trả sách.

#### C. Quy trình Mượn/Trả sách
- **Mượn sách:** Kiểm tra tình trạng sách và ghi nhận giao dịch.
- **Trả sách:** Cập nhật trạng thái sách và tính phí phạt nếu có.
- **Tính phí:** Tự động tính phạt với trường hợp trả trễ/hư hỏng.

#### D. Quy trình Báo cáo
- **Thống kê mượn/trả:** Theo dõi giao dịch theo ngày/tuần/tháng.
- **Báo cáo doanh thu:** Tổng hợp thu nhập từ phí/phạt.
- **Phân tích hoạt động:** Đánh giá hiệu suất thư viện.

### 4. Kiến trúc hệ thống
- **Frontend:** Giao diện thân thiện với người dùng dành cho thủ thư và thành viên.
- **Backend:** Cơ sở dữ liệu (MySQL/PostgreSQL) lưu trữ thông tin sách/thành viên.
- **Tích hợp:** API xử lý thanh toán và công cụ bên thứ ba.

### 5. Vai trò & Trách nhiệm nhóm
| Mã sinh viên | Họ tên          | Vai trò |
|-------------|---------------|---------------------------------|
| 3121411073  | Trần Trọng Hiếu | Quản lý thông tin sách (Thêm/ Sửa/ Xóa, phân loại, quản lý kho sách) |
| 3121411005  | Văn Phú Tùng   | Quản lý mượn trả & gia hạn sách (Ghi nhận mượn trả, tính phí/ tiền phạt) |
| 3121411019  | Phạm Ngọc Ánh  | Quản lý thẻ độc giả (Duyệt/ hủy yêu cầu tạo thẻ, cập nhật, thu hồi thẻ) |
| 3121411055  | Đạo Hoàng Đăng | Quản lý thống kê & báo cáo (Số lượng sách, mượn sách quá hạn) |

### 6. Lộ trình thực hiện
| Giai đoạn | Hoạt động                          | Thời gian |
|----------|---------------------------------|----------|
| 1        | Phân tích yêu cầu & thiết kế     | 2 tuần   |
| 2        | Phát triển cơ sở dữ liệu & giao diện | 4 tuần   |
| 3        | Triển khai module & kiểm thử    | 6 tuần   |
| 4        | Tích hợp & triển khai hệ thống  | 2 tuần   |

### 7. Kết quả mong đợi
- Hệ thống quản lý thư viện hoạt động đầy đủ.
- Quy trình mượn/trả và báo cáo được tự động hóa.
- Cải thiện trải nghiệm người dùng cho thủ thư và thành viên.

### 8. Nâng cấp trong tương lai
- Tích hợp ứng dụng di động để đặt sách từ xa.
- Gợi ý sách dựa trên AI.
- Hỗ trợ nhiều chi nhánh thư viện.

### 9. Kết luận
#### Tổng kết các quy trình nghiệp vụ chính
Hệ thống quản lý thư viện bao gồm các quy trình nghiệp vụ chính như quản lý sách, quản lý độc giả, mượn/trả sách, thống kê và báo cáo. Các quy trình này được xây dựng để tự động hóa và quản lý hiệu quả các hoạt động của thư viện, từ việc lưu trữ thông tin sách, độc giả đến theo dõi quá trình mượn/trả sách và tạo các báo cáo thống kê.

#### Đánh giá và hướng phát triển
Hệ thống quản lý thư viện đã cung cấp các tính năng cần thiết để quản lý hoạt động của thư viện một cách hiệu quả. Tuy nhiên, để đáp ứng nhu cầu ngày càng cao của độc giả và thủ thư, hệ thống cần được tiếp tục phát triển và nâng cấp, bao gồm:
- Tích hợp các tính năng mới như đặt trước sách, gia hạn mượn sách, v.v.
- Cải thiện giao diện người dùng và tính năng tìm kiếm sách.
- Nâng cao tính bảo mật và quyền truy cập cho các vai trò khác nhau.
- Mở rộng khả năng tích hợp với các hệ thống khác như hệ thống kế toán, quản lý nhân sự.
