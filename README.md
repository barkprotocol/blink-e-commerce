# BARK - Buy in a Blink

**Buy in a Blink** is an advanced e-commerce platform built on the Solana blockchain, utilizing the unique concept of "blinks." This platform empowers merchants to create personalized online stores, list products, and generate custom store links that can be shared on social media platforms like X (formerly Twitter). These links unfurl into dynamic previews, allowing users to shop directly from the link.

## Overview

The BARK Protocol introduces **Solana Blink**, a blend of blockchain technology and headless e-commerce architecture, designed to offer a fast, secure, and customizable shopping experience. This platform is part of BARK Protocol's broader mission to integrate decentralized finance (DeFi) and SocialFi solutions, empowering communities and supporting charity initiatives.

## Features

- **Custom Store Creation**: Merchants can set up and manage online stores effortlessly.
- **Product Listing**: Manage products with comprehensive details such as images, descriptions, and pricing.
- **Custom Store Links**: Generate unique store links that unfurl into a shoppable preview on X.
- **Escrow Payments**: Payments are securely held in escrow and released upon product delivery.
- **Automated Refunds**: Handles refunds automatically if an order is canceled.

## How It Works

### 1. Store Setup

- **Sign Up**: Merchants register on the platform and create a new store.
- **Add Products**: Merchants can list products by adding details like images, titles, descriptions, prices, and stock quantities.

### 2. Sharing Store Links

- **Generate Custom Link**: After setting up the store, merchants generate a unique link.
- **Share on Social Media**: This link can be shared on platforms like X.
- **Dynamic Preview**: The link unfurls into a store preview, enabling users to shop directly from it.

### 3. Payment Handling

- **Escrow System**: Payments are processed through an escrow account, where funds are held until the product is delivered.
- **Refunds**: In case of order cancellations, refunds are processed automatically.

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed.
- **Solana Wallet**: Required for managing transactions and products.

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
    POSTGRES_URL=your-postgres-url
    NEXT_PUBLIC_VERCEL_URL=your-vercel-url
    ```

5. **Start the Development Server**:

    ```bash
    npm run dev
    ```

    Visit `http://localhost:3000` to view the application.

## Usage

### Creating a Store

- **Log In**: Merchants log into their account.
- **Create Store**: Navigate to "Create Store" and enter the required details.

### Adding Products

- **Manage Products**: Go to the "Manage Products" section to add new products.

### Generating Store Link

- **Generate Link**: After setting up the store, create a unique store link.
- **Share Link**: Share the link on X or other platforms for users to shop directly.

### Managing Orders

- **Order Management**: View and manage incoming orders in the "Orders" section.
- **Track Status**: Monitor order status and process cancellations as needed.

## Contributing

We welcome contributions to improve **Buy in a Blink**. To contribute:

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

## References

- [Prisma Documentation](https://www.prisma.io/docs/getting-started/quickstart)
- [Prisma Development Video](https://www.youtube.com/watch?v=QXxy8Uv1LnQ)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
