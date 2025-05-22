import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'hair' | 'weight';
  description: string;
  price: number;
  image: string;
  popular: boolean;
}

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "Treatments | Revitalize MD";

    // Get category from URL if present
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setActiveCategory(category);
    }

    // Simulate fetching products
    setProducts([
      {
        id: 'hair-1',
        name: 'Advanced Hair Restoration Kit',
        category: 'hair',
        description: 'Complete treatment system with prescription-strength minoxidil, finasteride, and nutrient supplements.',
        price: 129.99,
        image: 'https://images.pexels.com/photos/3735649/pexels-photo-3735649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        popular: true
      },
      {
        id: 'hair-2',
        name: 'Targeted Regrowth Formula',
        category: 'hair',
        description: 'Concentrated serum designed for specific areas experiencing thinning or recession.',
        price: 89.99,
        image: 'https://images.pexels.com/photos/8469409/pexels-photo-8469409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        popular: false
      },
      {
        id: 'hair-3',
        name: 'Hair Wellness Supplement',
        category: 'hair',
        description: 'Premium blend of biotin, saw palmetto, and essential nutrients to strengthen hair from within.',
        price: 49.99,
        image: 'https://images.pexels.com/photos/7615453/pexels-photo-7615453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        popular: false
      },
      {
        id: 'weight-1',
        name: 'Medical Weight Management Program',
        category: 'weight',
        description: 'Comprehensive program including prescription semaglutide, nutritional guidance, and progress tracking.',
        price: 199.99,
        image: 'https://images.pexels.com/photos/8175154/pexels-photo-8175154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        popular: true
      },
      {
        id: 'weight-2',
        name: 'Metabolic Support Supplement',
        category: 'weight',
        description: 'Clinically formulated supplement to boost metabolism and support healthy weight management.',
        price: 69.99,
        image: 'https://images.pexels.com/photos/4397833/pexels-photo-4397833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        popular: false
      },
      {
        id: 'weight-3',
        name: 'Appetite Control System',
        category: 'weight',
        description: 'Medical-grade appetite suppressant with supportive supplements for reduced cravings.',
        price: 89.99,
        image: 'https://images.pexels.com/photos/8844569/pexels-photo-8844569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        popular: false
      }
    ]);
  }, []);

  const filteredProducts = activeCategory 
    ? products.filter(product => product.category === activeCategory)
    : products;

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
            Our Treatments
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our medical-grade solutions for hair restoration and weight management, all backed by science and personalized for your needs.
          </motion.p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          {/* Category filters */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg p-1 bg-charcoal-100">
              <button
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === null 
                    ? 'bg-white text-charcoal-800 shadow-sm' 
                    : 'text-charcoal-600 hover:text-charcoal-800'
                }`}
                onClick={() => setActiveCategory(null)}
              >
                All Treatments
              </button>
              <button
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === 'hair' 
                    ? 'bg-white text-charcoal-800 shadow-sm' 
                    : 'text-charcoal-600 hover:text-charcoal-800'
                }`}
                onClick={() => setActiveCategory('hair')}
              >
                Hair Restoration
              </button>
              <button
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === 'weight' 
                    ? 'bg-white text-charcoal-800 shadow-sm' 
                    : 'text-charcoal-600 hover:text-charcoal-800'
                }`}
                onClick={() => setActiveCategory('weight')}
              >
                Weight Management
              </button>
            </div>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                className="card h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="relative">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  {product.popular && (
                    <div className="absolute top-4 right-4 bg-peach-500 text-white text-sm font-medium py-1 px-3 rounded-full">
                      Popular
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-charcoal-800">
                      {product.name}
                    </h3>
                    <button className="text-charcoal-400 hover:text-rose-500 transition-colors">
                      <Heart size={20} />
                    </button>
                  </div>
                  <p className="text-charcoal-600 mb-4 flex-grow">
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-semibold text-midnight-700">
                        ${product.price}
                      </span>
                      <span className="text-sm text-charcoal-500">
                        Monthly subscription
                      </span>
                    </div>
                    <Link 
                      to={`/products/${product.id}`}
                      className="block w-full btn btn-primary text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-charcoal-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="bg-gradient-to-r from-midnight-700 to-forest-700 text-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-4">
                Not Sure Which Treatment Is Right For You?
              </h2>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                Take our personalized quiz to get a customized recommendation based on your specific needs and medical history.
              </p>
              <Link to="/quiz" className="btn bg-white text-midnight-700 hover:bg-charcoal-100 shadow-lg hover:shadow-xl">
                Take the Quiz
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;