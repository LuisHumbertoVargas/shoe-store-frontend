import React, { useState } from 'react';
import Wrapper from '@/components/Wrapper';
import ProductDetailsCarousel from '@/components/ProductDetailsCarousel';
import { IoMdHeartEmpty } from 'react-icons/io';
import RelatedProducts from '../../components/RelatedProducts';
import { fetchDataFromAPI } from '@/utils/api';
import { getDiscountedPricePercentage } from '@/utils/helper';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = ({ product, products }) => {
    const [selectedSize, setSelectedSize] = useState();
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const p = product?.data?.[0]?.attributes;

    const notify = () => {
        toast.success('Adding to cart', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    };

    return (
        <div className='w-full md:py-5 md:px-16'>
            <ToastContainer />
            <Wrapper>
                <div className='flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]'>
                    {/* left column start */}
                    <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0'>
                        <ProductDetailsCarousel images={p.image.data} />
                    </div>
                    {/* left column end */}

                    {/* right column start */}
                    <div className='flex-[1] py-3'>
                        {/* PRODUCT TITLE */}
                        <div className='text-[34px] font-semibold mb-2 leading-tight'>
                            {p.name}
                        </div>
                        {/* PRODUCT SUBTITLE */}
                        <div className='text-lg font-semibold mb-5'>
                            {/* Men&apos;s Golf Shoes */}
                            {p.subtitle}
                        </div>
                        {/* PRODUCT PRICE */}
                        <div className='flex items-center'>
                            <p className='mr-2 text-lg font-semibold'>
                                MXN: &#36; {p.price}
                            </p>
                            {p.original_price && (
                                <>
                                    <p className='text-base ml-2 font-semibold line-through text-red-600'>
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

                        <div className='text-md font-medium text-black/[0.5]'>
                            incl. taxes
                        </div>
                        <div className='text-md font-medium text-black/[0.5] mb-20'>
                            {`(Also includes all applicable duties)`}
                        </div>
                        {/* PRODUCT SIZE RANGE START */}
                        <div className='mb-10'>
                            {/* HEADING START */}
                            <div className='flex justify-between mb-2'>
                                <div className='text-md font-semibold'>
                                    Select Size
                                </div>
                                <div className='text-md font-medium text-black/[0.5] cursor-pointer'>
                                    Select Guide
                                </div>
                            </div>
                            {/* HEADING END */}
                            {/* SIZE START */}
                            <div
                                id='sizesGrid'
                                className='grid grid-cols-3 gap-2'
                            >
                                {p.size.data.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`border rounded-md text-center py-3 font-medium ${
                                            item.enabled
                                                ? 'hover:border-black cursor-pointer'
                                                : 'cursor-not-allowed bg-black/[0.1] opacity-50'
                                        } ${
                                            selectedSize === item.size
                                                ? 'border-black bg-green-600 text-white'
                                                : ''
                                        }`}
                                        onClick={() => {
                                            if (item.enabled) {
                                                setSelectedSize(item.size);
                                                setShowError(false);
                                            }
                                        }}
                                    >
                                        {item.size}
                                    </div>
                                ))}
                            </div>
                            {/* SIZE END */}
                            {/* SHOW ERROR START */}
                            {showError && (
                                <div className='text-red-600 mt-1'>
                                    *Size selection is required
                                </div>
                            )}
                            {/* SHOW ERROR END */}
                        </div>
                        {/* PRODUCT SIZE RANGE END */}

                        {/* ADD TO CART BUTTON START */}
                        <button
                            className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75'
                            onClick={() => {
                                if (!selectedSize) {
                                    setShowError(true);
                                    document
                                        .getElementById('sizesGrid')
                                        .scrollIntoView({
                                            block: 'center',
                                            behavior: 'smooth',
                                        });
                                } else {
                                    dispatch(
                                        addToCart({
                                            ...product?.data?.[0],
                                            selectedSize,
                                            oneQuantityPrice: p.price,
                                        })
                                    );
                                    notify();
                                }
                            }}
                        >
                            Add to Cart
                        </button>
                        {/* ADD TO CART BUTTON END */}
                        {/* WISHLIST BUTTON START */}
                        <button className='w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10'>
                            Wishlist
                            <IoMdHeartEmpty size={20} />
                        </button>
                        {/* WISHLITS BUTTON END */}

                        <div>
                            <div className='text-lg font-bold mb-5'>
                                Product Details
                            </div>
                            <div className='markdown text-md mb-5'>
                                <ReactMarkdown>{p.description}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    {/* right column end */}
                </div>
                <RelatedProducts products={products} />
            </Wrapper>
        </div>
    );
};

export default ProductDetails;

export const getStaticPaths = async () => {
    const products = await fetchDataFromAPI('/api/products?populate=*');

    const paths = products?.data?.map((p) => ({
        params: {
            slug: p.attributes.slug,
        },
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params: { slug } }) => {
    const product = await fetchDataFromAPI(
        `/api/products?populate=*&filters[slug][$eq]=${slug}`
    );

    const products = await fetchDataFromAPI(
        `/api/products?populate=*&[filters][slug][$ne]=${slug}`
    );

    return {
        props: {
            product,
            products,
        },
    };
};
