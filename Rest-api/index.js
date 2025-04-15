const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
	const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
	res.send(html);
});

// REST API

app.get("/api/users", (req, res) => {
	return res.json(users);
});

app.route("/api/users/:id")

	//  WE also use CRUD
	//  for Read(GET) -> User.find()
	//  for Create(POST) -> newUser.save()
	//                      const{data} = req.body
	//  for Update data (PUT) -> findByIdAndUpdate()
	//  for Delete(DELETE) -> findByIdAndDelete()

	.get((req, res) => {
		const id = Number(req.params.id);
		const user = users.find((user) => user.id === id);
		if (!user) {
			res.json({
				status: "user not found",
			});
		}
		return res.json(user);
	})
	.patch((req, res) => {
		const id = Number(req.params.id);
		const updateData = req.body;

		const index = users.findIndex((user) => user.id === id);

		users[index] = { ...users[index], ...updateData };

		fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
			return res.json({ status: "Done !!!" });
		});

		res.json({ status: "updated" });
	})

	.delete((req, res) => {
		const id = Number(req.params.id);
		const index = users.findIndex((user) => user.id === id);

		if (index !== -1) {
			users.splice(index, 1);
		}
		fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
			return res.json({ status: "Done !!!" });
		});

		return res.json({ status: "deletd" });
	});

// app.get("/api/users/:id", (req, res) => {
// 	const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id)
//     return res.json(user)
// });

app.post("/api/users", (req, res) => {
	const Body = req.body;
	console.log(Body);
	users.push({ id: users.length + 1, ...Body });
	fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
		return res.json({ status: "Done !!!" });
	});

	// return res.json({ status: "pending" });
});

// merge in one route

// app.patch("api/users/:id", (req, res) => {
// 	return res.json({ status: "pending" });
// });

// app.delete("api/users/:id", (req, res) => {
// 	return res.json({ status: "pending" });
// });

app.listen(PORT, () => console.log(`server started at port: ${PORT}`));
