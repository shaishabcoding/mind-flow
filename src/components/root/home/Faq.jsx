const Faq = () => {
  const faqs = [
    {
      question: "What types of yoga products do you offer?",
      answer:
        "We offer a wide range of yoga products, including yoga mats, blocks, straps, clothing, and eco-friendly accessories to enhance your practice.",
    },
    {
      question: "Are the yoga mats eco-friendly?",
      answer:
        "Yes, our yoga mats are made from eco-friendly and non-toxic materials, ensuring a sustainable and safe experience for your practice.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "We offer free shipping on orders above $50. For orders below this amount, a standard shipping fee applies.",
    },
    {
      question: "Can I return or exchange a product?",
      answer:
        "Yes, we have a 30-day return and exchange policy. Products must be unused and in their original packaging for a successful return or exchange.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept payments through credit cards, debit cards, PayPal, UPI, and net banking. Cash on delivery is also available for select locations.",
    },
    {
      question: "Do you offer discounts for bulk purchases?",
      answer:
        "Yes, we provide special discounts for bulk purchases. Please contact our support team for more details on bulk orders and pricing.",
    },
    {
      question: "How can I clean my yoga mat?",
      answer:
        "Our yoga mats can be easily cleaned using a damp cloth and mild soap. Avoid using harsh chemicals, and let the mat air dry completely before rolling it up.",
    },
    {
      question: "Are your yoga products suitable for beginners?",
      answer:
        "Absolutely! Our products are designed to cater to all skill levels, from beginners to advanced practitioners. Each product includes usage instructions to help you get started.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping charges and delivery times will apply depending on your location.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking link via email or SMS. You can use the link to track your order in real time.",
    },
  ];

  return (
    <div className="px-4 lg:px-0 mb-4 md:mb-10">
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        FAQ
      </h2>
      <div className="join join-vertical w-full">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="collapse collapse-arrow join-item border border-base-300 dark:bg-gray-600 dark:text-white dark:border-gray-400"
          >
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              {faq.question}
            </div>
            <div className="collapse-content text-gray-700 dark:text-gray-300">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
