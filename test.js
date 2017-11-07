/* eslint-env mocha */
const assert = require("assert");
const validator = require("./index.js");

describe("Validator", ()=>{
  describe("Bucket", ()=>{
    it("validates invalid chars", ()=>{
      assert(!validator.validateBucket("abcd/e"));
      assert(!validator.validateBucket("abcd!e"));
    });
  });

  it("validates google spoof", ()=>{
    assert(!validator.validateBucket("abcg0og1e"));
  });

  it("validates length", ()=>{
    assert(!validator.validateBucket("a"));
    assert(validator.validateBucket("abc"));
  });

  describe("Object", ()=>{
    it("validates length", ()=>{
      assert(!validator.validateObject(""));
      assert(!validator.validateObject("a".repeat("1025")));
    });

    it("validates invalid chars", ()=>{
      assert(!validator.validateObject("aaa\n"));
    });
  });

  describe("Filepath", ()=>{
    it("validates acceptable bucket/object string", ()=>{
      assert(validator.validateFilepath("my-bucket/my-folder/my-file"));
      assert(validator.validateFilepath("my-bucket/my-file"));
    });

    it("validates bucket/object string missing object", ()=>{
      assert(!validator.validateFilepath("abc"));
      assert(!validator.validateFilepath("abc/"));
    });

    it("validates bucket/object object", ()=>{
      assert(validator.validateFilepath({bucket: "my-bucket", object: "my-file"}));
    });
  });
});
