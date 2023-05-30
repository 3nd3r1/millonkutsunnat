import Form from "../components/form";
export default function Home() {
	return (
		<main className="mx-auto py-10 max-w-4xl ">
			<div className="mx-auto max-w-2xl p-6 rounded-lg bg-neutral-800">
				<h1 className="text-3xl mb-5">Milloin Kutsunnat?</h1>
				<Form />
			</div>
		</main>
	);
}
