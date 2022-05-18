import { Camera, Trash } from "phosphor-react"
import html2canvas from 'html2canvas'
import { useState } from "react"
import { Loading } from "./Loading"

interface ScreenshootButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

export const ScreenShotButton = ({ onScreenshotTook, screenshot }: ScreenshootButtonProps) => {

  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  const handleTakeScreeshot = async () => {
    setIsTakingScreenshot(true)
    const canvas = await html2canvas(document.querySelector("html")!)
    const base64image = canvas.toDataURL("image/png")
    onScreenshotTook(base64image)
    setIsTakingScreenshot(false)
  }

  if (screenshot) {
    return (
      <button
        type="button"
        onClick={() => onScreenshotTook(null)}
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 100
        }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-color"
      onClick={handleTakeScreeshot}
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}

    </button>
  )
}