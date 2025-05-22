import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael P.',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'After trying countless products with no results, the personalized hair regrowth treatment from Revitalize MD completely changed my life. I started seeing new growth within just 3 months.',
    rating: 5,
    location: 'New York, NY'
  },
  {
    name: 'Sarah L.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'The weight management program is the real deal. The medical supervision made all the difference - I\'ve lost 35 pounds in 6 months and kept it off for the first time in my life.',
    rating: 5,
    location: 'Los Angeles, CA'
  },
  {
    name: 'David W.',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'I was skeptical at first, but the results speak for themselves. My hairline has stopped receding and I\'m seeing thicker growth all over. The difference in my confidence is immeasurable.',
    rating: 4,
    location: 'Chicago, IL'
  },
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="section bg-charcoal-50 overflow-hidden">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Real People, Real Results</h2>
          <p className="section-subtitle">
            Hear from our clients who've experienced the transformative power of our treatments.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="flex overflow-hidden">
            <motion.div 
              className="flex w-full"
              initial={false}
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex-shrink-0">
                      <div className="rounded-xl overflow-hidden aspect-square">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={`${i < testimonial.rating ? 'text-peach-500 fill-peach-500' : 'text-charcoal-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-charcoal-700 italic mb-4">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-semibold text-charcoal-800">{testimonial.name}</p>
                        <p className="text-charcoal-500 text-sm">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button 
              onClick={prevTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-charcoal-50 transition-colors -ml-3"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="text-charcoal-700" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button 
              onClick={nextTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-charcoal-50 transition-colors -mr-3"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="text-charcoal-700" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? 'bg-midnight-600' : 'bg-charcoal-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;