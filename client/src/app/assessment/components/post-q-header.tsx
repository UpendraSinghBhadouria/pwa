import { Icons } from "@/components/icons"

type PostQHeaderProps = {
  score?: number
  isAbaHappy?: boolean
  answerStatus?: "correct" | "default" | "wrong"
}

const InCorrectAnswer = ({}: PostQHeaderProps) => (
  <div className="flex gap-2 flex-col">
    <p className="text-lg">Oops, that’s okay!</p>
    <p className="text-3xl font-medium">Lets move on</p>
  </div>
)

const CorrectAnswer = ({
  isAbaHappy,
  score,
  answerStatus,
}: PostQHeaderProps) => {
  const emotionManager = {
    correct: "Woohoo you scored",
    default: "Your ran out of time",
    wrong: "Oops, that’s okay!",
  }

  return (
    <div className="flex gap-2 flex-col">
      <p className="text-lg">
        {
          emotionManager[
            (answerStatus as keyof typeof emotionManager) || "default"
          ]
        }
      </p>
      <div className="text-medium-aquamarine">
        {isAbaHappy ? (
          <div className="text-3xl font-medium text-medium-aquamarine flex items-center gap-2">
            <Icons.scoreStar />
            <p>
              <span className="mr-1">{score}</span>
              stars
            </p>
          </div>
        ) : (
          <p className="text-[28px] font-medium text-white">Lets move on</p>
        )}
      </div>
    </div>
  )
}

const PostQHeader = ({ ...rest }: PostQHeaderProps) => {
  const isAnswerCorrect = rest?.score !== 0

  return (
    <>
      {isAnswerCorrect ? (
        <CorrectAnswer {...rest} />
      ) : (
        <InCorrectAnswer {...rest} />
      )}
    </>
  )
}

export default PostQHeader
