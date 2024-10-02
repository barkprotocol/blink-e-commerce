import { ToastProvider } from '@/components/ui/use-toast'

function BlinkCommerceApp({ Component, pageProps }) {
    return (
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    )
  }

export default BlinkCommerceApp