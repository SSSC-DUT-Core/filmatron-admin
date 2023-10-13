import { uploadFile } from "@/lib";
import { useState } from "react";
import { Input } from "./input";

interface FileUploadIInputProps {
  onFieldChange: (event: { target: { value: string } }) => void;
  value?: string
  className?: string
}
function FileUploadInput({
  onFieldChange,
  value,
  className
}: FileUploadIInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string| undefined>(value);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(value)
    const selectedFile = event?.target?.files?.[0];
    if (selectedFile) {
      setLoading(true);
      await uploadFile(selectedFile, (url: string) => {
        setPreviewUrl(url);
        onFieldChange?.({
          target: {
            value: url
          }
        })

        setLoading(false);
      });
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileUpload} className={className} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        previewUrl && (
          <div>
            <img src={previewUrl} alt="Preview" style={{ maxWidth: '400px' }} />
          </div>
        )
      )}
    </div>
  );
}

export default FileUploadInput;