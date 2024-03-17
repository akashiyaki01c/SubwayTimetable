function getUnyo(unban, trains) {
	function parseTime(str) {
		let hour = str.split(":")[0];
		if (hour < 4) { hour += 24 }
		let minute = str.split(":")[1];
		return Number(hour) * 60 + Number(minute);
	}

	return trains
		.filter(v => v.unban == unban)
		.sort((a, b) => {
			const aTime = a.times.filter(v => v.sta_number == a.starting)[0].departure || a.times.filter(v => v.sta_number == a.starting)[0].arrival;
			const bTime = b.times.filter(v => v.sta_number == b.starting)[0].departure || b.times.filter(v => v.sta_number == b.starting)[0].arrival;
			return parseTime(aTime) - parseTime(bTime);
		});
}

function unyoTrainTableHtml(train) {
	function getStationName(number) {
		switch (number) {
			case "S01": return "谷上";
			case "S02": return "新神";
			case "S12": return "名谷";
			case "S17": return "西神";
		}
	}
	function getTrackString(track) {
		switch (track) {
			case "1": return "①";
			case "2": return "②";
			case "3": return "③";
			case "4": return "④";
			case "5": return "⑤";
			case "6": return "⑥";
		}
	}
	const starting = train.times.filter(v => v.sta_number == train.starting)[0];
	const destination = train.times.filter(v => v.sta_number == train.destination)[0]
	return `
	<tr>
		<td>${getStationName(train.starting)}${getTrackString(starting.track)}</td>
		<td>${starting.departure || starting.arrival}</td>
		<td>${starting.comment}</td>
	</tr>
	<tr>
		<td></td>
		<td>↓</td>
		<td>${train.number}</td>
	<tr>
	<tr>
		<td>${getStationName(train.destination)}${getTrackString(destination.track)}</td>
		<td>${destination.arrival || destination.departure}</td>
		<td>${destination.comment}</td>
	</tr>
	`;
}

function unyoTrainsTableHtml(trains) {
	return `
	<table>
		<tr>
		</tr>
		${trains.map(train => unyoTrainTableHtml(train)).join('')}
	</table>
	`
}