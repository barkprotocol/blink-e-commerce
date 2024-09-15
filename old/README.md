# BARK - Buy in a Blink
**Proof of Concept**

**Buy in a Blink** is an innovative e-commerce platform leveraging the Solana blockchain, introducing the unique concept of "blinks." This platform allows merchants to create personalized online stores, list products, and generate custom store links for sharing on social media platforms like X (formerly Twitter). These links convert into dynamic previews, enabling direct shopping from the link.

## Overview

The BARK Protocol presents **Solana Blink**, merging blockchain technology with headless e-commerce architecture to offer a fast, secure, and customizable shopping experience. This platform is part of BARK Protocol's broader mission to integrate decentralized finance (DeFi) and SocialFi solutions, empowering communities and supporting charitable initiatives.

## Features

- **Custom Store Creation**: Easily set up and manage online stores.
- **Product Listing**: Add and manage products with images, descriptions, and pricing.
- **Custom Store Links**: Create unique links that unfurl into shoppable previews on X.
- **Escrow Payments**: Secure payment processing with escrow protection until product delivery.
- **Automated Refunds**: Handle refunds automatically for canceled orders.

## How It Works

### 1. Store Setup

- **Sign Up**: Register on the platform and create a new store.
- **Add Products**: List products by adding images, titles, descriptions, prices, and stock quantities.
- **Configure Settings**: Set payment options, shipping methods, and other preferences.
- **Save and Publish**: Save changes and publish the store to make it live.

### 2. Sharing Store Links

- **Generate Custom Link**: After setting up the store, create a unique link.
- **Share on Social Media**: Post this link on platforms like X.
- **Dynamic Preview**: The link unfurls into a store preview, allowing users to shop directly.

### 3. Payment Handling

- **Escrow System**: Payments are processed through an escrow account, protecting both buyers and sellers.
- **Refunds**: Automatically handled in case of order cancellations, ensuring a smooth experience.

### 4. Prisma Configurations and Migrations

To create and apply migrations, run:
```bash
npx prisma migrate dev --name your_migration_name
```
This applies schema changes to the database and generates a new migration file.

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed.
- **Solana Wallet**: Needed for transaction management.

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/barkprotocol/blink-e-commerce.git
    ```

2. **Navigate to the Project Directory**:
    ```bash
    cd blink-e-commerce
    ```

3. **Install Dependencies**:
    ```bash
    npm install
    ```

4. **Set Up Environment Variables**:

    Create a `.env` file in the root directory and add the necessary environment variables. Example:
    ```
    NEXT_PUBLIC_SOLANA_NETWORK=devnet
    NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
    EDGE_STORE_API_KEY=your-edgestore-api-key
    SOLANA_WALLET_SECRET_KEY=your-solana-wallet-secret-key
    PAYMENT_PROGRAM_ID=your-payment-program-id
    POSTGRES_URL=postgresql://user:password@localhost:5432/mydatabase
    NEXT_PUBLIC_VERCEL_URL=your-vercel-url
    ```

5. **Start the Development Server**:
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to view the application.

## Usage

### Creating a Store

- **Log In**: Log into your account or register if you don’t have one.
- **Create Store**: Go to "Create Store" in the dashboard and enter details like store name, description, and branding. Upload your store’s logo and banner.
- **Configure Settings**: Set payment options, shipping methods, and other preferences.
- **Save and Publish**: Save changes and publish your store.

### Adding Products

- **Manage Products**: In the "Manage Products" section, add new products with images, titles, descriptions, prices, and stock quantities.

### Generating Store Link

- **Generate Link**: Create a unique store link.
- **Share Link**: Post the link on X or other platforms for direct shopping.

### Managing Orders

- **Order Management**: View and manage orders in the "Orders" section.
- **Track Status**: Monitor order status and handle cancellations as needed.

## Contributing

We welcome contributions to enhance **Buy in a Blink**. To contribute:

1. **Fork the Repository**.
2. **Create a New Branch**:
    ```bash
    git checkout -b feature/your-feature
    ```

3. **Commit Your Changes**:
    ```bash
    git commit -am 'Add new feature'
    ```

4. **Push to the Branch**:
    ```bash
    git push origin feature/your-feature
    ```

5. **Create a Pull Request**.

# ToDo

- Transfer project here https://github.com/barkprotocol/blink-commerce
- refactor and implement

## References

- [Prisma Documentation](https://www.prisma.io/docs/getting-started/quickstart)
- [Prisma Development Video](https://www.youtube.com/watch?v=QXxy8Uv1LnQ)

## License

The MIT License - see the [LICENSE](LICENSE) file for details.
