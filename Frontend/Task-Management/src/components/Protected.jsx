import { Navigate, useNavigate } from "react-router-dom";

  
  const Protected = ({ children }) => {
    const navigate = useNavigate();

    if (!localStorage.getItem('user')) {
        return <Navigate to="/login" />;
        // return navigate('/login');
    }
    return children;
};

export default Protected;