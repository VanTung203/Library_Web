import AdminPage from '../Page/Admin/AdminPage';
import HistoryBook from '../Page/HistoryBook/HistoryBook';
import HomePage from '../Page/HomePage/HomePage';
import Login from '../Page/Login/Login';
import Register from '../Page/Register/Register';
import InfoUser from '../Page/User/InfoUser';
import BookManagement from '../Page/Admin/Layouts/BookManagement/BookManagement';
import ManagementUser from '../Page/Admin/Layouts/ManagementUser/ManagementUser';
import RequestCart from '../Page/Admin/Layouts/RequestCart/RequestCart';
import HandleBook from '../Page/Admin/Layouts/HandleBook/HandleBook';
import BaoCaoThongKe from '../Page/Admin/Layouts/BaoCaoThongKe/BaoCaoThongKe';
export const publicRoutes = [
    { path: '/', element: <Login /> },
    { path: '/reg', element: <Register /> },
];

export const privateRoutes1 = [
    { path: '/homepage', element: <HomePage /> },
    { path: '/info', element: <InfoUser /> },
    { path: '/history', element: <HistoryBook /> },
];

export const privateRoutes = [
    {
        path: '/admin',
        element: <AdminPage />,
        children: [
            { path: 'books', element: <BookManagement /> },
            { path: 'users', element: <ManagementUser /> },
            { path: 'requests', element: <RequestCart /> },
            { path: 'handle', element: <HandleBook /> },
            { path: 'stats', element: <BaoCaoThongKe /> },
        ],
    },
];
