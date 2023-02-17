const xsjs = require('@sap/xsjs');
const xsenv = require('@sap/xsenv');

// Extra code for local testing
// if(process.env.NODE_ENV !== 'production'){
//     xsenv.loadEnv(); 
// }

// // This variable should only be active in local unit testing
// const runAnonymously = process.env.NODE_ENV === 'test'

var options = {
	anonymous: true,
	xsApplicationUser: true,
	auditLog: { logToConsole: true },
	redirectUrl: "index.xsjs"
};

try {
	options = Object.assign(options, xsenv.getServices({ hana: { tag: "hana" } }));
} catch (err) {
	console.log("[WARN]", err.message);
}

try {
	options = Object.assign(options, xsenv.getServices({ uaa: { tag: "xsuaa" } }));
} catch (err) {
	console.log("[WARN]", err.message);
}

// configure job scheduler
try {
    options = Object.assign(options, xsenv.getServices({ jobs: {tag: "jobscheduler"} }));
} catch (err) {
    console.log("[WARN]", err.message);
}


const port = process.env.PORT || 5001;

xsjs(options).listen(port);
//console.info('Listening on http://localhost:' + port);
