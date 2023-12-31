export type Product = {
  _id: string
  name: string
  images: {
    default: string
    md?: string
  }
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
  reviews?: Review[]
  user: string
}

export interface CartItem extends Product {
  qty: number
}

export type Response<T> = {
  data: T
  error: unknown
  statusCode?: number
}

export type Review = {
  _id: string
  user: string
  name: string
  rating: number
  comment: string
  createdAt: Date
}

export type User = {
  name: string
  email: string
  password: string
  isAdmin: boolean
}

export type ErrorPageEnums = 'not-found' | 'internal-server-error'

export type ErrorPageConfig = {
  [key in ErrorPageEnums]: {
    code: string
    title: string
    message: string
  }
}

export type RouteEnums =
  | 'home'
  | 'product'
  | 'cart'
  | 'login'
  | 'register'
  | 'shipping'
  | 'payment'
  | 'placeOrder'
  | 'order'
  | 'profile'
  | 'orderList'
  | 'productList'
  | 'userList'
  | 'productEdit'
  | 'userEdit'
  | 'search'

export type Routes = {
  [key in RouteEnums]: string
}

export type ShippingAddress = {
  address: string
  city: string
  country: string
  postalCode: string
}

export type CartState = {
  cartItems: CartItem[]
  itemsPrice: number
  paymentMethod: string
  shippingAddress: ShippingAddress
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}

export type Validation = {
  isValid: boolean
  error: string
}

export type UseInput = {
  value: string
  error: string
  isValid: boolean
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onBlur: () => void
  reset: () => void
  onFocus: () => void
}

export type FormInputDefaultAttrs = {
  name: string
  type: string
  placeholder: string
  label: string
}

export interface FormInputDynamicAttrs extends FormInputDefaultAttrs {
  error: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  value: string
}

export type FormAttrsByName = {
  [char: string]: {
    error: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
    value: string
  }
}

export type UserInfo = {
  _id: string
  name: string
  email: string
  isAdmin: boolean
}

export type AuthState = UserInfo | null

export type LoginCredentials = {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
}

export type OrderItems = {
  name: string
  qty: number
  images: {
    default: string
    md?: string
  }
  price: number
  product: string
}

export type Order = {
  orderItems: OrderItems[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  isPaid: boolean
  paidAt: Date
}

export interface OrderItemsResponse extends OrderItems {
  _id: string
}

export type OrderResponse = {
  user:
    | string
    | {
        _id: string
        name: string
      }
  orderItems: OrderItemsResponse[]
  paymentMethod: string
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
  _id: string
  createdAt: Date
  updatedAt: Date
  __v: number
  paidAt: Date
  deliveredAt: Date
}

export interface ShippingAddressResponse extends ShippingAddress {
  _id: string
}

export type OrderDetailsResponse = {
  _id: string
  user: {
    _id: string
    name: string
    email: string
  }
  orderItems: OrderItemsResponse[]
  shippingAddress: ShippingAddressResponse
  paymentMethod: string
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export type UpdateProfileCredentials = {
  name: string
  email: string
  password?: string
  confirmPassword?: string
}

export interface UpdateUserCredentials extends UpdateProfileCredentials {
  isAdmin?: boolean
  userId: string
}

export type VariantEnums = 'success' | 'error' | 'productAddedToCart'

export type InputConfig = {
  initialValue: string
  name: string
  type: string
  placeholder: string
  label: string
  readOnly?: boolean
  validation?: {
    validateFunction: (value: any, opts: ValidateOptions) => Validation
    opts: ValidateOptions
  }
  maskFunction?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void
  ) => void
  onBlur?: () => void
  onFocus?: () => void
}[]

export type ValidateOptions = {
  required?: boolean
  min?: number
  max?: number
  regex?: RegExp
  alphanum?: boolean
  currency?: boolean
  numeric?: boolean
  email?: boolean
  password?: boolean
  alphabetic?: boolean
  matchWithValue?: any
  messages?: {
    [key: string]: string
  }
}

export type AlertVariant = 'success' | 'error'
