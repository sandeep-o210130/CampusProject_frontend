import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = ()=>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:7095/api/users/login',{email,password});
            localStorage.setItem('token',response.data.token)
            navigate('/dashboard');
        }
        catch(error){
            setError("Password or email incorrect");
        }
    }

    const remove = ()=>{
        setError(null)
    }

    return(
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='card p-4 shadow-lg' style={{width:'350px'}}>
                <h2 className='text-center mb-4'>Login</h2>

                {error && <div className='alert alert-danger alert-dismissible fade show'>{error}
                    <button className='btn-close' data-bs-dismiss="alert" onClick={remove}></button>    
                </div>}

                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input type='email' required className='form-control' onChange={(e)=>setEmail(e.target.value)} id='email'></input>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label' htmlFor='p'>Password</label>
                        <input type='password' required className='form-control' onChange={(e)=>setPassword(e.target.value)} id='p'></input>
                    </div>

                    <button className='btn btn-primary w-100' type='submit'>Login</button>
                </form>
                <p className='text-center mt-3'>
                    Don't have an account? <a href='/register'>Register</a>
                </p>
            </div>
        </div>
    )
}

export default Login