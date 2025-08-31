import { pool } from "../../../../lib/db";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

async function saveFile(file) {
  if (!(file instanceof File)) {
    throw new Error("Uploaded file is invalid");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = `schoolImages/${Date.now()}-${file.name}`;
  const fullPath = path.join(process.cwd(), "public", filePath);

  await fs.writeFile(fullPath, buffer);
  return `/${filePath}`;
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const file = formData.get("image");

    if (!name || !address || !city || !state || !contact || !email_id || !file) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Invalid file upload" }, { status: 400 });
    }

    const imagePath = await saveFile(file);

    const [result] = await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imagePath, email_id]
    );

    return NextResponse.json({ message: "School added successfully!", id: result.insertId });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
