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
    <div className={`min-h-screen bg-transparent text-gray-800 dark:text-gray-200 ${poppins.className}`}>
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 font-syne">Revolutionize Your E-commerce with Solana</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Buy in a Blink empowers merchants with lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="sm" className="bg-black text-white hover:bg-gray-800 px-6 py-3">
              Create Your Store
            </Button>
            <Button size="sm" variant="outline" className="px-6 py-3">
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-sand-600" />}
            title="Lightning Fast"
            description="Experience instant transactions powered by Solana's high-speed blockchain."
          />
          <FeatureCard
            icon={<ShoppingBag className="h-10 w-10 text-sand-600" />}
            title="Custom Stores"
            description="Build your unique online presence with personalized branding and product listings."
          />
          <FeatureCard
            icon={<Share2 className="h-10 w-10 text-sand-600" />}
            title="Social Sharing"
            description="Amplify your reach by generating and sharing custom store links across social platforms."
          />
          <FeatureCard
            icon={<Rocket className="h-10 w-10 text-sand-600" />}
            title="Dynamic Previews"
            description="Transform shared links into interactive shopping experiences, boosting engagement."
          />
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center font-syne">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-sand-100 dark:bg-sand-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sand-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-syne">Create Your Store</h3>
              <p>Set up your custom store with just a few clicks and start adding your products.</p>
            </div>
            <div className="text-center">
              <div className="bg-sand-100 dark:bg-sand-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sand-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-syne">Share Your Links</h3>
              <p>Generate unique links for your store and products to share on social media.</p>
            </div>
            <div className="text-center">
              <div className="bg-sand-100 dark:bg-sand-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sand-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-syne">Sell & Earn</h3>
              <p>Start selling your products and receive payments instantly via Solana.</p>
            </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-6 font-syne">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of merchants already using Buy in a Blink to revolutionize their e-commerce experience.
          </p>
          <Button size="sm" className="bg-black text-white hover:bg-gray-800 px-6 py-3">
            Create Your Store Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center font-syne">Stay Updated</h2>
          <p className="text-center mb-6">Subscribe to our newsletter for the latest updates and features.</p>
          <form className="flex max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="mr-2" />
            <Button type="submit" className="px-6 py-3">Subscribe</Button>
          </form>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200 dark:border-gray-700">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 font-syne">Buy in a Blink</h3>
            <p className="text-sm">Revolutionizing e-commerce with Solana blockchain technology.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-syne">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" prefetch={false}>Home</Link></li>
              <li><Link href="#" prefetch={false}>Features</Link></li>
              <li><Link href="#" prefetch={false}>Pricing</Link></li>
              <li><Link href="#" prefetch={false}>Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-syne">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" prefetch={false}>Terms of Service</Link></li>
              <li><Link href="#" prefetch={false}>Privacy Policy</Link></li>
              <li><Link href="#" prefetch={false}>Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-syne">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" prefetch={false}>Twitter</Link></li>
              <li><Link href="#" prefetch={false}>Discord</Link></li>
              <li><Link href="#" prefetch={false}>GitHub</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
          {icon}
          <span className="text-lg font-syne font-semibold">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 dark:text-gray-400">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
