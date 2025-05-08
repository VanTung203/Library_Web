// src/components/Modal/ModalQuickView.js
import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

function ModalQuickView({ show, onHide, book }) {
    if (!book) return null;
    console.log(book)
    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Thông tin sách</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={4} className="text-center mb-3">
                        <img
                            src={book.img}
                            alt={book.tensach}
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: '250px', objectFit: 'cover' }}
                        />
                        <p className="mt-2 fw-bold">{book.tensach}</p>
                        <p className="text-muted">{book.tacgia} - {book.nhaxuatban}</p>
                    </Col>
                    <Col md={8}>
                        <ul className="list-unstyled">
                            <li><strong>Mã Sách:</strong> {book.masach}</li>
                            <li>
                                {/* <strong>Trạng thái:</strong>  */}
                                <span 
                                    className={`badge ${book.tinhtrang ? 'bg-danger' : 'bg-success'}`}
                                >
                                    {book.tinhtrang ? 'Đã được mượn' : 'Còn trống' }
                                </span>
                            </li>
                            <li>
                                <strong>Mô Tả:</strong>
                                <div className="border p-2 mt-1 rounded bg-light" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    {book.mota || 'Không có mô tả.'}
                                </div>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalQuickView;