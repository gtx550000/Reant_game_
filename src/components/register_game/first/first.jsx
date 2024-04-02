import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import "../../text/a-box.css";
import {
  useDataReg,
  DataRegContext,
} from "../../contextprovider/register_provider";

export default function FormPropsTextFields() {
  const {
    namegame,
    videourl,
    category,
    price,
    releaseDate,
    imageurl,
    description,
    setNamegame,
    setVideourl,
    setCategory,
    setPrice,
    setreleaseDate,
    setImageurl,
    setDescription,
  } = useDataReg(DataRegContext);

  const [imageLinks, setImageLinks] = useState(imageurl || []); // Initialize imageLinks state with imageurl value from context

  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value);
    // Update context value
  };

  const handleImageLinkUpload = (event) => {
    const link = event.target.value.trim();
    if (link !== "") {
      setImageLinks((prevLinks) => [...prevLinks, link]);
      setImageurl([...imageLinks, link]); // Update context value
      event.target.value = ""; // Clear input field after adding the link
    }
  };

  const handleResetImageLinks = () => {
    setImageLinks([]);
    setImageurl([]); // Update context value
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="a-box" style={{ marginLeft: "0%" }}>
        <h2>
          <a>Detail Game</a>
        </h2>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Required Title Game"
            variant="outlined"
            value={namegame} // Set value from context
            onChange={(e) => setNamegame(e.target.value)} // Update context value
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Required Video URL"
            variant="outlined"
            value={videourl} // Set value from context
            onChange={(e) => setVideourl(e.target.value)} // Update context value
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value={"Action"}>Action</MenuItem>
              <MenuItem value={"Horror"}>Horror</MenuItem>
              <MenuItem value={"Rpg"}>Rpg</MenuItem>
              <MenuItem value={"Racing"}>Racing</MenuItem>
              <MenuItem value={"Cooking"}>Cooking</MenuItem>
              <MenuItem value={"Story"}>Story</MenuItem>
              <MenuItem value={"Adventure"}>Adventure</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            type="number"
            label="Required Rates THB"
            defaultValue={price} // Set value from context
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)} // Update context value
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              fullWidth
              inputVariant="outlined"
              label="Release Date"
              value={releaseDate} // Set value from context
              onChange={(date) => setreleaseDate(date)} // Update context value
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <div className="a-box" style={{ marginLeft: "0%" }}>
        <h2>
          <a>Image Selection</a>
        </h2>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Enter Image URL"
            variant="outlined"
            onBlur={handleImageLinkUpload}
          />
          <Button
            variant="contained"
            sx={{ margin: "10px" }}
            color="success"
            onClick={handleImageLinkUpload}
          >
            OK
          </Button>
          <Button
            variant="contained"
            onClick={handleResetImageLinks}
            color="error"
          >
            Reset Image
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div
            style={{
              width: "100%",
              height: "200px",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {imageLinks.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "whitesmoke",
                }}
              >
                Please enter image URLs
              </div>
            )}
            {imageLinks.map((link, index) => (
              <img
                key={index}
                src={link}
                alt={`Uploaded Image ${index}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "inline-block",
                  marginRight: "10px",
                }}
              />
            ))}
          </div>
        </Grid>
      </Grid>

      <div className="a-box" style={{ marginLeft: "0%" }}>
        <h2>
          <a>Description</a>
        </h2>
      </div>
      <Box mt={2} p={2} component={Paper}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          variant="outlined"
          value={description} // Set value from context
          onChange={(e) => setDescription(e.target.value)} // Update context value
        />
      </Box>
    </Box>
  );
}
