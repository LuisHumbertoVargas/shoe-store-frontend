import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import Wrapper from '@/components/Wrapper';
import { fetchDataFromAPI } from '@/utils/api';

export default function Home({ products }) {
    // console.log(products);
    return (
        <main className='mx-auto md:mx-32'>
            <HeroBanner />
            <Wrapper>
                {/* Heading and Paragraph start */}
                <div className='text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]'>
                    <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
                        Cushioning for you Miles
                    </div>
                    <div className='text-md md:text-xl'>
                        A lightweight Nike ZoomX midsole is combined with
                        incrased stack heights to help provide cushioning during
                        extended stretches of running
                    </div>
                </div>
                {/* Heading and Paragraph end */}

                {/* Products grid start */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0'>
                    {products?.data?.map((product) => (
                        <ProductCard key={product?.id} data={product} />
                    ))}
                </div>
                {/* Products grid end */}
            </Wrapper>
        </main>
    );
}

export const getStaticProps = async () => {
    const products = await fetchDataFromAPI('/api/products?populate=*');

    return {
        props: { products },
    };
};
