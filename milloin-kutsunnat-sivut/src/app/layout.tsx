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
			<body className={font.className}>{children}</body>
		</html>
	);
}
