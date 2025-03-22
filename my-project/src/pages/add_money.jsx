import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Addmoney = ()=>{
    const [amount,setAmount] = useState(0);
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const navigate = useNavigate();

    const handlepayment = async()=>{
        if(!amount || amount<0){
            setError('Please Enter a valid amount')
            return;
        }

        try{
            const token  = localStorage.getItem('token');
            console.log(token);
            console.log(amount);
            const response = await axios.post('http://localhost:7095/api/wallet/add-money',{amount},{headers:{Authorization:`Bearer ${token}`}})
            const {orderId}  = response.data;
            console.log(orderId);

            const options = {
                key:"rzp_test_0z3fp6pmEbuNO4",
                amount:amount*100,
                currency:"INR",
                name:"Unified Campus Assistant",
                description:'Add payment to wallet',
                order_id:orderId,
                handler:async (response)=>{
                    console.log(token);
                    console.log(response)
                    await axios.post('http://localhost:7095/api/wallet/verifyPayment',{...response,amount},{
                        headers:{Authorization:`Bearer ${token}`}
                    })
                    setSuccess('Payment successfull! Money added to your wallet');
                    setAmount(0);
                    setError('');
                    console.log("i am in handler function");
                    navigate("/dashboard");
                },
                prefill:{
                    name:'Sandeep Kumar',
                    email:'psandeepkumark31@gmail.com',
                    contact:'7095723035'
                },
                theme:{
                    color:'#007bff',
                }
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        }
        catch(err){
            setError('Payment Failed');
        }
    }

    return(
        <div className="container mt-5" style={{width:'450px'}}>
            <h1 className="text-center mb-4">Add Money to Your Wallet</h1>
            {error && <div className="alert alert-danger text-center alert-dismissible fade show">{error}
                <div className="btn btn-close" data-bs-dismiss="alert" onClick={()=>{setError('')}}></div>    
            </div>}

            {success && <div className="alert alert-success text-center alert-dismissible fade show" >{success}
                <div className="btn btn-close" data-bs-dismiss="alert" onClick={()=>{setError('')}}></div>    
            </div>}

            <div className="card shadow-lg p-4 mb-4">
                <label className="form-label">Enter Amount (₹)</label>
                <input className="form-control mb-3" type="number" onChange={(e)=>setAmount(e.target.value)}></input>

                <button className="btn btn-primary w-100" onClick={handlepayment}>Proceed to Pay</button>
                <button className="btn btn-secondary w-100 mt-2" onClick={()=>{navigate('/wallet')}}>Back to Wallet</button>
            </div>
        </div>
    )
}

export default Addmoney