"use client";
import { useState } from "react";

const Contact = () => {
	const [isCopied, setIsCopied] = useState(false);

	return (
		<div className="flex mt-3 justify-center">
			<button
				className="text-green-600 hover:text-green-500"
				onClick={(e) => {
					navigator.clipboard.writeText("ender.spam.guru@gmail.com");
					setIsCopied(true);
					setTimeout(() => setIsCopied(false), 2000);
				}}
			>
				<p>{isCopied ? "Kopioitu" : "Ota yhteyttä"}</p>
			</button>
		</div>
	);
};

export default Contact;
