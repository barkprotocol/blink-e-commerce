// Define order statuses as constants or enum
const ORDER_STATUSES = {
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  PENDING: "PENDING",
};

// Improve error handling by being more specific
const handleError = (message: string, status: number) => {
  return Response.json({ message } as ActionError, { status, headers });
};

export const POST = async (req: Request) => {
  try {
    const body: NextActionPostRequest = await req.json();
    const url = new URL(req.url);

    // Validate PublicKey and signature from the body
    let account: PublicKey;
    let signature: string;
    try {
      account = new PublicKey(body.account);
      signature = body.signature;
      if (!signature) throw "Invalid signature provided";
    } catch (err) {
      return handleError('Invalid "account" or "signature" provided', 400);
    }

    // Validate the orderId in the query params
    const searchParams = new URLSearchParams(url.search);
    const orderId = searchParams.get("orderid");
    if (!orderId) {
      return handleError("Order ID is missing in the request", 400);
    }

    // Fetch the order from the database
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { product: true },
    });
    if (!order) {
      return handleError("Order not found", 404);
    }

    // Fetch the transaction details from Solana
    const connection = getConnection();
    const transaction = await connection.getParsedTransaction(
      signature,
      "confirmed"
    );
    if (!transaction) {
      return handleError("Transaction not found", 400);
    }

    // Validate the accounts within the transaction
    const accounts = transaction.transaction.message.accountKeys;
    const programAccount = accounts.find((acc) => acc.pubkey.equals(programId));
    const signerAccount = accounts.find((acc) => acc.pubkey.equals(account));
    const orderPdaAccount = accounts.find((acc) => acc.pubkey.equals(orderPda));
    const orderVaultAccount = accounts.find((acc) =>
      acc.pubkey.equals(orderVault)
    );

    if (!programAccount || !signerAccount || !orderPdaAccount || !orderVaultAccount) {
      return handleError("Required accounts are missing in the transaction", 400);
    }

    // Update the order status in the database
    await prisma.order.update({
      where: { id: order.id },
      data: { orderstatus: ORDER_STATUSES.CANCELLED },
    });

    // Respond with success message
    const payload: CompletedAction = {
      type: "completed",
      title: `Order ${orderId} Cancelled`,
      icon: `https://barkshop.app/${body.account}?set=set4`,
      label: "Complete!",
      description: "Refund was successful! Check your wallet.",
    };
    return Response.json(payload, { headers });

  } catch (err) {
    console.error("Error processing POST request:", err);
    let errorMessage = "An unknown error occurred";
    if (typeof err === "string") errorMessage = err;
    return handleError(errorMessage, 400);
  }
};
