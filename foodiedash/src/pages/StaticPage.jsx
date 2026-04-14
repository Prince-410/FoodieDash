import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function StaticPage() {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const title = path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');

  let content = [];
  if (path === 'about') {
    content = [
      "We are FoodieDash, dedicated to connecting you with the best restaurants in your area.",
      "Our mission is to ensure every meal is delivered hot, fresh, and exactly how you want it.",
      "Founded in 2024, our premium service relies on an elite network of delivery partners."
    ];
  } else if (path === 'privacy') {
    content = [
      "Your privacy is critically important to us.",
      "We only store the data we need to process your orders, such as your delivery address, name, and contact details.",
      "We never share your personal information with third-parties without your explicit permission."
    ];
  } else if (path === 'terms') {
    content = [
      "By using FoodieDash, you agree to our Terms of Service.",
      "1. You must be at least 18 years old to use this service.",
      "2. Delivery times are estimates and may vary based on weather and traffic.",
      "3. All payments are processed securely. Refunds are evaluated per case."
    ];
  } else if (path === 'careers') {
    content = [
      "Join the FoodieDash team!",
      "We are always looking for passionate engineers, designers, and delivery partners.",
      "Check out our open positions on LinkedIn or drop us a message via the Contact Us page."
    ];
  } else if (path === 'blog') {
    content = [
      "Welcome to the FoodieDash Blog.",
      "Here we share our favorite recipes, behind-the-scenes engineering stories, and highlights from our top-rated restaurants."
    ];
  } else if (path === 'press') {
    content = [
      "Press & Media",
      "For media inquiries, please reach out to press@foodiedash.com.",
      "Find our brand assets, logos, and official press releases below."
    ];
  } else if (path === 'help') {
    content = [
      "Welcome to the Help Center",
      "Having an issue with an order? Need a refund? Visit our FAQ section or contact support.",
      "Our customer support team is available 24/7."
    ];
  } else {
    content = ["Content is currently being updated. Please check back later!"];
  }

  return (
    <div className="page-wrapper" style={{ padding: '40px 20px', minHeight: '60vh' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title" style={{ fontSize: 36, marginBottom: 24, textAlign: 'center' }}>
            {title}
          </h1>
          <div className="glass-card" style={{ padding: 40, lineHeight: 1.8 }}>
            {content.map((para, i) => (
              <p key={i} style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
