import { Button } from "@/components/ui/button";
import { uploadUsersFile } from "@/services/file.service";
import { useRef, useState } from "react";
import WaitingDialog from "../WaitingDialog";




interface UploadBtnProps {
    onUploadEnd: (value:boolean) => void
}

export default function UploadFile({onUploadEnd}: UploadBtnProps) {
    const [isUploading, setIsUploading] = useState(false)
    const inputFile = useRef<HTMLInputElement | null>(null)
    const [isWaiting, setIsWaiting] = useState(false);
    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try{
            setIsWaiting(true)
            const file = event.target.files?.[0] as File;
            setIsUploading(true);
            const data = new FormData()
            data.set("file", file);
            const res = await uploadUsersFile(data);
            onUploadEnd(true);
            setIsUploading(false);
            if (inputFile.current) {
                inputFile.current.value = "";
            }
            setIsWaiting(false)
        }catch(e) {
            if (inputFile.current) {
                inputFile.current.value = ""; 
            }
            console.log(e)
            setIsUploading(false);
        }
       
      };


    return (
        <div className="ml-auto">
            <WaitingDialog isOpen={isWaiting}/>
            <Button onClick={()=> inputFile.current?.click()} className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                {isUploading? "Завантажую...." : "Завантажити XLSX"}</Button>
            <input ref={inputFile} type="file" id="xlsxFile" className="hidden" onChange={onChange}/>
        </div>
        
      )
}