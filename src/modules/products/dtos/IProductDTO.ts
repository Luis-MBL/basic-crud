export interface ICreateProductDTO {
  name: string;
  quantity: number;
  is_active: boolean;
  price?: number;
  description?: string;
  info?: Record<string, unknown>;
}

export type IGetProductDTO = {
  product_id: string;
};

export interface IUpdateProductDTO {
  name?: string;
  quantity?: number;
  is_active?: boolean;
  price?: number | null;
  description?: string | null;
  info?: Record<string, unknown>;
}

export type IListProductDTO = {
  name?: string;
  is_active?: boolean;
  search?: string;
  quantity_lt?: number;
  quantity_gt?: number;
  price_lt?: number;
  price_gt?: number;
  limit?: number;
  offset?: number;
};

export interface IUpdateStatusProductDTO {
  product_id: string;
  is_active: boolean;
}
