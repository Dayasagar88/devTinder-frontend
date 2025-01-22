import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import SignUpForm from "./components/SignUpForm";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Hero from "./components/Hero";


export default function App() {
  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Hero/>}/>
          <Route path="/signup" element={<SignUpForm/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}