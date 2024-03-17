export class Station {
	sta_number = "S00";
	arrival: string | undefined = "00:00";
	departure: string | undefined = "00:00";
	track = "0";
	comment = "";

	constructor(sta_number: string, arrival: string | undefined, departure: string | undefined, track: string, comment: string) {
		this.sta_number = sta_number;
		this.arrival = arrival;
		this.departure = departure;
		this.track = track;
		this.comment = comment;
	}
}

export class Train {
	direction = "";
	unban = "00";
	times: Station[] = [];

	get starting() {
		return this.times[0].sta_number;
	}
	get destination() {
		return this.times[this.times.length-1].sta_number;
	}
	get number() {
		function getDestCode(number: string) {
			switch (number) {
				case "S01": return 8;
				case "S02": return 7;
				case "S12": return 3;
				case "S14": return 2;
				case "S17": return 1;
				default: return 9;
			}
		}
		return `${this.times[0].departure?.split(":")[0].padStart(2, "0")}${getDestCode(this.destination)}${this.unban}`;
	}


	constructor(unban: string, direction: string, times: Station[]) {
		this.unban = unban;
		this.times = times;
		this.direction = direction;
	}

	static fromWestCsv(csv: string) {
		const result: Train[] = [];

		csv.split('\n').forEach(row => {
			const train = new Train("00", "west", []);

			const cells = row.split(',').map(v => v.trim());
			train.unban = cells[0];
			
			// 谷上
			{
				const comment = cells[3];
				const time = cells[4];
				const track = cells[5];
				if (time != "")
				train.times.push(new Station("S01", undefined, time, track, comment));
			}
			// 新神戸
			{
				const comment = cells[6];
				const time = cells[7];
				const track = cells[8];
				if (time != "")
				train.times.push(new Station("S02", undefined, time, track, comment));
			}
			// 三宮
			{
				const time = cells[9];
				if (time != "")
				train.times.push(new Station("S03", undefined, time, "1", ""));
			}
			// 県庁前
			{
				const time = cells[10];
				if (time != "")
				train.times.push(new Station("S04", undefined, time, "1", ""));
			}
			// 大倉山
			{
				const time = cells[11];
				if (time != "")
				train.times.push(new Station("S05", undefined, time, "1", ""));
			}
			// 湊川公園
			{
				const time = cells[12];
				if (time != "")
				train.times.push(new Station("S06", undefined, time, "1", ""));
			}
			// 上沢
			{
				const time = cells[13];
				if (time != "")
				train.times.push(new Station("S07", undefined, time, "1", ""));
			}
			// 長田
			{
				const time = cells[14];
				if (time != "")
				train.times.push(new Station("S08", undefined, time, "1", ""));
			}
			// 新長田
			{
				const time = cells[15];
				if (time != "")
				train.times.push(new Station("S09", undefined, time, "1", ""));
			}
			// 板宿
			{
				const time = cells[16];
				if (time != "")
				train.times.push(new Station("S10", undefined, time, "1", ""));
			}
			// 妙法寺
			{
				const time = cells[17];
				if (time != "")
				train.times.push(new Station("S11", undefined, time, "1", ""));
			}
			// 名谷
			{
				const track = cells[18];
				const comment = cells[19] || cells[21];
				const time = cells[20];
				if (time != "")
				train.times.push(new Station("S12", time, time, track, comment));
			}
			// 運動公園
			{
				const time = cells[22];
				if (time != "")
				train.times.push(new Station("S13", undefined, time, "1", ""));
			}
			// 学園都市
			{
				const time = cells[23];
				if (time != "")
				train.times.push(new Station("S14", undefined, time, "1", ""));
			}
			// 伊川谷
			{
				const time = cells[24];
				if (time != "")
				train.times.push(new Station("S15", undefined, time, "1", ""));
			}
			// 西神南
			{
				const time = cells[25];
				if (time != "")
				train.times.push(new Station("S16", undefined, time, "1", ""));
			}
			// 西神中央
			{
				const track = cells[26];
				const comment = cells[28];
				const time = cells[27];
				if (time != "")
				train.times.push(new Station("S17", time, undefined, track, comment));
			}

			result.push(train);
		});
		return result;
	}

	static fromEastCsv(csv: string) {
		const result: Train[] = [];

		csv.split('\n').forEach(row => {
			const train = new Train("00", "east", []);

			const cells = row.split(',').map(v => v.trim());
			train.unban = cells[0];
			
			// 西神中央
			{
				const comment = cells[3];
				const time = cells[4];
				const track = cells[5];
				if (time != "")
				train.times.push(new Station("S17", undefined, time, track, comment));
			}
			// 西神南
			{
				const time = cells[6];
				if (time != "")
				train.times.push(new Station("S16", undefined, time, "2", ""));
			}
			// 伊川谷
			{
				const time = cells[7];
				if (time != "")
				train.times.push(new Station("S15", undefined, time, "2", ""));
			}
			// 学園都市
			{
				const time = cells[8];
				if (time != "")
				train.times.push(new Station("S14", undefined, time, "2", ""));
			}
			// 総合運動公園
			{
				const time = cells[9];
				if (time != "")
				train.times.push(new Station("S13", undefined, time, "2", ""));
			}
			// 名谷
			{
				const comment = cells[10] || cells[12];
				const time = cells[11];
				const track = cells[13];
				if (time != "")
				train.times.push(new Station("S12", undefined, time, track, comment));
			}
			// 妙法寺
			{
				const time = cells[14];
				if (time != "")
				train.times.push(new Station("S11", undefined, time, "2", ""));
			}
			// 板宿
			{
				const time = cells[15];
				if (time != "")
				train.times.push(new Station("S10", undefined, time, "2", ""));
			}
			// 新長田
			{
				const time = cells[16];
				if (time != "")
				train.times.push(new Station("S09", undefined, time, "2", ""));
			}
			// 長田
			{
				const time = cells[17];
				if (time != "")
				train.times.push(new Station("S08", undefined, time, "2", ""));
			}
			// 上沢
			{
				const time = cells[18];
				if (time != "")
				train.times.push(new Station("S07", undefined, time, "2", ""));
			}
			// 湊川公園
			{
				const time = cells[19];
				if (time != "")
				train.times.push(new Station("S06", undefined, time, "2", ""));
			}
			// 大倉山
			{
				const time = cells[20];
				if (time != "")
				train.times.push(new Station("S05", undefined, time, "2", ""));
			}
			// 県庁前
			{
				const time = cells[21];
				if (time != "")
				train.times.push(new Station("S04", undefined, time, "2", ""));
			}
			// 三宮
			{
				const time = cells[22];
				if (time != "")
				train.times.push(new Station("S03", undefined, time, "2", ""));
			}
			// 新神戸
			{
				const track = cells[23];
				const time = cells[24];
				const comment = cells[25];
				if (time != "")
				train.times.push(new Station("S02", time, time, track, comment));
			}
			// 谷上
			{
				const track = cells[26];
				const time = cells[27];
				const comment = cells[28];
				if (time != "")
				train.times.push(new Station("S01", time, undefined, track, comment));
			}
			
			result.push(train);
		});
		return result;
	}
}


import * as DataHE from './data/SY230818_Holiday_East.ts';
import * as DataHW from './data/SY230818_Holiday_West.ts';
import * as DataWE from './data/SY230818_Weekday_East.ts';
import * as DataWW from './data/SY230818_Weekday_West.ts';

export function get_root() {
	return {
		"week_west": Train.fromWestCsv(DataWW.data),
		"week_east": Train.fromEastCsv(DataWE.data),
		"holi_west": Train.fromWestCsv(DataHW.data),
		"holi_east": Train.fromEastCsv(DataHE.data)
	};
}