import { motion } from 'framer-motion';
import { FileText, Share2, Users } from 'lucide-react';
import { AnimatedBeamMultipleOutputDemo } from './AnitmatedBeam';

const features = [
  {
    icon: <FileText className="w-8 h-8 text-purple-600" />,
    title: 'AI-Powered Content Generation',
    description: 'Generate high-quality blog content effortlessly using our AI-powered writing tool.',
  },
  {
    icon: <Users className="w-8 h-8 text-purple-600" />,
    title: 'Customizable Blog Templates',
    description: 'Choose from a variety of blog templates tailored to different niches and industries.',
  },
  {
    icon: <Share2 className="w-8 h-8 text-purple-600" />,
    title: 'Effortless Sharing with Friends',
    description: 'Once your AI-generated blog is complete, share it with friends and your audience via social media or email, all from within the platform.',
  },
];

export default function CardWithAnimation() {
  return (
    <div className='bg-gradient-to-b from-white to-purple-50 rounded-3xl shadow-2xl overflow-hidden py-16'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-purple-600 font-semibold tracking-wide uppercase">
            How We Can Help
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Enhance Your Blogging Experience
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            From AI-Generated Content to SEO-Optimized Templates, our platform empowers you to create, manage, and grow your blog with ease.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-col lg:flex-row items-center space-y-12 lg:space-y-0 lg:space-x-12"
        >
          <div className="flex-1 w-full max-w-xl">
            <AnimatedBeamMultipleOutputDemo />
          </div>

          <div className="flex flex-col space-y-12 flex-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 p-3 bg-purple-100 rounded-full">
                  {feature.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}