import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create the HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /vehicles": "src/list.main",
        "GET /vehicles/{id}": "src/get.main",
        "PUT /vehicles/{id}": "src/update.handler",
      },
    });

    // Show API endpoint in output
    this.addOutputs({
      "ApiEndpoint": api.url,
    });
  }
}
