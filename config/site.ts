export const siteConfig = {
  name: "NIGHTSPIRE",
  description: "Premium NIGHTSPIRE Hoodies",

  // Contact information
  contact: {
    // Use environment variables with fallback to empty strings
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "your_whatsapp_number_here",
    email: process.env.NEXT_PUBLIC_EMAIL || "your_email_here",
    //instagram: "nightspire",
  },

  // Store information
  store: {
    currency: "MAD",
    currencySymbol: "DH",
  }
}
