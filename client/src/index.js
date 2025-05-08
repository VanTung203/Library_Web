import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { jwtDecode } from 'jwt-decode';
import { privateRoutes, privateRoutes1, publicRoutes } from './route';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    return <Route key={index} path={route.path} element={route.element} />;
                })}
                {privateRoutes.map((route, index) => {
                    const token = document.cookie.slice(6, 9999);
                    if (token) {
                        const decoded = jwtDecode(token);
                        if (decoded.admin) {
                            return (
                                <Route key={index} path={route.path} element={route.element}>
                                    {route.children &&
                                        route.children.map((child, i) => (
                                            <Route key={i} path={child.path} element={child.element} />
                                        ))}
                                </Route>
                            );
                        } else {
                            return <Route path="/" element={<App />} />;
                        }
                    } else {
                        return <Route path="/" element={<App />} />;
                    }
                })}

                {privateRoutes1.map((route) => {
                    const token = document.cookie.slice(6, 9999);
                    if (token) {
                        return <Route key={route.path} path={route.path} element={route.element} />;
                    } else {
                        return <Route path="/" element={<App />} />;
                    }
                })}
            </Routes>
        </Router>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
