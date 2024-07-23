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

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<Home />} />
                    <Route path='/user' element={<User />} />
                </Route>

                <Route path='/admin' element={<Admin />}>
                    <Route path='manage-user' element={<ManageUser />} />
                </Route>

                <Route path='/login' element={<Login />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}

export default Layout