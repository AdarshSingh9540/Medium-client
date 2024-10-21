import {  Instagram, Twitter, Facebook, Linkedin, Mail } from 'lucide-react'
 
export default function Footer() {
  return (
    <footer 
    // style={{
    //     backgroundColor: "#6c33a3", 
    //     backgroundImage: "linear-gradient(316deg, #6c33a3 0%, #8241b8 74%)"
    //   }}
    className=" text-white py-16 bg-[#1f2937] ">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row justify-between  lg:px-[5rem] gap-8">
        <div className="mb-8 md:mb-0">
          <h3 className="text-2xl font-bold mb-4">IndiBlog</h3>
          <p className="text-purple-200">Empowering bloggers with AI-driven tools and insights.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-purple-300 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
          <div className="mt-4 flex items-center">
            <Mail size={20} className="mr-2" />
            <a href="mailto:info@blogwave.com" className="hover:text-purple-300 transition-colors">info@IndiBlog.com</a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-600 text-center text-white">
        <p>&copy; 2024 IndiBlog. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}
