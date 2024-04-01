import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";

export default function CheckboxLabels() {
  return (
    <FormGroup
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      style={{ padding: "30px 30px 30px 30px" }}
      noValidate
      autoComplete="off"
    >
      <FormLabel>indenture</FormLabel>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Accept money transfers onto the website."
      />
      <FormControlLabel
        required
        control={<Checkbox />}
        label="If there is a mistake in the financial service on the website, the money will be refunded within 7 days."
      />
      <FormControlLabel
        required
        control={<Checkbox />}
        label="The website does not offer a refund service."
      />
    </FormGroup>
  );
}
