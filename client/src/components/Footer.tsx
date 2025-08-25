import { 
  Mountain, 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Globe,
  Users,
  Camera,
  Award
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: "Explore Places", href: "/places" },
    { label: "Local Food", href: "/food" },
    { label: "Traditions", href: "/traditions" },
    { label: "Travel Guide", href: "/guide" }
  ];

  const supportLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: "https://facebook.com", 
      label: "Facebook",
      hoverColor: "hover:text-blue-400"
    },
    { 
      icon: Instagram, 
      href: "https://instagram.com", 
      label: "Instagram",
      hoverColor: "hover:text-pink-400"
    },
    { 
      icon: Twitter, 
      href: "https://twitter.com", 
      label: "Twitter",
      hoverColor: "hover:text-sky-400"
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Mountain className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Heart className="h-2 w-2 text-yellow-800" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ghumda <span className="text-pink-400">Ghumdai</span>
                </h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Explore Nepal</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              {t('footer.description') || "Discover Nepal's hidden treasures, authentic cuisines, and rich cultural traditions through the eyes of local explorers."}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <Globe className="h-5 w-5 mr-2 text-pink-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-pink-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-pink-400" />
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-pink-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-pink-400" />
                <span className="text-sm">info.ghumdaghumdai@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-pink-400" />
                <span className="text-sm">+977-1-234-5678</span>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="h-4 w-4 mr-3 mt-0.5 text-pink-400 flex-shrink-0" />
                <span className="text-sm">Kathmandu, Nepal</span>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Stay Connected</h4>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">Get travel tips and hidden gems delivered to your inbox.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-r-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Follow our journey</p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`p-3 bg-white/10 rounded-lg ${social.hoverColor} transition-all duration-200 hover:bg-white/20 hover:scale-110 border border-white/10 hover:border-white/30`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* App Download */}
            <div className="space-y-3">
              <p className="text-sm text-gray-400">Download our app</p>
              <div className="flex flex-col space-y-2">
                <div className="px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-center text-sm text-gray-300 hover:bg-white/20 transition-all cursor-pointer">
                  📱 Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© 2024 Ghumda</span>
              <span className="text-pink-400">Ghumdai</span>
              <span>•</span>
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>by</span>
              <span className="font-semibold text-white">Team Sanothimi</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400">🇳🇵 Proudly from Nepal</span>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Award className="h-4 w-4" />
                <span className="text-gray-400">Tourism Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
    </footer>
  );
};