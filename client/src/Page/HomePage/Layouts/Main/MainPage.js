import classNames from 'classnames/bind';
import styles from './MainPage.module.scss';

import { useState } from 'react';
import ModalRequestBook from './Modal/ModalRequestBook';
import ModalQuickView from './Modal/ModalQuickView'; // import modal quick view mới

const cx = classNames.bind(styles);

function MainPage({ dataBooks }) {
    const [show, setShow] = useState(false);
    const [nameBook, setNameBook] = useState('');
    const [idBook, setIdBook] = useState('');
    const [quickViewBook, setQuickViewBook] = useState(null); // book đang xem nhanh

    const handleShow = (name, id) => {
        setShow(true);
        setNameBook(name);
        setIdBook(id)
    };

    const handleQuickView = (book) => {
        setQuickViewBook(book);
    };

    return (
        <div className={cx('wrapper', 'd-flex', 'flex-wrap', 'justify-content-center', 'gap-4', 'p-4')}>
            {dataBooks.map((item) => (
                <div key={item._id} className="card shadow-sm border-0" style={{ width: '20rem', borderRadius: '10px' }}>
                    <img
                        src={item.img}
                        className="card-img-top"
                        alt="..."
                        style={{ height: '250px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                    />
                    <div className="card-body text-center">
                        <h5 className="card-title fw-bold">{item.tensach}</h5>
                        <p className="card-text text-muted">{item.tacgia} - {item.nhaxuatban}</p>

                        <div className="d-flex gap-2 mt-2">
                            <button
                                onClick={() => handleQuickView(item)}
                                type="button"
                                className="btn btn-outline-primary w-50"
                            >
                                Xem Nhanh
                            </button>

                            <button
                                onClick={() => handleShow(item.tensach, item.masach)}
                                type="button"
                                className="btn btn-primary w-50"
                            >
                                Gửi Yêu Cầu
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <ModalRequestBook show={show} setShow={setShow} nameBook={nameBook} idBook={idBook} />
            <ModalQuickView show={!!quickViewBook} onHide={() => setQuickViewBook(null)} book={quickViewBook} />
        </div>
    );
}

export default MainPage;