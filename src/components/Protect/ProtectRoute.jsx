import { Navigate, Outlet } from 'react-router-dom';

export const ProtectRoute = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <>
    {user ? <Outlet/> :<Navigate to={"/login"}/> }
    </>
  )
}
