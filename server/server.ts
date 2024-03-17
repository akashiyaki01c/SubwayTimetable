import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { Status } from "https://deno.land/std@0.84.0/http/http_status.ts";
import * as Stations from "./data/stations.json" with { type: "json" };
import { Train, get_root } from "./train.ts";

const app = new Application();
const router = new Router();

const ApiRoot = "/api/v0.1";

app.addEventListener("listen", ({ hostname, port, secure }): void => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

app.addEventListener("error", (evt) => {
  console.log(evt.error);
});

router
  .get('/', (ctx) => {
    ctx.response.body = "{}";
    ctx.response.type = "application/json";
  })


router
  .get(`${ApiRoot}/lines`, (ctx) => {
    ctx.response.body = JSON.stringify(Stations.default.lines);
    ctx.response.type = "application/json";
  })
  .get(`${ApiRoot}/stations/s`, (ctx) => {
    ctx.response.body = JSON.stringify(Stations.default.stations.S);
    ctx.response.type = "application/json";
  })
  .get(`${ApiRoot}/stations/k`, (ctx) => {
    ctx.response.body = JSON.stringify(Stations.default.stations.K);
    ctx.response.type = "application/json";
  });

function getDiagram(str: string) {
  if (str == "weekday") {
    return Array.prototype.concat(get_root().week_east, get_root().week_west) as Train[];
  } else if (str == "holiday") {
    return Array.prototype.concat(get_root().holi_east, get_root().holi_west) as Train[];
  } else {
    return [];
  }
}

router
  .get(`${ApiRoot}/diagram/root/all`, (ctx) => {
    ctx.response.body = JSON.stringify(get_root());
    ctx.response.type = "application/json";
  })
  .get(`${ApiRoot}/diagram/root/:dia/:direction`, (ctx) => {
    if (ctx.params.dia == "weekday") {
      if (ctx.params.direction == "east") {
        ctx.response.body = JSON.stringify(get_root().week_east);
        return;
      } else if (ctx.params.direction == "west") {
        ctx.response.body = JSON.stringify(get_root().week_west);
        return;
      }
    } else if (ctx.params.dia == "holiday") {
      if (ctx.params.direction == "east") {
        ctx.response.body = JSON.stringify(get_root().holi_east);
        return;
      } else if (ctx.params.direction == "west") {
        ctx.response.body = JSON.stringify(get_root().holi_west);
        return;
      }
    }
    ctx.response.status = Status.BadRequest;
    ctx.response.type = "application/json";
  })
  .get(`${ApiRoot}/diagram/unyo/:dia/:number`, (ctx) => {
    function time2int(time: string) {
      let hour = time.split(':')[0];
      const minute = time.split(':')[1];
      if (Number(hour) < 4) {
        hour += 24;
      }

      return Number(hour) * 60 + Number(minute);
    }
    const dia = getDiagram(ctx.params.dia || "");
    const trains = dia.filter(v => v.unban == ctx.params.number)
      .sort((a, b) => time2int(a.times[0].departure || a.times[0].arrival || "00:00") - time2int(b.times[0].departure || b.times[0].arrival || "00:00"))
    ctx.response.body = trains;
    ctx.response.type = "application/json";
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });