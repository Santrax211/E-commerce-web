import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import stripe from '@/lib/stripe';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature') as string;
  
  if (!signature) {
    return NextResponse.json(
      { error: 'No stripe signature found' },
      { status: 400 }
    );
  }
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    console.error(`Webhook error: ${error.message}`);
    return NextResponse.json(
      { error: `Webhook error: ${error.message}` },
      { status: 400 }
    );
  }
  
  // Manejar el evento
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    await dbConnect();
    
    // Actualizar la orden
    const orderId = session.metadata.orderId;
    const order = await Order.findById(orderId);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Orden no encontrada' },
        { status: 404 }
      );
    }
    
    // Actualizar estado de la orden
    order.isPaid = true;
    order.paidAt = new Date();
    order.status = 'Processing';
    order.paymentResult = {
      id: session.id,
      status: session.payment_status,
      update_time: new Date().toISOString(),
      email_address: session.customer_details?.email || '',
    };
    
    await order.save();
    
    // Actualizar inventario
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }
  }
  
  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};