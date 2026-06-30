import { personal } from "@/data/portfolio";
import { publicAsset } from "@/lib/publicAsset";

export const CV = {
  /**
   * Upload your PDF here:
   *   public/cv/Hervin-ISHIMWE-CV.pdf
   *
   * All "Download CV" buttons across the site use this file.
   */
  filePath: publicAsset("/cv/Hervin-ISHIMWE-CV.pdf"),
  fileName: "Hervin-ISHIMWE-CV.pdf",
  uploadPath: "public/cv/Hervin-ISHIMWE-CV.pdf",
  lastUpdated: "June 2026",
  title: "Curriculum Vitae",
} as const;

export const CONTACT = {
  email: personal.email,
  phone: personal.phone,
  location: personal.location,
} as const;

/** Replace with your professional photo at public/profile/hervin-profile.png */
export const PROFILE = {
  image: publicAsset("/profile/hervin-profile.png?v=11"),
  imageAlt: personal.name,
} as const;
