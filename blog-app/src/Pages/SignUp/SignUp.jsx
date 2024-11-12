import styles from './Signup.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from '../../../firebase'
// import { IoMdPerson } from 'react-icons/io';
// import { HiOutlineMail } from 'react-icons/hi';
// import { FaLock } from 'react-icons/fa6';
// import Navcomp from '../Nav1/Navcomp';
// import Footer from '../Footer/Footer';
const auth = getAuth(app);

function SignUp() {
    const [fname, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [passwordError, setPasswordError] = useState(false); 
    const navigate = useNavigate();
  
    const handleCloseError = () => {
      setRegistrationStatus(null);
    };
  
    const handlePasswordChange = (e) => {
      const enteredPassword = e.target.value;
      setPassword(enteredPassword);
      if (enteredPassword.length < 6) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    };
  
    const createUser = async (e) => {
      e.preventDefault();
      if (password.length < 6) {
        setPasswordError(true); 
        setRegistrationStatus('error');
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setRegistrationStatus('ok');
      } catch (error) {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          setRegistrationStatus('error');
        } else {
          setRegistrationStatus('error');
        }
      }
    };
  
    const openLoginComp = () => {
      navigate('/login');
    };
  
    return (
      <div className={styles.upper}>
        {/* <Navcomp /> */}
        {registrationStatus === 'error' && (
          <div className={styles.errorMessage}>
            <p>Registration failed. User already exists or password is too short.</p>
            <button
              type="button"
              className={styles.closeErrorBtn}
              onClick={handleCloseError}
            >
              Close
            </button>
          </div>
        )}
        {registrationStatus === 'ok' ? (
          <div className={styles.successMessage}>
            <p>Registration Successful! You can now log in.</p>
            <button className={styles.loginBtn} onClick={openLoginComp}>
              Log In
            </button>
          </div>
        ) : (
          <div className={styles.main}>
            <div className={styles.heading}>
              Sign Up
              <div className={styles.underline}></div>
            </div>
            <form onSubmit={createUser}>
              <div className={styles.inputs}>
                <div className={styles.name}>
                  <IoMdPerson className={styles.icon} />
                  <input
                    type="text"
                    placeholder="Name"
                    className={styles.fields}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.name}>
                  {/* <HiOutlineMail className={styles.icon} /> */}
                  <input
                    type="email"
                    placeholder="Email Id"
                    className={styles.fields}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.name}>
                  <FaLock className={styles.icon} />
                  <input
                    type="password"
                    placeholder="Password"
                    className={styles.fields}
                    onChange={handlePasswordChange} 
                    required
                  />
                  {passwordError && <p className={styles.password}>Password should be at least 6 characters long.</p>}
                </div>
              </div>
              <div className={styles.member}>
                Already Registered{' '} ?  
                <span className={styles.login} onClick={openLoginComp}>
                  Log In
                </span>
              </div>
              <button type="submit" className={styles.btn}>
                Sign Up
              </button>
            </form>
          </div>
        )}
        {/* <Footer /> */}
      </div>
    );
  }

export default SignUp;