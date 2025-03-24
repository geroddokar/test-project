import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import {User} from "@/types/user.type"
import { createAllItems } from "@/services/db.service";
const REQUIRED_COLUMNS = ["ID", "Name", "Email", "Created At"];

export async function POST(req: NextRequest) {
    try{
        const data = await req.formData();
        const file: File|null = data.get("file") as unknown as File
        if (!file) {
            return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
        }
        // 2️⃣ Читаем содержимое файла как Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 3️⃣ Определяем формат файла
        const fileName = file.name.toLowerCase();
        let jsonData: any[];
        if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
            const workbook = XLSX.read(buffer, { type: "buffer" });
            const sheetName = workbook.SheetNames[0];
            jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) as any[]; 
        } else {
        return NextResponse.json({ error: "Неподдерживаемый формат файла" }, { status: 400 });
        }
        // 4️⃣ Проверяем структуру данных
        if (!Array.isArray(jsonData) || jsonData.length === 0) {
        return NextResponse.json({ error: "Файл не содержит данных" }, { status: 400 });
        }

        const headers = Object.keys(jsonData[0]);
        const missingColumns = REQUIRED_COLUMNS.filter(col => !headers.includes(col));

        if (missingColumns.length > 0) {
            return NextResponse.json({ error: `Отсутствуют столбцы: ${missingColumns.join(", ")}` }, { status: 400 });
        }
        const transformedData: User[] = jsonData.map(item => ({
            id: item["ID"],
            user_name: item["Name"],
            email: item["Email"],
            create_at: item["Created At"],
          }));
        return createAllItems(transformedData);
    } catch(e) {
        console.log(e)
        return NextResponse.json({
            error: "Internal Error"
        }, {status: 500})
    }

}