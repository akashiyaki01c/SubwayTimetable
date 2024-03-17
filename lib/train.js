
class Station {
	sta_number = "S00";
	arrival = "00:00";
	departure = "00:00";
	track = "0";
	comment = "";

	constructor(sta_number, arrival, departure, track, comment) {
		this.sta_number = sta_number;
		this.arrival = arrival;
		this.departure = departure;
		this.track = track;
		this.comment = comment;
	}
}

class Train {
	direction = "";
	unban = "00";
	times = [];

	get starting() {
		return this.times[0].sta_number;
	}
	get destination() {
		return this.times[this.times.length-1].sta_number;
	}
	get number() {
		function getDestCode(number) {
			switch (number) {
				case "S01": return 8;
				case "S02": return 7;
				case "S12": return 3;
				case "S14": return 2;
				case "S17": return 1;
				default: return 9;
			}
		}
		return `${this.times[0].departure.split(":")[0].padStart(2, "0")}${getDestCode(this.destination)}${this.unban}`;
	}


	constructor(unban, direction, times) {
		this.unban = unban;
		this.times = times;
		this.direction = direction;
	}

	static fromWestCsv(csv) {
		let result = [];

		csv.split('\n').forEach(row => {
			let train = new Train("00", "west", []);

			let cells = row.split(',').map(v => v.trim());
			train.unban = cells[0];
			
			// 谷上
			{
				let comment = cells[3];
				let time = cells[4];
				let track = cells[5];
				if (time != "")
				train.times.push(new Station("S01", null, time, track, comment));
			}
			// 新神戸
			{
				let comment = cells[6];
				let time = cells[7];
				let track = cells[8];
				if (time != "")
				train.times.push(new Station("S02", null, time, track, comment));
			}
			// 三宮
			{
				let time = cells[9];
				if (time != "")
				train.times.push(new Station("S03", null, time, "1", ""));
			}
			// 県庁前
			{
				let time = cells[10];
				if (time != "")
				train.times.push(new Station("S04", null, time, "1", ""));
			}
			// 大倉山
			{
				let time = cells[11];
				if (time != "")
				train.times.push(new Station("S05", null, time, "1", ""));
			}
			// 湊川公園
			{
				let time = cells[12];
				if (time != "")
				train.times.push(new Station("S06", null, time, "1", ""));
			}
			// 上沢
			{
				let time = cells[13];
				if (time != "")
				train.times.push(new Station("S07", null, time, "1", ""));
			}
			// 長田
			{
				let time = cells[14];
				if (time != "")
				train.times.push(new Station("S08", null, time, "1", ""));
			}
			// 新長田
			{
				let time = cells[15];
				if (time != "")
				train.times.push(new Station("S09", null, time, "1", ""));
			}
			// 板宿
			{
				let time = cells[16];
				if (time != "")
				train.times.push(new Station("S10", null, time, "1", ""));
			}
			// 妙法寺
			{
				let time = cells[17];
				if (time != "")
				train.times.push(new Station("S11", null, time, "1", ""));
			}
			// 名谷
			{
				let track = cells[18];
				let comment = cells[19] || cells[21];
				let time = cells[20];
				if (time != "")
				train.times.push(new Station("S12", time, time, track, comment));
			}
			// 運動公園
			{
				let time = cells[22];
				if (time != "")
				train.times.push(new Station("S13", null, time, "1", ""));
			}
			// 学園都市
			{
				let time = cells[23];
				if (time != "")
				train.times.push(new Station("S14", null, time, "1", ""));
			}
			// 伊川谷
			{
				let time = cells[24];
				if (time != "")
				train.times.push(new Station("S15", null, time, "1", ""));
			}
			// 西神南
			{
				let time = cells[25];
				if (time != "")
				train.times.push(new Station("S16", null, time, "1", ""));
			}
			// 西神中央
			{
				let track = cells[26];
				let comment = cells[28];
				let time = cells[27];
				if (time != "")
				train.times.push(new Station("S17", time, null, track, comment));
			}

			result.push(train);
		});
		return result;
	}

	static fromEastCsv(csv) {
		let result = [];

		csv.split('\n').forEach(row => {
			let train = new Train("00", "east", []);

			let cells = row.split(',').map(v => v.trim());
			train.unban = cells[0];
			
			// 西神中央
			{
				let comment = cells[3];
				let time = cells[4];
				let track = cells[5];
				if (time != "")
				train.times.push(new Station("S17", null, time, track, comment));
			}
			// 西神南
			{
				let time = cells[6];
				if (time != "")
				train.times.push(new Station("S16", null, time, "2", ""));
			}
			// 伊川谷
			{
				let time = cells[7];
				if (time != "")
				train.times.push(new Station("S15", null, time, "2", ""));
			}
			// 学園都市
			{
				let time = cells[8];
				if (time != "")
				train.times.push(new Station("S14", null, time, "2", ""));
			}
			// 総合運動公園
			{
				let time = cells[9];
				if (time != "")
				train.times.push(new Station("S13", null, time, "2", ""));
			}
			// 名谷
			{
				let comment = cells[10] || cells[12];
				let time = cells[11];
				let track = cells[13];
				if (time != "")
				train.times.push(new Station("S12", null, time, track, comment));
			}
			// 妙法寺
			{
				let time = cells[14];
				if (time != "")
				train.times.push(new Station("S11", null, time, "2", ""));
			}
			// 板宿
			{
				let time = cells[15];
				if (time != "")
				train.times.push(new Station("S10", null, time, "2", ""));
			}
			// 新長田
			{
				let time = cells[16];
				if (time != "")
				train.times.push(new Station("S09", null, time, "2", ""));
			}
			// 長田
			{
				let time = cells[17];
				if (time != "")
				train.times.push(new Station("S08", null, time, "2", ""));
			}
			// 上沢
			{
				let time = cells[18];
				if (time != "")
				train.times.push(new Station("S07", null, time, "2", ""));
			}
			// 湊川公園
			{
				let time = cells[19];
				if (time != "")
				train.times.push(new Station("S06", null, time, "2", ""));
			}
			// 大倉山
			{
				let time = cells[20];
				if (time != "")
				train.times.push(new Station("S05", null, time, "2", ""));
			}
			// 県庁前
			{
				let time = cells[21];
				if (time != "")
				train.times.push(new Station("S04", null, time, "2", ""));
			}
			// 三宮
			{
				let time = cells[22];
				if (time != "")
				train.times.push(new Station("S03", null, time, "2", ""));
			}
			// 新神戸
			{
				let track = cells[23];
				let time = cells[24];
				let comment = cells[25];
				if (time != "")
				train.times.push(new Station("S02", time, time, track, comment));
			}
			// 谷上
			{
				let track = cells[26];
				let time = cells[27];
				let comment = cells[28];
				if (time != "")
				train.times.push(new Station("S01", time, null, track, comment));
			}
			
			result.push(train);
		});
		return result;
	}
}

