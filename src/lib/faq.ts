export const faqs = [
  {
    q: "Is this an automated scan?",
    a: "No. A real engineer tests your app by hand: signing up, going through your key flows, and trying it on desktop and mobile, the way your customers would. Every issue in the report comes with screenshots and the exact steps to reproduce it.",
  },
  {
    q: "Do you need access to my code or GitHub?",
    a: "Not for the free check. We test the live app like any user would. If you later want a deeper code review or want us to fix things, we'll ask for read-only access to one repository then, and remove it when we're done. Happy to sign an NDA.",
  },
  {
    q: "Do you work on websites or only mobile apps?",
    a: "Both. We work on marketing websites, web apps and SaaS products, and native iOS and Android apps. Many founders start with a website or web app and add mobile later. We can handle each step.",
  },
  {
    q: "Do I need to rebuild my app from scratch?",
    a: "No. In most cases we work with the code you already have. AI tools generate standard stacks like React, Next.js, and Supabase, and we fix and harden them in place. If something truly needs rebuilding, we'll explain why and give you a fixed quote before any work starts.",
  },
  {
    q: "Is the check really free? What's the catch?",
    a: "It's free. The only catch: some founders hire us to fix what we find. Plenty don't, and that's fine. You keep the report either way, with every finding and how to fix it, and there's no obligation to book anything.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on what your project needs, so we quote after the free check and a short call. You get a fixed quote and timeline before any work starts. No surprise invoices.",
  },
  {
    q: "Will you access my data?",
    a: "No. We sign up with our own test accounts and only look at what those accounts can see. If we find that one user can see another's data, or that a table is publicly readable, we confirm it and stop there. We never download, copy, or store your users' data.",
  },
  {
    q: "My app needs a login or an invite. Can you still test it?",
    a: "Yes. If anyone can sign up, we create our own test account. If it's invite-only or needs a paid plan, we'll email you to ask for a test account before we start.",
  },
  {
    q: "What if my app was built with Bubble or another no-code tool?",
    a: "We can still help. We test anything with a public URL, whatever it was built with. For Bubble, FlutterFlow, and similar tools, we also look at privacy rules, API connectors, and exposed workflows. Some fixes happen inside the tool. If moving off the platform makes more sense, we'll tell you plainly.",
  },
  {
    q: "How long does a typical launch take?",
    a: "Most website and web app launches take 1–2 weeks. Mobile apps usually take 3–5 weeks, including App Store and Google Play review. You get a clear timeline before we start.",
  },
  {
    q: "Do I own the code afterward?",
    a: "Yes. Everything we write lives in your repository and your accounts. You own all of it from day one. No lock-in, no licensing fees.",
  },
  {
    q: "Which time zones do you work in?",
    a: "We work async-first, so your time zone isn't a problem. Calls are booked in your local time, and you get written updates you can read whenever suits you.",
  },
] as const
