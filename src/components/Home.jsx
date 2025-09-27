import React from 'react'
import Hero from './Hero'
import TopBrands from './TopBrands'
import SliderPageTwo from './SliderPageTwo'
import FootballCollection from './TopOfferCollection'
import BuyAndSell from './BuyAndSell'
import HeroSection from './HeroSection'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'

const Home = () => {
  return (
    <>
      <HeroSection/>
      <Hero />
      <TopBrands />
      <SliderPageTwo />
      <FootballCollection />
      <BuyAndSell />
      <AboutUs/>
      <ContactUs/>
    </>
  )
}

export default Home
