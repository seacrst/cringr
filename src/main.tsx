import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store';

import "assets/styles/app.scss";
import Loader from './components/loader/loader.tsx';

const App = lazy(() =>import('./components/App.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loader/>}>
      <Provider store={store}>
        <App/>
      </Provider>
    </Suspense>
  </StrictMode>,
)
