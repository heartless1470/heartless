const questions = [
  {
    question: "What is the difference between a refresh and a redesign?",
    answer: "A refresh improves a website with a sound structure. A redesign revisits the customer journey, page structure, messaging, visual system, and technical build together. I recommend the lighter option when it can achieve the goal.",
  },
  {
    question: "How is a custom business system priced?",
    answer: "Discovery is US$100 / J$15,000 and is credited toward an approved build. After mapping the workflow, users, data, integrations, and security needs, you receive a scoped proposal. Systems start at US$1,500 / J$230,000 with no preset maximum.",
  },
  {
    question: "Are the JMD prices converted automatically?",
    answer: "No. The displayed USD and JMD amounts are fixed reference prices. Your proposal states the agreed billing currency and total; there is no silent exchange-rate conversion.",
  },
  {
    question: "Do I need a native mobile app?",
    answer: "Usually not. A responsive private web app is easier to access and maintain across computers, tablets, and phones. Native apps are recommended when offline work, phone-specific features, or device integrations make them necessary.",
  },
  {
    question: "What happens after launch?",
    answer: "Every proposal defines handover and included post-launch support. Ongoing Website Care can cover updates, monitoring, content assistance, performance checks, and planned improvements under a separate monthly scope.",
  },
];

export default function FAQ() {
  return (
    <section className="section-frame section-block faq-section" id="faq">
      <div className="section-heading centered-heading">
        <p className="eyebrow">Straight answers</p>
        <h2>Before we start.</h2>
      </div>
      <div className="faq-list">
        {questions.map((item) => (
          <details key={item.question}>
            <summary>{item.question}<span aria-hidden="true">+</span></summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
