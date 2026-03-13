// src/pages/TermsOfService.js
import React from 'react';
import './LegalPages.css';

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: November 2024</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using FashionStore, you accept and agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2>2. Use of Service</h2>
          <p>You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Use the service in any way that violates applicable laws or regulations</li>
            <li>Impersonate or attempt to impersonate the company or another user</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
            <li>Use any automated system to access the service</li>
          </ul>
        </section>

        <section>
          <h2>3. Account Registration</h2>
          <p>
            To access certain features, you may be required to create an account. You are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
            <li>Providing accurate and complete information</li>
          </ul>
        </section>

        <section>
          <h2>4. Products and Pricing</h2>
          <p>
            All products are subject to availability. We reserve the right to:
          </p>
          <ul>
            <li>Modify or discontinue products without notice</li>
            <li>Limit quantities purchased per person or order</li>
            <li>Refuse or cancel orders at our discretion</li>
            <li>Correct pricing errors</li>
          </ul>
          <p>
            Prices are subject to change without notice. The price charged will be the price displayed at the time of order.
          </p>
        </section>

        <section>
          <h2>5. Orders and Payment</h2>
          <p>
            By placing an order, you agree to:
          </p>
          <ul>
            <li>Provide current, complete, and accurate purchase information</li>
            <li>Pay all charges at the prices in effect when incurred</li>
            <li>Pay applicable taxes</li>
          </ul>
          <p>
            We accept payment through Stripe. All payment information is processed securely.
          </p>
        </section>

        <section>
          <h2>6. Shipping and Delivery</h2>
          <p>
            We aim to process and ship orders promptly. However:
          </p>
          <ul>
            <li>Delivery times are estimates and not guaranteed</li>
            <li>We are not responsible for delays caused by shipping carriers</li>
            <li>Risk of loss passes to you upon delivery to the carrier</li>
          </ul>
        </section>

        <section>
          <h2>7. Returns and Refunds</h2>
          <p>
            We offer a 30-day return policy for most items. To be eligible for a return:
          </p>
          <ul>
            <li>Items must be unused and in original condition</li>
            <li>Items must be in original packaging</li>
            <li>Proof of purchase is required</li>
          </ul>
          <p>
            Refunds will be processed to the original payment method within 5-10 business days.
          </p>
        </section>

        <section>
          <h2>8. Intellectual Property</h2>
          <p>
            All content on this site, including text, graphics, logos, images, and software, is the property of
            FashionStore and is protected by copyright and trademark laws. You may not reproduce, distribute,
            or create derivative works without our express written permission.
          </p>
        </section>

        <section>
          <h2>9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, FashionStore shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising out of or relating to your use of the service.
          </p>
        </section>

        <section>
          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United States,
            without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of any material changes
            by posting the new Terms on this page. Your continued use of the service after such changes constitutes
            acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2>12. Contact Information</h2>
          <p>
            For questions about these Terms, please contact us at:
          </p>
          <ul>
            <li>Email: legal@fashionstore.com</li>
            <li>Phone: +1 (234) 567-8900</li>
            <li>Address: 123 Fashion Street, New York, NY 10001</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
