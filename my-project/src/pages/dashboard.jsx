import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Dashboard = ()=>{
    const [user,setUser] = useState(null);
    const [walletbalance,setWalletbalance] = useState(0);
    const [error,setError] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchdata = async()=>{
            const token = localStorage.getItem('token');
            if(!token){
                navigate('/');
                return;
            }
            console.log(token);
            try{
                const userRes = await axios.get('http://localhost:7095/api/users/profile',{
                    headers:{Authorization:`Bearer ${token}`},
                });
                console.log(userRes.data);
                setUser(userRes.data);

                const walletResponse = await axios.get('http://localhost:7095/api/wallet/getWallet',{
                    headers:{Authorization:`Bearer ${token}`},
                });
                console.log(walletResponse.data);
                setWalletbalance(walletResponse.data.balance);
            }
            catch(err){
                setError('Error Fetching data')
            }
        }
        fetchdata();
    },[navigate])

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/');
    }
    return(
        <div className="container mt-5">
            <h1>Welcome, {user?.name || "user"}</h1>
            <p>Your Wallet Balance: ₹{walletbalance}</p>
            <div className="mt-3">
                <button className="btn btn-primary" onClick={()=>navigate('/wallet')}>Go to Wallet</button>
            </div>

            <div className="mt-3">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Dashboard;