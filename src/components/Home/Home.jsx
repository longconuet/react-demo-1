import { useSelector } from "react-redux";
import { Container, Card, Button } from 'react-bootstrap';

const Home = () => {
    const account = useSelector(state => state.auth.account);
    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>Welcome to My Bootstrap App</Card.Title>
                    <Card.Text>
                        This is a simple hero unit, a simple card-style component for calling extra attention to featured content or information.
                    </Card.Text>
                    <Button variant="primary">Learn more</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default Home;