import { useSelector } from "react-redux";

const Home = () => {
    const account = useSelector(state => state.auth.account);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <>
            <div>Home Page</div>
            {account &&
                <div>Hello <strong>{account.fullName}</strong></div>
            }
        </>
    );
}

export default Home;