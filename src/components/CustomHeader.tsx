import React from 'react'
import { Icon } from '@faststore/ui'
import styles from './CustomHeader.module.scss'

type LinkItem = {
  label: string
  href?: string
  children?: LinkItem[]
}

export interface CustomHeaderProps {
  logoText: string
  searchPlaceholder: string
  loginLabel: string
  actionLabel: string
  minicartLabel: string
  icon: 'User' | 'Heart' | 'Bell'
  links?: LinkItem[]
}

export default function CustomHeader({
  logoText,
  searchPlaceholder,
  loginLabel,
  actionLabel,
  minicartLabel,
  icon,
  links = [],
}: CustomHeaderProps) {
  return (
    <header style={{ borderBottom: '1px solid #ddd', background: '#fff' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr auto auto auto',
          gap: '12px',
          alignItems: 'center',
          padding: '16px 24px',
        }}
      >
        <a
          href="/"
          style={{
            fontSize: '20px',
            fontWeight: 700,
            textDecoration: 'none',
            color: '#020202',
          }}
        >
          {logoText}
        </a>

        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder={searchPlaceholder}
            style={{
              width: '100%',
              height: '52px',
              padding: '0 52px 0 16px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
          <span
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '24px',
              lineHeight: 1,
            }}
          >
            ⌕
          </span>
        </div>

        <a
          href="/login"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#111',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          <Icon name={icon} />
          <span>{loginLabel}</span>
        </a>

        {/* <a
         href="/benefits"
         style={{
            textDecoration: 'none',
            color: '#111',
            fontWeight: 500,
            padding: '10px 14px',
            border: '1px solid #111',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
         }}
        >
         {actionLabel}
        </a> */}

        <a
          href="/cart"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0px',
            textDecoration: 'none',
            color: '#111',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            flexDirection: 'column'
          }}
        >
          <span
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 7L7.2 19H16.8L18 7H6Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M9 9V6.8C9 5.25 10.35 4 12 4C13.65 4 15 5.25 15 6.8V9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>

            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                minWidth: '20px',
                height: '20px',
                borderRadius: '999px',
                background: '#000',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                lineHeight: 1,
                padding: '0 4px',
              }}
            >
              1
            </span>
          </span>

          <span>{minicartLabel}</span>
        </a>
      </div>
      <nav className={styles.menu}>
        {links.map((item) => (
          <div key={item.label} className={styles.menuItem}>
            <a href={item.href}>{item.label}</a>

            {item.children && (
              <div className={styles.submenu}>
                {item.children.map((sub) => (
                  <a key={sub.label} href={sub.href}>
                    {sub.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </header>
  )
}