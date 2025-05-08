import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

import Header from './Layouts/Header/Header';
import MainPage from './Layouts/Main/MainPage';
import { useEffect, useState } from 'react';
import useDebounce from '../../customHook/useDebounce';
import request from '../../config/Connect';
const cx = classNames.bind(styles);

function HomePage() {
    const [dataBooks, setDataBooks] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const debounce = useDebounce(searchValue, 500);

    useEffect(() => {
        try {
            if (searchValue === '') {
                return;
            }
            request.get('/api/search', { params: { nameBook: debounce } }).then((res) => setDataBooks(res.data));
        } catch (error) {
            console.log(error);
        }
    }, [debounce, searchValue]);

    useEffect(() => {
        request.get('/api/books').then((res) => setDataBooks(res.data));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header setSearchValue={setSearchValue} />
            </header>

            <main>
                <MainPage dataBooks={dataBooks} setDataBooks={setDataBooks} />
            </main>
        </div>
    );
}

export default HomePage;
