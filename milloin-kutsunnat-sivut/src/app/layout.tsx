import Script from "next/script";
import "./globals.scss";
import { Oswald } from "next/font/google";
import Link from "next/link";
import { Metadata } from "next";

const font = Oswald({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Milloin Kutsunnat?",
	description:
		"Selvitä milloin intti kutsuntasi ovat, ja valmistaudu armeijan palvelukseen.",
	keywords: [
		"armeija",
		"kutsunnat",
		"intti",
		"palvelus",
		"aamuja",
		"kutsuntapäivä",
	],
	category: "army",
	creator: "Vebbi",
	colorScheme: "light",
	metadataBase: new URL("https://millonkutsunnat.fi/"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Milloin Kutsunnat?",
		description:
			"Selvitä milloin intti kutsuntasi ovat, ja valmistaudu armeijan palvelukseen.",
		url: "https://millonkutsunnat.fi/",
		siteName: "Milloin Kutsunnat?",
		images: ["/images/kutsunnat-banner.jpg"],
		locale: "fi_FI",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Milloin Kutsunnat?",
		description:
			"Selvitä milloin intti kutsuntasi ovat, ja valmistaudu armeijan palvelukseen.",
		creator: "@vebbifi",
		creatorId: "1671053312160923651",
		siteId: "1671053312160923651",
		images: ["/images/kutsunnat-banner.jpg"],
	},
	icons: {
		icon: [{ url: "/favicon.ico" }],
		shortcut: "/favicon.ico",
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
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8759085629417280"
				crossOrigin="anonymous"
			></Script>
			<Script type="application/ld+json" id="schema-org">
				{`{
					"@context": "http://schema.org",
					"@graph": [
						{
							"@type": "WebSite",
							"@id": "https://millonkutsunnat.fi/",
							"name": "Milloin Kutsunnat",
							"description": "Selvitä milloin intti kutsuntasi ovat, ja valmistaudu armeijan palvelukseen.",
							"url": "https://millonkutsunnat.fi/",
							"logo": "https://millonkutsunnat.fi/images/kutsunnat-banner.jpg",
							"inLanguage": "fi",
							"datePublished": "2023-06-27T12:00:00+03:00",
							"thumbnailUrl": "https://millonkutsunnat.fi/images/kutsunnat-banner.jpg",
							"sameAs": [
								"https://www.instagram.com/vebbi.fi/",
								"https://www.linkedin.com/company/vebbi/",
								"https://www.tiktok.com/@vebbifi",
								"https://www.facebook.com/vebbifi"
							]
						}
					]
				}`}
			</Script>
			<body className={font.className}>
				{children}

				<footer className="w-full absolute bottom-0">
					<p className="absolute right-4 sm:bottom-2">
						Powered by{" "}
						<Link
							className="font-bold text-green-500"
							href="https://vebbi.fi"
							target="_blank"
						>
							Vebbi
						</Link>
					</p>
				</footer>
			</body>
		</html>
	);
}
