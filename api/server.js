const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3001;

server.use(middlewares);

function getPoliciesResponse() {
  return { policies: router.db.get("policies").value() };
}

server.get("/v1/policies", (_req, res) => {
  res.json(getPoliciesResponse());
});

server.get("/v1/policies/:policyNumber", (req, res) => {
  const policy = router.db
    .get("policies")
    .find({ policyNumber: req.params.policyNumber })
    .value();

  if (!policy) {
    return res.status(404).json({ error: "Policy not found" });
  }

  res.json(policy);
});

server.listen(PORT, () => {
  console.log(`JSON Server listening on http://localhost:${PORT}`);
});
