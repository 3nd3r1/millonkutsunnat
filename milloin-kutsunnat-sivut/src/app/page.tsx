import { FaSearchLocation } from "react-icons/fa";
export default function Home() {
	return (
		<main className="mx-auto py-10 max-w-4xl ">
			<div className="mx-auto max-w-2xl p-6 rounded-lg bg-neutral-800">
				<h1 className="text-3xl mb-5">Milloin Kutsunnat?</h1>
				<div className="flex flex-col">
					<div className="flex flex-row items-center bg-neutral-700 rounded-lg px-3">
						<FaSearchLocation />
						<select
							id="kunta"
							className="bg-inherit rounded-lg p-2 focus:outline-none w-full "
						>
							<option value="1">1</option>
							<option value="2">2</option>
						</select>
					</div>
				</div>
			</div>
		</main>
	);
}
