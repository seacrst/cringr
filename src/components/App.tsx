import Chaos from './chaos/chaos'
import Credits from './credits/credits'
import Page from './page/page'

export const App = () => {

  return (
    <section className="screen">
      <Chaos/>
      <Page/>
      <Credits/>
    </section>
  )
}

export default App
