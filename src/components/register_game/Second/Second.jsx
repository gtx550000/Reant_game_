import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../second/second.css";

export default function FormPropsTextFields1() {
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="rsponsive">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "25ch",
            bottom: "-1.5ch ",
            "@media (max-width: 550px)": {
              width: "100%",
              width: "100%",
              right: "auto",
            },
          },
        }}
        /*style={{ padding: "30px 30px 30px 5px" }}*/
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Required Discount"
            defaultValue=""
          />

          <TextField
            required
            id="outlined-required"
            label="Required URL Video"
            defaultValue=""
          />

          <FormControl
            sx={{
              m: 1,
              width: "25ch",
              bottom: "-1.5ch ",
              "@media (max-width: 550px)": {
                width: "100%",
                width: "100%",
                right: "auto",
              },
            }}
            size="big"
          >
            <InputLabel id="demo-simple-select-label">
              Required Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>FPS</MenuItem>
              <MenuItem value={20}>RPG</MenuItem>
              <MenuItem value={30}>18+</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
    </div>
  );
}
