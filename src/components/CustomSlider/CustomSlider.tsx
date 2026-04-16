import React, { useEffect, useState } from 'react'
import styles from './CustomSlider.module.scss'

type Slide = {
    image: string
    link?: string
}

export interface CustomSliderProps {
    slides: Slide[]
    autoplay?: boolean
    interval?: number
}

export default function CustomSlider({
    slides = [],
    autoplay = true,
    interval = 4000,
}: CustomSliderProps) {
    const [current, setCurrent] = useState(0)

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    }

    useEffect(() => {
        if (!autoplay) return

        const timer = setInterval(() => {
            nextSlide()
        }, interval)

        return () => clearInterval(timer)
    }, [current, autoplay, interval])

    return (
        <div className={styles.slider}>
            <div
                className={styles.track}
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className={styles.slide}>
                        <a href={slide.link || '#'}>
                            <img src={slide.image} alt={`slide-${index}`} />
                        </a>
                    </div>
                ))}
            </div>

            <button className={`${styles.arrow} ${styles.left}`} onClick={prevSlide}>
                ‹
            </button>
            <button className={`${styles.arrow} ${styles.right}`} onClick={nextSlide}>
                ›
            </button>

            <div className={styles.dots}>
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${current === index ? styles.active : ''
                            }`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </div>
    )
}