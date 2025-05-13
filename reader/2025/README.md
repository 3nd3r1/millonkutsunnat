# 2025 - Reader

This year instead of writing a reader for multiple hours, I decided to become a prompt engineer and make AI do it for me.

## The prompt

```md
# Prompt for Extracting Finnish Municipal Call-up Data

## Task Description

Extract military call-up schedule data from text files containing Finnish municipal call-up information. Parse this information into a structured JSON format that organizes schedules by municipality, alphabetical ranges, dates/times, locations, and language.

## Waiting Instructions

Provide text data containing Finnish municipal call-up schedules. The data may come in multiple parts. Process each part as received and integrate it into the complete result.

## Input Format

The input consists of text containing call-up schedules for Finnish municipalities. Each line typically contains:
- Municipality name
- Alphabetical range of surnames (like "A-Ö" or "Aaa-Hal")
- Date and time information
- Location details
- Sometimes language information (Finnish or Swedish)

Example input lines:
Helsinki AAA-ANS 17.11.2025 ma 08.45 Karjalatalo, Käpylänkuja 1, Helsinki
Helsinki, ruotsinkieliset AAA-LIA 8.12.2025 ma 08.45 Karjalatalo, Käpylänkuja 1, Helsinki

## Output Format

Transform the data into a nested JSON structure where:
- Top-level keys are municipality names in lowercase
- Values are arrays of arrays, where each inner array contains:
  1. The name range in lowercase (always in format like "aaa-ööö")
  2. Date and time in original format
  3. Location address
  4. Language ("suomi" or "ruotsi")

## Processing Rules

1. **Municipality Names**:
   - Convert all municipality names to lowercase
   - If a municipality name contains "ja", split it into separate entries
   - For entries like "Helsinki, ruotsinkieliset", use "helsinki" as the key

2. **Name Ranges**:
   - Convert all alphabetical ranges to lowercase
   - Keep the exact format from the original text (like "aaa-ans", "lei-ööö")
   - For entries with "Kaikki (AAA-ÖÖÖ)", convert to "aaa-ööö"

3. **Dates and Times**:
   - Keep the original date and time format
   - Include weekday abbreviation if present

4. **Location**:
   - Include the full location information with address

5. **Language**:
   - Set to "ruotsi" if the entry contains words like "ruotsinkieliset", "ruotsiksi", or "svenska"
   - Otherwise, set to "suomi"
   - This should be the fourth element in each inner array

6. **Handling Joint Municipalities**:
   - If a line mentions multiple municipalities (e.g., "Naantali ja Raisio"), create separate entries for each municipality
   - Both entries should have identical schedule information

7. **Special Case Handling**:
   - Ignore entries marked as "erikseen määrätyt" or similar

## Important Notes

- Use only your language model abilities to process this data. DO NOT use code to parse the input.
- Output ONLY the final JSON without any explanations, comments, or additional text.
- If you find any entries where you cannot determine all required information, omit them from the results.
- When processing large datasets, make sure to maintain the exact structure specified above.

## Example Output

{
  "helsinki": [
    ["aaa-ans", "17.11.2025 ma 08.45", "Karjalatalo, Käpylänkuja 1, Helsinki", "suomi"],
    ["ant-dou", "18.11.2025 ti 08.45", "Karjalatalo, Käpylänkuja 1, Helsinki", "suomi"],
    ["aaa-lia", "8.12.2025 ma 08.45", "Karjalatalo, Käpylänkuja 1, Helsinki", "ruotsi"],
    ["lib-ööö", "9.12.2025 ti 08.45", "Karjalatalo, Käpylänkuja 1, Helsinki", "ruotsi"]
  ]
}
```
