import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4" style={{
            fontFamily: 'Fredoka One, cursive'
          }}>
              EverythingEnglish
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              © 2025 Jerry Kurian (EverythingEnglish). All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">For support, email: everythingenglishedu@gmail.com</p>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-gray-300 hover:text-white transition-colors">
                  Practice
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">Business</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-300 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <a href="mailto:everythingenglishedu@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="mailto:everythingenglishedu@gmail.com?subject=Partnership Inquiry" className="text-gray-300 hover:text-white transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-300 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">Built with ❤️ for English learners around the globe</p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;