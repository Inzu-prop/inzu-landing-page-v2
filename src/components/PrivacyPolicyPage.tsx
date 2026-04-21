import { motion } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';

const sections = [
  {
    num: '01',
    title: 'Who We Are',
    content: `Inzu Technologies Ltd ("Inzu", "we", "us", or "our") is a property management technology company incorporated in Kenya. We operate the Inzu platform, which provides rent collection, maintenance coordination, and tenant communication services to landlords and property owners.

Our registered address is Nairobi, Kenya. You can reach our data protection contact at: privacy@inzu.co`
  },
  {
    num: '02',
    title: 'What Data We Collect',
    content: `We collect the following categories of personal data:

From landlords: Full name, email address, phone number (including WhatsApp), property portfolio details (unit count, addresses, rental income ranges), payment and banking information, and correspondence records.

From tenants: Full name, phone number (WhatsApp), preferred payment method details (mobile money numbers, card details processed via our payment partners), maintenance requests and associated communications, and tenancy records.

Automatically collected: Device type, browser information, IP address, pages visited, and interaction timestamps when you use our web platform.

We do not collect national ID numbers, passport numbers, or biometric data unless legally required and with explicit consent.`
  },
  {
    num: '03',
    title: 'How We Use Your Data',
    content: `We use your personal data to:

— Process rent payments and provide payment receipts and reconciliation reports
— Send automated rent reminders and payment confirmations via WhatsApp
— Coordinate maintenance requests between tenants and contractors
— Provide landlords with portfolio performance dashboards and financial reporting
— Verify user identity and prevent fraud
— Comply with applicable Kenyan law, including tax and financial regulations
— Improve and develop our platform

Our legal basis for processing is primarily the performance of our service contract with you. Where we send communications, we rely on your consent (which you may withdraw at any time) or our legitimate interest in operating the platform.`
  },
  {
    num: '04',
    title: 'WhatsApp & Third-Party Services',
    content: `Our platform communicates with tenants via WhatsApp Business API. By registering as a tenant on Inzu, you consent to receive transactional messages (rent reminders, payment confirmations, maintenance updates) via WhatsApp on the number you provide.

We use third-party providers for:
— Payment processing (M-Pesa, card processors): governed by their respective privacy policies
— Cloud hosting and infrastructure: servers located within or compliant with Kenyan data residency requirements where applicable
— SMS and messaging services: used for backup communication

We do not sell your personal data to third parties. We share data with service providers only to the extent necessary to deliver our service, under data processing agreements.`
  },
  {
    num: '05',
    title: 'Data Storage & Security',
    content: `Your data is stored on encrypted servers. We implement industry-standard security measures including TLS encryption for data in transit, access controls limiting staff access to personal data on a need-to-know basis, and regular security assessments.

No method of transmission over the internet is 100% secure. While we take all reasonable steps to protect your data, we cannot guarantee absolute security. In the event of a data breach that poses a risk to your rights and freedoms, we will notify the Office of the Data Protection Commissioner (ODPC) within 72 hours and affected individuals without undue delay.`
  },
  {
    num: '06',
    title: 'Your Rights',
    content: `Under the Kenya Data Protection Act, 2019, you have the following rights:

— Right of access: Request a copy of the personal data we hold about you
— Right to rectification: Request correction of inaccurate or incomplete data
— Right to erasure: Request deletion of your data where we no longer have a legal basis to hold it
— Right to restrict processing: Request that we limit how we use your data
— Right to data portability: Receive your data in a structured, machine-readable format
— Right to object: Object to processing based on legitimate interests
— Right to withdraw consent: Where processing is based on consent, withdraw it at any time without affecting prior processing

To exercise any of these rights, contact us at privacy@inzu.co. We will respond within 21 days. You also have the right to lodge a complaint with the Office of the Data Protection Commissioner (ODPC) at www.odpc.go.ke.`
  },
  {
    num: '07',
    title: 'Data Retention',
    content: `We retain personal data for as long as necessary to provide our services and comply with our legal obligations:

— Active account data: Retained for the duration of your relationship with Inzu
— Financial and payment records: Retained for 7 years in accordance with Kenyan tax and financial regulations
— Maintenance and tenancy records: Retained for 3 years after the end of a tenancy
— Marketing consent data: Retained until you withdraw consent

When data is no longer needed, we securely delete or anonymise it.`
  },
  {
    num: '08',
    title: 'Contact & Complaints',
    content: `For any privacy-related queries, to exercise your rights, or to raise a concern:

Email: privacy@inzu.co
Post: Data Protection Officer, Inzu Technologies Ltd, Nairobi, Kenya

If you are not satisfied with our response, you have the right to complain to the Office of the Data Protection Commissioner (ODPC):
Website: www.odpc.go.ke
Phone: +254 20 231 0591

This policy was last updated: March 2026.`
  },
];

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-ivory">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-obsidian min-h-[40vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(106,125,110,0.12),transparent_70%)]" />
        <div className="container-custom relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-body font-medium tracking-[0.2em] text-sage uppercase mb-6 block"
          >
            LEGAL
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-silk leading-[1.0] mb-6"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-body font-light text-silk/40 text-sm tracking-widest uppercase"
          >
            Last updated: March 2026 · Governed by Kenya Data Protection Act, 2019
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-ivory">
        <div className="container-custom max-w-4xl">
          <div className="flex flex-col divide-y divide-forest/8">
            {sections.map((section) => (
              <div key={section.num} className="py-12 flex items-start gap-8">
                <span className="text-[11px] font-body font-medium tracking-[0.2em] text-sage/40 uppercase shrink-0 pt-2 w-6">
                  {section.num}
                </span>
                <div className="flex-1">
                  <h2 className="font-display text-3xl text-obsidian mb-6">{section.title}</h2>
                  <div className="font-body font-light text-ash text-base leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
