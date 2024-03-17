async function get_data(day, direction) {
	return await (await fetch(`./data/SY230818_${day == "w" ? "Weekday" : "Holiday"}_${direction == "w" ? "West" : "East"}.csv`)).text()
}

async function get_root() {
	let a = await Promise.all([
		get_data("w", "w"),
		get_data("w", "e"),
		get_data("h", "w"),
		get_data("h", "e")
	]);
	return {
		"week_west": Train.fromWestCsv(a[0]),
		"week_east": Train.fromEastCsv(a[1]),
		"holi_west": Train.fromWestCsv(a[2]),
		"holi_east": Train.fromEastCsv(a[3])
	};
}