export const GA_TRACKING_ID = 'UA-XXXXXXXXX-X' // This is your GA Tracking ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageView = (url: string) => {
  if(!(window as any).gtag) return;
  (window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = ({ action, category, label, value }: any) => {
  if(!(window as any).gtag) return;
  (window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

const gtag = {
  pageView,
  event
}

export default gtag;