
// src/libs/tracking/types.tracking.d.ts

// Extend the global namespace to recognize GTM-related properties
declare global {
  interface Window {
    gtag?: Gtag.Gtag
  }
}

declare namespace Gtag {
  interface Gtag {
    (...args: GtagFunctionArgs): void
  }

  type GtagFunctionArgs =
    | [GtagCommand, EventName | EventParams | CustomParams]
    | [GtagCommand, string, EventParams | CustomParams]

  type GtagCommand = 'config' | 'set' | 'js' | 'event' | 'consent'

  interface EventParams {
    [key: string]: unknown
  }

  interface CustomParams {
    [key: string]: unknown
  }

  type EventName = 'click' | 'submit' | 'purchase' | 'page_view' | 'screen_view'

  // Define a DTO for sending custom events
  type SendGAEventDto = {
    action: EventName
    category: string
    label: string
  }
}