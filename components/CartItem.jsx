import React from 'react';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { updateCart, removeFromCart } from '@/store/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({ data }) => {
    const p = data.attributes;
    const dispatch = useDispatch();

    const updateCartItem = (event, key) => {
        let payload = {
            key,
            val:
                key === 'quantity'
                    ? parseInt(event.target.value)
                    : event.target.value,
            id: data.id,
        };
        dispatch(updateCart(payload));
    };

    return (
        <div className='flex py-5 gap-3 md:gap-5 border-b'>
            {/* Image start */}
            <div className='shrink-0 aspect-square w-[50px] md:w-[120px]'>
                <Image
                    src={p.thumbnail.data.attributes.url}
                    alt={p.name}
                    width={120}
                    height={120}
                />
            </div>
            {/* Image end */}

            <div className='w-full flex flex-col'>
                <div className='flex flex-col md:flex-row justify-between'>
                    {/* Product Title start*/}
                    <div className='text-lg md:text-2xl font-semibold text-black/[0.8]'>
                        {p.name}
                    </div>
                    {/* Product Title start*/}

                    {/* Product Subtitle start*/}
                    <div className='text-base md:text-md font-medium text-black/[0.5] block md:hidden'>
                        {p.subname}
                        {/* <p className='text-sm font-medium line-through text-red-500'>
                            $26.99
                        </p>
                        <p className='ml-auto text-base font-medium text-green-500'>
                            20% off
                        </p> */}
                    </div>
                    {/* Product Subtitle end*/}

                    {/* Product Price start*/}
                    <div className='text-base md:text-md font-bold text-black/[0.5] mt-2'>
                        USD: &#36; {p.price}
                    </div>
                    {/* Product Price end*/}
                </div>

                {/* Product Subtitle start*/}
                <div className='text-sm md:text-md font-medium text-black/[0.5] hidden md:block'>
                    {p.subtitle}
                    {/* <p className='text-base font-medium line-through text-red-500'>
                        $26.99
                    </p>
                    <p className='ml-auto text-base font-medium text-green-500'>
                        20% off
                    </p> */}
                </div>
                {/* Product Subtitle end*/}

                <div className='flex items-center  justify-between mt-4'>
                    <div className='flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md'>
                        <div className='flex items-center gap-1'>
                            <div className='font-semibold'>Size:</div>
                            <select
                                className='hover:text-black'
                                onChange={(event) => {
                                    updateCartItem(event, 'selectedSize');
                                }}
                            >
                                {p.size.data.map((item, i) => (
                                    <option
                                        key={i}
                                        value={item.size}
                                        disabled={!item.enabled ? true : false}
                                        selected={
                                            data.selectedSize === item.size
                                        }
                                    >
                                        {item.size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex items-center gap-1'>
                            <div className='font-semibold'>Quantity:</div>
                            <select
                                className='hover:text-black'
                                onChange={(event) => {
                                    updateCartItem(event, 'quantity');
                                }}
                            >
                                {Array.from(
                                    { length: 10 },
                                    (_, i) => i + 1
                                ).map((q, i) => {
                                    return (
                                        <option
                                            key={i}
                                            value={q}
                                            selected={data.quantity === q}
                                        >
                                            {q}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <RiDeleteBin6Line
                        className='cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]'
                        onClick={() =>
                            dispatch(removeFromCart({ id: data.id }))
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default CartItem;
