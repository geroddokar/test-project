import { Button } from "@/components/ui/button";
import { uploadUsersFile } from "@/services/file.service";
import { useRef, useState } from "react";




interface UploadBtnProps {
    onUploadEnd: (value:boolean) => void
}

export default function UploadFile({onUploadEnd}: UploadBtnProps) {
    const [isUploading, setIsUploading] = useState(false)
    const inputFile = useRef<HTMLInputElement | null>(null)

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try{
            const file = event.target.files?.[0] as File;
            setIsUploading(true);
            const data = new FormData()
            data.set("file", file);
            const res = await uploadUsersFile(data);
            onUploadEnd(true);
            setIsUploading(false);
            if (inputFile.current) {
                inputFile.current.value = ""; // Очистка input
            }
        }catch(e) {
            if (inputFile.current) {
                inputFile.current.value = ""; // Очистка input
            }
            console.log(e)
            setIsUploading(false);
        }
       
      };


    return (
        <div className="flexbasis-xs">
            <Button onClick={()=> inputFile.current?.click()}>
                {isUploading? "Завантажую...." : "Завантажити файл XLSX"}</Button>
            <input ref={inputFile} type="file" id="xlsxFile" className="invisible" onChange={onChange}/>
        </div>
        
      )
}