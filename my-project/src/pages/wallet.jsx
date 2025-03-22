import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wallet = ()=>{
    const [balance,setBalance] = useState(0);
    const [transactions,setTransactions] = useState([]);
    const [error,setError] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchWalletData = async()=>{
            const token = localStorage.getItem('token');
            if(!token){
                navigate('/');
                return;
            }
            try{
                const balanceResp = await axios.get('http://localhost:7095/api/wallet/getWallet',{
                    headers:{Authorization:`Bearer ${token}`},
                });
                console.log(balanceResp.data.balance)
                setBalance(balanceResp.data.balance);

                const transactionResp = await axios.get('http://localhost:7095/api/wallet/getTransactions',{
                    headers:{Authorization:`Bearer ${token}`},
                });
                console.log(transactionResp.data)
                setTransactions(transactionResp.data);
            }
            catch(err){
                setError('Failed to fecth transactions and wallet balance');
            }
        }
        fetchWalletData();
    },[navigate])

    const logout = ()=>{
        localStorage.removeItem('token');
    }
    return(
        <div className="container mt-5">
            <h1 className="text text-center mb-3 text-success">Your Wallet</h1>


            {error && <div className="alert alert-danger alert-dismissible fade show">
                {error}
                <button className="btn btn-close" data-bs-dismiss='alert' onClick={logout}></button>    
            </div>}

            <div className="card p-4 shadow-sm mb-4">
                <h3>Wallet Balance: ₹{balance}</h3>
            </div>

            <h2>Transaction History</h2>

            {transactions.length===0 ? (<p>No transactions found.</p>)
                :(
                    <table className="table table-stripped">
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((txn,index)=>(
                                <tr key={index}>
                                    <td>₹{txn.amount}</td>
                                    <td>{txn.transactionType === 'CREDIT' ? 'Credit' : 'Debit'}</td>
                                    <td>{txn.date.split('T')[0]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
            <button className="mt-4 btn btn-primary btn-success" onClick={()=>{navigate('/add-money')}}>Add Money</button>
        </div>
    )
}

export default Wallet;