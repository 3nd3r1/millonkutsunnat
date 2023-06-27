import Link from "next/link";
import Form from "@/components/form";
import Contact from "@/components/contact";

export default function Home() {
	return (
		<main className="mx-auto py-10 max-w-4xl ">
			<div className="mx-auto max-w-2xl p-6 rounded-lg bg-neutral-800">
				<h1 className="text-3xl mb-5">Milloin Kutsunnat?</h1>
				<p>
					Selvitä kutsuntojesi ajankohta ja paikka nopeasti tältä
					sivulta.
					<span className="font-bold"> Milloin Kutsunnat</span> on
					suunniteltu tarjoamaan nopeaa ja helppoa tietoa henkilöille,
					jotka odottavat kutsuntoja. Sivusto kerää kutsuntatietoja{" "}
					<Link href="https://intti.fi/kutsunnat">intti.fi</Link>
					-sivulta.
				</p>
				<h2 className="text-2xl my-2">Huomioita:</h2>
				<ul className="list-disc list-inside">
					<li>Kutsuntatiedot koskevat 2023 syksyn kutsuntoja.</li>
					<li>
						<strong>Milloin Kutsunnat</strong> ei ole virallinen
						puolustusvoimien sivusto.
					</li>
					<li>
						Tiedot eivät ole aina oikein. On suositeltavaa tarkistaa
						omat kutsuntatiedot{" "}
						<Link href="https://intti.fi/kutsunnat/">intti.fi</Link>
						-sivulta.
					</li>
				</ul>
				<Form />
				<Contact />
			</div>
		</main>
	);
}
