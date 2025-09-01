import { pool } from "../../../../lib/db.js";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload to Cloudinary
async function uploadToCloudinary(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataUri, {
    folder: "schoolImages",
    resource_type: "image",
  });

  return uploadResponse.secure_url;
}

// save locally
async function saveLocally(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "schoolImages");

  await fs.mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.writeFile(filePath, buffer);

  return `/schoolImages/${fileName}`;
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

    // Decide storage based on environment
    let imageUrl;
    if (process.env.NODE_ENV === "production") {
      imageUrl = await uploadToCloudinary(file);
    } else {
      imageUrl = await saveLocally(file);
    }

    // Save school data in DB
    const [result] = await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imageUrl, email_id]
    );

    return NextResponse.json({ message: "School added successfully!", id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
