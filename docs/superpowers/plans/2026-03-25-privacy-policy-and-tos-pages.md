# Privacy Policy & Terms of Service Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/privacy-policy` and `/terms-of-service` pages that match the existing Inzu site design, wire up the footer links, and add both routes to the router.

**Architecture:** Two new React components (`PrivacyPolicyPage.tsx`, `TermsOfServicePage.tsx`) in `src/components/`, following the exact pattern of `AboutPage.tsx` — `<Navbar />` + `<Footer />` wrapping ivory-background content sections with obsidian hero headers. Routes added to `App.tsx`. Footer `Privacy Policy` / `Terms of Service` anchor tags replaced with `<Link>` components.

**Tech Stack:** React 19, Vite 6, Tailwind CSS v4, `motion` v12 (import from `'motion/react'`), `react-router-dom` v7, `lucide-react`. No new dependencies.

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/components/PrivacyPolicyPage.tsx` | Create | Privacy policy page component |
| `src/components/TermsOfServicePage.tsx` | Create | Terms of service page component |
| `src/App.tsx` | Modify | Add two new routes |
| `src/components/Footer.tsx` | Modify | Wire `Privacy Policy` and `Terms of Service` links |

---

## Task 1: Create PrivacyPolicyPage component

**Files:**
- Create: `src/components/PrivacyPolicyPage.tsx`

- [ ] Create `src/components/PrivacyPolicyPage.tsx` with the full content below:

```tsx
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
```

- [ ] Verify the file exists:
  ```bash
  ls src/components/PrivacyPolicyPage.tsx
  ```

- [ ] Commit:
  ```bash
  git add src/components/PrivacyPolicyPage.tsx
  git commit -m "feat: add PrivacyPolicyPage component (Kenya DPA 2019)"
  ```

---

## Task 2: Create TermsOfServicePage component

**Files:**
- Create: `src/components/TermsOfServicePage.tsx`

- [ ] Create `src/components/TermsOfServicePage.tsx` with the full content below:

```tsx
import { motion } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';

const sections = [
  {
    num: '01',
    title: 'The Service',
    content: `Inzu Technologies Ltd ("Inzu", "we", "us") operates a property management platform that enables landlords to collect rent, coordinate maintenance, and communicate with tenants via WhatsApp ("the Service").

By accessing or using the Service, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Service. These Terms form a legally binding contract between you and Inzu Technologies Ltd under the laws of Kenya.`
  },
  {
    num: '02',
    title: 'Eligibility',
    content: `You may use the Service only if:

— You are at least 18 years of age
— You are the legal owner or authorised manager of the properties you register on the platform
— You have the legal authority to enter into this agreement
— Your use of the Service does not violate any applicable Kenyan law

By registering, you represent and warrant that all of the above are true. We reserve the right to suspend or terminate accounts where eligibility conditions are not met.`
  },
  {
    num: '03',
    title: 'Your Account',
    content: `You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.

You must notify us immediately at hello@inzu.co if you suspect any unauthorised access to your account.

You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. We may suspend or terminate your account if any information you provide is found to be inaccurate, false, or misleading.

You may not share your account credentials with any other person or use another person's account without their permission.`
  },
  {
    num: '04',
    title: 'Fees & Payment',
    content: `Inzu charges a service fee as a percentage of rent collected through the platform, as stated on our Pricing page at the time of your agreement. For individual landlords, this is currently 8% of monthly rent collected. Enterprise pricing is agreed separately.

Fees are deducted automatically from collected rent before disbursement to your account. No fee is charged on rent that is not successfully collected through the platform.

We reserve the right to change our fees. We will provide at least 30 days' written notice of any fee changes. Continued use of the Service after the effective date of a fee change constitutes your acceptance of the new fees.

All fees are quoted and charged in Kenyan Shillings (KES) and are exclusive of any applicable taxes.`
  },
  {
    num: '05',
    title: 'Acceptable Use',
    content: `You agree not to use the Service to:

— Violate any applicable Kenyan law or regulation
— Register properties you do not own or are not authorised to manage
— Provide false or misleading information about yourself, your properties, or your tenants
— Harass, threaten, or harm tenants or other users
— Attempt to gain unauthorised access to any part of the platform
— Reverse-engineer, copy, or distribute any part of the platform
— Use the platform for any purpose other than legitimate property management

We reserve the right to investigate and take appropriate action, including account suspension or termination and referral to law enforcement, for any violations of these terms.`
  },
  {
    num: '06',
    title: 'Intellectual Property',
    content: `The Inzu platform, including its software, design, content, trademarks, and brand assets, is owned by Inzu Technologies Ltd and protected by applicable intellectual property laws.

Your use of the Service does not grant you any ownership rights in the platform. You may not reproduce, distribute, modify, or create derivative works from any part of the Service without our prior written consent.

You retain ownership of any data you provide to the platform (your property information, tenant data, etc.). By using the Service, you grant us a limited licence to use this data solely for the purpose of providing the Service to you, as described in our Privacy Policy.`
  },
  {
    num: '07',
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by Kenyan law:

Inzu provides the Service on an "as is" and "as available" basis. We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components.

We are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Service — including but not limited to lost rent income, loss of tenants, or loss of data.

Our total liability to you for any claim arising from these Terms or your use of the Service shall not exceed the total fees paid by you to Inzu in the three months preceding the event giving rise to the claim.

Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under Kenyan law.`
  },
  {
    num: '08',
    title: 'Termination',
    content: `You may cancel your account at any time by contacting us at hello@inzu.co. Upon cancellation, your access to the platform will end at the end of your current billing cycle.

We may suspend or terminate your account immediately if:
— You breach these Terms
— We are required to do so by law
— We reasonably believe your account is being used fraudulently or in a manner that harms other users or third parties

Upon termination, your right to use the Service ceases immediately. We will provide you with a final statement of accounts and will disburse any collected funds owed to you within 14 business days, less any outstanding fees.

Sections 6 (Intellectual Property), 7 (Limitation of Liability), and 9 (Governing Law) survive termination.`
  },
  {
    num: '09',
    title: 'Governing Law',
    content: `These Terms are governed by and construed in accordance with the laws of Kenya. Any dispute arising from or in connection with these Terms shall first be subject to good-faith negotiation between the parties.

If a dispute cannot be resolved by negotiation within 30 days, it shall be referred to mediation in Nairobi, Kenya, under the rules of the Nairobi Centre for International Arbitration (NCIA). If mediation fails, disputes shall be resolved by the courts of Kenya, and both parties submit to the exclusive jurisdiction of the Kenyan courts.

Nothing in this clause prevents either party from seeking urgent injunctive relief from a competent court.`
  },
  {
    num: '10',
    title: 'Changes to These Terms',
    content: `We may update these Terms from time to time. When we make material changes, we will:

— Post the updated Terms on this page with a revised "Last updated" date
— Notify you via the email address or WhatsApp number associated with your account at least 14 days before changes take effect

Your continued use of the Service after the effective date of any changes constitutes your acceptance of the updated Terms. If you do not agree to the updated Terms, you must stop using the Service and cancel your account.

For questions about these Terms, contact us at hello@inzu.co.

These Terms were last updated: March 2026.`
  },
];

const TermsOfServicePage = () => {
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
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-body font-light text-silk/40 text-sm tracking-widest uppercase"
          >
            Last updated: March 2026 · Governed by the laws of Kenya
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

export default TermsOfServicePage;
```

- [ ] Verify the file exists:
  ```bash
  ls src/components/TermsOfServicePage.tsx
  ```

- [ ] Commit:
  ```bash
  git add src/components/TermsOfServicePage.tsx
  git commit -m "feat: add TermsOfServicePage component (Kenya law)"
  ```

---

## Task 3: Add routes to App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] Add imports for both new pages at the top of `src/App.tsx`, after the existing imports:
  ```tsx
  import PrivacyPolicyPage from './components/PrivacyPolicyPage';
  import TermsOfServicePage from './components/TermsOfServicePage';
  ```

- [ ] Add two new `<Route>` entries inside the `<Routes>` block in `App.tsx`, after the existing three routes:
  ```tsx
  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
  <Route path="/terms-of-service" element={<TermsOfServicePage />} />
  ```

- [ ] Verify `App.tsx` now has 5 routes total:
  ```
  /               → LandingPage
  /about          → AboutPage
  /request-access → RequestAccessPage
  /privacy-policy → PrivacyPolicyPage
  /terms-of-service → TermsOfServicePage
  ```

- [ ] Commit:
  ```bash
  git add src/App.tsx
  git commit -m "feat: register /privacy-policy and /terms-of-service routes"
  ```

---

## Task 4: Wire footer links

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] In `Footer.tsx`, find the two anchor tags for Privacy Policy and Terms of Service (currently `href="#"`). Replace them with `<Link>` components:

  ```tsx
  // BEFORE
  <div className="flex gap-4 text-[11px] text-ash">
    <a href="#" className="hover:text-sage transition-colors">Privacy Policy</a>
    <a href="#" className="hover:text-sage transition-colors">Terms of Service</a>
  </div>

  // AFTER
  <div className="flex gap-4 text-[11px] text-ash">
    <Link to="/privacy-policy" className="hover:text-sage transition-colors">Privacy Policy</Link>
    <Link to="/terms-of-service" className="hover:text-sage transition-colors">Terms of Service</Link>
  </div>
  ```

  `Link` is already imported from `react-router-dom` at the top of `Footer.tsx` — no new import needed.

- [ ] Commit:
  ```bash
  git add src/components/Footer.tsx
  git commit -m "fix: wire footer Privacy Policy and Terms of Service links to real routes"
  ```

---

## Task 5: Verification

- [ ] Run lint — expect zero errors:
  ```bash
  npm run lint
  ```
  Expected: exits with code 0.

- [ ] Run build — expect clean output:
  ```bash
  npm run build
  ```
  Expected: `dist/` produced, no errors.

- [ ] With dev server running (`npm run dev`), manually verify:
  - Navigate to `http://localhost:3000/privacy-policy` — page loads with Navbar, obsidian hero "Privacy Policy", all 8 sections visible, Footer at bottom
  - Navigate to `http://localhost:3000/terms-of-service` — page loads with Navbar, obsidian hero "Terms of Service", all 10 sections visible, Footer at bottom
  - Click "Privacy Policy" link in the Footer → navigates to `/privacy-policy`
  - Click "Terms of Service" link in the Footer → navigates to `/terms-of-service`
  - On both pages, click the Inzu logo in the Navbar → returns to `/`

- [ ] Final commit:
  ```bash
  git add -A
  git commit -m "chore: verified privacy policy and terms of service pages"
  ```
