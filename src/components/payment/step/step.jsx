import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import First from "../first/first";
import Second from "../Second/Second";
import Third from "../third/third";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Instance, { refreshPage } from "../../../axios_main";
import { useData, DataContext } from "../../contextprovider/provider";
import { useNavigate } from "react-router";
const steps = ["Select Bank settings", "Qr code Payment", "Arrangement"];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const { choice, setChoice, gameIds, setOrder } = useData(DataContext);
  const navigate = useNavigate();
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    toast.warn("🤧  Let me check on that.");
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = async () => {
    refreshPage();
    let response;
    try {
      if (choice === "cart") {
        response = await Instance.post("/bill/cart");
      } else if (choice === "game") {
        const request = { gameId: gameIds };
        response = await Instance.post("/bill/", request);
        setChoice("");
      }

      setOrder(response.data);
      toast.success("🦄 Enjoy your playing");
      navigate("/bill");
    } catch (error) {
      toast.error("payment method invalid");
      console.log(error);
    }
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && <First />}
            {activeStep === 1 && <Second />}
            {activeStep === 2 && <Third />}
            {/*<Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography>*/}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <div>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
              </div>

              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep != 2 && (
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
              )}
              {activeStep == 2 &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    <div>Step {activeStep + 1} already completed</div>
                  </Typography>
                ) : (
                  <div>
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                    <ToastContainer />
                  </div>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
