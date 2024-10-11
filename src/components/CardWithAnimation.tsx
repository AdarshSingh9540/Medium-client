import { motion } from 'framer-motion';
import { FileText, Share2, Users } from 'lucide-react';
import { AnimatedBeamMultipleOutputDemo } from './AnitmatedBeam';

export default function CardWithAnimation() {
  return (
    <div className='bg-white rounded-2xl shadow-2xl overflow-hidden py-10'>
      <div className="py-12">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <p className="text-indigo-600 font-semibold tracking-wide uppercase">
            How We Can Help
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Enhance Your Blogging Experience
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From AI-Generated Content to SEO-Optimized Templates, our platform empowers you to create, manage, and grow your blog with ease.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 px-4 sm:px-6 lg:px-[10rem] py-4"
      >
        <div className="flex-1">
          <AnimatedBeamMultipleOutputDemo />
        </div>

        <div className="flex flex-col space-y-10 flex-1 lg:py-[4rem]">
          {[
            {
              icon: <FileText className="w-8 h-8 text-slate-800" />,
              title: 'AI-Powered Content Generation',
              description: 'Generate high-quality blog content effortlessly using our AI-powered writing tool.',
            },
            {
              icon: <Users className="w-8 h-8 text-slate-800" />,
              title: 'Customizable Blog Templates',
              description: 'Choose from a variety of blog templates tailored to different niches and industries.',
            },
            {
              icon: <Share2 className="w-8 h-8 text-slate-800" />,
              title: 'Effortless Sharing with Friends',
              description: 'Once your AI-generated blog is complete, share it with friends and your audience via social media or email, all from within the platform.',
            },
          ].map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">{feature.icon}</div>
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-indigo-900">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
