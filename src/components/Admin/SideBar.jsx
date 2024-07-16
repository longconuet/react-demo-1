import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <>
      <ListGroup>
        <NavLink className='list-group-item list-group-item-action' to="/admin/manage-user">User Manager</NavLink>
        <NavLink className='list-group-item list-group-item-action' to="/admin/manage-question">Question Manager</NavLink>
        <NavLink className='list-group-item list-group-item-action' to="/admin/manage-quiz">Quiz Manager</NavLink>
      </ListGroup>
    </>
  )
}

export default SideBar;