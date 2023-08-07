import React, {  Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children,isAdmin }) => {
    const {loading, isAuthenticated,user } = useSelector((state) => state.user);

    if(!loading && isAuthenticated === false){
        return <Navigate to="/login"/>;
    }
    if(isAdmin === true && user.role !== "admin"){
      return <Navigate to="/login" />;
    }
  return (
    <Fragment>
        {loading === false ? children : null}
    </Fragment>
  );
};

export default ProtectedRoute