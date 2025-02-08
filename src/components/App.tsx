import Chaos from './chaos/chaos'
import Page from './page/page'
import Credits from './credits/credits'

export const App = () => {
  
  return (
    <div className="app">
        <section className="screen">
          <Chaos/>
          <Page/>
          <Credits/>
        </section>
    </div>
  )
}

export default App
