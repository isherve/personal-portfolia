"""Prepare profile photo: transparent background only, preserve natural colors."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
ORIGINAL = ROOT / "public/profile/hervin-original.png"
OUTPUT = ROOT / "public/profile/hervin-profile.png"


def remove_background(data: np.ndarray) -> np.ndarray:
    rgb = data[:, :, :3]
    corners = np.vstack(
        [
            rgb[4:28, 4:28].reshape(-1, 3),
            rgb[4:28, -28:-4].reshape(-1, 3),
            rgb[-28:-4, 4:28].reshape(-1, 3),
            rgb[-28:-4, -28:-4].reshape(-1, 3),
        ]
    )
    bg = np.median(corners, axis=0)
    diff = np.linalg.norm(rgb - bg, axis=2)

    alpha = np.zeros_like(diff)
    alpha[diff < 28] = 0
    soft = (diff >= 28) & (diff < 48)
    alpha[soft] = np.clip((diff[soft] - 28) / 20 * 255, 0, 255)
    alpha[diff >= 48] = 255

    alpha_img = Image.fromarray(alpha.astype(np.uint8), mode="L")
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=1))
    data[:, :, 3] = np.array(alpha_img, dtype=np.float32)
    return data


def main() -> None:
    src = ORIGINAL if ORIGINAL.exists() else OUTPUT
    img = Image.open(src).convert("RGBA")
    data = np.array(img, dtype=np.float32)
    data = remove_background(data)

    out = Image.fromarray(data.astype(np.uint8), mode="RGBA")
    if out.getbbox():
        out = out.crop(out.getbbox())
    out.save(OUTPUT, optimize=True)
    print(f"Wrote {OUTPUT} size={out.size} bytes={OUTPUT.stat().st_size}")


if __name__ == "__main__":
    main()
