import { CloseButton } from "../../CloseButton"
import { useState } from "react";
import { FeedbackType, feedbackTypes } from '..';
import { ArrowLeft, Camera } from "phosphor-react";
import { ScreenShotButton } from "../ScreenshootButton";


interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}



export const FeedbackContentStep = ({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) => {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComent] = useState('')

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const handleSubmitFeedback = () => {
    console.log({
      comment,
      screenshot
    })
    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button type="button"
          onClick={onFeedbackRestartRequested}
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
          <ArrowLeft weight="bold" className="h-4 w-4" />
        </button>
        <span className="text-white text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="h-8 w-8"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="my-4 w-full"
      >
        <textarea
          className="min-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-white border-zinc-600 bg-transparent rounded-md focus:border-x-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontencendo... "
          onChange={({ target }) => setComent(target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenShotButton onScreenshotTook={setScreenshot} screenshot={screenshot} />
          <button
            type="submit"
            disabled={comment.length === 0}
            onClick={handleSubmitFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex flex-1 justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus: ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover-brand-500"
          >
            Enviar Feedback
          </button>
        </footer>
      </form>
    </>
  )
}