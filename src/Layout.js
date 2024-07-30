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
import ManageQuestion from './components/Admin/Content/ManageQuestion';
import ManageQuiz from './components/Admin/Content/ManageQuiz';
import { useSelector } from 'react-redux';

const Layout = () => {
    const authAccount = useSelector(state => state.auth.account);

    return (
        <>
            {/* <AuthRedirect /> */}
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<Home />} />
                    <Route element={<ProtectedNestedRoute />}>
                        <Route path='/admin' element={authAccount && authAccount.role === 0 && <Admin />}>
                            <Route path='manage-user' element={<ManageUser />} />
                            <Route path='manage-question' element={<ManageQuestion />} />
                            <Route path='manage-quiz' element={<ManageQuiz />} />
                        </Route>
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