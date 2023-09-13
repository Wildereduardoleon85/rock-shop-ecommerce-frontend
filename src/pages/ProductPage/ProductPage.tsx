import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from './ProductPage.module.scss'
import { Rating } from '../../components/Rating'
import { QtyButton } from '../../components'
import {
  addToCart,
  setAlert,
  setQty,
  useGetProductDetailsQuery,
} from '../../slices'
import { Button, Loader } from '../../components/UI'
import { Product } from '../../types'
import { BASE_URL, IMAGES_URL, ROUTES } from '../../constants'
import { RootState } from '../../store'
import { ErrorPage } from '..'

function ProductPage() {
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductDetailsQuery(productId as string)
  const fetchBaseQueryError = error as FetchBaseQueryError
  const { qty } = useSelector((state: RootState) => state.qty)

  useEffect(() => {
    dispatch(setQty(1))
  }, [])

  const onAddToCart = () => {
    dispatch(addToCart({ product: product as Product, qty }))
    dispatch(setAlert({ message: 'product added to the cart' }))
  }

  const onByuNow = () => {
    dispatch(addToCart({ product: product as Product, qty }))
    navigate(ROUTES.cart)
  }

  if (isLoading) {
    return <Loader />
  }

  if (fetchBaseQueryError) {
    return fetchBaseQueryError.status === 404 ? (
      <ErrorPage variant='not-found' />
    ) : (
      <ErrorPage />
    )
  }

  return (
    product && (
      <div className={styles.root}>
        <Link to={ROUTES.home}>
          <IoMdArrowRoundBack />
          Go Back
        </Link>

        <div className={styles.container}>
          <img
            width={636}
            height={506}
            src={`${BASE_URL}${IMAGES_URL}/${product.image}`}
            alt={product.name}
          />
          <div className={styles.details}>
            <h1>{product.name}</h1>
            <p className={styles.price}>${product.price}</p>
            <QtyButton className={styles.qtyButton} product={product} />
            <Button
              disabled={product.countInStock === 0}
              className={styles.addToCartButton}
              onClick={onAddToCart}
            >
              ADD TO CART
            </Button>
            <Button
              color='black'
              disabled={product.countInStock === 0}
              className={styles.buyNowButton}
              onClick={onByuNow}
            >
              BUY NOW
            </Button>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <h3>Description</h3>
            <p className={styles.description}>{product.description}</p>
          </div>
        </div>
      </div>
    )
  )
}

export default ProductPage
