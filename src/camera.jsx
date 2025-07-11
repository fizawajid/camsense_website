"use client"
import { useEffect, useRef } from "react"

const CameraScrollAnimation = () => {
  const cameraRef = useRef(null)
  const lensRef = useRef(null)
  const lastScrollY = useRef(0)
  const scrollDirection = useRef("down")
  const activeSection = useRef("")

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Determine scroll direction
      scrollDirection.current = currentScrollY > lastScrollY.current ? "down" : "up"
      lastScrollY.current = currentScrollY
      
      // Get current section
      const sections = ["home", "modules", "goals", "team", "location", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (currentScrollY >= offsetTop && currentScrollY < offsetTop + offsetHeight) {
            activeSection.current = section
            break
          }
        }
      }
      
      // Only animate if not on homepage
      if (activeSection.current !== "home" && cameraRef.current) {
        const scrollPercentage = (currentScrollY / document.body.scrollHeight) * 100
        
        // Move camera based on scroll direction
        if (scrollDirection.current === "down") {
          cameraRef.current.style.transform = `translate(${20 + scrollPercentage * 0.3}%, ${40 + scrollPercentage * 0.2}%) rotate(${scrollPercentage * 0.5}deg)`
        } else {
          cameraRef.current.style.transform = `translate(${20 + scrollPercentage * 0.3}%, ${40 + scrollPercentage * 0.2}%) rotate(-${scrollPercentage * 0.5}deg)`
        }
        
        // Pulse lens effect
        lensRef.current.style.transform = `translate(-50%, -50%) scale(${1 + Math.sin(currentScrollY * 0.01) * 0.2})`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="camera-container" id="camera-animation">
      <div className="camera-animation" ref={cameraRef}>
        <div className="camera-lens" ref={lensRef} />
      </div>
    </div>
  )
}

export default CameraScrollAnimation