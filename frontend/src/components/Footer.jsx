import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-gray-100 via-white to-gray-200 text-gray-700 mt-20 shadow-inner border-t">
  <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
    {/* Branding */}
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Job <span className="text-[#F83002]">Portal</span>
      </h1>
      <p className="text-sm text-gray-600">
        Your one-stop destination for dream jobs. Search, Apply, and Get Hired!
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Quick Links</h2>
      <ul className="space-y-2 text-sm">
        <li><Link to="/" className="hover:text-red-500">Home</Link></li>
        <li><Link to="/jobs" className="hover:text-red-500">Jobs</Link></li>
        <li><Link to="/about" className="hover:text-red-500">About</Link></li>
        <li><Link to="/contact" className="hover:text-red-500">Contact</Link></li>
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Resources</h2>
      <ul className="space-y-2 text-sm">
        <li><Link to="/blog" className="hover:text-red-500">Blog</Link></li>
        <li><Link to="/faq" className="hover:text-red-500">FAQs</Link></li>
        <li><Link to="/privacy" className="hover:text-red-500">Privacy Policy</Link></li>
        <li><Link to="/terms" className="hover:text-red-500">Terms & Conditions</Link></li>
      </ul>
    </div>

    {/* Social Media */}
    <div>
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Follow Us</h2>
      <div className="flex space-x-4 mt-2">
        <a href="#"><Facebook className="w-5 h-5 hover:text-red-500" /></a>
        <a href="#"><Twitter className="w-5 h-5 hover:text-red-500" /></a>
        <a href="#"><Instagram className="w-5 h-5 hover:text-red-500" /></a>
        <a href="#"><Linkedin className="w-5 h-5 hover:text-red-500" /></a>
      </div>
    </div>
  </div>

  <div className="text-center text-sm py-4 border-t border-gray-300 bg-white bg-opacity-50">
    © {new Date().getFullYear()} Job Portal. All rights reserved.
  </div>
</footer>

  );
};

export default Footer;
