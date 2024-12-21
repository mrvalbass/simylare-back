interface ListingImage {
  listing_id: number;
  listing_image_id: number;
  hex_code: string;
  red: number;
  green: number;
  blue: number;
  hue: number;
  saturation: number;
  brightness: number;
  is_black_and_white: boolean;
  creation_tsz: number;
  created_timestamp: number;
  rank: number;
  url_75x75: string;
  url_170x135: string;
  url_570xN: string;
  url_fullxfull: string;
  full_height: number;
  full_width: number;
  alt_text: string;
}

interface Price {
  amount: number;
  divisor: number;
  currency_code: string;
}

interface ShippingProfileDestination {
  shipping_profile_destination_id: number;
  shipping_profile_id: number;
  origin_country_iso: string;
  destination_country_iso: string;
  destination_region: string;
  primary_cost: Price;
  secondary_cost: Price;
  shipping_carrier_id: number;
  mail_class: string;
  min_delivery_days: number;
  max_delivery_days: number;
}

interface ShippingProfileUpgrade {
  shipping_profile_id: number;
  upgrade_id: number;
  upgrade_name: string;
  type: string;
  rank: number;
  language: string;
  price: Price;
  secondary_price: Price;
  shipping_carrier_id: number;
  mail_class: string;
  min_delivery_days: number;
  max_delivery_days: number;
}

interface ShippingProfile {
  shipping_profile_id: number;
  title: string;
  user_id: number;
  min_processing_days: number;
  max_processing_days: number;
  processing_days_display_label: string;
  origin_country_iso: string;
  is_deleted: boolean;
  shipping_profile_destinations: ShippingProfileDestination[];
  shipping_profile_upgrades: ShippingProfileUpgrade[];
  origin_postal_code: string;
  profile_type: string;
  domestic_handling_fee: number;
  international_handling_fee: number;
}

interface ProductionPartner {
  production_partner_id: number;
  partner_name: string;
  location: string;
}

export interface Listing {
  listing_id: number;
  user_id: number;
  shop_id: number;
  title: string;
  description: string;
  state: string;
  creation_timestamp: number;
  created_timestamp: number;
  ending_timestamp: number;
  original_creation_timestamp: number;
  last_modified_timestamp: number;
  updated_timestamp: number;
  state_timestamp: number;
  quantity: number;
  shop_section_id: number;
  featured_rank: number;
  url: string;
  num_favorers: number;
  non_taxable: boolean;
  is_taxable: boolean;
  is_customizable: boolean;
  is_personalizable: boolean;
  personalization_is_required: boolean;
  personalization_char_count_max: number;
  personalization_instructions: string;
  listing_type: string;
  tags: string[];
  materials: string[];
  shipping_profile_id: number;
  return_policy_id: number;
  processing_min: number;
  processing_max: number;
  who_made: string;
  when_made: string;
  is_supply: boolean;
  item_weight: number;
  item_weight_unit: string;
  item_length: number;
  item_width: number;
  item_height: number;
  item_dimensions_unit: string;
  is_private: boolean;
  style: string[];
  file_data: string;
  has_variations: boolean;
  should_auto_renew: boolean;
  language: string;
  price: Price;
  taxonomy_id: number;
  shipping_profile: ShippingProfile;
  production_partners: ProductionPartner[];
  skus: string[];
  views: number;
  shop: null;
  images: ListingImage[];
  videos: null;
  user: null;
  translations: null;
  inventory: null;
}

export interface ListingResponse {
  count: number;
  results: Listing[];
}
