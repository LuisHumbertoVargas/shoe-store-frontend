import React, { useMemo, useState } from 'react';
import CartItem from '@/components/CartItem';
import Wrapper from '@/components/Wrapper';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { makePaymentRequest } from '@/utils/api';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Cart = () => {
    const [loading, setLoading] = useState(false);
    const { cartItems } = useSelector((state) => state.cart);

    const subTotal = useMemo(() => {
        return cartItems.reduce(
            (total, val) => total + val.attributes.price,
            0
        );
    }, [cartItems]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const stripe = await stripePromise;
            const res = await makePaymentRequest('/api/orders', {
                products: cartItems,
            });
            await stripe.redirectToCheckout({
                sessionId: res.stripeSession.id,
            });
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <div className='w-full md:py-0'>
            <Wrapper>
                {cartItems.length > 0 && (
                    <>
                        {/* Heading and Paragraph start */}
                        <div className='text-center max-w-[800px] mx-auto my-[30px] md:my-[55px]'>
                            <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
                                Shopping Cart
                            </div>
                        </div>
                        {/* Heading and Paragraph end */}

                        {/* Cart content start */}
                        <div className='flex flex-col lg:flex-row gap-12 py-10'>
                            {/* Cart items start */}
                            <div className='flex-[2]'>
                                <div className='text-lg font-bold'>
                                    Cart Items
                                </div>
                                {cartItems.map((item) => (
                                    <CartItem key={item.id} data={item} />
                                ))}
                            </div>
                            {/* Cart items end */}

                            {/* Summary start */}
                            <div className='flex-[1]'>
                                <div className='text-lg font-bold'>Summary</div>
                                <div className='p-5 my-5 bg-black/[0.1] rounded-xl'>
                                    <div className='flex justify-between'>
                                        <div className='uppercase text-md md:text-lg font-medium text-black'>
                                            Subtotal
                                        </div>
                                        <div className='text-green-600 text-md md:text-lg font-medium px-9'>
                                            &#36; {subTotal} USD
                                        </div>
                                    </div>
                                    <div className='text-sm md:text-md py-5 border-t mt-5'>
                                        The subtotal reflects the total price of
                                        your order, including duties and taxes,
                                        before any applicable discounts. It does
                                        not include delivery costs and
                                        international transaction fees.
                                    </div>
                                </div>

                                {/* Button start */}
                                <button
                                    className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center justify-center gap-2'
                                    onClick={handlePayment}
                                >
                                    Checkout
                                    {loading && <img src='/spinner.svg' />}
                                </button>
                                {/* Button end */}
                            </div>
                            {/* Summary end */}
                        </div>
                        {/* Cart content end */}
                    </>
                )}

                {/* Empty Screen start*/}
                {cartItems.length < 1 && (
                    <div className='flex-[2] flex flex-col items-center pb-[50px] md:mt-14'>
                        <Image
                            className='w-[300px] md:w-[400px]'
                            src='/empty-cart.jpg'
                            alt='empty-cart'
                            width={300}
                            height={300}
                        />
                        <span className='text-xl font-bold'>
                            Your cart is empty
                        </span>
                        <span className='text-center mt-4'>
                            Looks like you have not added anything in your cart.
                            <br />
                            Go ahead and explore top categories.
                        </span>
                        <Link
                            href='/'
                            className='py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-trasform active:scale-95 mb-3 hover:opacity-75 mt-8'
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
                {/* Empty Screen end*/}
            </Wrapper>
        </div>
    );
};

export default Cart;
