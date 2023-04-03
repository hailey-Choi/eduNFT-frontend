import AnswerCard from "../components/AnswerCard";
import questions from "../questions.json";

export default function Quiz(props) {
  const question = questions.geography[0].question;
  const answers = questions.geography[0].answers;
  const correctAnswer = questions.geography[0].correctAnswer;

  return (
    <div className="pt-6 pb-2 mx-5">
      <p className="font-bold text-xl mb-2">Quiz</p>
      <p>{question}</p>
      <div>
        <AnswerCard
          answers={answers}
          onClick={(answer) => {
            answer == correctAnswer
              ? props.onClick(true)
              : props.onClick(false);
          }}
        />
      </div>
    </div>
  );
}
