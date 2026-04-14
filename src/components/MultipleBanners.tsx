import React from "react"
import { renderDraftJS } from "../../utils/renderDraftJS"

import styles from "./MultipleBanners.module.css"

interface PromotionBanner {
  image: string
  link: string
  alt?: string
}

interface Props {
  banners: PromotionBanner[]
  columns?: number
  title?: string
}

const MultipleBanners: React.FC<Props> = ({
  banners = [],
  columns = 3,
  title,
}) => {

  //console.log("TITLE RAW:", title)

  return (
    <div className={styles.MultipleBanners_wrapper}>
      
      {/* 🧠 Título dinámico desde CMS (DraftJS) */}
      {title && (
        <div className={styles.MultipleBanners_title}>
          {renderDraftJS(title)}
        </div>
      )}

      {/* 🧱 Grid de banners */}
      <div
        className={styles.MultipleBanners_container}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {banners.map((banner, idx) => (
          <a
            key={idx}
            href={banner.link}
            className={styles.MultipleBanners_link}
          >
            <img
              className={styles.MultipleBanners_image}
              src={banner.image}
              alt={banner.alt ?? `Banner ${idx + 1}`}
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  )
}

export default MultipleBanners