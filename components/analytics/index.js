import GA from './GoogleAnalytics'
import Plausible from './Plausible'
import SimpleAnalytics from './SimpleAnalytics'
import siteMetadata from '@/data/siteMetadata'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { pageview } from './GoogleAnalytics'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      {isProduction && siteMetadata.analytics.plausibleDataDomain && <Plausible />}
      {isProduction && siteMetadata.analytics.simpleAnalytics && <SimpleAnalytics />}
      {isProduction && siteMetadata.analytics.googleAnalyticsId && <GA />}
    </>
  )
}

export default Analytics
