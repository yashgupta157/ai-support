import dns from "node:dns";

console.log("Before:", dns.getServers());

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("After:", dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.cluster0.froimw5.mongodb.net",
  (err, records) => {
    if (err) {
      console.error(err);
    } else {
      console.log(records);
    }
  }
);