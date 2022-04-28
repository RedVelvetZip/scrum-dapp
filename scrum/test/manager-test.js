const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Manager", function () {
  let Manager, manager;
  before(async function () {
    Manager = await ethers.getContractFactory("Manager");
    manager = await Manager.deploy();
    await manager.deployed();
  })

  it("Should create a new ticket", async function () {
    await manager.createTicket("test ticket :0");
    let tickets = await manager.getTickets();
    console.log(tickets);
    expect(tickets[0].name).to.equal("test ticket :0")
  });

  it("Should update a ticket name", async function () {
    await manager.updateTicketName(0, "updated test ticket :$")
    let tickets = await manager.getTickets();
    console.log(tickets);
    expect(tickets[0].name).to.equal("updated test ticket :$")
  });

  it("Should update a ticket status", async function () {
    await manager.updateTicketStatus(0, 2)
    let tickets = await manager.getTickets();
    console.log(tickets);
    expect(tickets[0].status).to.equal(2)
  });

  it("Should return a list of tickets", async function () {
    await manager.createTicket("Bob");
    await manager.createTicket("Alice");
    await manager.createTicket("Rich");
    let tickets = await manager.getTickets();
    console.log(tickets);
    expect(tickets.length).to.equal(4); //including ticket created in test #1
  });
});
