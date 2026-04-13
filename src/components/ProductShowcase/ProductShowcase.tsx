import Link from 'next/link'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'
import styles from './product-showcase.module.scss'

type ProductShowcaseProps = {
  title?: string
  productClusterIds?: string
  first?: number
}

function formatPrice(value?: number) {
  if (typeof value !== 'number') return null

  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    maximumFractionDigits: 0,
  }).format(value)
}

function getProductImage(product: any) {
  return (
    product?.image?.[0]?.url ??
    product?.images?.[0]?.url ??
    product?.isVariantOf?.image?.[0]?.url ??
    ''
  )
}

function getProductName(product: any) {
  return product?.name ?? product?.isVariantOf?.name ?? 'Producto'
}

function getProductLink(product: any) {
  return product?.link ?? (product?.slug ? `/${product.slug}/p` : '#')
}

function getPrices(product: any) {
  const current =
    product?.offers?.lowPrice ??
    product?.offers?.offers?.[0]?.price ??
    null

  const original =
    product?.offers?.highPrice ??
    product?.offers?.offers?.[0]?.listPrice ??
    null

  return { current, original }
}

function getDiscountPercent(product: any) {
  const { current, original } = getPrices(product)

  if (
    typeof current !== 'number' ||
    typeof original !== 'number' ||
    original <= current
  ) {
    return null
  }

  return Math.round(((original - current) / original) * 100)
}

function ProductShowcase({
  title = 'Productos destacados',
  productClusterIds,
  first = 5,
}: ProductShowcaseProps) {
  const variables: any = { first }

  if (productClusterIds) {
    variables.selectedFacets = [
      {
        key: 'productClusterIds',
        value: String(productClusterIds),
      },
    ]
  }

  const products = useProductsQuery(variables)
  const edges = products?.search?.products?.edges ?? []

  return (
    <section className={styles.productShowcase}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.grid}>
        {edges.map(({ node }) => {
          const image = getProductImage(node)
          const name = getProductName(node)
          const link = getProductLink(node)
          const { current } = getPrices(node)
          const discount = getDiscountPercent(node)

          return (
            <article key={node.id} className={styles.card}>
              <Link href={link} className={styles.imageLink}>
                <div className={styles.imageWrapper}>
                  {discount ? (
                    <span className={styles.discountBadge}>
                      DESC {discount}%
                    </span>
                  ) : null}

                  {image ? (
                    <img src={image} alt={name} className={styles.image} />
                  ) : (
                    <span className={styles.imageFallback}>Sin imagen</span>
                  )}
                </div>
              </Link>

              <Link href={link} className={styles.nameLink}>
                <h3 className={styles.productName}>{name}</h3>
              </Link>

              <p className={styles.price}>
                {formatPrice(current ?? undefined) ?? 'Sin precio'}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ProductShowcase