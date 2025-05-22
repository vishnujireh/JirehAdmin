// pages/login.tsx
import { useState } from 'react';
import Head from 'next/head';
import { FormEvent } from 'react';
import Image from 'next/image';
import loginjirehlogo from "../../public/assets/login-page-jirehlogo.png"
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";

import styles from '../styles/login.module.css'
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    // You can send the data to an API or backend for authentication here
    console.log('Logging in with:', { email, password });

    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <>
      <div className={` ${styles.login_page_bg} container-fluid`}>
        <Head>
          <title>Login Page</title>
          <meta name="description" content="Login page for our application" />
        </Head>
        <div className={`${styles.login_page_main_cont} align-items-center`}>


          <div className={`row justify-content-center align-items-center `}>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-7">
              <div className={styles.login_container}>
                <div className={styles.jireh_lg_lgn}>
                  <Image src={loginjirehlogo} alt="" className='img-fluid' />
                </div>
                <h4 className={styles.lgn_txt}>Login</h4>
                {/* <p>Sign into your account</p> */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form className={styles.lgn_fm} onSubmit={handleSubmit}>
                  <div className={styles.input_group}>
                    <label htmlFor="email">Username</label>
                    <div className={styles.input_with_icon}>
                    <div className={styles.lg_inpt_icn_ct}> <MdOutlineMailOutline className={styles.input_icon} />   {/* Icon before input */}</div>

                    
                    <input
                      type="email"
                      id="email"
                      value={email}
                      placeholder='username'
                      onChange={(e) => setEmail(e.target.value)}
                      required

                    />
                    </div>
                  </div>

                  <div className={styles.input_group}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.input_with_icon}>
                      <div className={styles.lg_inpt_icn_ct}>   <FaRegEyeSlash  className={styles.input_icon} /> {/* Icon before input */}</div>
                   
                      <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className={styles.rm_bx}>

                    </div>
                    <div>
                    <p className={styles.rem_txt}>Remember me</p>
                    </div>
                    

                  </div>

                  <button className={styles.lgin_sbt} type="submit">Login</button>

                  {/* <div className="text-center">
                    <p className={styles.rem_txt}>Forgot Password</p>

                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>


    </>
  );
};

export default LoginPage;
