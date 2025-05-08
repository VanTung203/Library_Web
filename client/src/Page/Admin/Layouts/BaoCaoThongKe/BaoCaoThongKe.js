import { useState, useEffect } from 'react';
import request from '../../../../config/Connect';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';  // Thêm thư viện xlsx

function BaoCaoThongKe() {
    const [datacart, setDataCart] = useState([]);
    const [lateBooks, setLateBooks] = useState([]);

    useEffect(() => {
        request.get('/api/datacart').then((res) => {
            setDataCart(res.data);
            calculateLateBooks(res.data);
        });
    }, []);

    // Hàm tính sách trễ hạn
    const calculateLateBooks = (data) => {
        const currentDate = new Date();
        const lateBooksData = data.filter(item => {
            const returnDate = new Date(item.ngayhethan);
            return returnDate < currentDate && item.trangthai !== 'da_tra';
        });
        setLateBooks(lateBooksData);
    };

    // Hàm để xác định màu sắc trạng thái
    const getStatusColor = (status) => {
        switch (status) {
            case 'chua_xac_nhan':
                return 'warning';
            case 'da_xac_nhan':
                return 'success';
            case 'dang_gia_han':
                return 'info';
            case 'da_tra':
                return 'secondary';
            default:
                return 'light';
        }
    };

    // Hàm xuất Excel cho bảng
    const exportToExcel = (data, filename) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Báo Cáo');
        XLSX.writeFile(wb, `${filename}.xlsx`);
    };

    return (
        <>
            <div className="m-4 text-center">
                <h2 className="fw-bold text-dark">Báo Cáo Thống Kê</h2>
            </div>

            {/* Sách Trễ Hạn */}
            <div className="m-4">
                <h4 className="fw-bold mb-3">Sách Trễ Hạn</h4>
                <Card>
                    <Card.Body>
                        <Button
                            variant="success"
                            className="mb-3"
                            onClick={() => exportToExcel(lateBooks, 'SachTreHan')}
                        >
                            Xuất Excel
                        </Button>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Mã Sinh Viên</th>
                                    <th>Tên Sách</th>
                                    <th>Ngày Mượn</th>
                                    <th>Ngày Hết Hạn</th>
                                    <th>Số Ngày Trễ</th>
                                    <th>Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lateBooks.map((item) => {
                                    const returnDate = new Date(item.ngayhethan);
                                    const currentDate = new Date();
                                    const overdueDays = Math.ceil((currentDate - returnDate) / (1000 * 3600 * 24));
                                    return (
                                        <tr key={item.masinhvien + item.nameBook}>
                                            <td>{item.masinhvien}</td>
                                            <td>{item.nameBook}</td>
                                            <td>{item.ngaymuon}</td>
                                            <td>{item.ngayhethan}</td>
                                            <td>{overdueDays} ngày</td>
                                            <td>
                                                <Badge bg={getStatusColor(item.trangthai)}>
                                                    {item.trangthai}
                                                </Badge>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>

            {/* Tất Cả Các Sách */}
            <div className="m-4">
                <h4 className="fw-bold mb-3">Tất Cả Các Sách</h4>
                <Card>
                    <Card.Body>
                        <Button
                            variant="success"
                            className="mb-3"
                            onClick={() => exportToExcel(datacart, 'TatCaSach')}
                        >
                            Xuất Excel
                        </Button>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Mã Sinh Viên</th>
                                    <th>Tên Sách</th>
                                    <th>Ngày Mượn</th>
                                    <th>Ngày Trả</th>
                                    <th>Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datacart.map((item) => (
                                    <tr key={item.masinhvien + item.nameBook}>
                                        <td>{item.masinhvien}</td>
                                        <td>{item.nameBook}</td>
                                        <td>{item.ngaymuon}</td>
                                        <td>{item.ngayhethan}</td>
                                        <td>
                                            <Badge bg={getStatusColor(item.trangthai)}>
                                                {item.trangthai}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default BaoCaoThongKe;