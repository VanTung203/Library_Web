import classNames from 'classnames/bind';
import styles from './BookManagement.module.scss';
import { useEffect, useState } from 'react';
import ModalAddBook from '../../../../Modal/ModalAddBook';
import ModalEditBook from '../../../../Modal/ModalEditBook';
import ModalDeleteBook from '../../../../Modal/ModalDeleteBook';
import request from '../../../../config/Connect';
import useDebounce from '../../../../customHook/useDebounce';

const cx = classNames.bind(styles);

function BookManagement() {
    const [showModalAddBook, setShowModalAddBook] = useState(false);
    const [showModalEditBook, setShowModalEditBook] = useState(false);
    const [showModalDeleteBook, setShowModalDeleteBook] = useState(false);
    const [idBook, setIdBook] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [dataBooks, setDataBooks] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const debounce = useDebounce(searchValue, 500);

    useEffect(() => {
        request.get('/api/books').then((res) => setDataBooks(res.data));
    }, [showModalAddBook, showModalEditBook, showModalDeleteBook]);

    useEffect(() => {
        if (searchValue === '') return;
        request.get('/api/search', { params: { nameBook: debounce } })
            .then((res) => setDataBooks(res.data))
            .catch((error) => console.log(error));
    }, [debounce, searchValue]);

    const handleShowEdit = (id) => {
        const book = dataBooks.find((book) => book._id === id);
        if (book) {
            setSelectedBook(book);
            setIdBook(id);
            setShowModalEditBook(true);
        }
    };

    const handleShowDelete = (id) => {
        setIdBook(id);
        setShowModalDeleteBook(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className="m-4 text-center">
                <h2 className="fw-bold text-dark">Quản Lý Sách</h2>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <button
                    onClick={() => setShowModalAddBook(true)}
                    type="button"
                    className="btn btn-primary"
                >
                    Thêm Sách
                </button>

                <form className="d-flex" role="search">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Tìm tên sách"
                        aria-label="Search"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </form>
            </div>

            <table className="table table-striped text-center align-middle">
                <thead>
                <tr>
                    <th scope="col" style={{ width: '10%' }}>Mã Sách</th>
                    <th scope="col" style={{ width: '20%' }}>Tên Sách</th>
                    <th scope="col" style={{ width: '15%' }}>Tác Giả</th>
                    <th scope="col" style={{ width: '10%' }}>Nhà Xuất Bản</th>
                    <th scope="col" style={{ width: '30%' }}>Mô Tả</th>
                    <th scope="col" style={{ width: '15%' }}>Hành Động</th>
                </tr>
                </thead>
                <tbody>
                    {dataBooks.map((item) => (
                        <tr key={item._id}>
                            <th scope="row">{item.masach}</th>
                            <td>{item.tensach}</td>
                            <td>{item.tacgia}</td>
                            <td>{item.nhaxuatban}</td>
                            <td>{item.mota && item.mota.length > 100 ? item.mota.substring(0, 100) + '...' : (item.mota || '')}</td>
                            <td>
                                <button onClick={() => handleShowDelete(item._id)} type="button" className="btn btn-danger btn-sm mx-1">
                                    Xóa
                                </button>
                                <button onClick={() => handleShowEdit(item._id)} type="button" className="btn btn-warning btn-sm">
                                    Sửa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ModalAddBook showModalAddBook={showModalAddBook} setShowModalAddBook={setShowModalAddBook} />
            <ModalEditBook showModalEditBook={showModalEditBook} setShowModalEditBook={setShowModalEditBook} book={selectedBook} />
            <ModalDeleteBook showModalDeleteBook={showModalDeleteBook} setShowModalDeleteBook={setShowModalDeleteBook} idBook={idBook} />
        </div>
    );
}

export default BookManagement;