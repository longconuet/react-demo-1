import App from './App';
import {
    Routes,
    Route
} from 'react-router-dom'
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import Home from './components/Home/Home';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedSingleRoute from './ProtectedSingleRoute';
import ProtectedNestedRoute from './ProtectedNestedRoute';
import AccessForbiden from './components/Auth/AccessForbiden';

const Layout = () => {
    return (
        <>
            {/* <AuthRedirect /> */}
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<Home />} />
                    <Route path='/user' element={
                        <ProtectedSingleRoute>
                            <User />
                        </ProtectedSingleRoute>
                    } />
                </Route>

                <Route element={<ProtectedNestedRoute />}>
                    <Route path='/admin' element={<Admin />}>
                        <Route path='manage-user' element={<ManageUser />} />
                    </Route>
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/access-forbiden' element={<AccessForbiden />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default Layout