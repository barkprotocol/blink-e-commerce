import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Zap, ShoppingBag, Share2, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Syne, Poppins } from "next/font/google";

// Import fonts
const syne = Syne({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function LandingPage() {
  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 ${poppins.className}`}>
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://ucarecdn.com/b065ba1f-6279-4677-ae8f-0ebc1facb68d/bark_icon.png"
              alt="BARK Icon"
              className="h-14"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 font-syne">Revolutionize Your E-commerce with Solana</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Buy in a Blink empowers merchants with lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-3">
              Create Your Store
            </Button>
            <Button size="sm" variant="outline" className="border-gray-200 text-gray-900 hover:bg-gray-100 px-6 py-3">
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-gray-400" />}
            title="Lightning Fast"
            description="Enjoy transactions that happen in the blink of an eye, thanks to Solana's high-speed blockchain."
          />
          <FeatureCard
            icon={<ShoppingBag className="h-8 w-8 text-gray-400" />}
            title="Custom Stores"
            description="Create a distinctive online presence with custom branding and product listings tailored to your business."
          />
          <FeatureCard
            icon={<Share2 className="h-8 w-8 text-gray-400" />}
            title="Social Sharing"
            description="Increase your store's visibility with easy-to-share custom links across all your social media platforms."
          />
          <FeatureCard
            icon={<Rocket className="h-8 w-8 text-gray-400" />}
            title="Dynamic Previews"
            description="Turn shared links into engaging, interactive previews that captivate your audience and drive sales."
          />
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center font-syne">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-sand-100 dark:bg-sand-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-syne">Create Your Store</h3>
              <p>Get started by setting up your store quickly and easily. Add your products and customize your brand.</p>
            </div>
            <div className="text-center">
              <div className="bg-sand-100 dark:bg-sand-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-syne">Share Your Links</h3>
              <p>Generate and share unique links for your store and products to reach a wider audience effortlessly.</p>
            </div>
            <div className="text-center">
              <div className="bg-sand-100 dark:bg-sand-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-syne">Sell & Earn</h3>
              <p>Start selling and receive instant payments through Solana, making your transactions seamless and efficient.</p>
            </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-6 font-syne">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of merchants already transforming their e-commerce experiences with Buy in a Blink.
          </p>
          <Button size="sm" className="bg-black text-white hover:bg-gray-800 px-6 py-3">
            Create Your Store Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center font-syne">Stay Updated</h2>
          <p className="text-center mb-6">Subscribe to our newsletter for the latest updates and features.</p>
          <form className="flex max-w-md mx-auto" aria-label="Subscribe to our newsletter">
            <Input type="email" placeholder="Enter your email" className="mr-2" aria-label="Email address" />
            <Button type="submit" className="px-6 py-3">Subscribe</Button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-12 flex flex-col items-center">
        <div className="text-center mb-6">
          <img
            src="https://ucarecdn.com/0c2a1b21-f836-4343-9d35-19386c7f7f4d/barkprotocoldark.svg"
            alt="BARK Logo"
            className="h-12 mx-auto mb-4"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-14 text-center mb-8">
          <div>
            <h3 className="font-semibold mb-5 font-syne text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" prefetch={false}>Home</Link></li>
              <li><Link href="/features" prefetch={false}>Features</Link></li>
              <li><Link href="/services" prefetch={false}>Services</Link></li>
              <li><Link href="/contact" prefetch={false}>Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-5 font-syne text-lg">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" prefetch={false}>Terms of Service</Link></li>
              <li><Link href="/privacy" prefetch={false}>Privacy Policy</Link></li>
              <li><Link href="/cookies" prefetch={false}>Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-5 font-syne text-lg">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="https://twitter.com/bark_protocol" target="_blank" prefetch={false}>Twitter</Link></li>
              <li><Link href="https://medium.com/@barkprotocol" target="_blank" prefetch={false}>Medium</Link></li>
              <li><Link href="https://instagram.com/bark.protocol" target="_blank" prefetch={false}>Instagram</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl font-semibold font-syne">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
