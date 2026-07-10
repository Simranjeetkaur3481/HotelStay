type PricingRoom = {
  pricePerNight?: number | null;
  basePricePerNight?: number | null;
  dynamicPricePerNight?: number | null;
  priceDifference?: number | null;
  appliedPricingRules?: unknown[];
  appliedPromotionId?: number | null;
  appliedPromotionTitle?: string | null;
  appliedPromotionDisplayText?: string | null;
  promotionDiscountPerNight?: number | null;
};

export function getEffectiveRoomPricing(room: PricingRoom) {
  const base = room.basePricePerNight ?? room.pricePerNight ?? 0;
  const effective = room.dynamicPricePerNight ?? room.pricePerNight ?? base;
  const hasPromotion =
    !!room.appliedPromotionId ||
    !!room.appliedPromotionTitle ||
    !!room.appliedPromotionDisplayText ||
    (room.promotionDiscountPerNight ?? 0) > 0;
  const discountPerNight =
    room.promotionDiscountPerNight ??
    (base > effective ? base - effective : 0);
  const hasDiscount = base > effective || hasPromotion;

  return {
    basePrice: base,
    effectivePrice: effective,
    hasDiscount,
    hasPromotion,
    discountPerNight: Math.max(0, discountPerNight),
    promotionLabel:
      room.appliedPromotionDisplayText ||
      room.appliedPromotionTitle ||
      (hasDiscount ? "Special offer applied" : null),
    appliedRulesCount: room.appliedPricingRules?.length ?? 0,
  };
}
