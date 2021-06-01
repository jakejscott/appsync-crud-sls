import { Chance } from "chance";
import { Post } from "../../lib/entities";
import * as given from "../steps/given";
import * as when from "../steps/when";

const chance = new Chance();

describe("Given an authenticated user", () => {
  let user: given.IAuthenticatedUser;
  beforeAll(async () => {
    user = await given.an_authenticated_user();
  });

  describe("When they create a post", () => {
    let post: Post;

    const title = chance.sentence({ words: 5 });
    const body = chance.paragraph();

    beforeAll(async () => {
      post = await when.a_user_calls_create_post(user, title, body);
    });

    it("Should return the new post", () => {
      expect(post).toMatchObject({
        title: title,
        body: body,
        userId: user.id,
      });
    });
  });
});
