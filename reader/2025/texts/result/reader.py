"""This was vibe coded with Claude"""

import json
from pathlib import Path


def merge_json_files(directory_path, output_file="kutsunnat.json"):
    """
    Reads all JSON files in a directory and merges them into a single file.
    Assumes JSON files have the structure {"key": {}} with multiple keys.

    Args:
        directory_path (str): Path to the directory containing JSON files
        output_file (str): Name of the output file (default: "kutsunnat.json")
    """
    merged_data = {}
    directory = Path(directory_path)

    # Check if directory exists
    if not directory.exists():
        print(f"Directory '{directory_path}' does not exist.")
        return

    # Find all JSON files in the directory
    json_files = list(directory.glob("*.json"))

    if not json_files:
        print(f"No JSON files found in '{directory_path}'")
        return

    print(f"Found {len(json_files)} JSON files to merge...")

    # Process each JSON file
    for json_file in json_files:
        try:
            print(f"Processing: {json_file.name}")

            with open(json_file, "r", encoding="utf-8") as f:
                data = json.load(f)

            # Check if the data is a dictionary
            if not isinstance(data, dict):
                print(
                    f"Warning: {json_file.name} does not contain a JSON object. Skipping."
                )
                continue

            # Merge the data
            for key, value in data.items():
                if key in merged_data:
                    print(
                        f"Warning: Key '{key}' already exists. Overwriting with data from {json_file.name}"
                    )
                merged_data[key] = value

        except json.JSONDecodeError as e:
            print(f"Error reading {json_file.name}: Invalid JSON format - {e}")
        except Exception as e:
            print(f"Error processing {json_file.name}: {e}")

    # Write merged data to output file
    if merged_data:
        output_path = directory / output_file
        try:
            with open(output_path, "w", encoding="utf-8") as f:
                json.dump(merged_data, f, indent=2, ensure_ascii=False)

            print(f"\nSuccessfully merged {len(merged_data)} keys into '{output_path}'")
            print(f"Merged keys: {list(merged_data.keys())}")

        except Exception as e:
            print(f"Error writing output file: {e}")
    else:
        print("No data to merge.")


def main():
    merge_json_files(".")

if __name__ == "__main__":
    main()
