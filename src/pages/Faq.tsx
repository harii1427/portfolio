import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const faqData: FaqItem[] = [
    {
      question: "How do I know which treatment is right for me?",
      answer: "Our personalized quiz takes into account your specific concerns, medical history, and goals to recommend the most effective treatment plan for you. All recommendations are reviewed by our medical team before being prescribed.",
      category: "general"
    },
    {
      question: "Are your treatments FDA-approved?",
      answer: "Yes, all our prescription medications are FDA-approved for their prescribed use. Our supplement formulations contain ingredients that are generally recognized as safe (GRAS) by the FDA.",
      category: "general"
    },
    {
      question: "How soon will I see results?",
      answer: "Results vary by individual and treatment. For hair treatments, initial results are typically visible within 3-4 months, with full results after 6-12 months of consistent use. Weight management programs often show results within the first month.",
      category: "results"
    },
    {
      question: "Do I need to see a doctor in person?",
      answer: "No, our telemedicine platform allows you to consult with our licensed medical providers remotely. They'll review your medical history, photos, and concerns to create a personalized treatment plan.",
      category: "process"
    },
    {
      question: "What if the treatment doesn't work for me?",
      answer: "We offer a 90-day satisfaction guarantee. If you don't see results within 90 days of consistent use, contact our medical team for a treatment adjustment or refund.",
      category: "results"
    },
    {
      question: "How often will I receive my medication?",
      answer: "Most treatments are delivered on a monthly basis, but frequency can be adjusted based on your preferences and medication type. You can manage your delivery schedule through your online dashboard.",
      category: "process"
    },
    {
      question: "Are there any side effects?",
      answer: "Potential side effects vary by treatment and are fully disclosed during your consultation. Our medical team carefully considers your health history to minimize risks, and we provide ongoing support to address any concerns.",
      category: "safety"
    },
    {
      question: "Is my medical information kept private?",
      answer: "Absolutely. We adhere to strict HIPAA compliance guidelines and use enterprise-grade encryption to protect your personal and medical information. We never share your information with third parties without your explicit consent.",
      category: "safety"
    },
    {
      question: "Can I combine multiple treatments?",
      answer: "In many cases, yes. Our medical team will evaluate the safety and efficacy of combining treatments based on your specific needs and health profile.",
      category: "general"
    },
    {
      question: "How do I cancel or modify my subscription?",
      answer: "You can manage your subscription through your online dashboard or by contacting our customer support team. There are no cancellation fees, and you can pause or modify your plan at any time.",
      category: "process"
    }
  ];

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "process", name: "Process" },
    { id: "results", name: "Results" },
    { id: "safety", name: "Safety" }
  ];

  const filteredFaqs = activeCategory === "all" 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "FAQ | Revitalize MD";
  }, []);

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-midnight-700 to-forest-700">
        <div className="container-custom text-white">
          <motion.h1 
            className="text-4xl md:text-5xl font-playfair font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find answers to common questions about our treatments, process, and results.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-10">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-midnight-600 text-white'
                      : 'bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-200'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  className="border border-charcoal-200 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <button
                    className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-charcoal-50 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-charcoal-800">{faq.question}</span>
                    {activeIndex === index ? 
                      <ChevronUp size={20} className="text-midnight-600" /> : 
                      <ChevronDown size={20} className="text-charcoal-500" />
                    }
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 bg-white border-t border-charcoal-100">
                          <p className="text-charcoal-600">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-charcoal-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-midnight-100 p-3 rounded-full">
                  <MessageCircle size={32} className="text-midnight-600" />
                </div>
              </div>
              <h2 className="text-2xl font-playfair font-semibold text-charcoal-800 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-charcoal-600 mb-6">
                Our support team is available 7 days a week to help you with any questions you may have about our treatments or process.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="mailto:support@revitalizemd.com" className="btn btn-primary">
                  Email Us
                </a>
                <a href="tel:+18005551234" className="btn btn-secondary">
                  Call (800) 555-1234
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;