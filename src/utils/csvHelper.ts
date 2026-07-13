import fs from "fs"; //fs - file system
import {parse} from 'csv-parse/sync';

export class CsvHelper{

    static readCSV(filePath: string): Record<string, string>[]{
        return parse(fs.readFileSync(filePath, "utf-8"), {
            columns: true, // first row is header column
            skip_empty_lines: true,
            trim: true,
        }) as Record<string, string>[];
    }

}