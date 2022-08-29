import defaultSettings from '@/settings'

const title = 'Rclack' 

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
