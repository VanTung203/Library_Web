// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// import request from '../config/Connect';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ModalAddBook({ showModalAddBook, setShowModalAddBook }) {
//     const handleClose = () => setShowModalAddBook(false);

//     const [masach, setMasach] = useState('');
//     const [img, setImg] = useState('');
//     const [tensach, setTensach] = useState('');
//     const [tacgia, setTacgia] = useState('');
//     const [nhaxuatban, setNhaxuatban] = useState('');
//     const [namxb, setNamxb] = useState('');
//     const [soluong, setSoluong] = useState(Number);
//     const [phienban, setPhienban] = useState('');
//     const [danhmuc, setDanhmuc] = useState('');
//     const [mota, setMota] = useState('');
//     const [ngaycapnhat, setNgaycapnhat] = useState('');

//     const handleAddBook = async () => {
//         try {
//             if (
//                 !masach ||
//                 !tensach ||
//                 !tacgia ||
//                 !nhaxuatban ||
//                 !namxb ||
//                 !soluong ||
//                 !phienban ||
//                 !danhmuc ||
//                 !mota ||
//                 !ngaycapnhat
//             )
//                 return toast.error('Vui lòng nhập đủ thông tin !');
//             const res = await request.post('/api/addbook', {
//                 masach,
//                 tensach,
//                 img,
//                 tacgia,
//                 nhaxuatban,
//                 namxb,
//                 soluong,
//                 phienban,
//                 danhmuc,
//                 ngaycapnhat,
//                 mota,
//             });
//             toast.success(res.data.message);
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     };

//     return (
//         <>
//             <Modal show={showModalAddBook} onHide={handleClose}>
//                 <ToastContainer />
//                 <Modal.Header closeButton>
//                     <Modal.Title>Thêm Sách</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div className="row">
//                         <div className="col-md-6">
//                             <div className="form-floating mb-3">
//                                 <input
//                                     onChange={(e) => setMasach(e.target.value)}
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Mã Sách"
//                                 />
//                                 <label htmlFor="floatingInput">Mã Sách</label>
//                             </div>

//                             <div className="form-floating mb-3">
//                                 <input
//                                     onChange={(e) => setTensach(e.target.value)}
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Tên Sách"
//                                 />
//                                 <label htmlFor="floatingInput">Tên Sách</label>
//                             </div>

//                             <div className="form-floating mb-3">
//                                 <input
//                                     onChange={(e) => setNhaxuatban(e.target.value)}
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Nhà Xuất Bản"
//                                 />
//                                 <label htmlFor="floatingInput">Nhà Xuất Bản</label>
//                             </div>

//                             <div className="form-floating mb-3">
//                                 <input
//                                     onChange={(e) => setDanhmuc(e.target.value)}
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Danh Mục"
//                                 />
//                                 <label htmlFor="floatingInput">Danh Mục</label>
//                             </div>

//                             <div className="form-floating mb-3">
//                                 <input
//                                     onChange={(e) => setMota(e.target.value)}
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Mô Tả"
//                                 />
//                                 <label htmlFor="floatingInput">Mô Tả</label>
//                             </div>

//                             <div className="form-floating mb-3">
//                                 <input
//                                     onChange={(e) => setNgaycapnhat(e.target.value)}
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Ngày Cập Nhật"
//                                 />
//                                 <label htmlFor="floatingInput">Ngày Cập Nhật</label>
//                             </div>
//                         </div>

//                         <div className="col-md-6">
//                             <div className="form-floating mb-3">
//                                 <input
//                                     onChange={(e) => setImg(e.target.value)}
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Ảnh Sách"
//                                 />
//                                 <label htmlFor="floatingInput">Ảnh Sách</label>
//                             </div>

//                             <div className="form-floating mb-3">
//                                 <input
//                                     onChange={(e) => setTacgia(e.target.value)}
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Tác Giả"
//                                 />
//                                 <label htmlFor="floatingInput">Tác Giả</label>
//                             </div>

//                             <div className="form-floating mb-3">
//                                 <input
//                                     onChange={(e) => setPhienban(e.target.value)}
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Phiên Bản"
//                                 />
//                                 <label htmlFor="floatingInput">Phiên Bản</label>
//                             </div>

//                             <div className="form-floating mb-3">
//                                 <input
//                                     onChange={(e) => setNamxb(e.target.value)}
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Năm Xuất Bản"
//                                 />
//                                 <label htmlFor="floatingInput">Năm Xuất Bản</label>
//                             </div>

//                             <div className="form-floating mb-3">
//                                 <input
//                                     onChange={(e) => setSoluong(e.target.value)}
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Số Lượng"
//                                 />
//                                 <label htmlFor="floatingInput">Số Lượng</label>
//                             </div>
//                         </div>
//                     </div>
//                 </Modal.Body>

//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Đóng
//                     </Button>
//                     <Button variant="primary" onClick={handleAddBook}>
//                         Lưu Lại
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default ModalAddBook;


import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import request from '../config/Connect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalAddBook({ showModalAddBook, setShowModalAddBook }) {
    const handleClose = () => setShowModalAddBook(false);

    const [masach, setMasach] = useState('');
    const [img, setImg] = useState('');
    const [tensach, setTensach] = useState('');
    const [tacgia, setTacgia] = useState('');
    const [nhaxuatban, setNhaxuatban] = useState('');
    const [mota, setMota] = useState('');

    const handleAddBook = async () => {
        try {
            if (!masach || !tensach || !img || !tacgia || !nhaxuatban || !mota)
                return toast.error('Vui lòng nhập đủ thông tin!');

            const res = await request.post('/api/addbook', {
                masach,
                img,
                tensach,
                tacgia,
                nhaxuatban,
                mota,
            });

            toast.success(res.data.message);  // Hiển thị thông báo thành công
            handleClose();  // Đóng modal sau khi thêm sách thành công
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi thêm sách');
        }
    };

    return (
        <>
            <ToastContainer /> {/* Đảm bảo ToastContainer có ở đây hoặc trong component cha */}
            <Modal show={showModalAddBook} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Các form input */}
                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setMasach(e.target.value)}
                            className="form-control"
                            placeholder="Mã Sách"
                        />
                        <label>Mã Sách</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setTensach(e.target.value)}
                            className="form-control"
                            placeholder="Tên Sách"
                        />
                        <label>Tên Sách</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setImg(e.target.value)}
                            className="form-control"
                            placeholder="Link Hình Ảnh"
                        />
                        <label>Link Hình Ảnh</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setTacgia(e.target.value)}
                            className="form-control"
                            placeholder="Tác Giả"
                        />
                        <label>Tác Giả</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setNhaxuatban(e.target.value)}
                            className="form-control"
                            placeholder="Nhà Xuất Bản"
                        />
                        <label>Nhà Xuất Bản</label>
                    </div>

                    <div className="form-floating mb-3">
                        <textarea
                            onChange={(e) => setMota(e.target.value)}
                            className="form-control"
                            placeholder="Mô Tả"
                            style={{ height: '100px' }}
                        />
                        <label>Mô Tả</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleAddBook}>
                        Lưu Lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddBook;