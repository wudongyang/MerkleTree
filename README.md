# 根据白名单地址生成 MerkleTree Proof 
akidcalledbeast.com 使用的是本地生成 proof 的方式。理论上知道了所有白名单就能生成 proof。

代码是 Doodles 群里安老师生成 proof 的方法，经过验证与 Mint 成功的参数一致。

## 安装方法
```
npm install merkletreejs
npm install keccak256
```

## 使用方法

1. 将白名单地址复制到 whitelist.json 中，注意是 json 格式
2. 调用 getProof 

`getProof("0x232d31Edd7C8886A64121EF3a9A3Ed24eEd0b104");`

3. 执行程序

```
node generateProof.js
```

