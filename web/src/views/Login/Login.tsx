import { Card, Grid } from '@mui/material';
import LoginForm from '../../components/Login/LoginForm';
import { useMemo, useState } from 'react';
import img from '../../assets/logo.png';
import './Login.scss';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const loginPage = useMemo(() => {
    return [<LoginForm formData={formData} setFormData={setFormData} />];
  }, [formData]);

  return (
    <Grid container direction="column" className="login-container">
      <Card style={{ marginTop: '35px', marginLeft: '210px', padding: '10px 40px' }}>
        <img src={img} className="logo" height="280" width="350" />
        {loginPage}
      </Card>
    </Grid>
  );
};

export default Login;
