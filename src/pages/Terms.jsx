import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <div className="max-w-3xl text-gray-700 space-y-4">
        <p>
          Welcome to PawMart! By accessing or using our services, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <h2 className="text-xl font-semibold">1. Use of Services</h2>
        <p>
          You agree to use our platform only for lawful purposes and not for any illegal or unauthorized activities.
        </p>
        <h2 className="text-xl font-semibold">2. Account Responsibilities</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device.
        </p>
        <h2 className="text-xl font-semibold">3. Content</h2>
        <p>
          All content you post must respect the rights of others and comply with applicable laws.
        </p>
        <h2 className="text-xl font-semibold">4. Limitation of Liability</h2>
        <p>
          PawMart is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our services.
        </p>
        <p className="text-sm text-gray-500">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Terms;
