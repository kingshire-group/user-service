import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import * as connections from '../../config/connection/connection';

export interface IRefreshTokenModel extends Document {
	token: string
  expires?: Date
  createdByIp: String
  revoked?: Date
  revokedByIp?: String
  replacedByToken?: String
}

const TokenSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  },
  refreshTokens: [
    {
      type: new Schema(
        {
          token: {
            type: String,
            required: true
        	},
          expires: Date,
          createdByIp: String,
          revoked: Date,
          revokedByIp: String,
          replacedByToken: String
        },
        { timestamps: true }
      )
    }
  ]
}, {
  collection: 'tokenmodel',
  versionKey: false,
  timestamps: true
})

TokenSchema.plugin(mongoosePaginate);
TokenSchema.plugin(mongooseUniqueValidator);

export default connections.db.model<IRefreshTokenModel>('TokenModel', TokenSchema)
