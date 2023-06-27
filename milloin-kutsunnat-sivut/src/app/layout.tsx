import Script from "next/script";
import "./globals.scss";
import { Oswald } from "next/font/google";

const font = Oswald({ subsets: ["latin"] });

export const metadata = {
	title: "Milloin Kutsunnat?",
	description: "Selvitä milloin kutsuntasi ovat.",
	themeColor: "#000000",
	openGraph: {
		title: "Milloin Kutsunnat?",
		description: "Selvitä milloin kutsuntasi ovat.",
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fi">
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
			<body className={font.className}>{children}</body>
		</html>
	);
}
