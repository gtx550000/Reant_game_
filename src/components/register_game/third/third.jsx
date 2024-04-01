import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';

export default function CheckboxLabels() {
  return (
    <FormGroup
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      style={{ padding: '30px 30px 30px 30px' }}
      noValidate
      autoComplete="off"
    >
      <FormLabel>indenture</FormLabel>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="The website will have the right to delete the game and will check it first. If it is inappropriate, it will be deleted immediately."
      />
      <FormControlLabel
        required
        control={<Checkbox />}
        label="If your game violates the sales contract with the website. The website will request immediate removal of privileges."
      />
      <FormControlLabel
        required
        control={<Checkbox />}
        label="Your game will take approximately 1-2 days to request verification."
      />
      <FormControlLabel
        required
        control={<Checkbox />}
        label="If your game is based on real people The website will not be affected."
      />
    </FormGroup>
  );
}
