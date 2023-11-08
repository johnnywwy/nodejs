const tencentcloud = require("tencentcloud-sdk-nodejs")

const TmtClient = tencentcloud.tmt.v20180321.Client;


const config = require('../config.json');

const secretId = config.TENCENTCLOUD_SECRET_ID;
const secretKey = config.TENCENTCLOUD_SECRET_KEY;


const clientConfig = {
  credential: { secretId, secretKey },
  region: "ap-guangzhou",
  profile: {
    httpProfile: {
      endpoint: "tmt.tencentcloudapi.com",
    },
  },
};

const client = new TmtClient(clientConfig);


export const translate = (word: string) => {
  // console.log('即将翻译这个单词', word);
  // console.log('client', client);

  const params = {
    SourceText: word,
    Source: "auto",
    Target: "zh",
    ProjectId: 0,
  };

  client.TextTranslate(params).then(
    (data: any) => {
      const { TargetText } = data;
      console.log(TargetText);
      process.exit(0);

    },
    (err: any) => {
      console.error("error", err);
      process.exit(2);
    }
  );
}