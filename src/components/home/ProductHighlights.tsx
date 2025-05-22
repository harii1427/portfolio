import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const productCategories = [
  {
    title: 'Hair Treatment Kits',
    description: 'Clinically proven formulations to restore hair growth and prevent further loss.',
    image: 'https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '/products?category=hair'
  },
  {
    title: 'Weight Loss Plans',
    description: 'Medical-grade solutions including semaglutide pens and supplement kits for effective weight management.',
    image: 'https://images.pexels.com/photos/4098228/pexels-photo-4098228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '/products?category=weight'
  }
];

const ProductHighlights: React.FC = () => {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Our Premium Solutions
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our medical-grade treatments designed for lasting results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {productCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg h-96"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal-900 z-10"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${category.image}')` }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                <h3 className="text-2xl font-playfair font-semibold mb-3">{category.title}</h3>
                <p className="text-white/80 mb-4 max-w-md">{category.description}</p>
                <Link 
                  to={category.link}
                  className="inline-flex items-center text-mint-400 hover:text-mint-300 font-medium"
                >
                  Shop Now <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;