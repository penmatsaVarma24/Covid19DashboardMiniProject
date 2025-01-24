import './index.css'

const FaqItem = props => {
  const {faqDetails} = props
  const {answer, question} = faqDetails
  return (
    <li className="faq-list-item">
      <p className="question">{question}</p>
      <p className="answer">{answer}</p>
    </li>
  )
}

export default FaqItem
