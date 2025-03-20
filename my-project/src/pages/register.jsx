import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = ()=>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [success,setSuccess] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:7095/api/users/register',{name,email,password});
            setSuccess('Registration successful')
            setTimeout(()=>navigate('/'),1000)
        }
        catch(error){
            setError("User Exists or Process failed");
        }
    }

    const remove = ()=>{
        setError(null)
        setSuccess(null)
    }

    return(
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='card p-4 shadow-lg' style={{width:'350px'}}>
                <h2 className='text-center mb-4'>Register</h2>
                
                {error && <div className='alert alert-danger alert-dismissible  show'>{error}
                    <button className='btn-close' data-bs-dismiss="alert" onClick={remove}></button>    
                </div>}

                {success && <div className='alert alert-success alert-dismissible fade show'>{success}
                    <button className='btn-close' data-bs-dismiss="alert" onClick={remove}></button>    
                </div>}
                <form onSubmit={handleSubmit}>

                    <div className='mb-3'>
                        <label className='form-label' htmlFor='name'>Name</label>
                        <input type='text' required className='form-control' onChange={(e)=>setName(e.target.value)} id='name'></input>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input type='email' required className='form-control' onChange={(e)=>setEmail(e.target.value)} id='email'></input>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label' htmlFor='p'>Password</label>
                        <input type='password' required className='form-control' onChange={(e)=>setPassword(e.target.value)} id='p'></input>
                    </div>

                    <button className='btn btn-primary w-100' type='submit'>Register</button>
                </form>
                <p className='text-center mt-3'>
                    Already have an account? <a href='/'>Login</a>
                </p>
            </div>
        </div>
    )
}

export default Register