

function getTrainTimetableHtml(sta_number, train) {
	let sta = train.times.filter(v => v.sta_number == sta_number)[0];
	if (sta == null) {
		return ``;
	}
	let bikou = "";
	let is_reverse = true;
	console.log(sta.comment);
	if (sta_number == train.destination) {
		if (sta.comment == "入庫") {
			bikou = "入";
		} else if (sta.comment == "入換") {
			bikou = "換";
		} else if (sta.comment == "泊車") {
			bikou = "泊";
		} else if (sta.comment == "引上") {
			bikou = "引";
		} else {
			bikou = "終";
			is_reverse = false;
		}
	} else if (sta_number == train.starting) {
		if (sta.comment == "出庫") {
			bikou = "出";
		} else if (sta.comment == "入換") {
			bikou = "換";
		} else if (sta.comment == "泊車") {
			bikou = "泊";
		} else if (sta.comment == "引上") {
			bikou = "引";
		} else {
			bikou = "始";
			is_reverse = false;
		}
	} else {
		is_reverse = false;
	}

	return `
	<div class="timetable-train">
		<div class="timetable-train-left dest-${train.destination}">
			<div class="timetable-train-time">${(sta.departure != null ? sta.departure : sta.arrival).split(":")[1]}</div>
			<div class="timetable-train-unban">${train.unban}</div>	
		</div>
		<div class="timetable-train-right ${is_reverse ? "comment-reverse" : "comment-border"}">
			<div class="timetable-train-track">${sta.track}</div>
			<div class="timetable-train-bikou">${bikou}</div>
		</div>
	</div>
	`;
}

function getHourTrainTimetableHtml(hour, sta_number, trains) {
	let targetTrains = trains.filter(
		v => {
			let sta = v.times.filter(v => v.sta_number == sta_number)[0];
			if (sta == null) {
				return false;
			}
			return (sta.departure != null ? sta.departure : sta.arrival).split(":")[0] == hour
		});

	let html = targetTrains.map(train => getTrainTimetableHtml(sta_number, train)).join("");
	return `
	<tr class="timetable-hour">
		<td class="timetable-hour-hour">${hour}</td>
		<td class="timetable-trains">
			<div>${html}</div>
		</td>
	</tr>`;
}

function getTrainsTimetableHtml(sta_number, trains) {
	let hours = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1];
	let html = hours.map(hour => getHourTrainTimetableHtml(hour, sta_number, trains)).join("");
	return `
	<table>
		<tr>
			<th colspan="2">test</th>
		</tr>
		${html}
	</table>
	`;
}