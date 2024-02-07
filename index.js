import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(8787, () => {
    console.log("Server started!");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
}
);


//add get request that check if the request body has name = "admin" and password = 123456
//path: localhost:8787/login
app.post("/login", (req, res) => {
    const body = req.body;
    if (body.name === "admin" && body.password === "123456") {
        res.statusCode = 200;
        res.send("Login success!");
    } else {
        res.statusCode = 401;
        res.send("Login failed!");
    }
});

// add post request that add new appointment to the appointments array and check in the array if the time is available or not
const appointments = [ {
    id: "32",
    serviceType: "12",
    dateTime: "2025-07-20T10:22:00.000Z",
    clientName: "Sara Levi",
    clientPhone: "054-8458681",
    clientEmail: "saral45@gmail.com",
},
{
    id: "75",
    serviceType: "11",
    dateTime: "2021-06-20T10:00:00.000Z",
    clientName: "Avi Choen",
    clientPhone: "050-1234567",
    clientEmail: "Avi232@gmail.com",
}, 
{
    id: "78",
    serviceType: "13",
    dateTime: "2024-02-08T10:00:00.000Z",
    clientName: "Chaim Levin",
    clientPhone: "050-1233567",
    clientEmail: "Chaim232@gmail.com",
},
{
    id: "78",
    serviceType: "11",
    dateTime: "2024-02-07T10:00:00.000Z",
    clientName: "Malka Levin",
    clientPhone: "050-1232567",
    clientEmail: "M232@gmail.com",
},  ];

app.post("/appointment", (req, res) => {
    const body = req.body;
    let isAvailable = true;
    // from foreach loop to for of loop
    for (const appointment of appointments) {
        if (appointment.dateTime === body.dateTime) {
            isAvailable = false;
        }
    }

    if (isAvailable) {
        appointments.push(body);
        res.statusCode = 200;
        res.send("Appointment added successfully!");
    } else {
        res.statusCode = 400;
        res.send("Appointment is not available!");
    }
});

// add get request that return all appointments
app.get("/appointments", (req, res) => {
    res.send(appointments);
});

let services = [{
    id: "11",
    name: "Mortgage advisor",
    owner: "Kahanovitz Yael",
    description: "On the way to your house",
    phone: "054-123456",
    email: "Yael@gmail.com",

},
{
    id: "13",
    name: "Our Home",
    owner: "Yariv Katz",
    description: "to join our house ",
    phone: "054-123456",
    email: "Yariv@gmail.com",
   
},
{
    id: "12",
    name: "An architect",
    owner: "Cohen Michal",
    description: "For a perfect home",
    phone: "054-123456",
    email: "Michal@gmail.com",
   
},
{
    id: "14",
    name: "Lawyer",
    owner: "Lev Yehonatan",
    description: "Expert in selling an apartment",
    phone: "054-123456",
    email: "lev@gmail.com",
   
},];

app.post("/service", (req, res) => {
    const serviceExists = services.find((service) => service.name === req.body.name);
    if (serviceExists) {
        res.statusCode = 400;
        res.send("Service already exists!");
        return;
    }
    const body = req.body;
    services.push(body);
    res.statusCode = 200;
    res.send("Service added successfully!");
});

app.get("/services", (req, res) => {
    res.send(services);
});

app.put("/service", (req, res) => {
    const serviceIndex = services.findIndex((service) => service.id === req.body.id);
    if (serviceIndex !== -1) {
        services[serviceIndex] = req.body;
        res.status(200).json({ message: "Service updated successfully" });
    } else {
        res.status(404).json({ error: "Service not found" });
    }
});
//
app.delete("/service", (req, res) => {
    const serviceIndex = services.findIndex((service) => service.id === req.body.id);
    if (serviceIndex !== -1) {
      services.splice(serviceIndex, 1);
      res.statusCode = 200;
      res.send("Service deleted successfully!");
    } else {
      res.statusCode = 400;
      res.send("Service does not exist!");
    }
  });

let businessData ={id: "123",
name: "Home for small businesses",
description: "A home for a business that wants a home",
address: "Rothschild 60 Tel Aviv",
phone: "03-1234567",
email:"Yariv@gmail.com",
owner: "Yariv Katz",
logo: "../images/LOGOManager.jpg",};

app.post("/businessData", (req, res) => {
    const body = req.body;
    businessData = body;
    res.statusCode = 200;
    res.send(businessData);
});


app.put("/businessData", (req, res) => {
    const body = req.body;
    businessData = body;
    res.statusCode = 200;
    res.send(businessData);
});

app.get("/businessData", (req, res) => {
    res.send(businessData);
});
