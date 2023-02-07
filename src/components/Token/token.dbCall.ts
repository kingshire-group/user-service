import DatabaseCall from "../common/common.databaseCall"
import TokenModel from "./token.model";

class TokenDatabaseCalls extends DatabaseCall{
  constructor() {
    super(TokenModel)
  }
}

export default new TokenDatabaseCalls()