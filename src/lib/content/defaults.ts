import { siteConfig } from "@/lib/config"
import type { SiteContent } from "./schema"

const faqs: SiteContent["faqs"] = [
  {
    id: "faq-01",
    question: "Is this an automated scan?",
    answer:
      "No. A real engineer tests your app by hand: signing up, going through your key flows, and trying it on desktop and mobile, the way your customers would. Every issue in the report comes with screenshots and the exact steps to reproduce it.",
    visible: true,
  },
  {
    id: "faq-02",
    question: "Do you need access to my code or GitHub?",
    answer:
      "Not for the free check. We test the live app like any user would. If you later want a deeper code review or want us to fix things, we'll ask for read-only access to one repository then, and remove it when we're done. Happy to sign an NDA.",
    visible: true,
  },
  {
    id: "faq-03",
    question: "Do you work on websites or only mobile apps?",
    answer:
      "Both. We work on marketing websites, web apps and SaaS products, and native iOS and Android apps. Many founders start with a website or web app and add mobile later. We can handle each step.",
    visible: true,
  },
  {
    id: "faq-04",
    question: "Do I need to rebuild my app from scratch?",
    answer:
      "No. In most cases we work with the code you already have. AI tools generate standard stacks like React, Next.js, and Supabase, and we fix and harden them in place. If something truly needs rebuilding, we'll explain why and give you a fixed quote before any work starts.",
    visible: true,
  },
  {
    id: "faq-05",
    question: "Is the check really free? What's the catch?",
    answer:
      "It's free. The only catch: some founders hire us to fix what we find. Plenty don't, and that's fine. You keep the report either way, with every finding and how to fix it, and there's no obligation to book anything.",
    visible: true,
  },
  {
    id: "faq-06",
    question: "How much does it cost?",
    answer:
      "It depends on what your project needs, so we quote after the free check and a short call. You get a fixed quote and timeline before any work starts. No surprise invoices.",
    visible: true,
  },
  {
    id: "faq-07",
    question: "Can you move my app off Lovable, Bolt, or Replit?",
    answer:
      "Yes. We move your code to your own GitHub, deploy it on Vercel or Netlify with your domain, and move your database and users to a Supabase or Postgres project you own. You get staging and automatic deploys, and you stop paying the builder for hosting. Apps on Bubble or FlutterFlow can't be exported as code, so for those we quote a rebuild instead.",
    visible: true,
  },
  {
    id: "faq-08",
    question: "Will my users lose their accounts or data if we migrate?",
    answer:
      "That's what we plan the whole move around. We take a full backup first, rehearse the migration on a copy, and switch over at a quiet time with a rollback plan ready. In most cases users keep their logins. If something about your setup means they'd need to reset a password, we tell you before you pay, not after.",
    visible: true,
  },
  {
    id: "faq-09",
    question: "Can I keep using AI tools after you migrate?",
    answer:
      "Yes. The code lives in your GitHub, so you can keep building with Cursor, Claude Code, Lovable's GitHub sync, or any developer. The difference is that changes go through staging first, so a bad prompt can't break production.",
    visible: true,
  },
  {
    id: "faq-10",
    question: "Will hosting cost more after moving?",
    answer:
      "Usually less. You pay Vercel or Netlify and Supabase directly, and many early-stage apps fit on their free or low-cost plans. We estimate your monthly bill before we start, so there are no surprises.",
    visible: true,
  },
  {
    id: "faq-11",
    question: "Will you access my data?",
    answer:
      "No. We sign up with our own test accounts and only look at what those accounts can see. If we find that one user can see another's data, or that a table is publicly readable, we confirm it and stop there. We never download, copy, or store your users' data.",
    visible: true,
  },
  {
    id: "faq-12",
    question: "My app needs a login or an invite. Can you still test it?",
    answer:
      "Yes. If anyone can sign up, we create our own test account. If it's invite-only or needs a paid plan, we'll email you to ask for a test account before we start.",
    visible: true,
  },
  {
    id: "faq-13",
    question: "What if my app was built with Bubble or another no-code tool?",
    answer:
      "We can still help. We test anything with a public URL, whatever it was built with. For Bubble, FlutterFlow, and similar tools, we also look at privacy rules, API connectors, and exposed workflows. Some fixes happen inside the tool. If moving off the platform makes more sense, we'll tell you plainly.",
    visible: true,
  },
  {
    id: "faq-14",
    question: "How long does a typical launch take?",
    answer:
      "Most website and web app launches take 1\u20132 weeks. Mobile apps usually take 3\u20135 weeks, including App Store and Google Play review. You get a clear timeline before we start.",
    visible: true,
  },
  {
    id: "faq-15",
    question: "Do I own the code afterward?",
    answer:
      "Yes. Everything we write lives in your repository and your accounts. You own all of it from day one. No lock-in, no licensing fees.",
    visible: true,
  },
  {
    id: "faq-16",
    question: "Which time zones do you work in?",
    answer:
      "We work async-first, so your time zone isn't a problem. Calls are booked in your local time, and you get written updates you can read whenever suits you.",
    visible: true,
  },
]

const services: SiteContent["services"] = [
  {
    id: "audit",
    name: "Production Audit",
    tagline: "Code review, with repo access",
    badge: "",
    description:
      "Goes deeper than the free check. With read-only access to your repo, a senior engineer reviews your code and infrastructure by hand and finds the root causes.",
    features: [
      "Full manual code and database review",
      "Supabase RLS and auth policy audit",
      "Secrets and API key exposure review",
      "Hosting, backups, and monitoring review",
      "Prioritized fix list in plain English",
      "Walkthrough call with the engineer",
    ],
    visible: true,
  },
  {
    id: "migration",
    name: "Own Your App",
    tagline: "Move off Lovable, Bolt, Replit & more",
    badge: "New",
    description:
      "Stop renting your app from an AI builder. We move it to hosting and a database you control, like Vercel or Netlify and your own Supabase, without losing data or users.",
    features: [
      "Code in your own GitHub repository",
      "Live on Vercel or Netlify with your domain",
      "Database and users moved to your own Supabase or Postgres",
      "Full backup and rollback plan before cutover",
      "Staging plus automatic deploys from GitHub",
      "Keep building with any AI tool or developer",
    ],
    visible: true,
  },
  {
    id: "web",
    name: "Websites & Web Apps",
    tagline: "Fix, launch, or rebuild",
    badge: "",
    description:
      "We fix the critical issues and launch your site or web app on production infrastructure. If the prototype can't be saved, we rebuild it properly, on a stack you own.",
    features: [
      "Critical security issues fixed",
      "Production hosting and custom domain",
      "Performance, SEO, and social sharing tuned",
      "Error monitoring and uptime alerts",
      "Automated backups and a staging environment",
      "CI/CD so every change ships safely",
    ],
    visible: true,
  },
  {
    id: "mobile",
    name: "Mobile Apps",
    tagline: "Native iOS & Android",
    badge: "",
    description:
      "Native iOS and Android apps built on your existing product, then published to the App Store and Google Play.",
    features: [
      "Native iOS and Android apps",
      "Shares one backend with your web app",
      "Push notifications and deep links",
      "TestFlight and internal testing tracks",
      "App Store and Play Store submission",
      "We handle review feedback until approval",
    ],
    visible: true,
  },
]

/**
 * What the site shows for any content key that isn't in the database yet, or
 * fails validation. Migration 0006 seeds the same FAQs and services, so editing
 * them in the admin panel starts from this text. Safe to import on the client.
 */
export const defaultContent: SiteContent = {
  faqs,
  services,
  testimonials: [],
  founder: { name: "", role: "", bio: "", photoUrl: null },
  settings: {
    email: siteConfig.email,
    calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "ashwright/intro",
    turnaroundDays: 3,
  },
}
