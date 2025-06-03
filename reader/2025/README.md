# 2025 - Reader

This year instead of writing a reader for multiple hours, I decided to become a prompt engineer and make AI do it for me.

## The prompt

```md
# Finnish Military Call-up Schedule Parser

## Task Description
Extract military call-up schedule data from text files containing Finnish municipal call-up information. Parse this information into a structured JSON format that organizes schedules by municipality, alphabetical ranges, dates/times, locations, and language.

## Input Format
The input consists of text containing call-up schedules for Finnish municipalities. Each line typically contains:
* Municipality name
* Alphabetical range of surnames (like "A-Ö" or "Aaa-Hal")
* Date and time information
* Location details
* Sometimes language information (Finnish or Swedish)

Example input lines:
Helsinki AAA-ANS 17.11.2025 ma 08.45 Karjalatalo, Käpylänkuja 1, Helsinki
Helsinki, ruotsinkieliset AAA-LIA 8.12.2025 ma 08.45 Karjalatalo, Käpylänkuja 1, Helsinki

## Output Format
Transform the data into a nested JSON structure where:
* Top-level keys are municipality names in lowercase
* Values are arrays of arrays, where each inner array contains:
   1. The name range in lowercase (always in format like "aaa-ööö")
   2. Date and time in original format
   3. Location address
   4. Language ("suomi" or "ruotsi")

## Processing Rules
1. **Municipality Names**:
   * Convert all municipality names to lowercase
   * If a municipality name contains "ja", split it into separate entries
   * For entries like "Helsinki, ruotsinkieliset", use "helsinki" as the key

2. **Name Ranges**:
   * Convert all alphabetical ranges to lowercase
   * Always use a three-letter format at the beginning of a range (e.g., "a-" becomes "aaa-")
   * Always use "ööö" at the end when the range ends with "ö" or "Ö"
   * For entries with "Kaikki (AAA-ÖÖÖ)", convert to "aaa-ööö"

3. **Dates and Times**:
   * Keep the original date and time format
   * Maintain weekday abbreviation if present (ma, ti, ke, to, pe)

4. **Location**:
   * Include the full location information with address
   * If location is missing, use the most recent location from the same municipality

5. **Language**:
   * Set to "ruotsi" if the entry contains words like "ruotsinkieliset", "ruotsiksi", or "svenska"
   * Otherwise, set to "suomi"
   * This should be the fourth element in each inner array

6. **Handling Joint Municipalities**:
   * If a line mentions multiple municipalities (e.g., "Naantali ja Raisio"), create separate entries for each municipality
   * Both entries should have identical schedule information

7. **Special Case Handling**:
   * Ignore entries marked as "erikseen määrätyt" or similar

## Example Output
{
  "helsinki": [
    ["aaa-ans", "17.11.2025 ma 08.45", "Karjalatalo, Käpylänkuja 1, Helsinki", "suomi"],
    ["ant-dou", "18.11.2025 ti 08.45", "Karjalatalo, Käpylänkuja 1, Helsinki", "suomi"],
    ["aaa-lia", "8.12.2025 ma 08.45", "Karjalatalo, Käpylänkuja 1, Helsinki", "ruotsi"],
    ["lib-ööö", "9.12.2025 ti 08.45", "Karjalatalo, Käpylänkuja 1, Helsinki", "ruotsi"]
  ]
}

## Important Processing Notes
1. Do not use any programming or code to parse the data
2. Process the data using only natural language processing capabilities
3. Always ensure name ranges start with three letters (e.g., "a-" → "aaa-") 
4. Always use "ööö" at the end when the range ends with "ö" or "Ö"
5. Pay attention to comma-separated entries like "Naantali, ruotsinkieliset"
6. Handle semicolon delimiters in some lines properly
7. Return only the final JSON without explanations or comments
```
