import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  noindex?: boolean;
}

export default function SEO({
  title = 'Phone Number Lookup Tool | Verify & Get Carrier Information',
  description = 'Free phone number lookup tool. Get instant access to network provider details, country information, and carrier data. Fast, reliable, and easy to use.',
  keywords = 'phone number lookup, carrier lookup, network provider, phone verification, HLR lookup, phone number validation',
  ogImage = '/images/DavidOnwuli.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
}: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Phone Number Lookup Tool" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@OnwuliDavi79772" />
      <meta name="twitter:creator" content="@OnwuliDavi79772" />

      {/* Additional Meta Tags */}
      <meta name="author" content="David Onwuli" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
  );
} 