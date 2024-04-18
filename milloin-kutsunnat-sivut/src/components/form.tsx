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
    [key: string]: string[][];
};

const Form = () => {
    const kutsunnat: KutsunnatType = kutsunnatData;
    const kunnat: OptionType[] = Object.keys(kutsunnat).map((k: string) => ({
        value: k,
        label: k.charAt(0).toUpperCase() + k.slice(1).toLowerCase(),
    }));
    const kielet: OptionType[] = [
        { value: "suomi", label: "Suomen kieli" },
        { value: "ruotsi", label: "Ruotsin kieli" },
    ];

    const [kunta, setKunta] = useState<OptionType | null>(null);
    const [sukunimi, setSukunimi] = useState("");
    const [kieli, setKieli] = useState("suomi");

    const [tulos, setTulos] = useState<string[] | null>(null);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!kunta || sukunimi == "") return;
        const sukualku = sukunimi.substring(0, 3).toLowerCase();

        const kutsumat = kutsunnat[kunta.value].filter((k) => k[3] === kieli);
        const kutsuma = kutsumat.find((k) => {
            const [start, end] = k[0].split("-");
            return sukualku >= start && sukualku <= end;
        });

        if (kutsuma) {
            setTulos(kutsuma);
        } else {
            setTulos([]);
        }
    };

    return (
        <div>
            <div>
                <h2 className="text-2xl my-5">Kutsuma-haku</h2>
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
                                        !kunta && "text-gray-400",
                                    ),
                                option: (state) =>
                                    clsx(
                                        "text-white focus:outline-none w-full p-2 !cursor-pointer",
                                        state.isSelected && "bg-neutral-500",
                                        state.isFocused &&
                                            !state.isSelected &&
                                            "bg-neutral-600 ",
                                    ),
                                menu: (state) =>
                                    "rounded-lg bg-neutral-700 py-2 mt-1",
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
                                        name="kieli"
                                        value={k.value}
                                        id={k.value}
                                        checked={kieli == k.value}
                                        className="hidden"
                                        onChange={(e) =>
                                            e.target.checked &&
                                            setKieli(k.value)
                                        }
                                    />
                                </label>
                            ))}
                        </div>
                        <input
                            type="submit"
                            value="Hae"
                            className="bg-green-700 hover:bg-green-600 rounded-lg shadow-md focus:shadow-lg px-3 py-2 cursor-pointer focus: outline-none"
                        />
                    </div>
                </form>
            </div>
            {tulos && (
                <div className="py-6">
                    <h2 className="text-2xl mb-5">Tulokset</h2>
                    <div className="bg-neutral-600 p-4 flex flex-col gap-2 rounded-sm text-lg">
                        {tulos.length <= 0 ? (
                            <p>Ei tuloksia</p>
                        ) : (
                            <div>
                                <p>
                                    <strong>Aakkoset: </strong> {tulos[0]}
                                </p>
                                <p>
                                    <strong>Ajankohta:</strong> {tulos[1]}{" "}
                                </p>
                                <p>
                                    <strong>Sijainti:</strong> {tulos[2]}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Form;
