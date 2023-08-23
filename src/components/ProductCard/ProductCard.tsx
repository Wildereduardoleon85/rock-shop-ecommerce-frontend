import { Link } from 'react-router-dom'
import styles from './ProductCard.module.scss'
import { Rating } from '../Rating'
import { subString } from '../../utils'
import { PRODUCT_CARD_STRING_LIMIT, ROUTES } from '../../constants'

type ProductCardProps = {
  product: {
    _id: string
    name: string
    image: string
    description: string
    brand: string
    category: string
    price: number
    countInStock: number
    rating: number
    numReviews: number
  }
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      className={styles.root}
      to={ROUTES.product.replace(':id', product._id)}
    >
      <img width={265} height={211} src={product.image} alt={product.name} />

      <h3 className={styles.productName}>
        {product.name.length > PRODUCT_CARD_STRING_LIMIT
          ? subString(product.name, PRODUCT_CARD_STRING_LIMIT)
          : product.name}
      </h3>

      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      <p className={styles.price}>${product.price}</p>
    </Link>
  )
}

export default ProductCard
