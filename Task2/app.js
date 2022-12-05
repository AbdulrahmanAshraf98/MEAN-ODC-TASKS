const user = require("./modules/user.module");
const yargs = require("yargs");
yargs.command({
	command: "add",
	builder: {
		name: { demandOption: true },
	},
	handler: function (argv) {
		user.add(argv);
	},
});
yargs.command({
	command: "showAll",
	handler: function () {
		user.showAll();
	},
});
yargs.command({
	command: "showSingle",
	builder: {
		id: { demandOption: true },
	},
	handler: function (argv) {
		const id = argv.id;
		if (!id) return null;
		user.showSingle(argv.id);
	},
});
yargs.command({
	command: "edit",
	builder: {
		id: { demandOption: true },
	},
	handler: function (argv) {
		const id = argv.id;
		if (!id) return null;
		user.edit(argv);
	},
});
yargs.command({
	command: "del",
	builder: {
		id: { demandOption: true },
	},
	handler: function (argv) {
		const id = argv.id;
		if (!id) return null;
		user.del(id);
	},
});
yargs.argv;
