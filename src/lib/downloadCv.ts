import html2pdf from "html2pdf.js";
import { CV } from "@/config/profile";

const pdfOptions = {
  margin: [8, 8, 8, 8],
  filename: CV.fileName,
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 2, useCORS: true, logging: false },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  pagebreak: { mode: ["avoid-all", "css", "legacy"] },
};

async function cvFileExists(): Promise<boolean> {
  try {
    const response = await fetch(CV.filePath, { method: "HEAD" });
    if (!response.ok) return false;
    const contentType = response.headers.get("content-type") ?? "";
    return contentType.includes("pdf");
  } catch {
    return false;
  }
}

function getResumeElement(): HTMLElement {
  const element = document.getElementById("resume-document");
  if (!element) {
    throw new Error("Resume document is not ready. Please try again.");
  }
  return element;
}

async function generatePdfBlob(): Promise<Blob> {
  const element = getResumeElement();
  return html2pdf().set(pdfOptions).from(element).outputPdf("blob");
}

/** Generate and save CV PDF from the on-page React resume */
export async function generateCvFromResume(): Promise<void> {
  await html2pdf().set(pdfOptions).from(getResumeElement()).save();
}

/** Open CV PDF in a new browser tab */
export async function viewCvPdf(): Promise<void> {
  const blob = await generatePdfBlob();
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

/**
 * Download CV: uses public/cv/Hervin-ISHIMWE-CV.pdf if a valid PDF is uploaded,
 * otherwise generates a PDF from the React resume on the page.
 */
export async function downloadCv(): Promise<void> {
  if (await cvFileExists()) {
    const link = document.createElement("a");
    link.href = CV.filePath;
    link.download = CV.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  await generateCvFromResume();
}
