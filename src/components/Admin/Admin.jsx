import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideBar from './SideBar';
import './Admin.scss';
import { Outlet } from 'react-router-dom';

const Admin = () => {
    return (
        <>
            <div className="admin-container">
                <Row>
                    <Col md={2}>
                        <div className='admin-sidebar'>
                            <SideBar />
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className='admin-content'>
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Admin;