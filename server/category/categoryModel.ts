

export interface Category {
    name: string;
    value: string;
  }
  
  export interface PriceRange {
    name: string;
    value: string;
  }
  
  export interface Filters {
    categories: Category[];
    prices: PriceRange[];
  }
  
  export interface CategoriesData {
    filters: Filters;
  }
  