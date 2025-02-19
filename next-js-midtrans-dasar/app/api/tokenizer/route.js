import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY,
});

export async function POST(request) {
  try {
    const { id, productName, price, quantity } = await request.json();

    let parameter = {
      transaction_details: {
        order_id: id,
        gross_amount: price * quantity,
      },
      item_details: {
        name: productName,
        price: price,
        quantity: quantity,
      },
    };

    let token = await snap.createTransactionToken(parameter);
    console.log("Transaction token:", token);

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error during transaction creation:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
