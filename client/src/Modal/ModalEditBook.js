// import request from '../config/Connect';
// import { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ModalEditBook({ showModalEditBook, setShowModalEditBook, book }) {
//     const [formData, setFormData] = useState({
//         masach: '',
//         tensach: '',
//         tacgia: '',
//         nhaxuatban: '',
//         namxb: '',
//         soluong: '',
//         phienban: '',
//         danhmuc: '',
//         mota: '',
//         ngaycapnhat: ''
//     });

//     useEffect(() => {
//         if (book) {
//             setFormData({
//                 masach: book.masach || '',
//                 tensach: book.tensach || '',
//                 tacgia: book.tacgia || '',
//                 nhaxuatban: book.nhaxuatban || '',
//                 namxb: book.namxb || '',
//                 soluong: book.soluong || '',
//                 phienban: book.phienban || '',
//                 danhmuc: book.danhmuc || '',
//                 mota: book.mota || '',
//                 ngaycapnhat: book.ngaycapnhat || ''
//             });
//         }
//     }, [book]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleEditBook = async () => {
//         try {
//             const res = await request.post('/api/editbook', { id: book._id, ...formData });
//             toast.success(res.data.message);
//             setTimeout(() => {
//                 setShowModalEditBook(false);
//             }, 1000);
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Lỗi cập nhật sách');
//         }
//     };

//     return (
//         <>
//             <Modal show={showModalEditBook} onHide={() => setShowModalEditBook(false)}>
//                 <ToastContainer />
//                 <Modal.Header closeButton>
//                     <Modal.Title>Chỉnh sửa sách</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div className="row">
//                         {Object.keys(formData).map((key, index) => (
//                             <div className="col-md-6" key={key}>
//                                 <div className="form-floating mb-3">
//                                     <input
//                                         name={key}
//                                         value={formData[key]}
//                                         onChange={handleChange}
//                                         className="form-control"
//                                         placeholder={`Nhập ${key}`}
//                                     />
//                                     <label>{key}</label>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModalEditBook(false)}>Đóng</Button>
//                     <Button variant="primary" onClick={handleEditBook}>Lưu Lại</Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default ModalEditBook;


import request from '../config/Connect';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalEditBook({ showModalEditBook, setShowModalEditBook, book }) {
    const [formData, setFormData] = useState({
        masach: '',
        img: '',
        tensach: '',
        tacgia: '',
        nhaxuatban: '',
        mota: '',
        tinhtrang: false,
    });

    useEffect(() => {
        if (book) {
            setFormData({
                masach: book.masach || '',
                img: book.img || '',
                tensach: book.tensach || '',
                tacgia: book.tacgia || '',
                nhaxuatban: book.nhaxuatban || '',
                mota: book.mota || '',
                tinhtrang: book.tinhtrang || false,
            });
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleEditBook = async () => {
        try {
            const res = await request.post('/api/editbook', { id: book._id, ...formData });
            toast.success(res.data.message);
            setTimeout(() => {
                setShowModalEditBook(false);
            }, 1000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi cập nhật sách');
        }
    };

    return (
        <>
            <Modal show={showModalEditBook} onHide={() => setShowModalEditBook(false)}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <input
                                    name="masach"
                                    value={formData.masach}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Nhập mã sách"
                                />
                                <label>Mã Sách</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <input
                                    name="tensach"
                                    value={formData.tensach}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Nhập tên sách"
                                />
                                <label>Tên Sách</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <input
                                    name="tacgia"
                                    value={formData.tacgia}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Nhập tác giả"
                                />
                                <label>Tác Giả</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <input
                                    name="nhaxuatban"
                                    value={formData.nhaxuatban}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Nhập nhà xuất bản"
                                />
                                <label>Nhà Xuất Bản</label>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-floating mb-3">
                                <input
                                    name="img"
                                    value={formData.img}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Link hình ảnh"
                                />
                                <label>Link Hình Ảnh</label>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-floating mb-3">
                                <textarea
                                    name="mota"
                                    value={formData.mota}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Nhập mô tả"
                                    style={{ height: '100px' }}
                                />
                                <label>Mô Tả</label>
                            </div>
                        </div>

                        <div className="form-check ms-3">
                            <input
                                type="checkbox"
                                name="tinhtrang"
                                checked={formData.tinhtrang}
                                onChange={handleChange}
                                className="form-check-input"
                                id="tinhtrangCheck"
                            />
                            <label className="form-check-label" htmlFor="tinhtrangCheck">
                                Đã cho mượn
                            </label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalEditBook(false)}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleEditBook}>
                        Lưu Lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditBook;