import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {

  const navigate = useNavigate()

    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errorUsername, setErrorUsername ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ errorEmail, setErrorEmail ] = useState('')
    const [ errorPassword, seterrorPassword ] = useState('')
    const [ errorConfirmPassword, seterrorConfirmPassword ] = useState('')
    const [ check, setCheck ] = useState(false)

    const handlerRegister = async () => {
      
      email === "" && setErrorEmail("Please enter your email !")
      password === "" && seterrorPassword("Please enter your password !")
      confirmPassword === "" && seterrorConfirmPassword("Please enter your confirm password !")

      if ( email !== ""&& password !== "" && confirmPassword !== "") {
        setCheck(true)
      }

      if ( check ) {
          await axios.post(`${process.env.REACT_APP_API}/v1/auth/register`, {
             username: "1233222222222",
             email: email,
             password: password
          })
          .then(response => {
            navigate("/login")
          })
      }
    }

  return (
    <section className="fixed inset-0 bg-black bg-opacity-90 secondary-bg">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-black text-center md:text-2xl">
                      Create and account
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                       <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your username</label>
                          <input onChange={e => setUsername(e.target.value)} value={username} alt="123" type="email" name="email" id="email" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 bg-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
                          <span className="text-sm text-red-500">{errorUsername}</span>
                      </div>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                          <input onChange={e => setEmail(e.target.value)} value={email} alt="123" type="email" name="email" id="email" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 bg-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
                          <span className="text-sm text-red-500">{errorEmail}</span>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                          <input onChange={e => setPassword(e.target.value)} value={password} alt="123" type="password" name="password" id="password" placeholder="••••••••" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 bg-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                          <span className="text-sm text-red-500">{errorPassword}</span>
                      </div>
                      <div>
                          <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                          <input onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} alt="123" type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 bg-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                          <span className="text-sm text-red-500">{errorConfirmPassword}</span>
                      </div>
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input alt="123" id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-primary-5 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="12">Terms and Conditions</a></label>
                          </div>
                      </div>
                      <button onClick={handlerRegister} type="button" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                      <p className="text-sm font-light text-black">
                          Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
  </section>
  )
}

export default SignUp