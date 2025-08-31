import { pool } from "../../../../lib/db.js";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

async function saveFile(file) {
  if (!(file instanceof File)) {
    throw new Error("Uploaded file is invalid");
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "schoolImages");
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = `schoolImages/${Date.now()}-${file.name}`;
    const fullPath = path.join(process.cwd(), "public", filePath);

    await fs.writeFile(fullPath, buffer);
    return `/${filePath}`;
  } catch (error) {
    throw error;
  }
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}