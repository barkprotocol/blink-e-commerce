import React from 'react'
import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What is BARK Protocol?',
    answer: 'BARK Protocol is a decentralized e-commerce platform built on the Solana blockchain. It allows merchants to create custom stores with fast transactions and seamless social sharing capabilities.',
  },
  {
    question: 'How does BARK use Solana?',
    answer: 'BARK leverages Solana\'s high-speed, low-cost blockchain to process transactions quickly and efficiently. This allows for near-instantaneous payments and a smooth user experience.',
  },
  {
    question: 'Is BARK secure?',
    answer: 'Yes, BARK utilizes blockchain technology and smart contracts to ensure secure transactions. Additionally, we implement various security measures to protect user data and funds.',
  },
  {
    question: 'How do I create a store on BARK?',
    answer: 'Creating a store on BARK is simple. Just click on the "Create Your Shop" button, connect your Solana wallet, and follow the guided setup process to customize your store.',
  },
  {
    question: 'What are the fees for using BARK?',
    answer: 'BARK charges a small percentage fee on transactions. The exact fee structure depends on the type of store and volume of transactions. Please refer to our pricing page for detailed information.',
  },
]

export default function FAQ() {
  return (
    <section className="bg-[#F5F1EE] py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 font-syne text-[#1E1E1E]"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold font-syne text-[#1E1E1E]">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[#1E1E1E] font-poppins">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}