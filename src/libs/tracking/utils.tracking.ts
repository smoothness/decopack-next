// src/libs/tracking/utils.tracking.ts
'use client'

import { IS_GTM_ENABLED, trackingConfig } from '@/libs/tracking/config.tracking'
import type { Gtag, GtagEvent } from '@/libs/tracking/types.tracking'

function logGAWarning(message: string) {
  console.warn(`[Tracking] Warning: ${message}`)
}

function getGtag() {
  if (!IS_GTM_ENABLED) {
    logGAWarning('Google Analytics is not enabled')
    return null
  }
  if (!window.gtag) {
    logGAWarning('GTag does not exist')
    throw new Error('GTag does not exist')
  }
  return window.gtag
}

function withGtag(callback: (gtag: Gtag.Gtag) => void) {
  const gtag = getGtag()
  if (!gtag) return
  callback(gtag)
}

export function sendGAEvent(event: GtagEvent) {
  return withGtag((gtag) => {
    gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    })
  })
}

export function grantConsentForEverything() {
  return withGtag((gtag) => {
    gtag('consent', 'update', {
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      ad_storage: 'granted',
      analytics_storage: 'granted',
    })
  })
}

export function markFeatureUsage(feature: string) {
  return performance.mark('mark_feature_usage', {
    detail: { feature },
  })
}

export function pageview(url: string) {
  withGtag((gtag) => {
    gtag('config', trackingConfig.gtmId, {
      page_path: url,
    })
  })
}