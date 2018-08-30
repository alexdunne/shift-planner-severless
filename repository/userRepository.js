const AWS = require("aws-sdk");

module.exports = () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const table = "users";

  return {
    findByEmail: async email => {
      const response = await dynamoDb
        .get({ TableName: table, Key: { email } })
        .promise();

      return response.Item;
    },
    create: async user => {
      return dynamoDb.put({ TableName: table, Item: user }).promise();
    }
  };
};
