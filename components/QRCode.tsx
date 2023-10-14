import QRCodeReact from "qrcode.react";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon, LineShareButton, LineIcon, TelegramShareButton, TelegramIcon } from "next-share";
import { FilmEntity } from "@/graphql/generated";
import { getClientFilmDetailUrlById } from '@/lib';


interface IQRCodeProps {
  url: string; // Prop to pass the data for the QR code
}
interface ShareQRCodeProps {
  data: FilmEntity; // Prop to pass the data for the QR code
}

export const QRCode = ({ url }: IQRCodeProps) => {
  return (
    <div>
      <QRCodeReact
        value={url} // Use the 'data' prop as the value for the QR code
        size={300}
        fgColor="#91754D"

        imageSettings={{
          src: "https://res.cloudinary.com/drh6sa2x5/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1697222868/logo_acsbip.jpg?_s=public-apps",
          excavate: true,
          width: 64,
          height: 64
        }}
      />
    </div>
  );
};

export const ShareQRCode = ({ data }: ShareQRCodeProps) => {
  const url = getClientFilmDetailUrlById(data.id);
  const shareQuote = `${data.name} - ${data.description}`; 

  return (
    <div className="align-center flex flex-col justify-center align-center">
      <div className="self-center">
        <QRCode
          url={url}
        />
      </div>

      <div className="flex flex-row mt-8 justify-center">
        <div className="w-1/4 flex items-center justify-center">
          <FacebookShareButton
            url={url}
            quote={shareQuote} // Set the share quote
            hashtag="#filmatron"
          >
            <FacebookIcon size={48} round />
          </FacebookShareButton>
        </div>

        <div className="w-1/4 flex items-center justify-center">
          <TelegramShareButton
            url={url}
            title={shareQuote} // Set the share title
          >
            <TelegramIcon size={48} round />
          </TelegramShareButton>
        </div>

        <div className="w-1/4 flex items-center justify-center">
          <TwitterShareButton
            url={url}
            title={shareQuote} // Set the share title
          >
            <TwitterIcon size={48} round />
          </TwitterShareButton>
        </div>

        <div className="w-1/4 flex items-center justify-center">
          <EmailShareButton
            url={url}
            subject="Next Share"
            body="body"
          >
            <EmailIcon size={48} round />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};
