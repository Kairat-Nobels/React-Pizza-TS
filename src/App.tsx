import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'
import Loadable from 'react-loadable';
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Layout from './Layout/Layout'
import './scss/app.scss';

// const Cart = React.lazy(() => import('./pages/Cart'))
const Cart = Loadable({
  loader: () => import('./pages/Cart'),
  loading: ()=> <div>Загрузка...</div>,
});
const FullPizza = React.lazy(() => import('./pages/FullPizza'))

function App()
{
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/cart' element={<Suspense fallback={<div>Загрузка...</div>}><Cart/></Suspense>} />
        <Route path='/pizza/:id' element={<Suspense fallback={<div>Загрузка...</div>}><FullPizza/></Suspense>} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
