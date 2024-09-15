# BARK | Blink E-Commerce Platform

## Overview

The BARK - Blink E-Commerce Platform provides a streamlined solution for creating and managing online stores. With features for store setup, product management, link sharing, and secure payment handling, the platform ensures a smooth experience for both buyers and sellers.

## Features

- **Store Setup**: Create and manage your store, add products, and configure settings.
- **Sharing Store Links**: Generate custom links and share them on social media with dynamic previews.
- **Payment Handling**: Secure payments with an escrow system and automatic refunds.

## Getting Started

### 1. Store Setup

#### Sign Up
1. **Register**: Go to the registration page and provide your email, password, and store name.
2. **Verification**: Verify your email address to activate your account.

#### Add Products
1. **Product Details**:
   - **Images**: Upload product images.
   - **Titles**: Enter product titles.
   - **Descriptions**: Provide detailed descriptions.
   - **Prices**: Set product prices.
   - **Stock Quantities**: Manage inventory.

2. **Product Categories**: Organize products into categories.

#### Configure Settings
1. **Payment Options**: Integrate payment gateways (e.g., credit/debit cards, PayPal).
2. **Shipping Methods**: Set up shipping rates and delivery options.
3. **Tax Settings**: Configure tax rates based on regions.

#### Save and Publish
1. **Save Draft**: Save your store setup as a draft.
2. **Publish**: Publish your store to make it live.

### 2. Sharing Store Links

#### Generate Custom Link
1. **Unique Link**: Create a unique URL for your store.
2. **Link Customization**: Optionally customize the link.

#### Share on Social Media
1. **Platforms**: Share your store link on X, Facebook, Instagram, etc.
2. **Call to Action**: Use compelling calls to action.

#### Dynamic Preview
1. **Link Preview**: Ensure the link displays a preview of your store.
2. **Shop Directly**: Users can shop directly from the preview.

### 3. Payment Handling

#### Escrow System
1. **Payment Processing**: Payments are held in escrow until completed.
2. **Buyer Protection**: Ensures buyers receive their products before funds are released.
3. **Seller Protection**: Protects sellers against fraud.

#### Refunds
1. **Automatic Refunds**: Process refunds automatically for cancellations or returns.
2. **Dispute Resolution**: Mechanism for resolving disputes.

## Development

### Prerequisites

- Node.js
- npm, yarn, or pnpm
- Prisma

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/barkprotocol/bark-ecommerce.git
   cd bark-ecommerce
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun add
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=your-database-url
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
   NEXT_PUBLIC_PAYMENT_GATEWAY_API_KEY=your-payment-gateway-api-key
   ```

4. **Run Migrations**:
   ```bash
   npx prisma migrate dev
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

# Prisma DB

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run npx prisma db pull to turn your database schema into a Prisma schema.
4. Run npx prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

1. **Fork the Repository**: Create your own fork of the repository.
2. **Create a Branch**: Create a new branch for your feature or bug fix.
3. **Commit Changes**: Commit your changes with descriptive messages.
4. **Push Changes**: Push your branch to your fork.
5. **Submit a Pull Request**: Open a pull request with a description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.