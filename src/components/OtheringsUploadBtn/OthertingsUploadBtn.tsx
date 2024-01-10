import toast from "react-hot-toast";
import { UploadDropzone } from "~/utils/uploadthing";
import { Progress } from "../ui/progress";
import { useState } from "react";

type OtherThingsUploadBtnPropsType = {
  onUploadCompleteCallback: (url: string | undefined) => void;
};
export default function OtherThingsUploadBtn({
  onUploadCompleteCallback,
}: OtherThingsUploadBtnPropsType) {
  // const { mutate } = api.media.addImageUrl.useMutation();

  const [progess, setProgress] = useState(0);

  return (
    <div className="flex flex-col items-center justify-between border-2 border-gray-300 p-2">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
          toast.success("Upload Completed");
          onUploadCompleteCallback(res[0]?.url);
        }}
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
