import { useState } from "react";
import "./gyik-page.scss";

import GYIKData from "./gyik.json";

export default function GYIKPage() {
  const QuestionAccordion = ({ question, children }) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(true);

    return (
      <div>
        <div
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className={`question-accordion ${
            isAccordionOpen ? "open" : ""
          } box-shadow-border`}
        >
          <h2 className="question">{question}</h2>
          <span>{isAccordionOpen ? "-" : "+"}</span>
        </div>
        <div className={`answer ${isAccordionOpen ? "open" : ""}`}>
          <div className="answer-container">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="gyikpage">
      {GYIKData.map((item) => {
        return (
          <QuestionAccordion key={item.id} question={item.question}>
            {item.answer}
          </QuestionAccordion>
        );
      })}
    </div>
  );
}
