import Script from "next/script";
export default function MyApp({ Component, pageProps }: any) {
	return (
		<>
			<Script
				id="Adsense-id"
				data-ad-client="ca-pub-8759085629417280"
				async
				strategy="afterInteractive"
				onError={(e) => {
					console.error("Script failed to load", e);
				}}
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8759085629417280"
				crossOrigin="anonymous"
			></Script>
			<Component {...pageProps} />
		</>
	);
}
