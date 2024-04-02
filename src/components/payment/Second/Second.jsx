import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useData, DataProvider } from "../../contextprovider/provider";
import { useState, useEffect } from "react";
import Instance, { refreshPage } from "../../../axios_main";
import "../Second/second.css";
import data from "../../jsonfile/bank.json";
import QRCode from "react-qr-code";
import { CardMedia } from "@mui/material";
import "../first/banks.css";
import "../first/first.css";

export default function IntroDivider() {
  const { choice, gameIds } = useData(DataProvider);
  const [QrCodeUrl, setQrcodeurl] = useState("tutorend.com");
  const { bank } = useData(DataProvider);

  useEffect(() => {
    refreshPage();
    const fetchData = async () => {
      try {
        let response;
        if (choice === "cart") {
          response = await Instance.get("/payment/");
        } else if (choice === "game" && gameIds !== 0) {
          response = await Instance.get(`/payment/game/${gameIds}`);
        }
        const qrCodeText = response.data;
        setQrcodeurl(qrCodeText);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [choice, gameIds]);

  return (
    <div style={{ padding: "1rem" }}>
      <Card sx={{ maxWidth: 350, margin: "auto" }}>
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "2rem",
              marginTop: "2rem",
            }}
          >
            <i
              style={{ marginRight: "10px", fontSize: "24px" }}
              className={data["bank"]
                .map((item) => (item.name === bank ? item.img : null))
                .filter((className) => className !== null)
                .join(" ")}
            ></i>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {bank} 0771307566
            </Typography>
          </div>
          <div style={{ textAlign: "center" }}>
            <CardMedia
              component="img"
              height="100"
              image={"https://secure1.zimple.cloud/images/thai_qr_payment.png"}
              alt={"qrcode"}
            />
            <QRCode value={QrCodeUrl} style={{ padding: "2rem" }} />
            <Typography variant="h5" component="div" gutterBottom>
              QR Code Generator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Paste scan Qr code Payment
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
