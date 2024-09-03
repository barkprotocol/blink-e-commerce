export const POST = async (req: Request) => {
  try {
    // Parse the request URL and body
    const url = new URL(req.url);
    const body: NextActionPostRequest = await req.json();

    // Validate the account field
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      return Response.json(
        { message: 'Invalid "account" provided' } as ActionError,
        {
          status: 400,
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    // Validate the signature field
    let signature: string;
    try {
      signature = body.signature;
      if (!signature) throw new Error("Invalid signature");
    } catch (err) {
      return Response.json(
        { message: 'Invalid "signature" provided' } as ActionError,
        {
          status: 400,
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    // Extract and validate query parameters
    const searchParams = new URLSearchParams(url.search);
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const address = searchParams.get("address");
    const zipcode = searchParams.get("zipcode");
    const city = searchParams.get("city");
    const amount = searchParams.get("amount");
    const state = searchParams.get("state");
    const productid = searchParams.get("productid");
    const uuid = searchParams.get("uuid");

    if (
      !name || !email || !address || !zipcode || !city ||
      !amount || !state || !productid || !uuid
    ) {
      return Response.json(
        { message: "Incomplete data" } as ActionError,
        {
          status: 400,
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    // Check signature status
    const connection = getConnection();
    try {
      const status = await connection.getSignatureStatus(signature);

      if (!status || !status.value) {
        throw new Error("Unknown signature status");
      }

      if (
        status.value.confirmationStatus !== "confirmed" &&
        status.value.confirmationStatus !== "finalized"
      ) {
        throw new Error("Unable to confirm the transaction");
      }

      // Retrieve and validate the transaction
      const transaction = await connection.getParsedTransaction(signature, "confirmed");
      if (!transaction) {
        throw new Error("Transaction not found");
      }

      const message = trimUuidToHalf(uuid); // 15 characters
      const orderPda = PublicKey.findProgramAddressSync(
        [
          Buffer.from("order"),
          account.toBuffer(),
          Buffer.from(message),
        ],
        program.programId
      )[0];

      const orderVault = PublicKey.findProgramAddressSync(
        [Buffer.from("orderVault"), orderPda.toBuffer()],
        program.programId
      )[0];

      const accounts = transaction.transaction.message.accountKeys;

      // Validate transaction accounts
      const programAccount = accounts.find(acc => acc.pubkey.equals(programId));
      const signerAccount = accounts.find(acc => acc.pubkey.equals(account));
      const orderPdaAccount = accounts.find(acc => acc.pubkey.equals(orderPda));
      const orderVaultAccount = accounts.find(acc => acc.pubkey.equals(orderVault));

      if (!programAccount || !signerAccount || !orderPdaAccount || !orderVaultAccount) {
        return Response.json(
          { message: "Transaction validation failed" } as ActionError,
          {
            status: 400,
            headers: ACTIONS_CORS_HEADERS,
          }
        );
      }

      // Check or create the user
      let user = await prisma.user.findUnique({
        where: { userWallet: body.account },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            emailAddress: email,
            name,
            userWallet: body.account,
          },
        });
      }

      // Check product details
      const productDetails = await prisma.product.findUnique({
        where: { id: productid },
        include: { seller: true },
      });

      if (!productDetails) {
        return Response.json(
          { message: "Product not found" } as ActionError,
          {
            status: 404,
            headers: ACTIONS_CORS_HEADERS,
          }
        );
      }

      // Create the order
      await prisma.order.create({
        data: {
          name,
          city,
          dropOffAddress: address,
          state,
          zipCode: zipcode,
          orderStatus: "PROCESSING", // Enum value
          buyerWallet: body.account,
          productId: productid,
          sellerId: productDetails.sellerId,
          id: uuid,
        },
      });

      // Update product stock
      const updatedStock = Number(productDetails.stock) - 1;
      await prisma.product.update({
        where: { id: productid },
        data: { stock: updatedStock.toString() },
      });

      // Return success response
      const payload: CompletedAction = {
        type: "completed",
        title: "Order Status",
        icon: `https://robohash.org/${body.account}?set=set4`,
        label: "Complete!",
        description:
          "Purchase was successful! You'll get an email with all the order details. If you have any queries, email us at hello@support.xyz",
      };

      return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
      });

    } catch (err) {
      console.error("Signature validation error:", err);
      return Response.json(
        { message: "Unable to confirm the provided signature" } as ActionError,
        {
          status: 400,
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    const actionError: ActionError = {
      message: typeof err === "string" ? err : "An unknown error occurred",
    };
    return Response.json(actionError, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};
