import { feedbackTypes } from ".."
import { FeedbackType } from ".."
import {CloseButton} from '../../CloseButton'

interface feedbackTypesSetProps {
  onFeedbackTypeChange: (type: FeedbackType) => void
}

export const FeedbackTypesSteps = ({ onFeedbackTypeChange }: feedbackTypesSetProps) => {
  return (
    <>
      <header>
        <CloseButton />
        <span className="text-xl leading-6 text-white">Deixe seu feedback</span>
      </header>
      <div className="flex py-8 gap-2 w-full">

        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
              onClick={() => onFeedbackTypeChange(key as FeedbackType)}
              type="button"
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span className="text-white">{value.title}</span>
            </button>
          )

        })}
      </div>
    </>
  )
}