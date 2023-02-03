import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import * as connections from '../../config/connection/connection';

const TokenSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(mongooseUniqueValidator);

export default connections.db.model('TokenModel', TokenSchema)
