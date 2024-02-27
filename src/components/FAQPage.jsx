import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item border border-gray-200 mb-5 rounded-lg">
      <button
        className="faq-question bg-gray-100 p-4 font-semibold text-lg w-full flex items-center justify-between focus:outline-none"
        onClick={toggleAnswer}
      >
        {question}
        <span className="text-base font-bold">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="faq-answer p-4">
          <p className="text-white">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  return (
    <section className="bg-primary">
      <div className="flex flex-col items-center justify-center lg:py-6 md:px-6 text-center py-8 bg-opacity-50">
        <h1 className="text-6xl text-secondary font-semibold mb-4">Frequently Asked Questions</h1>
        <p className="text-white text-lg">Have a question? Find answers to commonly asked questions here.</p>
      </div>

      <div className="container mx-auto px-4 ">
        <FAQItem
          question="How do i get started?"
          answer="all my fellas all my fellas du du du du du all my fellas du du du du du all my fellas all my fellas du du du du du all my fellas du du du du du all my fellas all my fellas du du du du du all my fellas du du du du du GET STARTED silly"
        />
        <FAQItem
          question="What is the best route?"
          answer="Not always the fastest one - Ya boy Ammar"
        />
        {/* Add more FAQItems as needed */}
      </div>
    </section>
  );
};

export default FAQPage;