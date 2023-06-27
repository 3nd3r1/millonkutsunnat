<<<<<<< HEAD
import Script from "next/script";
=======
import Head from "next/head";
>>>>>>> bbc4bb8c8ad7a034f6d5b58ba2680db582869411
import "./globals.scss";
import { Oswald } from "next/font/google";

const font = Oswald({ subsets: ["latin"] });

export const metadata = {
	title: "Milloin Kutsunnat?",
	description: "Selvitä milloin kutsuntasi ovat.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fi">
<<<<<<< HEAD
			<Script
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8759085629417280"
				crossOrigin="anonymous"
			></Script>
=======
			<Head>
				<title>{metadata.title}</title>
				<meta name="description" content={metadata.description} />
				<meta name="theme-color" content="#000000" />
				<meta name="og:title" content={metadata.title} />
				<meta name="og:description" content={metadata.description} />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link sizes="any" rel="icon" href="/favicon.ico" />
				<link sizes="any" rel="shortcut icon" href="/favicon.ico" />
				<link sizes="any" rel="apple-touch-icon" href="/favicon.ico" />
			</Head>
>>>>>>> bbc4bb8c8ad7a034f6d5b58ba2680db582869411
			<body className={font.className}>{children}</body>
		</html>
	);
}
