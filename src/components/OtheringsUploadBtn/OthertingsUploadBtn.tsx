import toast from "react-hot-toast";
import { UploadDropzone } from "~/utils/uploadthing";
import { Progress } from "../ui/progress";
import { useState } from "react";

type OtherThingsUploadBtnPropsType = {
  onUploadCompleteCallback: (
    url: string | undefined,
    fileId: string | undefined,
  ) => void;
  isUploading: (isUploadingState: boolean) => void;
};
export default function OtherThingsUploadBtn({
  onUploadCompleteCallback,
  isUploading,
}: OtherThingsUploadBtnPropsType) {
  const [progess, setProgress] = useState(0);

  return (
    <div className="flex flex-col items-center justify-between border-2 border-gray-300 p-2">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          // console.log("Files: ", res);
          toast.success("Upload Completed");
          isUploading(false);
          onUploadCompleteCallback(res[0]?.url, res[0]?.key);
        }}
        onUploadBegin={() => isUploading(true)}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
          toast.error("Upload Error");
        }}
        config={{ mode: "manual" }}
        appearance={{ button: "bg-red-200 p-2", container: "bg-green-200" }}
        content={{
          button: (e) => (e.isUploading ? "Uploading" : "Upload"),
        }}
        onUploadProgress={(e) => setProgress(e)}
      />
      <Progress value={progess} className="mt-2 w-[100%]" />
    </div>
  );
}
