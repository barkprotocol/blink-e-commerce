# BARK - Buy in a Blink

**Buy in a Blink** is a cutting-edge e-commerce platform built on the Solana blockchain, utilizing the innovative concept of blinks. This platform empowers merchants to create their own stores, list products, and generate custom store links. These links can be shared on platforms like X (formerly Twitter) and will unfurl into a dynamic preview, allowing users to shop directly from the link.

## Overview

The BARK Protocol, leveraging the Solana blockchain, has introduced **Solana Blink** to revolutionize online shopping. Solana Blink merges advanced blockchain technology with a headless e-commerce architecture, offering a fast, secure, and highly customizable shopping experience. This platform is part of BARK Protocol's broader mission to integrate decentralized finance (DeFi) and SocialFi solutions, aiming to empower communities and support meaningful charity initiatives.

## Features

- **Custom Store Creation**: Merchants can easily set up and manage their own online stores.
- **Product Listing**: Seamlessly add and manage products with details like images, descriptions, and pricing.
- **Custom Store Links**: Generate unique store links that unfurl into a shopable preview on X.
- **Escrow Payments**: Payments are securely held in escrow and only released to sellers upon product delivery.
- **Automated Refunds**: Automatically handles refunds in the event of order cancellations.

## How It Works

1. **Store Setup**:
   - Merchants sign up and create a new store.
   - Add products with comprehensive details, including images, titles, descriptions, prices, and stock quantities.

2. **Sharing Store Links**:
   - Generate a custom link for your store.
   - Share this link on platforms like X.
   - The link will unfurl into a preview of your store, enabling users to shop directly.

3. **Payment Handling**:
   - When a purchase is made, the payment is processed through an escrow account.
   - Funds are held in escrow until the product is delivered.
   - If an order is canceled, the system automatically initiates a refund to the user.

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **Solana Wallet**: Required for transactions and managing products.

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
    EDGE_STORE_API_KEY=your-edgestore-api-key
    SOLANA_WALLET_SECRET_KEY=your-solana-wallet-secret-key
    ```

5. **Start the Development Server**:

    ```bash
    npm run dev
    ```

    Visit `http://localhost:3000` to view the application.

## Usage

1. **Creating a Store**:
   - Log in to your account.
   - Navigate to the "Create Store" section and provide the required details.

2. **Adding Products**:
   - Go to the "Manage Products" section.
   - Add new products with all relevant information.

3. **Generating Store Link**:
   - After setting up your store, generate a unique store link.
   - Share this link on X or other social platforms.

4. **Managing Orders**:
   - View and manage incoming orders from the "Orders" section.
   - Track order status and handle cancellations as needed.

## Contributing

We welcome contributions to enhance Buy in a Blink. To contribute:

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries or support, please reach out to us at [support@buyinablink.com](mailto:support@buyinablink.com).
