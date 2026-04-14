import React, { useEffect, useState, useRef } from "react"
import styles from "./NanoBarSlider.module.css"

import { renderDraftJS } from "../../utils/renderDraftJS"

interface Props {
  messages: string[]
  interval?: number
  direction?: "rtl" | "ltr"
}

const NanoBarSlider: React.FC<Props> = ({
  messages = [],
  interval = 3,
  direction = "rtl",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === messages.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? messages.length - 1 : prev - 1
    )
  }

  useEffect(() => {
    if (!messages.length || isPaused) return

    timeoutRef.current = setTimeout(() => {
      nextSlide()
    }, interval * 1000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex, isPaused, interval, messages])

  if (!messages.length) return null

  return (
    <div
      className={styles.NanoBarSlider_container}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Flecha izquierda */}
      <button
        className={styles.NanoBarSlider_arrow}
        onClick={prevSlide}
      >
        ‹
      </button>

      {/* Contenido */}
      <div className={styles.NanoBarSlider_viewport}>
        <div
          className={`${styles.NanoBarSlider_track} ${
            direction === "rtl"
              ? styles.slideRTL
              : styles.slideLTR
          }`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={styles.NanoBarSlider_slide}
            >
              {renderDraftJS(msg)}
            </div>
          ))}
        </div>
      </div>

      {/* Flecha derecha */}
      <button
        className={styles.NanoBarSlider_arrow}
        onClick={nextSlide}
      >
        ›
      </button>

      {/* Dots */}
      <div className={styles.NanoBarSlider_dots}>
        {messages.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${
              idx === currentIndex ? styles.active : ""
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  )
}

export default NanoBarSlider