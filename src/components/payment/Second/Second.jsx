import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useData, DataProvider } from "../../contextprovider/provider";
import { useState, useEffect } from "react";
import Instance from "../../../axios_main";
import "../Second/second.css";
import data from "../../jsonfile/bank.json";
/**13/3/24 */ import QRCode from "react-qr-code";
import { CardMedia, Paper } from "@mui/material";
import "../first/banks.css";
import "../first/first.css";

export default function IntroDivider() {
  const { choice, gameIds } = useData(DataProvider);
  const [QrCodeUrl, setQrcodeurl] = useState("tutorend.com");
  const { bank } = useData(DataProvider);
  const { imgbank, setImgbank } = useState();

  useEffect(() => {
    const FetchData = async () => {
      if (choice === "cart") {
        try {
          const response = await Instance.get("/payment/");
          const qrCodeText = response.data;
          console.log(qrCodeText);
          setQrcodeurl(qrCodeText);
        } catch (error) {
          console.error(error);
        }
      } else if (choice === "game" && gameIds !== 0) {
        try {
          const response = await Instance.get(`/payment/game/${gameIds}`);
          const qrCodeText = response.data;
          setQrcodeurl(qrCodeText);
        } catch (error) {
          console.error(error);
        }
      }
    };
    FetchData();
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Card sx={{ maxWidth: 300 }}>
        <CardContent style={{ padding: "20px", textAlign: "center" }}>
          <CardContent>
            <i
              className={data["bank"]
                .map((item) => {
                  if (item.name === bank) {
                    return item.img;
                  }
                  return null; // or return ''; if you prefer an empty string
                })
                .filter((className) => className !== null)
                .join(" ")}
            ></i>
            <Typography variant="h6" gutterBottom>
              {bank}
            </Typography>
          </CardContent>
          <CardContent>
            <CardMedia
              component="img"
              height="100"
              image={"https://secure1.zimple.cloud/images/thai_qr_payment.png"}
              alt={"qrcode"}
            />
            <QRCode className="qr" value={QrCodeUrl}></QRCode>
            <Typography gutterBottom variant="h5" component="div">
              <div>QR Code Generator</div>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <div>Paste scan Qr code Payment</div>
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
}
