import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, ChevronDown, ChevronUp, Star, CheckCircle, AlertCircle, Heart 
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'hair' | 'weight';
  fullDescription: string;
  price: number;
  image: string;
  ingredients: string[];
  howItWorks: string;
  scientificProof: string;
  reviews: Array<{
    name: string;
    rating: number;
    comment: string;
  }>;
}

const productData: Record<string, Product> = {
  'hair-1': {
    id: 'hair-1',
    name: 'Advanced Hair Restoration Kit',
    category: 'hair',
    fullDescription: 'Our most comprehensive hair restoration system combines FDA-approved medications with cutting-edge formulations to target hair loss from multiple angles. This all-in-one kit includes prescription-strength minoxidil solution, finasteride tablets, and a proprietary blend of essential nutrients to promote hair growth, prevent further loss, and improve overall hair health.',
    price: 129.99,
    image: 'https://images.pexels.com/photos/3735649/pexels-photo-3735649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ingredients: [
      'Minoxidil 5% (topical solution)',
      'Finasteride 1mg (oral tablet)',
      'Biotin Complex (vitamin supplement)',
      'Saw Palmetto Extract',
      'DHT-Blocking Proprietary Blend',
      'Ketoconazole Shampoo'
    ],
    howItWorks: 'This system works through multiple mechanisms to combat hair loss. Minoxidil increases blood flow to hair follicles and prolongs the growth phase. Finasteride blocks DHT, the hormone responsible for male pattern baldness. Our nutrient complex provides essential vitamins and minerals that strengthen hair from within, while our specialized shampoo removes buildup and creates an optimal scalp environment for new growth.',
    scientificProof: 'Clinical studies show that the combination of minoxidil and finasteride is more effective than either treatment alone. In a 12-month study, 94% of participants using this combination therapy showed decreased hair loss, while 83% demonstrated moderate to significant regrowth. Our proprietary nutrient blend has been shown in laboratory testing to improve hair strength by up to 35%.',
    reviews: [
      {
        name: 'Michael P.',
        rating: 5,
        comment: 'After trying countless products with no results, this kit completely changed my life. I started seeing new growth within just 3 months.'
      },
      {
        name: 'David W.',
        rating: 4,
        comment: 'I was skeptical at first, but the results speak for themselves. My hairline has stopped receding and I\'m seeing thicker growth all over.'
      },
      {
        name: 'James K.',
        rating: 5,
        comment: 'Worth every penny. The online consultation made it easy to get the prescription components, and the whole system works seamlessly together.'
      }
    ]
  },
  'weight-1': {
    id: 'weight-1',
    name: 'Medical Weight Management Program',
    category: 'weight',
    fullDescription: 'Our physician-supervised weight management program offers a medically sound approach to sustainable weight loss. The program includes prescription semaglutide injections, which regulate appetite and blood sugar levels, combined with personalized nutritional guidance, behavior modification support, and detailed progress tracking to help you achieve meaningful, lasting results.',
    price: 199.99,
    image: 'https://images.pexels.com/photos/8175154/pexels-photo-8175154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ingredients: [
      'Semaglutide injection (prescription medication)',
      'Daily vitamin and mineral supplement',
      'Electrolyte support formula',
      'Appetite control blend',
      'Custom meal planning guide',
      'Digital tracking tools'
    ],
    howItWorks: 'Semaglutide works by mimicking a hormone called GLP-1 that targets areas of the brain that regulate appetite and food intake. This leads to reduced hunger and calorie intake. Our program combines this medication with nutritional support, helping your body adjust to dietary changes while maintaining muscle mass and energy levels. The digital tracking component helps monitor progress and allows our medical team to make adjustments to your plan as needed.',
    scientificProof: 'Clinical trials have shown that patients using semaglutide lost an average of 15% of their body weight over 68 weeks. Our comprehensive approach, which adds nutritional and behavioral support, has demonstrated even better outcomes in our internal studies, with patients losing an average of 18-22% of their starting weight when following the complete program for 12 months.',
    reviews: [
      {
        name: 'Sarah L.',
        rating: 5,
        comment: 'This program is the real deal. The medical supervision made all the difference - I\'ve lost 35 pounds in 6 months and kept it off for the first time in my life.'
      },
      {
        name: 'Robert J.',
        rating: 4,
        comment: 'The injection was intimidating at first, but the auto-injector makes it simple and nearly painless. The results are amazing - down 42 pounds so far.'
      },
      {
        name: 'Lisa M.',
        rating: 5,
        comment: 'What I appreciate most is how I don\'t feel like I\'m on a "diet" - the medication controls my hunger so I can make better food choices without feeling deprived.'
      }
    ]
  }
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (id && productData[id]) {
      setProduct(productData[id]);
      // Update document title
      document.title = `${productData[id].name} | Revitalize MD`;
    }
  }, [id]);

  const toggleFaq = (index: number) => {
    if (expandedFaqs.includes(index)) {
      setExpandedFaqs(expandedFaqs.filter(i => i !== index));
    } else {
      setExpandedFaqs([...expandedFaqs, index]);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-charcoal-800 mb-4">Product Not Found</h2>
          <Link to="/products" className="btn btn-primary">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-white">
      <div className="container-custom py-12">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-charcoal-500">
            <Link to="/" className="hover:text-midnight-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-midnight-600">Treatments</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal-700">{product.name}</span>
          </div>
        </div>

        {/* Product overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-charcoal-50 rounded-xl overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Product details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-playfair font-semibold text-charcoal-800 mb-3">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={18} 
                    className="text-peach-500 fill-peach-500 mr-0.5" 
                  />
                ))}
              </div>
              <span className="text-charcoal-500">
                {product.reviews.length} reviews
              </span>
            </div>
            
            <div className="text-2xl font-semibold text-midnight-700 mb-6">
              ${product.price} <span className="text-base font-normal text-charcoal-500">/ month</span>
            </div>
            
            <p className="text-charcoal-700 mb-8">
              {product.fullDescription}
            </p>
            
            <div className="mb-8">
              <div className="flex items-center text-charcoal-700 mb-2">
                <CheckCircle size={18} className="text-forest-600 mr-2" />
                <span>Medical-grade, prescription treatment</span>
              </div>
              <div className="flex items-center text-charcoal-700 mb-2">
                <CheckCircle size={18} className="text-forest-600 mr-2" />
                <span>Online consultation with licensed providers</span>
              </div>
              <div className="flex items-center text-charcoal-700 mb-2">
                <CheckCircle size={18} className="text-forest-600 mr-2" />
                <span>Discreet monthly delivery</span>
              </div>
              <div className="flex items-center text-charcoal-700">
                <CheckCircle size={18} className="text-forest-600 mr-2" />
                <span>Ongoing medical support included</span>
              </div>
            </div>
            
            <div className="flex items-center mb-8">
              <div className="flex items-center border border-charcoal-300 rounded-md">
                <button 
                  className="px-3 py-2 text-charcoal-700 hover:bg-charcoal-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-charcoal-300">
                  {quantity}
                </span>
                <button 
                  className="px-3 py-2 text-charcoal-700 hover:bg-charcoal-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button className="ml-4 flex items-center text-midnight-600 hover:text-midnight-700">
                <Heart size={20} className="mr-1" />
                Save
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary flex-1 flex items-center justify-center">
                <ShoppingCart size={18} className="mr-2" />
                Subscribe Now
              </button>
              <button className="btn btn-secondary flex-1">
                One-Time Purchase
              </button>
            </div>
            
            <div className="mt-6 text-sm text-charcoal-500 bg-charcoal-50 p-4 rounded-lg flex items-start">
              <AlertCircle size={16} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>Requires a brief online medical consultation before purchase. Your answers help our physicians determine if this treatment is appropriate for you.</span>
            </div>
          </motion.div>
        </div>

        {/* Product tabs */}
        <div className="mb-16">
          <div className="border-b border-charcoal-200 mb-8">
            <div className="flex overflow-x-auto">
              {[
                { id: 'description', label: 'What\'s Inside' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'science', label: 'Scientific Proof' },
                { id: 'reviews', label: 'Reviews' }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`px-6 py-4 font-medium whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'text-midnight-600 border-b-2 border-midnight-600' 
                      : 'text-charcoal-600 hover:text-charcoal-800'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-semibold text-charcoal-800 mb-4">Ingredients</h3>
                <ul className="space-y-3 mb-6">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center text-charcoal-700">
                      <CheckCircle size={16} className="text-forest-600 mr-3" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
                <p className="text-charcoal-600">
                  All ingredients are sourced from FDA-approved facilities and meet our rigorous quality standards. Each component has been selected based on clinical evidence of efficacy and safety.
                </p>
              </div>
            )}

            {activeTab === 'how-it-works' && (
              <div>
                <h3 className="text-xl font-semibold text-charcoal-800 mb-4">How It Works</h3>
                <p className="text-charcoal-700 mb-6">
                  {product.howItWorks}
                </p>
                <div className="bg-charcoal-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-charcoal-800 mb-3">Usage Instructions</h4>
                  <p className="text-charcoal-600 mb-4">
                    Your treatment kit includes detailed instructions for use. Generally, this treatment is used as follows:
                  </p>
                  <ul className="space-y-2 text-charcoal-700">
                    <li className="flex items-start">
                      <span className="bg-midnight-100 text-midnight-700 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">1</span>
                      <span>Complete your online medical assessment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-midnight-100 text-midnight-700 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">2</span>
                      <span>Receive your personalized treatment kit</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-midnight-100 text-midnight-700 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">3</span>
                      <span>Follow the enclosed usage calendar and instructions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-midnight-100 text-midnight-700 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">4</span>
                      <span>Track your progress through our app or online portal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-midnight-100 text-midnight-700 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">5</span>
                      <span>Connect with your medical provider for any adjustments</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'science' && (
              <div>
                <h3 className="text-xl font-semibold text-charcoal-800 mb-4">Scientific Evidence</h3>
                <p className="text-charcoal-700 mb-6">
                  {product.scientificProof}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-charcoal-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-charcoal-800 mb-2">Clinical Studies</h4>
                    <p className="text-charcoal-600">
                      Our treatments are based on extensive clinical research and peer-reviewed studies. References to specific studies are available upon request.
                    </p>
                  </div>
                  <div className="bg-charcoal-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-charcoal-800 mb-2">Quality Assurance</h4>
                    <p className="text-charcoal-600">
                      All components of our treatments undergo rigorous quality testing and are manufactured in FDA-approved facilities.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-semibold text-charcoal-800">Customer Reviews</h3>
                  <button className="btn btn-secondary">Write a Review</button>
                </div>

                <div className="space-y-6">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="border-b border-charcoal-100 pb-6 last:border-0">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              size={16} 
                              className={`${
                                star <= review.rating 
                                  ? 'text-peach-500 fill-peach-500' 
                                  : 'text-charcoal-300'
                              } mr-0.5`} 
                            />
                          ))}
                        </div>
                        <span className="font-medium text-charcoal-800">{review.name}</span>
                      </div>
                      <p className="text-charcoal-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-playfair font-semibold text-charcoal-800 mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "How long does it take to see results?",
                answer: `For ${product.category === 'hair' ? 'hair treatments' : 'weight management programs'}, most users begin to notice initial changes within 4-8 weeks of consistent use. Significant, visible results typically develop after 3-6 months of treatment.`
              },
              {
                question: "Are there any side effects?",
                answer: `All medical treatments can have potential side effects. For ${product.category === 'hair' ? 'hair restoration treatments' : 'weight management medications'}, common side effects are generally mild and may include ${product.category === 'hair' ? 'scalp irritation, temporary shedding in the first few weeks, or dryness' : 'nausea, constipation, or fatigue'}. Our medical team will review your medical history to minimize risks and provide guidance on managing any side effects.`
              },
              {
                question: "Is this treatment right for me?",
                answer: "The best way to determine if this treatment is appropriate for you is to complete our online medical consultation. Our licensed providers will review your health history, concerns, and goals to recommend the most suitable options."
              },
              {
                question: "What if I want to cancel my subscription?",
                answer: "You can easily manage your subscription through your online account dashboard. There are no cancellation fees or long-term commitments - you can pause, adjust, or cancel your plan at any time."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="border border-charcoal-200 rounded-lg overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-charcoal-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-charcoal-800">{faq.question}</span>
                  {expandedFaqs.includes(index) ? 
                    <ChevronUp size={20} className="text-midnight-600" /> : 
                    <ChevronDown size={20} className="text-charcoal-500" />
                  }
                </button>
                {expandedFaqs.includes(index) && (
                  <div className="p-6 pt-0 bg-white border-t border-charcoal-100">
                    <p className="text-charcoal-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related products */}
        <div>
          <h2 className="text-2xl font-playfair font-semibold text-charcoal-800 mb-8">
            Related Treatments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={`https://images.pexels.com/photos/${3735649 + item * 100}/pexels-photo-${3735649 + item * 100}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} 
                    alt="Related product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-medium text-charcoal-800 mb-2">
                    {product.category === 'hair' ? 'Hair Growth Supplement' : 'Metabolism Support Formula'} {item}
                  </h3>
                  <p className="text-sm text-charcoal-600 mb-4 flex-grow">
                    {product.category === 'hair' 
                      ? 'Advanced formula to support hair growth and strength from within.' 
                      : 'Clinically-formulated supplements to support healthy metabolism and weight management.'}
                  </p>
                  <div className="mt-auto">
                    <p className="text-midnight-700 font-semibold mb-2">
                      ${49.99 + (item * 10)}
                    </p>
                    <button className="w-full btn btn-secondary text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;