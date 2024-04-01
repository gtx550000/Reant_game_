import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "../text/a-box.css";
import "../report/report.css";
import { toast } from "react-toastify";
import Instance from "../../axios_main";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "System crash",
  "System cannot log in.",
  "System cannot purchase products.",

  "Paid and did not receive the product",
  "Qr code payment system not showing",

  "The content is too violent.",
  "Content about sexism",

  "Email not available",
  "Unable to change password",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function BasicTextFields() {
  const [age, setAge] = React.useState("System error");

  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event.target.value);
  }; /** */

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]); // Details
  const [comment, setComment] = React.useState();
  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeComment = (event) => {
    setComment(event.target.value);
    console.log(event.target.value);
  };

  const setTimeout = async () => {
    try {
      const requestData = {
        problemType: age,
        details: personName.join(","),
        comment: comment,
      };

      const response = Instance.post("/user/report", requestData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="body_report">
      <div className="container-report">
        <div className="a-box" style={{ marginLeft: "0" }}>
          <h2>
            <a>Report</a>
          </h2>
        </div>

        <div className="form-control-report">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Problem type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"System error"}>System error</MenuItem>
              <MenuItem value={"Payment error"}>Payment error</MenuItem>
              <MenuItem value={"Inappropriate games"}>
                Inappropriate games
              </MenuItem>
              <MenuItem value={"Unable to access account"}>
                Unable to access account
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="form-control-report">
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Details</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange1}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="form-control-report">
          <TextField
            fullWidth
            label="Comment"
            id="outlined-basic"
            variant="outlined"
            value={comment}
            onChange={handleChangeComment}
          />
        </div>

        <div className="form-control-report ">
          <Stack direction="row" spacing={1}>
            {/** <Button variant="contained" color="error">
              Cancel
            </Button>*/}
            <div className="button-report">
              <Button
                /**/ onClick={setTimeout}
                variant="contained"
                color="success"
                type="submit"
              >
                <a>Success</a>
              </Button>
            </div>
          </Stack>
        </div>
      </div>

      {/** <div>
        <Model isOpen={visible} className="fix_position-report">
          <div className="">
            <h1 className="">Thanks for reporting.</h1>
          </div>
          <div className="">
            <Button
              onClick={() => setvisible(false)}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
          </div>
        </Model>
      </div>*/}
    </div>
  );
}
