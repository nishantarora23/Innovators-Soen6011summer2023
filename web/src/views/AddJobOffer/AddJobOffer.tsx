import { Card, Grid } from '@mui/material';
import AddJobOfferForm from '../../components/EmployerDashboard/AddJobOfferForm';
import { useMemo, useState } from 'react';
import img from '../../assets/logo.png';
import './AddJobOffer.scss';
import MenuBar from '../../components/MenuBar/MenuBar';
import { injectIntl } from 'react-intl';

type Props = {
    intl: any;
};

const AddJobOffer = ({ intl }: Props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const addJobOffer = useMemo(() => {
    return [<AddJobOfferForm formData={formData} setFormData={setFormData}/>];
  }, [formData]);

  return (
    <>
        <Grid container direction="column" className="login-container">
        <Card style={{ marginTop: '35px', padding: '10px 40px' }}>
            {addJobOffer}
        </Card>
        
        </Grid>
    </>
  );
};

export default injectIntl(AddJobOffer);
