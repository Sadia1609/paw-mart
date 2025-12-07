import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      <div className="text-gray-700 mb-6 text-center space-y-2">
        <p>📞 Phone: +1 (555) 123-4567</p>
        <p>✉️ Email: contact@pawmart.com</p>
      </div>

      <p className="text-gray-700 text-center max-w-xl">
        We'd love to hear from you! Reach out for inquiries, support, or any questions regarding PawMart services.
      </p>
    </div>
  );
};

export default Contact;
