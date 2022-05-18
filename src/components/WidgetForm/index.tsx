import React, { useState } from "react";
import { CloseButton } from "../CloseButton"
import bugImageUrl from '../../assets/images/bug.svg';
import ideaImageUrl from '../../assets/images/idea.svg';
import thoughtImageUrl from '../../assets/images/thought.svg';
import { FeedbackTypesSteps } from "./steps/FeedbackTypeSteps";
import { FeedbackContentStep } from "./steps/FeedbackContentStep";
import { FeedbackSucessSteps } from "./steps/FeedbackSucessSteps";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'imagem de um balão de pensamento'
    }
  }
};

export type FeedbackType = keyof typeof feedbackTypes

export const WidgetForm = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, SetfeedbackSent] = useState(false)

  const handleRestartFeedback = () => {
    SetfeedbackSent(false)
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      {feedbackSent ? (
        <FeedbackSucessSteps onFeedbackRestartRequested={handleRestartFeedback}/>
      ) : (
        <>
          {!feedbackType ?
            (<FeedbackTypesSteps onFeedbackTypeChange={setFeedbackType} />)
            : (
              <FeedbackContentStep
                feedbackType={feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={() => SetfeedbackSent(true)}
              />
            )
          }
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela Rocketseat
      </footer>
    </div>
  )
}
