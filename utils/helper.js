export const getDiscountedPricePercentage = (
    originalPrice,
    discountedPrice
) => {
    const discount = originalPrice - discountedPrice;
    const discountPercentage = (discount / originalPrice) * 100;

    // return discountPercentage.toFixed(2);
    return discountPercentage.toPrecision(2);
};
