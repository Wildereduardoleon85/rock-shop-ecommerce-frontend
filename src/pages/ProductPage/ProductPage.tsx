import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from './ProductPage.module.scss'
import { Rating } from '../../components/Rating'
import { ProductBanner, QtyButton } from '../../components'
import { addToCart, useGetProductDetailsQuery } from '../../slices'
import { ErrorPage, Loader } from '../../components/UI'
import { Product } from '../../types'
import { RootState } from '../../store'

function ProductPage() {
  const { id: productId } = useParams()
  const dispatch = useDispatch()
  const { qty } = useSelector((state: RootState) => state.qty)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const {
    data: product,
    error,
    isLoading,
  } = useGetProductDetailsQuery(productId as string)
  const fetchBaseQueryError = error as FetchBaseQueryError

  function onAddToCart() {
    dispatch(addToCart({ product: product as Product, qty }))
    setShowAlert(true)
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
        <ProductBanner product={product} showAlert={showAlert} />
        <Link to='/'>
          <IoMdArrowRoundBack />
          Go Back
        </Link>
        <div className={styles.container}>
          <img
            width={636}
            height={506}
            src={product.image}
            alt={product.name}
          />
          <div className={styles.details}>
            <h1>{product.name}</h1>
            <p className={styles.price}>${product.price}</p>
            <QtyButton countInStock={product.countInStock} />
            <button
              disabled={product.countInStock === 0}
              type='button'
              className={styles.addToCartButton}
              onClick={onAddToCart}
            >
              add to cart
            </button>
            <button
              disabled={product.countInStock === 0}
              type='button'
              className={styles.buyNowButton}
            >
              buy now
            </button>
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
