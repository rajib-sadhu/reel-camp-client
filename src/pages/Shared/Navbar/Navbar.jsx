import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../../Layout/Main";
import { FaSun, FaMoon } from 'react-icons/fa';
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useEnrollCart from "../../../hooks/useEnrollCart";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";

const Navbar = () => {

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const navigate = useNavigate();

    const { user, logOut } = useAuth();
    const { ETheme, setETheme } = useContext(ThemeContext);

    const [enrollCart] = useEnrollCart();

    const totalPrice = enrollCart.reduce((sum, obj) => sum + obj.price, 0);


    const links = <>
        <li><Link to={`/`} >Home</Link></li>
        <li><Link to={`/allClasses`} >Classes</Link></li>
        <li><Link to={`/allInstructors`} >Instructors</Link></li>
        {isAdmin ? <li><Link to={`/dashboard/allUsers`} >Dashboard</Link></li>
            :
            isInstructor ? <li><Link to={`/dashboard/myClass`} >Dashboard</Link></li>
                :
                user &&
                <li><Link to={`/dashboard/selectClasses`} >Dashboard</Link></li>
        }
        <li> <button onClick={() => setETheme(!ETheme)}>Theme {ETheme ? <FaSun></FaSun> : <FaMoon></FaMoon>}</button> </li>
    </>

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate('/');
                Swal.fire({
                    icon: 'success',
                    title: `${user?.email} -  Logout`,
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log('User Logout')
            })
            .catch((err) => console.log(err))
    }


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <Link to={`/`} className="btn btn-ghost normal-case text-xl">
                    <img className="w-6" src="https://i.ibb.co/4mPr5vP/fav-icon.png" alt="" />
                    Reel Camp</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    !user?.email ?
                        <Link to="/signIn">
                            <button className="btn" >Login</button>
                        </Link>
                        :
                        <div className="flex-none">
                            {
                                isAdmin || isInstructor ||
                                <div className="dropdown dropdown-end ">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                                        <div className="indicator">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                            <span className="badge badge-sm indicator-item">
                                                {enrollCart.length || 0}
                                            </span>
                                        </div>
                                    </label>
                                    <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                                        <div className="card-body">
                                            <span className="font-bold text-lg"> {enrollCart.length || 0} Classes</span>
                                            <span className="text-info">Subtotal: ${totalPrice.toFixed(2) || 0}</span>
                                            <div className="card-actions">
                                                <Link to="/dashboard/selectClasses" className="btn btn-primary btn-block">View enroll cart</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="dropdown dropdown-end" title={user?.displayName}>
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL || 'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png'} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className="m-2 text-center">{user?.displayName} </li>
                                    <li className="m-2 text-center">{user?.email} </li>
                                    <li><button className="btn btn-sm" onClick={handleLogout} >Logout</button></li>
                                </ul>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;