const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

app.get("/api/hello", (req, res) => {
	console.log("request get hello");
	res.json({
		message: "Hello, World",
	});
});

app.get("/api/catch-pokemon", (req, res) => {
	const randomBoolean = Math.random() < 0.5;
	console.log("request catch result: ${randomBoolean}");
	res.json({
		isCaught: randomBoolean,
	});
});

function isPrime(num) {
	if (num <= 1) return false;
	if (num <= 3) return true;

	if (num % 2 === 0 || num % 3 === 0) return false;

	for (let i = 5; i * i <= num; i += 6) {
		if (num % i === 0 || num % (i + 2) === 0) return false;
	}

	return true;
}

app.get("/api/release-pokemon", (req, res) => {
	const randomNumber = Math.floor(Math.random() * 500);
	const isRandomNumberPrime = isPrime(randomNumber);
	res.json({
		isReleased: isRandomNumberPrime,
	});
});

function checkNameKey(req, res, next) {
	if (!req.body.hasOwnProperty("name")) {
		return res
			.status(400)
			.json({ error: "Missing 'name' key in request body" });
	}
	next();
}

function getFibonacci(n) {
	let fib = [0, 1];

	for (let i = 2; i <= n; i++) {
		fib[i] = fib[i - 1] + fib[i - 2];
	}

	return fib[n];
}

app.post("/api/rename-pokemon", checkNameKey, (req, res) => {
	const request = req.body;
	const hasFibonacciPosition = request.hasOwnProperty("rename_count");
	let fibonacci = getFibonacci(0);
	let renameCount = 0;
	console.log(`has fibonacci? ${hasFibonacciPosition}`);
	if (hasFibonacciPosition && request.rename_count != 0) {
		fibonacci = getFibonacci(request.rename_count);
		renameCount = request.rename_count;
		console.log(`has rename count? ${renameCount}`);
	}
	res.json({
		newName: request.name + "-" + fibonacci,
		count: renameCount + 1,
	});
});

app.listen(port, () => {
	console.log("Server Started");
});
