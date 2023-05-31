"use client";
import { useState } from "react";
import kutsunnatData from "../data/kutsunnat.json";
import Select from "react-select";
import clsx from "clsx";

type OptionType = {
	value: string;
	label: string;
};

type KutsunnatType = {
	[key: string]: any;
};

const Form = () => {
	const kutsunnat: KutsunnatType = Object.entries(kutsunnatData);
	const kunnat: OptionType[] = kutsunnat.map((k: string) => ({
		value: k[0].toLowerCase(),
		label: k[0],
	}));
	const kielet: OptionType[] = [
		{ value: "suomi", label: "Suomen kieli" },
		{ value: "ruotsi", label: "Ruotsin kieli" },
	];

	const [kunta, setKunta] = useState<OptionType | null>(null);
	const [sukunimi, setSukunimi] = useState("");
	const [kieli, setKieli] = useState("suomi");

	const handleSubmit = (e: any) => {
		const alphVal = (val: string) => {
			const start = 0;
			const end = 0;
		};
		e.preventDefault();
		if (!kunta || sukunimi == "") return;

		const kutsumat = kutsunnat[kunta.value];

		console.log(kutsumat[0]);
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<div className="flex flex-col gap-2">
				<Select
					id="kunta"
					unstyled
					placeholder="Kunta.."
					classNames={{
						control: (state) =>
							clsx(
								"bg-neutral-700 rounded-lg focus:outline-none w-full p-2 shadow-md focus:shadow-lg",
								!kunta && "text-gray-400"
							),
						option: (state) =>
							clsx(
								"text-white focus:outline-none w-full p-2 !cursor-pointer",
								state.isSelected && "bg-neutral-500",
								state.isFocused &&
									!state.isSelected &&
									"bg-neutral-600 "
							),
						menu: (state) => "rounded-lg bg-neutral-700 py-2 mt-1",
					}}
					options={kunnat}
					value={kunta}
					onChange={(val) => {
						val ? setKunta(val) : setKunta(kunnat[0]);
					}}
				/>
				<input
					className="bg-neutral-700 rounded-lg focus:outline-none shadow-md focus:shadow-lg w-full p-2"
					type="text"
					placeholder="Sukunimi"
					value={sukunimi}
					onChange={(e) => setSukunimi(e.target.value)}
				/>
				<div className="flex flex-row justify-center bg-neutral-700 rounded-lg shadow-md focus:shadow-lg px-3">
					{kielet.map((k) => (
						<label
							key={k.value}
							className={`${
								kieli == k.value
									? "bg-neutral-600"
									: "bg-neutral-700"
							} p-2 w-full flex justify-center gap-2 cursor-pointer`}
							htmlFor={k.value}
						>
							{k.label}
							<input
								type="radio"
								value={k.value}
								name="kieli"
								id={k.value}
								checked={kieli == k.value}
								onChange={(e) =>
									e.target.checked && setKieli(k.value)
								}
							/>
						</label>
					))}
				</div>
				<input
					type="submit"
					value="Hae"
					className="bg-purple-700 hover:bg-purple-600 rounded-lg shadow-md focus:shadow-lg px-3 py-2 cursor-pointer focus: outline-none"
				/>
			</div>
		</form>
	);
};

export default Form;
