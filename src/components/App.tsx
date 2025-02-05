import { lazy, Suspense } from 'react'
import Loader from './loader/loader'

const Chaos = lazy(() => import("./chaos/chaos"))
const Credits = lazy(() => import("./credits/credits"))
const Page = lazy(() => import("./page/page"))

export const App = () => {

  return (
    <div className="app">
      <Suspense fallback={<Loader/>}>
        <section className="screen">
          <Chaos/>
          <Page/>
          <Credits/>
        </section>
      </Suspense>
    </div>
  )
}

export default App
