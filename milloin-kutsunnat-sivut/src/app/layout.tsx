import Script from "next/script";
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
			<Script
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8759085629417280"
				crossOrigin="anonymous"
			></Script>
			<body className={font.className}>{children}</body>
		</html>
	);
}
