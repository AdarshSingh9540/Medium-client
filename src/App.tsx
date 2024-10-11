import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import Blogs from './pages/Blogs'
import { Publish } from './pages/Publish'
import { Ai } from './pages/Ai'
import LandingPage from './components/HeroSection'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage/>} /> 
          <Route path="signup" element={<Signup />} /> 
          <Route path="signin" element={<Signin />} />
          <Route path="blog/:id" element={<Blog />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="publish" element={<Publish />} />
          <Route path="ai" element={<Ai />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
