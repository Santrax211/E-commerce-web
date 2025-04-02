import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import stripe from '@/lib/stripe';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }
    
    const { items, shippingAddress, paymentMethod } = await request.json();
    
    if (!items || !items.length || !shippingAddress || !paymentMethod) {
      return NextResponse.json(
        { error: 'Datos de pedido incompletos' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Verificar stock y obtener precios actualizados
    const productIds = items.map((item: any) => item.id);
    const products = await Product.find({ _id: { $in: productIds } });
    
    const productsMap = products.reduce((acc: any, product: any) => {
      acc[product._id.toString()] = product;
      return acc;
    }, {});
    
    // Calcular totales
    let subtotal = 0;
    const lineItems = [];
    const orderItems = [];
    
    for (const item of items) {
      const product = productsMap[item.id];
      
      if (!product) {
        return NextResponse.json(
          { error: `Producto no encontrado: ${item.id}` },
          { status: 400 }
        );
      }
      
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${product.name}` },
          { status: 400 }
        );
      }
      
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      
      // Preparar items para Stripe
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: product.images && product.images.length > 0 ? [product.images[0]] : [],
          },
          unit_amount: Math.round(product.price * 100), // Stripe usa centavos
        },
        quantity: item.quantity,
      });
      
      // Preparar items para la orden
      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        image: product.images && product.images.length > 0 ? product.images[0] : '',
      });
    }
    
    const shippingPrice = 10.00; // Precio fijo de envío
    const tax = subtotal * 0.07; // 7% de impuesto
    const total = subtotal + shippingPrice + tax;
    
    // Crear la orden en la base de datos
    const order = await Order.create({
      user: session.user.id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingPrice,
      tax,
      total,
    });
    
    // Crear sesión de checkout en Stripe
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?order_id=${order._id}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout?canceled=true`,
      metadata: {
        orderId: order._id.toString(),
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Math.round(shippingPrice * 100),
              currency: 'usd',
            },
            display_name: 'Envío estándar',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
      ],
    });
    
    return NextResponse.json({ 
      sessionId: stripeSession.id,
      orderId: order._id.toString()
    });
  } catch (error) {
    console.error('Error al crear checkout:', error);
    return NextResponse.json(
      { error: 'Error al procesar el pago' },
      { status: 500 }
    );
  }
}