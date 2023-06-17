import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getDiscountedPricePercentage } from '@/utils/helper';

const ProductCard = ({ data: { attributes: p, id } }) => {
    return (
        <Link
            href={`/product/${p.slug}`}
            className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer'
        >
            <Image
                // className='w-full'
                width={500}
                height={500}
                src={p.thumbnail.data.attributes.url}
                alt={p.name}
                priority={true}
            />
            <div className='p-4 text-black/[0.9]'>
                <h2 className='text-lg font-medium'>{p.name}</h2>
                <div className='flex items-center text-black/[0.5]'>
                    <p className='mr-2 text-lg font-bold'>
                        MXN: &#36; {p.price}
                    </p>

                    {p.original_price && (
                        <>
                            <br />
                            <p className='text-base font-semibold line-through text-red-500'>
                                &#36; {p.original_price}
                            </p>
                            <p className='ml-auto text-base font-medium text-green-500'>
                                {getDiscountedPricePercentage(
                                    p.original_price,
                                    p.price
                                )}
                                % off
                            </p>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
