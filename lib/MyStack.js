import * as cognito from "@aws-cdk/aws-cognito";
import * as apiAuthorizers from "@aws-cdk/aws-apigatewayv2-authorizers";
import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    //Create user pool
    const userPool = new cognito.UserPool(this, "UserPool", {
      userPoolName: "UserPool"
    })

    const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool,
      generateSecret: true,
      preventUserExistenceErrors: true,
      authFlows: {
        userSrp: true,
        refreshToken: true
      },
      supportedIdentityProviders: [cognito.UserPoolClientIdentityProvider.COGNITO]
    })

    new cognito.UserPoolDomain(this, "UserPoolDomain", {
      userPool,
      cognitoDomain: {
        domainPrefix: 'service-api-pool-domain-jedi-master'
      }
    })

    // Create the HTTP API
    const api = new sst.Api(this, "Api", {
      defaultAuthorizer: new apiAuthorizers.HttpUserPoolAuthorizer({
        userPool,
        userPoolClient
      }),
      defaultAuthorizationType: sst.ApiAuthorizationType.JWT,
      routes: {
        "GET /vehicles": "src/list.main",
        "GET /vehicles/{id}": "src/get.main",
        "PUT /vehicles/{id}": "src/update.handler"
      },
    });

    // Show API endpoint in output
    this.addOutputs({
      "ApiEndpoint": api.url,
    });
  }
}
