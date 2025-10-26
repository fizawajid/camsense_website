import { useEffect } from 'react'

const SEO = ({ 
  title = "Camsense - AI-Powered Security & Surveillance Solutions",
  description = "Revolutionary AI agent that transforms your CCTV system into an intelligent security powerhouse, detecting shoplifting in real-time with 99.7% accuracy. Smart surveillance for parking lots, retail stores, offices, universities, and homes.",
  keywords = "AI security, CCTV surveillance, shoplifting detection, parking lot safety, retail security, office safety, university security, home security, AI-powered monitoring, real-time alerts, crime prevention, intelligent surveillance",
  ogImage = "/logonew.png",
  ogUrl = "https://www.camsense.org",
  twitterHandle = "@camsense"
}) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to set meta tag
    const setMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Primary Meta Tags
    setMetaTag('title', title);
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('robots', 'index, follow');
    setMetaTag('language', 'English');
    setMetaTag('author', 'Camsense Team');
    setMetaTag('revisit-after', '7 days');

    // Open Graph / Facebook
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', ogUrl, true);
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', 'Camsense', true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image', true);
    setMetaTag('twitter:url', ogUrl, true);
    setMetaTag('twitter:title', title, true);
    setMetaTag('twitter:description', description, true);
    setMetaTag('twitter:image', ogImage, true);
    setMetaTag('twitter:creator', twitterHandle, true);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', ogUrl);

    // Organization Structured Data
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Camsense",
      "description": description,
      "url": ogUrl,
      "logo": ogImage,
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "muhammadsafiullah@gmail.com",
        "telephone": "+92-333-5160474",
        "contactType": "Customer Service"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "NICAT, J442+J68, Old Airport Rd, Old Chaklala Cantt",
        "addressLocality": "Rawalpindi",
        "postalCode": "46000",
        "addressCountry": "PK"
      },
      "sameAs": [
        "https://www.linkedin.com/company/camsense/",
        "https://www.instagram.com/camsense.ai"
      ]
    };

    // Product Structured Data
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Camsense AI Security System",
      "applicationCategory": "SecurityApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "operatingSystem": "Cloud-based",
      "description": "AI-powered security surveillance system with real-time threat detection and analytics"
    };

    // Add or update structured data scripts
    const addOrUpdateSchema = (id, schema) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    };

    addOrUpdateSchema('organization-schema', organizationSchema);
    addOrUpdateSchema('product-schema', productSchema);

  }, [title, description, keywords, ogImage, ogUrl, twitterHandle]);

  return null; // This component doesn't render anything
};

export default SEO